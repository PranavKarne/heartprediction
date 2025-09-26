import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import AuthModal from "../AuthModal";
import Navigation from "../components/Navigation";
import "./Styles.css";

function Upload() {
  const { user, isAuthenticated } = useAuth();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (!allowedTypes.includes(file.type)) {
      return 'Please upload only JPEG or PDF files.';
    }
    if (file.size > maxSize) {
      return 'File size must be less than 10MB.';
    }
    return null;
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const error = validateFile(file);
      if (error) {
        setFileError(error);
        setUploadedFile(null);
      } else {
        setFileError('');
        setUploadedFile(file);
      }
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setFileError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyzeClick = () => {
    if (!uploadedFile) {
      setFileError('Please upload a file before analyzing.');
      return;
    }
    if (!isAuthenticated()) {
      setShowAuthModal(true);
      return;
    }
    processFile();
  };

  const processFile = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const riskLevel = ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)];
      setResults({
        riskScore: Math.floor(Math.random() * 100),
        riskLevel: riskLevel,
        confidence: 95.8,
        fileName: uploadedFile.name,
        userId: user?.id,
        analysisDate: new Date().toLocaleDateString()
      });
    }, 3000);
  };

  return (
    <div>
      <Navigation currentPage="upload" />
      <div className="container">
        <div className="page-content heartbeat-pulse">
          <h2 className="page-title">🫀 Heart Health Analysis</h2>
          
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ 
              color: '#667eea', 
              marginBottom: '1.5rem',
              textAlign: 'center',
              fontSize: '1.4rem'
            }}>
              📄 Upload Medical File (JPEG or PDF only) *
            </h3>
            
            <div 
              onClick={() => fileInputRef.current.click()}
              style={{
                border: '2px dashed #667eea',
                borderRadius: '15px',
                padding: '3rem',
                textAlign: 'center',
                background: 'rgba(102, 126, 234, 0.05)',
                cursor: 'pointer',
                marginBottom: '2rem'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
              <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>
                Click to upload your medical file
              </h3>
              <p style={{ color: '#888', fontSize: '0.9rem' }}>
                Supported: JPEG, JPG, PDF | Max size: 10MB
              </p>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".jpg,.jpeg,.pdf"
                onChange={handleFileSelect}
              />
            </div>

            {fileError && (
              <div style={{
                padding: '1rem',
                background: 'rgba(255, 107, 107, 0.1)',
                border: '1px solid rgba(255, 107, 107, 0.3)',
                borderRadius: '10px',
                color: '#e74c3c',
                textAlign: 'center',
                marginBottom: '1rem'
              }}>
                ⚠️ {fileError}
              </div>
            )}

            {uploadedFile && (
              <div style={{
                padding: '1.5rem',
                background: 'rgba(46, 204, 113, 0.1)',
                border: '1px solid rgba(46, 204, 113, 0.3)',
                borderRadius: '15px',
                marginBottom: '2rem'
              }}>
                <h4 style={{ color: '#27ae60', marginBottom: '1rem', textAlign: 'center' }}>
                  ✅ File Uploaded Successfully
                </h4>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.7)',
                  padding: '1rem',
                  borderRadius: '10px'
                }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 'bold', color: '#333' }}>
                      📄 {uploadedFile.name}
                    </p>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                      Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button 
                    onClick={removeFile}
                    style={{
                      background: 'rgba(255, 107, 107, 0.1)',
                      border: '1px solid rgba(255, 107, 107, 0.3)',
                      color: '#e74c3c',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    ��️ Remove
                  </button>
                </div>
              </div>
            )}

            {uploadedFile && (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button 
                  onClick={handleAnalyzeClick}
                  disabled={isProcessing}
                  className="btn"
                  style={{
                    fontSize: '1.2rem',
                    padding: '1.5rem 3rem',
                    opacity: isProcessing ? 0.7 : 1,
                    cursor: isProcessing ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isProcessing ? '⏳ Analyzing File...' : '🔬 Analyze Heart Health'}
                  {!isAuthenticated() && !isProcessing && (
                    <span style={{
                      fontSize: '0.8rem',
                      background: '#ff6b6b',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      marginLeft: '0.5rem'
                    }}>
                      Sign in required
                    </span>
                  )}
                </button>
                
                {!isAuthenticated() && (
                  <p style={{ color: '#666', marginTop: '1rem', fontSize: '0.9rem' }}>
                    Create a free account to analyze your medical files securely
                  </p>
                )}
              </div>
            )}

            {results && isAuthenticated() && (
              <div style={{
                marginTop: '3rem',
                padding: '2.5rem',
                background: 'rgba(46, 204, 113, 0.1)',
                borderRadius: '20px',
                border: '2px solid #2ecc71',
                textAlign: 'center'
              }}>
                <h3 style={{ color: '#27ae60', fontSize: '2rem', marginBottom: '2rem' }}>
                  🫀 Analysis Results
                </h3>
                <p style={{ color: '#666', marginBottom: '2rem' }}>
                  File: {results.fileName} | Date: {results.analysisDate}
                </p>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '2rem',
                  marginBottom: '2rem'
                }}>
                  <div>
                    <h4>Risk Score</h4>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                      {results.riskScore}%
                    </p>
                  </div>
                  <div>
                    <h4>Risk Level</h4>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                      {results.riskLevel}
                    </p>
                  </div>
                  <div>
                    <h4>Confidence</h4>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                      {results.confidence}%
                    </p>
                  </div>
                </div>
                <Link to="/ai" className="btn" style={{ textDecoration: 'none' }}>
                  💬 Discuss Results with AI
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={processFile}
        requiredFor="Heart Health Analysis"
      />
    </div>
  );
}

export default Upload;
