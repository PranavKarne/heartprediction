import React, { useState } from "react";
import Navigation from "../components/Navigation";
import "./Styles.css";

function Contact() {
  const [formData, setFormData] = useState({
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    organization: '',
    subject: '',
    message: '',
    urgency: 'normal',
    contactMethod: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleContactForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          contactName: '',
          contactEmail: '',
          contactPhone: '',
          organization: '',
          subject: '',
          message: '',
          urgency: 'normal',
          contactMethod: 'email'
        });
      }, 3000);
    }, 2000);
  };



  const contactMethods = [
    { icon: "📧", title: "Email Support", info: "support@cardiopredict.com", time: "Response within 24 hours" },
    { icon: "📞", title: "Phone Support", info: "+1 (555) 123-4567", time: "Mon-Fri, 9 AM - 6 PM EST" },
    { icon: "💬", title: "Live Chat", info: "Available on website", time: "Mon-Fri, 9 AM - 5 PM EST" },
    
  ];

  const supportTopics = [
    { icon: "🔧", title: "Technical Support", desc: "Issues with uploads, predictions, or platform functionality" },
    { icon: "💳", title: "Billing & Subscriptions", desc: "Payment questions, plan changes, or billing issues" },
    { icon: "🏥", title: "Medical Inquiries", desc: "Questions about results interpretation or medical data" },
    { icon: "🚀", title: "Feature Requests", desc: "Suggestions for new features or improvements" },
    { icon: "🔒", title: "Privacy & Security", desc: "Data protection, HIPAA compliance, or security concerns" },
    { icon: "📚", title: "Training & Education", desc: "Platform training, workshops, or educational resources" }
  ];

  return (
    <div>
      <Navigation currentPage="contact" />

      <div className="container">
        <div className="page-content heartbeat-pulse">
          <h2 className="page-title">💬 Contact Us</h2>
          
          {/* Contact Methods */}
          <div className="contact-info">
            {contactMethods.map((method, index) => (
              <div key={index} className="contact-card">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                  {method.icon} {method.title}
                </h3>
                <p style={{ 
                  fontWeight: '600', 
                  color: '#667eea', 
                  marginBottom: '0.5rem',
                  whiteSpace: 'pre-line'
                }}>
                  {method.info}
                </p>
                <small style={{ color: '#999', fontStyle: 'italic' }}>
                  {method.time}
                </small>
              </div>
            ))}
          </div>

          {/* Support Topics */}
          <div style={{ margin: '3rem 0' }}>
            <h3 style={{ 
              textAlign: 'center', 
              color: '#667eea', 
              marginBottom: '2rem',
              fontSize: '1.8rem'
            }}>
              How Can We Help You?
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}>
              {supportTopics.map((topic, index) => (
                <div key={index} style={{
                  padding: '1.5rem',
                  background: 'rgba(102, 126, 234, 0.05)',
                  borderRadius: '15px',
                  border: '1px solid rgba(102, 126, 234, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => setFormData(prev => ({ ...prev, subject: topic.title.toLowerCase().replace('&', '').replace(' ', '-') }))}
                >
                  <h4 style={{ color: '#667eea', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                    {topic.icon} {topic.title}
                  </h4>
                  <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    {topic.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="form-container" style={{ marginTop: '3rem' }}>
            <h3 style={{ 
              textAlign: 'center', 
              marginBottom: '2rem',
              color: '#667eea',
              fontSize: '1.8rem'
            }}>
              Send us a Message
            </h3>
            
            {submitSuccess ? (
              <div style={{
                padding: '2rem',
                background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.1), rgba(39, 174, 96, 0.1))',
                borderRadius: '15px',
                border: '2px solid #2ecc71',
                textAlign: 'center',
                color: '#27ae60'
              }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>✅ Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleContactForm}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="contactName">Full Name *</label>
                    <input 
                      type="text" 
                      id="contactName" 
                      name="contactName" 
                      value={formData.contactName} 
                      onChange={handleInputChange} 
                      placeholder="Dr. John Smith"
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactEmail">Email Address *</label>
                    <input 
                      type="email" 
                      id="contactEmail" 
                      name="contactEmail" 
                      value={formData.contactEmail} 
                      onChange={handleInputChange} 
                      placeholder="john.smith@hospital.com"
                      required 
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="contactPhone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="contactPhone" 
                      name="contactPhone" 
                      value={formData.contactPhone} 
                      onChange={handleInputChange} 
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="organization">Organization</label>
                    <input 
                      type="text" 
                      id="organization" 
                      name="organization" 
                      value={formData.organization} 
                      onChange={handleInputChange} 
                      placeholder="City General Hospital"
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <select 
                      id="subject" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleInputChange} 
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="technical">🔧 Technical Support</option>
                      <option value="billing">💳 Billing Question</option>
                      <option value="medical">🏥 Medical Inquiry</option>
                      <option value="feature">🚀 Feature Request</option>
                      <option value="privacy">🔒 Privacy & Security</option>
                      <option value="training">📚 Training & Education</option>
                      <option value="partnership">🤝 Partnership</option>
                      <option value="other">📋 Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="urgency">Priority Level</label>
                    <select 
                      id="urgency" 
                      name="urgency" 
                      value={formData.urgency} 
                      onChange={handleInputChange}
                    >
                      <option value="low">🟢 Low - General inquiry</option>
                      <option value="normal">🟡 Normal - Standard support</option>
                      <option value="high">🟠 High - Urgent issue</option>
                      <option value="critical">🔴 Critical - System down</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contactMethod">Preferred Contact Method</label>
                  <select 
                    id="contactMethod" 
                    name="contactMethod" 
                    value={formData.contactMethod} 
                    onChange={handleInputChange}
                  >
                    <option value="email"> Email</option>
                    <option value="phone"> Phone Call</option>
                    <option value="both"> Both Email & Phone</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="6" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    placeholder="Please describe your inquiry in detail. Include any error messages, steps you've taken, or specific questions you have..."
                    required
                    style={{ minHeight: '120px' }}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-full"
                  disabled={isSubmitting}
                  style={{
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span style={{ display: 'inline-block', marginRight: '0.5rem' }}></span>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <span style={{ display: 'inline-block', marginRight: '0.5rem' }}></span>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Additional Information */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            <div style={{
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
              borderRadius: '15px',
              border: '1px solid rgba(102, 126, 234, 0.2)'
            }}>
              <h4 style={{ color: '#667eea', marginBottom: '1rem', fontSize: '1.3rem' }}>
                 Quick Response Times
              </h4>
              <ul style={{ color: '#666', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li><strong>Critical:</strong> Within 2 hours</li>
                <li><strong>High:</strong> Within 4 hours</li>
                <li><strong>Normal:</strong> Within 24 hours</li>
                <li><strong>Low:</strong> Within 48 hours</li>
              </ul>
            </div>

            <div style={{
              padding: '2rem',
              background: 'rgba(46, 204, 113, 0.1)',
              borderRadius: '15px',
              border: '1px solid rgba(46, 204, 113, 0.2)'
            }}>
              <h4 style={{ color: '#27ae60', marginBottom: '1rem', fontSize: '1.3rem' }}>
                 Enterprise Support
              </h4>
              <ul style={{ color: '#666', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li>Dedicated account manager</li>
                <li>Priority technical support</li>
                <li>Custom training sessions</li>
                <li>24/7 emergency hotline</li>
              </ul>
            </div>

            <div style={{
              padding: '2rem',
              background: 'rgba(255, 193, 7, 0.1)',
              borderRadius: '15px',
              border: '1px solid rgba(255, 193, 7, 0.2)'
            }}>
              <h4 style={{ color: '#f39c12', marginBottom: '1rem', fontSize: '1.3rem' }}>
                 Self-Service Options
              </h4>
              <ul style={{ color: '#666', lineHeight: '1.8', paddingLeft: '1.5rem' }}>
                <li>Comprehensive documentation</li>
                <li>Video tutorials library</li>
                <li>Community forum</li>
                <li>AI-powered ChatBot</li>
              </ul>
            </div>
          </div>

          {/* Emergency Notice */}
          <div style={{
            marginTop: '3rem',
            padding: '2rem',
            background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 44, 109, 0.1))',
            borderRadius: '15px',
            border: '2px solid #ff6b6b',
            textAlign: 'center'
          }}>
            <h4 style={{ color: '#e74c3c', marginBottom: '1rem', fontSize: '1.4rem' }}>
              🚨 Medical Emergency Notice
            </h4>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              <strong>This platform is for informational and diagnostic support purposes only.</strong><br/>
              In case of a medical emergency or acute cardiac symptoms, please contact emergency services immediately 
              or call 911. Do not use this contact form for urgent medical situations.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;