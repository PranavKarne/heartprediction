
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AuthModal = ({ isOpen, onClose, onSuccess, requiredFor = "feature" }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    remember: false
  });

  const { login, signup } = useAuth();

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setIsSignUp(false);
      setError('');
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        dateOfBirth: '',
        remember: false
      });
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (error) setError('');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password, formData.remember);
      
      if (result.success) {
        onSuccess();
        onClose();
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long!");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signup(formData);
      
      if (result.success) {
        onSuccess();
        onClose();
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      dateOfBirth: '',
      remember: false
    });
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '2rem',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#999',
            padding: '0.5rem',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ×
        </button>

        <h2 style={{
          textAlign: 'center',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h2>

        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '2rem'
        }}>
          Sign in to access {requiredFor}
        </p>

        {error && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 75, 75, 0.1), rgba(255, 99, 132, 0.1))',
            border: '1px solid rgba(255, 75, 75, 0.3)',
            borderRadius: '15px',
            padding: '1rem',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            <span style={{ color: '#dc3545', fontWeight: '500' }}>⚠️ {error}</span>
          </div>
        )}

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <p style={{ color: '#666', marginBottom: '0.5rem' }}>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </p>
          <button
            onClick={toggleAuthMode}
            disabled={isLoading}
            style={{
              background: 'none',
              border: 'none',
              color: '#667eea',
              fontWeight: '600',
              fontSize: '1rem',
              cursor: 'pointer',
              padding: '0.5rem 1rem',
              borderRadius: '25px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(102, 126, 234, 0.1)'}
            onMouseOut={(e) => e.target.style.background = 'none'}
          >
            {isSignUp ? 'Sign In Instead' : 'Create New Account'}
          </button>
        </div>

        <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
          {isSignUp && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  required
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '15px',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                  required
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #e1e5e9',
                    borderRadius: '15px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john.doe@email.com"
              required
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e1e5e9',
                borderRadius: '15px',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={isSignUp ? "Minimum 8 characters" : "Enter your password"}
              required
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e1e5e9',
                borderRadius: '15px',
                fontSize: '1rem'
              }}
            />
          </div>

          {isSignUp && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Re-enter your password"
                required
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #e1e5e9',
                  borderRadius: '15px',
                  fontSize: '1rem'
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              cursor: 'pointer',
              gap: '0.75rem'
            }}>
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleInputChange}
                disabled={isLoading}
                style={{
                  marginTop: '0.15rem',
                  flexShrink: 0,
                  width: '18px',
                  height: '18px'
                }}
              />
              <span style={{
                lineHeight: '1.5',
                fontSize: '0.95rem',
                color: '#333'
              }}>
                {isSignUp
                  ? 'I agree to the Terms of Service and Privacy Policy'
                  : 'Remember me'
                }
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              padding: '1.2rem 2rem',
              border: 'none',
              borderRadius: '50px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: '600',
              opacity: isLoading ? 0.7 : 1,
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)'
            }}
          >
            {isLoading ? (
              <>
                <span style={{
                  display: 'inline-block',
                  width: '16px',
                  height: '16px',
                  border: '2px solid #ffffff',
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '0.5rem'
                }}></span>
                {isSignUp ? 'Creating Account...' : 'Signing In...'}
              </>
            ) : (
              isSignUp ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>

        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(102, 126, 234, 0.05)',
          borderRadius: '15px',
          border: '1px solid rgba(102, 126, 234, 0.1)',
          textAlign: 'center'
        }}>
          <h4 style={{ color: '#667eea', marginBottom: '1rem', fontSize: '1rem' }}>
            Demo Credentials
          </h4>
          <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>
            Email: <code>test@example.com</code> | Password: <code>password123</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;