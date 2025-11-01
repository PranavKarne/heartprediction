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
      case 'Low': return { primary: '#10b981', light: '#d1fae5', dark: '#059669' };
      case 'Moderate': return { primary: '#f59e0b', light: '#fef3c7', dark: '#d97706' };
      case 'High': return { primary: '#ef4444', light: '#fee2e2', dark: '#dc2626' };
      default: return { primary: '#6b7280', light: '#f3f4f6', dark: '#4b5563' };
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
            <div style={{ textAlign: 'center', padding: '4rem' }}>
              <div className="loading-spinner" style={{ 
                width: '60px', 
                height: '60px',
                margin: '0 auto',
                border: '5px solid #e5e7eb',
                borderTop: '5px solid #6366f1',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{ marginTop: '1.5rem', color: '#6b7280', fontSize: '1rem' }}>Loading analysis history...</p>
            </div>
          ) : analysisHistory.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'white',
              borderRadius: '16px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
              <h3 style={{ color: '#111827', marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: '600' }}>No Analysis History Yet</h3>
              <p style={{ color: '#6b7280', marginBottom: '2rem', fontSize: '0.95rem' }}>
                Your heart health analysis history will appear here once you upload and analyze ECG files.
              </p>
              <button
                onClick={() => navigate('/upload')}
                style={{
                  padding: '0.875rem 1.75rem',
                  background: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#4f46e5'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#6366f1'}
              >
                🩺 Upload Your First ECG
              </button>
            </div>
          ) : (
            <div>
              <div style={{
                marginBottom: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}>
                <h3 style={{ color: '#111827', margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>
                  📊 Total Analyses: {analysisHistory.length}
                </h3>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={fetchAnalysisHistory}
                    style={{
                      padding: '0.625rem 1.25rem',
                      background: 'white',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      color: '#374151',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f9fafb';
                      e.currentTarget.style.borderColor = '#9ca3af';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.borderColor = '#d1d5db';
                    }}
                  >
                    🔄 Refresh
                  </button>
                  <button
                    onClick={() => navigate('/upload')}
                    style={{
                      padding: '0.625rem 1.25rem',
                      background: '#6366f1',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#4f46e5'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#6366f1'}
                  >
                    ➕ New Analysis
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '1.25rem' }}>
                {analysisHistory.map((analysis, index) => {
                  const { date, time } = formatDateTime(analysis.createdAt);
                  const riskColor = getRiskLevelColor(analysis.results.riskLevel);

                  return (
                    <div
                      key={analysis._id}
                      style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '1.5rem',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                        border: `2px solid ${riskColor.light}`,
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                      }}
                    >
                      {/* Header with date and index */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1.25rem',
                        paddingBottom: '1.25rem',
                        borderBottom: '1px solid #e5e7eb'
                      }}>
                        <div>
                          <div style={{
                            display: 'inline-block',
                            background: '#eef2ff',
                            color: '#6366f1',
                            padding: '0.375rem 0.875rem',
                            borderRadius: '6px',
                            fontSize: '0.813rem',
                            fontWeight: '600',
                            marginBottom: '0.75rem'
                          }}>
                            Analysis #{analysisHistory.length - index}
                          </div>
                          <div style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                            📅 {date}  •  🕐 {time}
                          </div>
                          {analysis.inputData?.fileName && (
                            <div style={{ color: '#9ca3af', fontSize: '0.813rem' }}>
                              📄 {analysis.inputData.fileName}
                            </div>
                          )}
                        </div>
                        <div style={{
                          background: riskColor.light,
                          color: riskColor.dark,
                          padding: '0.75rem 1.25rem',
                          borderRadius: '8px',
                          fontWeight: '700',
                          fontSize: '0.875rem',
                          border: `2px solid ${riskColor.primary}40`,
                          textAlign: 'center'
                        }}>
                          {analysis.results.riskLevel} Risk
                        </div>
                      </div>

                      {/* Results Grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: '1rem',
                        marginBottom: '1.25rem'
                      }}>
                        <div style={{
                          background: '#f9fafb',
                          padding: '1rem',
                          borderRadius: '8px',
                          textAlign: 'center',
                          border: '1px solid #e5e7eb'
                        }}>
                          <div style={{ fontSize: '0.813rem', color: '#6b7280', marginBottom: '0.375rem', fontWeight: '500' }}>
                            Risk Score
                          </div>
                          <div style={{ fontSize: '1.875rem', fontWeight: '700', color: riskColor.primary }}>
                            {analysis.results.riskScore}%
                          </div>
                        </div>
                        <div style={{
                          background: '#f9fafb',
                          padding: '1rem',
                          borderRadius: '8px',
                          textAlign: 'center',
                          border: '1px solid #e5e7eb'
                        }}>
                          <div style={{ fontSize: '0.813rem', color: '#6b7280', marginBottom: '0.375rem', fontWeight: '500' }}>
                            Confidence
                          </div>
                          <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#6366f1' }}>
                            {analysis.results.confidence}%
                          </div>
                        </div>
                        {analysis.results.predictedClass && (
                          <div style={{
                            background: '#f9fafb',
                            padding: '1rem',
                            borderRadius: '8px',
                            textAlign: 'center',
                            border: '1px solid #e5e7eb'
                          }}>
                            <div style={{ fontSize: '0.813rem', color: '#6b7280', marginBottom: '0.375rem', fontWeight: '500' }}>
                              Condition
                            </div>
                            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827' }}>
                              {analysis.results.predictedClass}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Probabilities */}
                      {analysis.results.probabilities && (
                        <div style={{
                          background: '#f9fafb',
                          padding: '1.25rem',
                          borderRadius: '8px',
                          marginTop: '1.25rem',
                          border: '1px solid #e5e7eb'
                        }}>
                          <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
                            Condition Probabilities:
                          </div>
                          <div style={{ display: 'grid', gap: '0.75rem' }}>
                            {Object.entries(analysis.results.probabilities)
                              .sort((a, b) => b[1] - a[1])
                              .map(([condition, probability]) => (
                                <div key={condition} style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  padding: '0.625rem',
                                  background: 'white',
                                  borderRadius: '6px',
                                  border: '1px solid #e5e7eb'
                                }}>
                                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                                    {condition}
                                  </span>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{
                                      width: '100px',
                                      height: '8px',
                                      background: '#e5e7eb',
                                      borderRadius: '4px',
                                      overflow: 'hidden'
                                    }}>
                                      <div style={{
                                        width: `${probability}%`,
                                        height: '100%',
                                        background: '#6366f1',
                                        transition: 'width 0.3s ease',
                                        borderRadius: '4px'
                                      }}></div>
                                    </div>
                                    <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#6366f1', minWidth: '48px', textAlign: 'right' }}>
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
