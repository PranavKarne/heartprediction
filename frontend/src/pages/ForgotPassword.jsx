import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Styles.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setIsLoading(true);

    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        // In development, show the token (in production, this would be sent via email)
        if (data.resetToken) {
          setResetToken(data.resetToken);
        }
      } else {
        setError(data.message || 'Failed to send reset email');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <p className="auth-subtitle">
          Enter your email address and we'll send you instructions to reset your password.
        </p>

        {message && (
          <div className="alert alert-success">
            {message}
            {resetToken && (
              <div style={{ marginTop: '10px', fontSize: '14px' }}>
                <strong>Development Mode:</strong> Your reset token is:
                <div style={{ 
                  background: '#f0f0f0', 
                  padding: '10px', 
                  marginTop: '5px', 
                  borderRadius: '4px',
                  wordBreak: 'break-all',
                  fontFamily: 'monospace'
                }}>
                  {resetToken}
                </div>
                <button
                  onClick={() => navigate(`/reset-password?token=${resetToken}`)}
                  style={{
                    marginTop: '10px',
                    padding: '8px 16px',
                    background: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Go to Reset Password
                </button>
              </div>
            )}
          </div>
        )}

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Instructions'}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
