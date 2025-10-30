// routes/analysis.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const AnalysisHistory = require('../models/AnalysisHistory');
const auth = require('../middleware/auth');
const router = express.Router();

// Configure multer for file upload
const upload = multer({
  dest: path.join(__dirname, '../uploads/'),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only PNG files are allowed'));
    }
  }
});

// POST /api/analysis/predict - Upload and analyze ECG image
router.post('/predict', auth, upload.single('file'), async (req, res) => {
  let tempFilePath = null;
  
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    tempFilePath = req.file.path;
    const userId = req.user.userId;

    // Call Python prediction script
    const pythonScript = path.join(__dirname, '../predict.py');
    const pythonProcess = spawn('/opt/homebrew/bin/python3.11', [pythonScript, tempFilePath]);

    let pythonOutput = '';
    let pythonError = '';

    pythonProcess.stdout.on('data', (data) => {
      pythonOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      pythonError += data.toString();
    });

    pythonProcess.on('close', async (code) => {
      // Clean up uploaded file
      if (tempFilePath && fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }

      if (code !== 0) {
        console.error('Python script error:', pythonError);
        return res.status(500).json({
          success: false,
          message: 'Analysis failed',
          error: pythonError || 'Unknown error occurred'
        });
      }

      try {
        const result = JSON.parse(pythonOutput);

        if (!result.success) {
          return res.status(500).json({
            success: false,
            message: result.error || 'Analysis failed'
          });
        }

        // Save analysis to history
        try {
          const analysisHistory = new AnalysisHistory({
            userId: userId,
            patientDataId: userId, // Using userId as placeholder since we don't have separate patient data
            analysisType: 'heart_health',
            inputData: {
              fileCount: 1,
              fileName: req.file.originalname,
              fileSize: req.file.size
            },
            results: {
              riskScore: result.risk_score,
              riskLevel: result.risk_level,
              confidence: result.confidence,
              predictedClass: result.predicted_class,
              probabilities: result.probabilities
            },
            modelVersion: '1.0.0',
            processingStats: {
              startTime: new Date(),
              endTime: new Date(),
              duration: 0
            }
          });

          await analysisHistory.save();
          console.log('✅ Analysis saved to history for user:', userId);
        } catch (saveError) {
          console.error('❌ Failed to save analysis history:', saveError);
          // Continue even if saving fails
        }

        // Return prediction results
        res.json({
          success: true,
          data: {
            riskScore: result.risk_score,
            riskLevel: result.risk_level,
            confidence: result.confidence,
            predictedClass: result.predicted_class,
            probabilities: result.probabilities,
            fileName: req.file.originalname,
            analysisDate: new Date().toISOString()
          }
        });

      } catch (parseError) {
        console.error('Failed to parse Python output:', pythonOutput);
        return res.status(500).json({
          success: false,
          message: 'Failed to parse analysis results',
          error: parseError.message
        });
      }
    });

  } catch (error) {
    // Clean up on error
    if (tempFilePath && fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }
    
    console.error('Prediction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process ECG image',
      error: error.message
    });
  }
});

// Get all analysis history for user
router.get('/history', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { limit = 10, skip = 0 } = req.query;

    console.log('📊 Fetching history for user:', userId);
    
    const analyses = await AnalysisHistory.find({ userId })
      .populate('patientDataId', 'patientInfo.name patientInfo.age')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const total = await AnalysisHistory.countDocuments({ userId });
    
    console.log(`✅ Found ${analyses.length} analyses (total: ${total}) for user:`, userId);

    res.json({
      success: true,
      data: {
        analyses,
        pagination: {
          total,
          limit: parseInt(limit),
          skip: parseInt(skip)
        }
      }
    });
  } catch (error) {
    console.error('❌ Get analysis history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get analysis history'
    });
  }
});

// Get specific analysis by ID
router.get('/:analysisId', auth, async (req, res) => {
  try {
    const { analysisId } = req.params;
    const userId = req.user.userId;

    const analysis = await AnalysisHistory.findOne({
      _id: analysisId,
      userId
    }).populate('patientDataId');

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis not found'
      });
    }

    res.json({
      success: true,
      data: analysis
    });
  } catch (error) {
    console.error('Get analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get analysis'
    });
  }
});

// Delete analysis
router.delete('/:analysisId', auth, async (req, res) => {
  try {
    const { analysisId } = req.params;
    const userId = req.user.userId;

    const result = await AnalysisHistory.findOneAndDelete({
      _id: analysisId,
      userId
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Analysis not found'
      });
    }

    res.json({
      success: true,
      message: 'Analysis deleted successfully'
    });
  } catch (error) {
    console.error('Delete analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete analysis'
    });
  }
});

module.exports = router;