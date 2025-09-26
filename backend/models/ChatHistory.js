// models/ChatHistory.js
const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sessionId: {
    type: String,
    required: true
  },
  messages: [{
    sender: {
      type: String,
      enum: ['user', 'bot'],
      required: true
    },
    text: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    messageType: {
      type: String,
      enum: ['text', 'quick_response', 'system'],
      default: 'text'
    },
    metadata: {
      confidence: Number,
      intent: String,
      entities: [String]
    }
  }],
  sessionStarted: {
    type: Date,
    default: Date.now
  },
  sessionEnded: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [String], // For categorizing conversations
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
chatHistorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient queries
chatHistorySchema.index({ userId: 1, sessionStarted: -1 });
chatHistorySchema.index({ userId: 1, isActive: 1 });

module.exports = mongoose.model('ChatHistory', chatHistorySchema);