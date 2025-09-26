import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../AuthContext";
import AuthModal from "../AuthModal";
import Navigation from "../components/Navigation";
import "./Styles.css";

function Ai() {
  const { user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hello ${user?.firstName || 'there'}! I'm CardioCare AI, your intelligent health assistant. I can help you understand heart health, interpret prediction results, and provide personalized recommendations. ${!isAuthenticated() ? 'Sign in to start chatting with me!' : 'How can I assist you today?'}`,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Personalized responses based on user data
    if (lowerMessage.includes('my results') || lowerMessage.includes('my analysis')) {
      return `Hi ${user?.firstName}, I'd be happy to help interpret your results! If you've completed a recent analysis, I can explain the risk factors and suggest next steps. Could you share what specific aspect of your results you'd like to discuss?`;
    }

    // Advanced response system based on keywords
    if (lowerMessage.includes('risk') || lowerMessage.includes('prediction')) {
      return "Based on your heart health analysis, I can help interpret your risk factors. High blood pressure, elevated blood sugar, and chest pain patterns are key indicators. Would you like me to explain any specific risk factors?";
    }

    if (lowerMessage.includes('blood pressure') || lowerMessage.includes('bp')) {
      return "Blood pressure is crucial for heart health! Normal BP is typically below 120/80 mmHg. High BP (≥140/90) increases heart disease risk. Are you monitoring your BP regularly? I can suggest lifestyle changes to help manage it.";
    }

    if (lowerMessage.includes('chest pain') || lowerMessage.includes('angina')) {
      return "Chest pain can vary in type and significance. Typical angina feels like pressure during exertion, while atypical may be sharp or burning. Non-anginal pain is usually not heart-related. If experiencing chest pain, please consult a healthcare provider immediately!";
    }

    if (lowerMessage.includes('sugar') || lowerMessage.includes('diabetes')) {
      return "Blood sugar control is vital for heart health! Normal fasting glucose is 70-100 mg/dL. Diabetes significantly increases cardiovascular risk. Regular monitoring, proper diet, and medication compliance are essential. Need tips for managing blood sugar?";
    }

    if (lowerMessage.includes('lifestyle') || lowerMessage.includes('diet') || lowerMessage.includes('exercise')) {
      return "Heart-healthy habits include: regular exercise (150 min/week), Mediterranean diet, stress management, adequate sleep, and avoiding smoking. Small changes make big differences! What area would you like to focus on?";
    }

    if (lowerMessage.includes('gnn') || lowerMessage.includes('technology') || lowerMessage.includes('ai')) {
      return "Our Graph Neural Network (GNN) technology is fascinating! Unlike traditional models, GNNs analyze complex relationships between health factors. This allows us to detect subtle patterns and provide more accurate predictions. It's like having thousands of cardiologists analyzing your data simultaneously!";
    }

    if (lowerMessage.includes('family history') || lowerMessage.includes('genetics')) {
      return "Family history significantly impacts heart disease risk! If you have close relatives with heart disease, your risk increases. However, genetics isn't destiny - lifestyle modifications can greatly reduce your risk. Early screening and prevention are key!";
    }

    if (lowerMessage.includes('smoking') || lowerMessage.includes('tobacco')) {
      return "Smoking is one of the most significant risk factors for heart disease! It damages blood vessels, reduces oxygen, and increases clot risk. The good news? Heart disease risk drops significantly within a year of quitting. Need resources to help quit smoking?";
    }

    // Personalized default responses
    const responses = [
      `That's an excellent question${user?.firstName ? `, ${user.firstName}` : ''}! Heart health is complex, and I'm here to help you understand it better. Could you be more specific about what you'd like to know?`,
      `I appreciate you asking about your heart health! Based on current medical research, I can provide evidence-based information. What specific aspect concerns you most?`,
      `Your heart health journey is unique${user?.firstName ? `, ${user.firstName}` : ''}! I can help explain medical terms, interpret results, or discuss prevention strategies. What would be most helpful right now?`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendClick = () => {
    if (!isAuthenticated()) {
      setShowAuthModal(true);
      return;
    }
    sendMessage();
  };

  const sendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage = {
      sender: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString(),
      userId: user?.id
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    setChatHistory(prev => [...prev, userMessage]);

    const messageToProcess = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Simulate thinking time
    setTimeout(() => {
      const botResponse = {
        sender: 'bot',
        text: generateBotResponse(messageToProcess),
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setChatHistory(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, Math.random() * 1000 + 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  const handleQuickResponse = (response) => {
    if (!isAuthenticated()) {
        // We can still populate the input for a better UX
        setInputValue(response);
        // Then, if they try to send, the modal will appear.
        // Or we can show the modal immediately upon click. Let's do that for clarity.
        setShowAuthModal(true);
        return;
    }
    setInputValue(response);
  };

  const quickResponses = [
    "What is my heart disease risk?",
    "How to lower blood pressure?",
    "Explain my test results",
    "Heart-healthy diet tips",
    "Exercise recommendations",
    "Understanding chest pain"
  ];

  return (
    <div>
      <Navigation currentPage="ai" />

      <div className="container">
        <div className="page-content heartbeat-pulse">
          <h2 className="page-title">🤖 AI Health Assistant</h2>

          {/* Welcome Message - Different for auth/non-auth users */}
          {isAuthenticated() ? (
            <div style={{
              marginBottom: '2rem',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
              borderRadius: '15px',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>
                Personal AI Assistant for {user?.firstName} 🎯
              </h3>
              <p style={{ color: '#666', margin: 0 }}>
                Your conversations are private and saved to your account for continuity.
              </p>
            </div>
          ) : (
            <div style={{
              marginBottom: '2rem',
              padding: '1.5rem',
              background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 171, 0, 0.1))',
              borderRadius: '15px',
              border: '1px solid rgba(255, 193, 7, 0.2)',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#f39c12', marginBottom: '0.5rem' }}>
                ✨ Try Our AI Health Assistant
              </h3>
              <p style={{ color: '#666', margin: 0 }}>
                See how CardioCare AI works! Sign in to start a personalized conversation about your heart health.
              </p>
            </div>
          )}

          <div className="chatbot-container">
            <div className="chat-header">
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                CardioCare AI - Your Intelligent Health Assistant
                <span style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  backgroundColor: isAuthenticated() ? '#4ade80' : '#fbbf24',
                  borderRadius: '50%',
                  animation: 'pulse 2s infinite'
                }}></span>
                {!isAuthenticated() && (
                  <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                    (Demo Mode)
                  </span>
                )}
              </span>
            </div>

            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>{msg.text}</span>
                    <small style={{
                      opacity: 0.7,
                      fontSize: '0.8rem',
                      marginTop: '0.5rem',
                      alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                    }}>
                      {msg.timestamp}
                    </small>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="message bot">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span>CardioCare AI is typing</span>
                    <div style={{
                      display: 'flex',
                      gap: '2px'
                    }}>
                      {[1, 2, 3].map(i => (
                        <div
                          key={i}
                          style={{
                            width: '4px',
                            height: '4px',
                            backgroundColor: '#667eea',
                            borderRadius: '50%',
                            animation: `typing 1.5s infinite ${i * 0.2}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Response Buttons */}
            <div style={{ padding: '1rem', borderTop: '1px solid #e1e5e9', background: '#f8f9fa' }}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickResponse(response)}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(102, 126, 234, 0.1)',
                      border: '1px solid rgba(102, 126, 234, 0.3)',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      color: '#667eea',
                      position: 'relative'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = 'rgba(102, 126, 234, 0.2)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                    }}
                  >
                    {response}
                    {!isAuthenticated() && (
                      <span style={{
                        fontSize: '0.6rem',
                        background: '#ff6b6b',
                        color: 'white',
                        padding: '1px 4px',
                        borderRadius: '8px',
                        marginLeft: '0.25rem'
                      }}>
                        🔒
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="chat-input-container">
              <textarea
                className="chat-input"
                placeholder={isAuthenticated()
                  ? `Ask me about heart health, risk factors, or your results, ${user?.firstName}...`
                  : "Type your message here and sign in to send..."
                }
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                rows="2"
                style={{
                  resize: 'none',
                  minHeight: '50px',
                  maxHeight: '120px',
                  opacity: 1
                }}
              />
              <button
                className="btn"
                onClick={handleSendClick}
                disabled={(!inputValue.trim() || isTyping)}
                style={{
                  opacity: (!inputValue.trim() || isTyping) ? 0.5 : 1,
                  cursor: (!inputValue.trim() || isTyping) ? 'not-allowed' : 'pointer',
                  position: 'relative'
                }}
              >
                Send
                {!isAuthenticated() && inputValue.trim() && (
                  <span style={{
                    fontSize: '0.7rem',
                    background: '#ff6b6b',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    marginLeft: '0.5rem'
                  }}>
                    Sign in required
                  </span>
                )}
              </button>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            <div style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
              borderRadius: '15px',
              border: '1px solid rgba(102, 126, 234, 0.2)'
            }}>
              <h4 style={{ color: '#667eea', marginBottom: '1rem', fontSize: '1.2rem' }}>Ask me about:</h4>
              <ul style={{ color: '#666', lineHeight: '2' }}>
                <li>• Heart disease risk factors</li>
                <li>• Interpreting test results</li>
                <li>• Blood pressure management</li>
                <li>• Lifestyle modifications</li>
                <li>• Medication effects</li>
                <li>• Prevention strategies</li>
              </ul>
            </div>

            <div style={{
              padding: '2rem',
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '15px',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)'
            }}>
              <h4 style={{ color: '#667eea', marginBottom: '1rem', fontSize: '1.2rem' }}>
                {isAuthenticated() ? 'Personal Features:' : 'Sign in for:'}
              </h4>
              <ul style={{ color: '#666', lineHeight: '2' }}>
                <li>• Personalized responses</li>
                <li>• Chat history saved</li>
                <li>• Account integration</li>
                <li>• 24/7 availability</li>
                <li>• Evidence-based information</li>
                <li>• Privacy protected</li>
              </ul>
            </div>
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '2rem',
            background: 'rgba(255, 193, 7, 0.1)',
            borderRadius: '15px',
            border: '1px solid rgba(255, 193, 7, 0.3)',
            textAlign: 'center'
          }}>
            <h4 style={{ color: '#f39c12', marginBottom: '1rem' }}>Important Disclaimer</h4>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              CardioCare AI provides educational information and should not replace professional medical advice.
              Always consult with your healthcare provider for medical decisions and emergencies.
              In case of chest pain or cardiac emergency, call 112 immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          // After successful auth, allow the user to continue
          if (inputValue.trim()) {
            sendMessage();
          }
        }}
        requiredFor="AI Chat Assistant"
      />

      <style jsx>{`
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

export default Ai;