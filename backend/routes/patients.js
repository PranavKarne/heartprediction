// routes/patients.js
const express = require('express');
const PatientData = require('../models/PatientData');
const AnalysisHistory = require('../models/AnalysisHistory');
const auth = require('../middleware/auth');
const router = express.Router();

// Create/Update patient data
router.post('/', auth, async (req, res) => {
  try {
    const { patientInfo, uploadedFiles } = req.body;
    const userId = req.user.userId;

    // Process uploaded files info
    const processedFiles = uploadedFiles.map(file => ({
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      uploadDate: new Date()
    }));

    const patientData = new PatientData({
      userId,
      patientInfo,
      uploadedFiles: processedFiles
    });

    await patientData.save();

    res.status(201).json({
      success: true,
      message: 'Patient data saved successfully',
      patientData: patientData
    });
  } catch (error) {
    console.error('Save patient data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save patient data',
      error: error.message
    });
  }
});

// Analyze patient data
router.post('/analyze', auth, async (req, res) => {
  try {
    const { patientDataId, patientInfo } = req.body;
    const userId = req.user.userId;

    // Simulate AI analysis (replace with actual GNN model)
    const startTime = new Date();
    const riskLevel = ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)];
    const riskScore = Math.floor(Math.random() * 100);
    const confidence = 90 + Math.floor(Math.random() * 10);

    // Generate recommendations based on risk level
    let recommendations = [];
    if (riskLevel === 'High') {
      recommendations = [
        'Schedule immediate consultation with cardiologist',
        'Consider medication adjustment',
        'Implement strict dietary restrictions'
      ];
    } else if (riskLevel === 'Moderate') {
      recommendations = [
        'Regular monitoring recommended',
        'Lifestyle modifications suggested',
        'Follow-up in 3-6 months'
      ];
    } else {
      recommendations = [
        'Continue current health routine',
        'Annual check-ups recommended',
        'Maintain healthy lifestyle'
      ];
    }

    const endTime = new Date();

    // Save analysis results
    const analysisHistory = new AnalysisHistory({
      userId,
      patientDataId,
      inputData: {
        patientInfo,
        fileCount: 0,
        processingTime: endTime - startTime
      },
      results: {
        riskScore,
        riskLevel,
        confidence,
        keyFactors: [
          { factor: 'Blood Pressure', impact: 'negative', weight: 0.3 },
          { factor: 'Age', impact: 'neutral', weight: 0.2 },
          { factor: 'Lifestyle', impact: 'positive', weight: 0.25 }
        ],
        recommendations,
        alerts: riskLevel === 'High' ? ['High risk detected - seek immediate medical attention'] : []
      },
      processingStats: {
        startTime,
        endTime,
        duration: endTime - startTime,
        dataQuality: 'good'
      }
    });

    await analysisHistory.save();

    // Update patient data with results
    if (patientDataId) {
      await PatientData.findByIdAndUpdate(patientDataId, {
        'analysisResults.riskScore': riskScore,
        'analysisResults.riskLevel': riskLevel,
        'analysisResults.confidence': confidence,
        'analysisResults.recommendations': recommendations,
        'analysisResults.analysisDate': new Date()
      });
    }

    res.json({
      success: true,
      message: 'Analysis completed successfully',
      results: {
        riskScore,
        riskLevel,
        confidence,
        recommendations,
        analysisDate: new Date().toLocaleDateString(),
        analysisId: analysisHistory._id
      }
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Analysis failed',
      error: error.message
    });
  }
});

// Get patient history
router.get('/history', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    const patientData = await PatientData.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);
    
    const analysisHistory = await AnalysisHistory.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      data: {
        patientRecords: patientData,
        analysisHistory: analysisHistory
      }
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get patient history'
    });
  }
});

module.exports = router;