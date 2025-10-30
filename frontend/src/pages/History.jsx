import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Navigation from '../components/Navigation';
import './Styles.css';

const History = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    fetchAnalysisHistory();
  }, [isAuthenticated, navigate]);

  const fetchAnalysisHistory = async () => {
    setHistoryLoading(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const token = localStorage.getItem('cardiopredict_token');
      
      console.log('Fetching analysis history from:', `${API_URL}/api/analysis/history`);
      
      const response = await fetch(`${API_URL}/api/analysis/history?limit=50`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log('History API response:', data);
      
      if (data.success) {
        console.log('Number of analyses found:', data.data.analyses?.length || 0);
        setAnalysisHistory(data.data.analyses || []);
      } else {
        console.error('History API returned error:', data.message);
      }
    } catch (error) {
      console.error('Failed to fetch analysis history:', error);
    } finally {
      setHistoryLoading(false);
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    };
  };

  const getRiskLevelColor = (riskLevel) => {
    switch(riskLevel) {
      case 'Low': return '#2ecc71';
      case 'Moderate': return '#f39c12';
      case 'High': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  return (
    <div className="history-page">
      <Navigation currentPage="history" />
      
      <div className="profile-container">
        <div className="profile-header">
          <h1 className="profile-title">
            <span className="profile-icon">📊</span>
            Analysis History
          </h1>
          <p className="profile-subtitle">View all your past ECG analyses and results</p>
        </div>

        <div className="history-section">
          {historyLoading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div className="loading-spinner" style={{ 
                width: '50px', 
                height: '50px',
                margin: '0 auto',
                border: '4px solid rgba(102, 126, 234, 0.1)',
                borderTop: '4px solid #667eea',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{ marginTop: '1rem', color: '#667eea' }}>Loading analysis history...</p>
            </div>
          ) : analysisHistory.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem',
              background: 'rgba(102, 126, 234, 0.05)',
              borderRadius: '20px',
              border: '2px dashed rgba(102, 126, 234, 0.3)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
              <h3 style={{ color: '#667eea', marginBottom: '0.5rem' }}>No Analysis History Yet</h3>
              <p style={{ color: '#666', marginBottom: '2rem' }}>
                Your heart health analysis history will appear here once you upload and analyze ECG files.
              </p>
              <button
                onClick={() => navigate('/upload')}
                style={{
                  padding: '1rem 2rem',
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                }}
              >
                🩺 Upload Your First ECG
              </button>
            </div>
          ) : (
            <div>
              <div style={{
                marginBottom: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <h3 style={{ color: '#667eea', margin: 0 }}>
                  📊 Total Analyses: {analysisHistory.length}
                </h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={fetchAnalysisHistory}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'rgba(102, 126, 234, 0.1)',
                      border: '1px solid #667eea',
                      borderRadius: '8px',
                      color: '#667eea',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    🔄 Refresh
                  </button>
                  <button
                    onClick={() => navigate('/upload')}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'linear-gradient(135deg, #667eea, #764ba2)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}
                  >
                    ➕ New Analysis
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {analysisHistory.map((analysis, index) => {
                  const { date, time } = formatDateTime(analysis.createdAt);
                  const riskColor = getRiskLevelColor(analysis.results.riskLevel);

                  return (
                    <div
                      key={analysis._id}
                      style={{
                        background: 'white',
                        borderRadius: '15px',
                        padding: '1.5rem',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                        border: '2px solid rgba(102, 126, 234, 0.1)',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.2)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                      }}
                    >
                      {/* Header with date and index */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1rem',
                        paddingBottom: '1rem',
                        borderBottom: '1px solid rgba(102, 126, 234, 0.1)'
                      }}>
                        <div>
                          <div style={{
                            display: 'inline-block',
                            background: 'rgba(102, 126, 234, 0.1)',
                            color: '#667eea',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: 'bold',
                            marginBottom: '0.5rem'
                          }}>
                            Analysis #{analysisHistory.length - index}
                          </div>
                          <div style={{ color: '#666', fontSize: '0.9rem' }}>
                            📅 {date}  •  🕐 {time}
                          </div>
                          {analysis.inputData?.fileName && (
                            <div style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                              📄 {analysis.inputData.fileName}
                            </div>
                          )}
                        </div>
                        <div style={{
                          background: `${riskColor}15`,
                          color: riskColor,
                          padding: '0.5rem 1rem',
                          borderRadius: '10px',
                          fontWeight: 'bold',
                          fontSize: '0.9rem',
                          border: `2px solid ${riskColor}30`
                        }}>
                          {analysis.results.riskLevel} Risk
                        </div>
                      </div>

                      {/* Results Grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1rem'
                      }}>
                        <div style={{
                          background: 'rgba(102, 126, 234, 0.05)',
                          padding: '1rem',
                          borderRadius: '10px',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>
                            Risk Score
                          </div>
                          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#667eea' }}>
                            {analysis.results.riskScore}%
                          </div>
                        </div>
                        <div style={{
                          background: 'rgba(102, 126, 234, 0.05)',
                          padding: '1rem',
                          borderRadius: '10px',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>
                            Confidence
                          </div>
                          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#667eea' }}>
                            {analysis.results.confidence}%
                          </div>
                        </div>
                        {analysis.results.predictedClass && (
                          <div style={{
                            background: 'rgba(102, 126, 234, 0.05)',
                            padding: '1rem',
                            borderRadius: '10px',
                            textAlign: 'center'
                          }}>
                            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>
                              Condition
                            </div>
                            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#667eea' }}>
                              {analysis.results.predictedClass}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Probabilities */}
                      {analysis.results.probabilities && (
                        <div style={{
                          background: 'rgba(245, 247, 250, 0.8)',
                          padding: '1rem',
                          borderRadius: '10px',
                          marginTop: '1rem'
                        }}>
                          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#667eea', marginBottom: '0.75rem' }}>
                            Condition Probabilities:
                          </div>
                          <div style={{ display: 'grid', gap: '0.5rem' }}>
                            {Object.entries(analysis.results.probabilities)
                              .sort((a, b) => b[1] - a[1])
                              .map(([condition, probability]) => (
                                <div key={condition} style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  padding: '0.5rem',
                                  background: 'white',
                                  borderRadius: '6px'
                                }}>
                                  <span style={{ fontSize: '0.85rem', fontWeight: '500', color: '#333' }}>
                                    {condition}
                                  </span>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{
                                      width: '100px',
                                      height: '6px',
                                      background: '#e0e0e0',
                                      borderRadius: '3px',
                                      overflow: 'hidden'
                                    }}>
                                      <div style={{
                                        width: `${probability}%`,
                                        height: '100%',
                                        background: '#667eea',
                                        transition: 'width 0.3s ease'
                                      }}></div>
                                    </div>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#667eea', minWidth: '45px', textAlign: 'right' }}>
                                      {probability}%
                                    </span>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
