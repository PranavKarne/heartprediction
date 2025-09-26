import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import "./Styles.css";

function Index() {
  return (
    <div>
      <Navigation currentPage="home" />

      <div className="container">
        <div className="page-content heartbeat-pulse">
          <div className="hero">
            <h1>Advanced Heart Failure Prediction</h1>
            <p>Harness the power of Graph Neural Networks to predict and prevent heart failure with unprecedented accuracy and speed. Our cutting-edge AI technology provides real-time cardiovascular risk assessment.</p>
            <div style={{ marginTop: '2rem' }}>
              <Link to="/upload" className="btn" style={{ marginRight: '1rem' }}>
                Start Analysis
              </Link>
              <Link to="/Ai" className="btn btn-secondary">
                Chat with AI
              </Link>
            </div>
          </div>

          <div className="features">
            <div className="feature-card heartbeat-pulse">
              <h3> GNN Technology</h3>
              <p>State-of-the-art Graph Neural Network algorithms analyze complex cardiovascular patterns and relationships in your medical data with unprecedented precision.</p>
            </div>
            <div className="feature-card">
              <h3> Real-time Analysis</h3>
              <p>Get instant cardiovascular risk assessments in seconds. Our optimized algorithms process complex medical data faster than traditional methods.</p>
            </div>
            <div className="feature-card heartbeat-pulse">
              <h3> High Accuracy</h3>
              <p>Achieve over 95% prediction accuracy with our clinically validated machine learning models trained on extensive cardiovascular datasets.</p>
            </div>
            <div className="feature-card">
              <h3> HIPAA Compliant</h3>
              <p>Your medical data is protected with enterprise-grade security, end-to-end encryption, and full HIPAA compliance for complete privacy.</p>
            </div>
            <div className="feature-card heartbeat-pulse">
              <h3> Comprehensive Reports</h3>
              <p>Receive detailed analysis reports with risk scores, contributing factors, and actionable recommendations for healthcare professionals.</p>
            </div>
            <div className="feature-card">
              <h3>AI Health Assistant</h3>
              <p>Get instant answers about heart health, risk factors, and prediction results through our intelligent CardioCare AI assistant available 24/7.</p>
            </div>
          </div>

          <div style={{ 
            marginTop: '4rem', 
            padding: '3rem', 
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
            borderRadius: '25px',
            textAlign: 'center',
            border: '1px solid rgba(102, 126, 234, 0.2)'
          }}>
            <h2 style={{ 
              color: '#667eea', 
              marginBottom: '1.5rem',
              fontSize: '2rem'
            }}>
              Why Choose CardioPredict?
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              marginTop: '2rem'
            }}>
              <div style={{
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '15px',
                backdropFilter: 'blur(10px)'
              }}>
                <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>🏥 Clinical Grade</h4>
                <p style={{ color: '#666', lineHeight: '1.6' }}>FDA-approved algorithms used by healthcare professionals worldwide</p>
              </div>
              <div style={{
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '15px',
                backdropFilter: 'blur(10px)'
              }}>
                <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>⚡ Lightning Fast</h4>
                <p style={{ color: '#666', lineHeight: '1.6' }}>Results in under 30 seconds with 99.9% uptime reliability</p>
              </div>
              <div style={{
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '15px',
                backdropFilter: 'blur(10px)'
              }}>
                <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>🎯 Personalized</h4>
                <p style={{ color: '#666', lineHeight: '1.6' }}>Tailored recommendations based on your unique health profile</p>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '3rem',
            textAlign: 'center',
            padding: '2rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '25px',
            color: 'white'
          }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Ready to Protect Your Heart?</h3>
            <p style={{ marginBottom: '2rem', opacity: '0.9' }}>Join thousands of healthcare professionals using CardioPredict</p>
            <Link to="/upload" className="btn" style={{ 
              background: 'white', 
              color: '#667eea',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
            }}>
              Get Started Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;