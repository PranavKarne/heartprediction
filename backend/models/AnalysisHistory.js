

// models/AnalysisHistory.js
const mongoose = require('mongoose');

const analysisHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  patientDataId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PatientData',
    required: true
  },
  analysisType: {
    type: String,
    enum: ['heart_health', 'risk_assessment', 'comprehensive'],
    default: 'heart_health'
  },
  inputData: {
    patientInfo: Object,
    fileCount: Number,
    processingTime: Number // in milliseconds
  },
  results: {
    riskScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    riskLevel: {
      type: String,
      enum: ['Low', 'Moderate', 'High'],
      required: true
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    keyFactors: [{
      factor: String,
      impact: {
        type: String,
        enum: ['positive', 'negative', 'neutral']
      },
      weight: Number
    }],
    recommendations: [String],
    alerts: [String]
  },
  modelVersion: {
    type: String,
    default: '1.0.0'
  },
  processingStats: {
    startTime: Date,
    endTime: Date,
    duration: Number,
    dataQuality: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor']
    }
  },
  userFeedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comments: String,
    isHelpful: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient queries
analysisHistorySchema.index({ userId: 1, createdAt: -1 });
analysisHistorySchema.index({ riskLevel: 1, createdAt: -1 });

module.exports = mongoose.model('AnalysisHistory', analysisHistorySchema);