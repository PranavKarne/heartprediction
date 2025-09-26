import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navigation = ({ currentPage }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const showHistory = () => {
    if (isAuthenticated()) {
      navigate('/history');
    } else {
      navigate('/login');
    }
  };

  const toggleMobileMenu = () => {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">CardioPredict</Link>
        <ul className="nav-links" id="navLinks">
          <li><Link to="/" className={currentPage === 'home' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/upload" className={currentPage === 'upload' ? 'active' : ''}>Prediction</Link></li>
          <li><Link to="/ai" className={currentPage === 'ai' ? 'active' : ''}>CardioCare AI</Link></li>
          <li><Link to="/contact" className={currentPage === 'contact' ? 'active' : ''}>Contact</Link></li>
          
          {isAuthenticated() ? (
            <>
              <li className="user-welcome">
                <span style={{
                  color: '#667eea',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  👋 Welcome, {user?.firstName}!
                </span>
              </li>
              <li className="settings-dropdown">
                <button className="settings-btn">Account ▾</button>
                <div className="dropdown-content">
                  <button type="button" onClick={showHistory}>📊 History</button>
                  <button type="button" onClick={handleLogout} style={{color: '#dc3545'}}>
                    🚪 Logout
                  </button>
                </div>
              </li>
            </>
          ) : (
            <li><Link to="/login" className={currentPage === 'login' ? 'active' : ''}>Sign In</Link></li>
          )}
        </ul>
        <button className="mobile-menu" onClick={toggleMobileMenu}>☰</button>
      </div>
    </nav>
  );
};

export default Navigation;
