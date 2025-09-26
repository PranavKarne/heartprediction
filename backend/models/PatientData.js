// models/PatientData.js
const mongoose = require('mongoose');

const patientDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  patientInfo: {
    name: {
      type: String,
      required: true,
      trim: true
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true
    },
    bloodPressureSystolic: {
      type: Number,
      required: true,
      min: 70,
      max: 250
    },
    bloodPressureDiastolic: {
      type: Number,
      required: true,
      min: 40,
      max: 150
    },
    bloodSugar: {
      type: Number,
      required: true,
      min: 50,
      max: 600
    },
    chestPain: {
      type: String,
      enum: ['typical', 'atypical', 'non-anginal', 'asymptomatic'],
      required: true
    },
    heartRate: {
      type: Number,
      min: 40,
      max: 200
    },
    cholesterol: {
      type: Number,
      min: 100,
      max: 500
    },
    exerciseInducedAngina: {
      type: String,
      enum: ['yes', 'no']
    },
    smokingHistory: {
      type: String,
      enum: ['never', 'former', 'current']
    },
    familyHistory: {
      type: String,
      enum: ['yes', 'no', 'unknown']
    }
  },
  uploadedFiles: [{
    fileName: String,
    fileSize: Number,
    fileType: String,
    uploadDate: {
      type: Date,
      default: Date.now
    },
    filePath: String // Store file path or cloud storage URL
  }],
  analysisResults: {
    riskScore: {
      type: Number,
      min: 0,
      max: 100
    },
    riskLevel: {
      type: String,
      enum: ['Low', 'Moderate', 'High']
    },
    confidence: {
      type: Number,
      min: 0,
      max: 100
    },
    analysisDate: {
      type: Date,
      default: Date.now
    },
    recommendations: [String],
    additionalNotes: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
patientDataSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('PatientData', patientDataSchema);