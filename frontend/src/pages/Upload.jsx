import React, { useState, useRef } from "react";
import { useAuth } from "../AuthContext";
import AuthModal from "../AuthModal";
import Navigation from "../components/Navigation";
import "./Styles.css";

function Upload() {
  const { user, isAuthenticated } = useAuth();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    const allowedTypes = ['image/png'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (!allowedTypes.includes(file.type)) {
      return 'Please upload a PNG file.';
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
        setUploadedImageURL(null);
      } else {
        setFileError('');
        setUploadedFile(file);
        // Create URL for preview
        const imageURL = URL.createObjectURL(file);
        setUploadedImageURL(imageURL);
      }
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadedImageURL(null);
    setResults(null); // Clear analysis results
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

  const processFile = async () => {
    setIsProcessing(true);
    setFileError('');
    
    try {
      const formData = new FormData();
      formData.append('file', uploadedFile);
      
      const token = localStorage.getItem('cardiopredict_token');
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      const response = await fetch(`${API_URL}/api/analysis/predict`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Analysis failed');
      }
      
      // Set results from API response
      setResults({
        riskScore: data.data.riskScore,
        riskLevel: data.data.riskLevel,
        confidence: data.data.confidence,
        predictedClass: data.data.predictedClass,
        probabilities: data.data.probabilities,
        fileName: uploadedFile.name,
        userId: user?.id,
        analysisDate: new Date(data.data.analysisDate).toLocaleDateString()
      });
      
    } catch (error) {
      console.error('Analysis error:', error);
      setFileError(error.message || 'Failed to analyze the file. Please try again.');
    } finally {
      setIsProcessing(false);
    }
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
              📄 Upload Medical File (PNG only) *
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
                Supported: PNG | Max size: 10MB
              </p>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept=".png,image/png"
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
                      background: 'linear-gradient(135deg, #ff6b6b, #ee5a6f)',
                      border: 'none',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 107, 107, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 107, 107, 0.3)';
                    }}
                  >
                    <span style={{ fontSize: '1.1rem' }}>🗑️</span>
                    <span>Remove</span>
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
                {/* Display uploaded ECG image */}
                {uploadedImageURL && (
                  <div style={{
                    marginBottom: '2rem',
                    padding: '1rem',
                    background: 'white',
                    borderRadius: '15px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                  }}>
                    <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>
                      📸 Uploaded ECG Image
                    </h4>
                    <img 
                      src={uploadedImageURL} 
                      alt="Uploaded ECG"
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '10px',
                        border: '2px solid rgba(102, 126, 234, 0.2)',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </div>
                )}
                
                <h3 style={{ color: '#27ae60', fontSize: '2rem', marginBottom: '2rem' }}>
                  🫀 Analysis Results
                </h3>
                <p style={{ color: '#666', marginBottom: '2rem' }}>
                  File: {results.fileName} | Date: {results.analysisDate}
                </p>
                {results.predictedClass && (
                  <div style={{
                    padding: '1rem',
                    background: 'rgba(102, 126, 234, 0.1)',
                    borderRadius: '10px',
                    marginBottom: '2rem'
                  }}>
                    <h4 style={{ color: '#667eea', marginBottom: '0.5rem' }}>Predicted Condition</h4>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea', margin: 0 }}>
                      {results.predictedClass}
                    </p>
                  </div>
                )}
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
                
                {results.probabilities && (
                  <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: 'white',
                    borderRadius: '15px',
                    textAlign: 'left'
                  }}>
                    <h4 style={{ color: '#667eea', marginBottom: '1rem', textAlign: 'center' }}>
                      All Condition Probabilities
                    </h4>
                    {Object.entries(results.probabilities)
                      .sort((a, b) => b[1] - a[1])
                      .map(([condition, probability]) => (
                        <div key={condition} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '0.75rem',
                          marginBottom: '0.5rem',
                          background: 'rgba(102, 126, 234, 0.05)',
                          borderRadius: '8px'
                        }}>
                          <span style={{ fontWeight: 'bold', color: '#333' }}>{condition}</span>
                          <span style={{ color: '#667eea', fontWeight: 'bold' }}>{probability}%</span>
                        </div>
                      ))}
                  </div>
                )}
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
