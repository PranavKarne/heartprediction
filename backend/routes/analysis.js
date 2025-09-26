// routes/analysis.js
const express = require('express');
const AnalysisHistory = require('../models/AnalysisHistory');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all analysis history for user
router.get('/history', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { limit = 10, skip = 0 } = req.query;

    const analyses = await AnalysisHistory.find({ userId })
      .populate('patientDataId', 'patientInfo.name patientInfo.age')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const total = await AnalysisHistory.countDocuments({ userId });

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
    console.error('Get analysis history error:', error);
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