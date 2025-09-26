import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Navigation from "../components/Navigation";
import "./Styles.css";

function Login() {
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

  const { login, signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated()) {
      navigate('/');
    }
    
    // Check if we should open signup mode
    const shouldOpenSignup = sessionStorage.getItem('openSignup');
    if (shouldOpenSignup) {
      setIsSignUp(true);
      sessionStorage.removeItem('openSignup');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password, formData.remember);
      
      if (result.success) {
        // Redirect to intended page or home
        const intendedPath = sessionStorage.getItem('intendedPath') || '/';
        sessionStorage.removeItem('intendedPath');
        navigate(intendedPath);
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
        // Redirect to intended page or home
        const intendedPath = sessionStorage.getItem('intendedPath') || '/';
        sessionStorage.removeItem('intendedPath');
        navigate(intendedPath);
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



  return (
    <div>
      <Navigation currentPage="login" />

      <div className="container">
        <div className="page-content">
          <h2 className="page-title">
            {isSignUp ? '🫀 Create Account' : '🔐 Welcome Back'}
          </h2>
          
          {error && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 75, 75, 0.1), rgba(255, 99, 132, 0.1))',
              border: '1px solid rgba(255, 75, 75, 0.3)',
              borderRadius: '15px',
              padding: '1rem',
              marginBottom: '2rem',
              textAlign: 'center'
            }}>
              <span style={{ color: '#dc3545', fontWeight: '500' }}>⚠️ {error}</span>
            </div>
          )}
          
          <div className="auth-toggle">
            <p style={{ color: '#666', marginBottom: '1rem' }}>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </p>
            <button className="toggle-btn" onClick={toggleAuthMode} disabled={isLoading}>
              {isSignUp ? '👤 Sign In Instead' : ' Create New Account'}
            </button>
          </div>

          <div className="form-container">
            <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
              {isSignUp && (
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      name="firstName" 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      required 
                      disabled={isLoading}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      name="lastName" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      required 
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john.doe@email.com"
                  required 
                  disabled={isLoading}
                />
              </div>

              {isSignUp && (
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 xxxxx xxxxx"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <input 
                      type="date" 
                      id="dateOfBirth" 
                      name="dateOfBirth" 
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      disabled={isLoading}
                    />
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={isSignUp ? "Minimum 8 characters" : "Enter your password"}
                  required 
                  disabled={isLoading}
                />
              </div>

              {isSignUp && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password *</label>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Re-enter your password"
                    required 
                    disabled={isLoading}
                  />
                </div>
              )}

              <div className="form-group">
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
                    fontSize: '0.95rem'
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
                className="btn btn-full"
                disabled={isLoading}
                style={{
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer'
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
                  <>
                    {isSignUp ? 'Create Account' : ' Sign In'}
                  </>
                )}
              </button>
            </form>

            {!isSignUp && (
              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <button 
                  type="button"
                  style={{ 
                    background: 'none',
                    border: 'none',
                    color: '#667eea',
                    textDecoration: 'underline',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: 'inherit',
                    fontFamily: 'inherit'
                  }}
                  onClick={() => {
                    alert('Password reset functionality would be implemented here');
                  }}
                >
                   Forgot your password?
                </button>
              </div>
            )}

            <div style={{
              marginTop: '2rem',
              padding: '2rem',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
              borderRadius: '15px',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              textAlign: 'center'
            }}>
              <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>
                Secure & Private
              </h4>
              <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6' }}>
                Your data is protected with military-grade encryption and HIPAA compliance. 
                We never share your personal information with third parties.
              </p>
            </div>

            

            {/* Demo credentials info */}
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
      </div>
    </div>
  );
}

export default Login;