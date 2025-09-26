// routes/chat.js
const express = require('express');
const ChatHistory = require('../models/ChatHistory');
const auth = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// Start a new chat session
router.post('/session/start', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const sessionId = uuidv4();

    const chatSession = new ChatHistory({
      userId,
      sessionId,
      messages: [{
        sender: 'bot',
        text: `Hello ${req.user.firstName}! I'm CardioCare AI, your intelligent health assistant. How can I help you today?`,
        timestamp: new Date(),
        messageType: 'system'
      }],
      isActive: true
    });

    await chatSession.save();

    res.status(201).json({
      success: true,
      message: 'Chat session started',
      sessionId,
      initialMessage: chatSession.messages[0]
    });
  } catch (error) {
    console.error('Start chat session error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to start chat session'
    });
  }
});

// Send message to chat
router.post('/message', auth, async (req, res) => {
  try {
    const { sessionId, message, messageType = 'text' } = req.body;
    const userId = req.user.userId;

    // Find chat session
    let chatSession = await ChatHistory.findOne({ 
      userId, 
      sessionId, 
      isActive: true 
    });

    if (!chatSession) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }

    // Add user message
    const userMessage = {
      sender: 'user',
      text: message,
      timestamp: new Date(),
      messageType
    };

    chatSession.messages.push(userMessage);

    // Generate bot response (replace with actual AI logic)
    const botResponse = generateBotResponse(message, req.user.firstName);
    
    const botMessage = {
      sender: 'bot',
      text: botResponse.text,
      timestamp: new Date(),
      messageType: 'text',
      metadata: {
        confidence: botResponse.confidence,
        intent: botResponse.intent
      }
    };

    chatSession.messages.push(botMessage);
    chatSession.updatedAt = new Date();

    await chatSession.save();

    res.json({
      success: true,
      messages: [userMessage, botMessage],
      sessionId
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message'
    });
  }
});

// Get chat history for a session
router.get('/session/:sessionId', auth, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.userId;

    const chatSession = await ChatHistory.findOne({
      userId,
      sessionId
    });

    if (!chatSession) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }

    res.json({
      success: true,
      session: {
        sessionId: chatSession.sessionId,
        messages: chatSession.messages,
        sessionStarted: chatSession.sessionStarted,
        sessionEnded: chatSession.sessionEnded,
        isActive: chatSession.isActive
      }
    });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get chat history'
    });
  }
});

// Get all chat sessions for user
router.get('/sessions', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { limit = 10, skip = 0 } = req.query;

    const sessions = await ChatHistory.find({ userId })
      .select('sessionId sessionStarted sessionEnded isActive messages')
      .sort({ sessionStarted: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    // Add summary info for each session
    const sessionsWithSummary = sessions.map(session => ({
      sessionId: session.sessionId,
      sessionStarted: session.sessionStarted,
      sessionEnded: session.sessionEnded,
      isActive: session.isActive,
      messageCount: session.messages.length,
      lastMessage: session.messages[session.messages.length - 1],
      summary: session.messages.length > 1 ? 
        session.messages[1].text.substring(0, 100) + '...' : 
        'New conversation'
    }));

    res.json({
      success: true,
      sessions: sessionsWithSummary,
      pagination: {
        total: await ChatHistory.countDocuments({ userId }),
        limit: parseInt(limit),
        skip: parseInt(skip)
      }
    });
  } catch (error) {
    console.error('Get chat sessions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get chat sessions'
    });
  }
});

// End chat session
router.put('/session/:sessionId/end', auth, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.userId;

    const chatSession = await ChatHistory.findOneAndUpdate(
      { userId, sessionId, isActive: true },
      { 
        isActive: false, 
        sessionEnded: new Date(),
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!chatSession) {
      return res.status(404).json({
        success: false,
        message: 'Active chat session not found'
      });
    }

    res.json({
      success: true,
      message: 'Chat session ended',
      sessionId
    });
  } catch (error) {
    console.error('End chat session error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to end chat session'
    });
  }
});

// Clear chat history (optional - for user privacy)
router.delete('/sessions/:sessionId', auth, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.userId;

    const result = await ChatHistory.findOneAndDelete({
      userId,
      sessionId
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Chat session not found'
      });
    }

    res.json({
      success: true,
      message: 'Chat session deleted successfully'
    });
  } catch (error) {
    console.error('Delete chat session error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete chat session'
    });
  }
});

// Bot response generation function (replace with actual AI)
function generateBotResponse(message, userName) {
  const lowerMessage = message.toLowerCase();
  
  // Intent classification
  let intent = 'general';
  let confidence = 0.85;
  
  if (lowerMessage.includes('risk') || lowerMessage.includes('prediction')) {
    intent = 'risk_assessment';
    return {
      text: "Based on heart health analysis, I can help interpret risk factors. High blood pressure, elevated blood sugar, and chest pain patterns are key indicators. Would you like me to explain any specific risk factors?",
      confidence: 0.9,
      intent
    };
  }
  
  if (lowerMessage.includes('blood pressure') || lowerMessage.includes('bp')) {
    intent = 'blood_pressure';
    return {
      text: "Blood pressure is crucial for heart health! Normal BP is typically below 120/80 mmHg. High BP (≥140/90) increases heart disease risk. Are you monitoring your BP regularly? I can suggest lifestyle changes to help manage it.",
      confidence: 0.92,
      intent
    };
  }
  
  if (lowerMessage.includes('chest pain') || lowerMessage.includes('angina')) {
    intent = 'chest_pain';
    return {
      text: "Chest pain can vary in type and significance. Typical angina feels like pressure during exertion, while atypical may be sharp or burning. Non-anginal pain is usually not heart-related. If experiencing chest pain, please consult a healthcare provider immediately!",
      confidence: 0.88,
      intent
    };
  }
  
  if (lowerMessage.includes('lifestyle') || lowerMessage.includes('diet') || lowerMessage.includes('exercise')) {
    intent = 'lifestyle';
    return {
      text: "Heart-healthy habits include: regular exercise (150 min/week), Mediterranean diet, stress management, adequate sleep, and avoiding smoking. Small changes make big differences! What area would you like to focus on?",
      confidence: 0.87,
      intent
    };
  }
  
  // Default responses
  const responses = [
    `That's an excellent question${userName ? `, ${userName}` : ''}! Heart health is complex, and I'm here to help you understand it better. Could you be more specific about what you'd like to know?`,
    `I appreciate you asking about your heart health! Based on current medical research, I can provide evidence-based information. What specific aspect concerns you most?`,
    `Your heart health journey is unique${userName ? `, ${userName}` : ''}! I can help explain medical terms, interpret results, or discuss prevention strategies. What would be most helpful right now?`
  ];
  
  return {
    text: responses[Math.floor(Math.random() * responses.length)],
    confidence,
    intent
  };
}

module.exports = router;