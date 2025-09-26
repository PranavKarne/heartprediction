import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navigation = ({ currentPage }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentPage]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const showHistory = () => {
    if (isAuthenticated()) {
      navigate('/history');
    } else {
      navigate('/login');
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo" onClick={handleLinkClick}>
          <span className="logo-text">CardioPredict</span>
          <span className="logo-icon">💓</span>
        </Link>
        
        <ul className={`nav-links ${isMobileMenuOpen ? 'nav-links-mobile-active' : ''}`}>
          <li><Link to="/" className={currentPage === 'home' ? 'active' : ''} onClick={handleLinkClick}>
            <span className="nav-icon">⚡</span>Home</Link></li>
          <li><Link to="/upload" className={currentPage === 'upload' ? 'active' : ''} onClick={handleLinkClick}>
            <span className="nav-icon">🩺</span>Prediction</Link></li>
          <li><Link to="/ai" className={currentPage === 'ai' ? 'active' : ''} onClick={handleLinkClick}>
            <span className="nav-icon">�</span>CardioCare AI</Link></li>
          <li><Link to="/contact" className={currentPage === 'contact' ? 'active' : ''} onClick={handleLinkClick}>
            <span className="nav-icon">�</span>Contact</Link></li>
          
          {isAuthenticated() ? (
            <>
              <li className="user-welcome mobile-user-info">
                <span className="welcome-text">
                  <span className="welcome-icon">✨</span>
                  <span className="welcome-name">Welcome, {user?.firstName}!</span>
                </span>
              </li>
              <li className="settings-dropdown">
                <button className="settings-btn">
                  <span className="settings-icon">👤</span>
                  <span className="settings-text">Account</span>
                  <span className="dropdown-arrow">▾</span>
                </button>
                <div className="dropdown-content">
                  <button type="button" onClick={showHistory} className="dropdown-item">
                    <span className="dropdown-icon">�</span>History
                  </button>
                  <button type="button" onClick={handleLogout} className="dropdown-item logout-btn">
                    <span className="dropdown-icon">↗️</span>Logout
                  </button>
                </div>
              </li>
            </>
          ) : (
            <li><Link to="/login" className={currentPage === 'login' ? 'active' : ''} onClick={handleLinkClick}>
              <span className="nav-icon">�</span>Sign In</Link></li>
          )}
        </ul>
        
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`} 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
