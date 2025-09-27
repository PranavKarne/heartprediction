import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navigation = ({ currentPage }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Apply auto-hide to all pages
  const shouldAutoHide = true;

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mouse movement for auto-hide navigation
  useEffect(() => {
    if (!shouldAutoHide) {
      setIsNavVisible(true);
      return;
    }

    const handleMouseMove = (e) => {
      // Show navigation when mouse is near the top (within 100px)
      if (e.clientY <= 100) {
        setIsNavVisible(true);
      } else if (e.clientY > 150) {
        // Hide only when mouse is well below the nav area
        setIsNavVisible(false);
      }
    };

    const handleTouch = (e) => {
      // For mobile - show navigation on any touch near top
      if (e.touches[0] && e.touches[0].clientY <= 100) {
        setIsNavVisible(true);
        // Auto-hide after 4 seconds on mobile (longer for all pages)
        setTimeout(() => {
          if (shouldAutoHide) setIsNavVisible(false);
        }, 4000);
      }
    };

    // Initially hide navigation after a longer delay on all pages
    // Give users more time to interact on home/landing pages
    const delay = currentPage === 'home' ? 5000 : 3000;
    const timer = setTimeout(() => {
      setIsNavVisible(false);
    }, delay);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchstart', handleTouch);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchstart', handleTouch);
    };
  }, [shouldAutoHide]);

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
    // Always show navigation when mobile menu is toggled
    if (!isMobileMenuOpen) {
      setIsNavVisible(true);
    }
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    // Keep navigation visible briefly after link click
    setIsNavVisible(true);
    setTimeout(() => {
      if (shouldAutoHide) setIsNavVisible(false);
    }, 2000);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${shouldAutoHide ? 'navbar-autohide' : ''} ${!isNavVisible ? 'navbar-hidden' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo" onClick={handleLinkClick}>
          <span className="logo-icon">🫀</span>
          <span className="logo-text">CardioPredict</span>
        </Link>
        
        <ul className={`nav-links ${isMobileMenuOpen ? 'nav-links-mobile-active' : ''}`}>
          <li><Link to="/" className={currentPage === 'home' ? 'active' : ''} onClick={handleLinkClick}>
            <span className="nav-icon">⚡</span>Home</Link></li>
          <li><Link to="/upload" className={currentPage === 'upload' ? 'active' : ''} onClick={handleLinkClick}>
            <span className="nav-icon">🩺</span>Prediction</Link></li>
          <li><Link to="/ai" className={currentPage === 'ai' ? 'active' : ''} onClick={handleLinkClick}>
            <span className="nav-icon">🤖</span>CardioCare AI</Link></li>
          <li><Link to="/contact" className={currentPage === 'contact' ? 'active' : ''} onClick={handleLinkClick}>
            <span className="nav-icon">📞</span>Contact</Link></li>
          
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
                  <Link to="/profile" className="dropdown-item" onClick={handleLinkClick}>
                    <span className="dropdown-icon">👤</span>Profile Settings
                  </Link>
                  <button type="button" onClick={showHistory} className="dropdown-item">
                    <span className="dropdown-icon">📋</span>History
                  </button>
                  <button type="button" onClick={handleLogout} className="dropdown-item logout-btn">
                    <span className="dropdown-icon">↗️</span>Logout
                  </button>
                </div>
              </li>
            </>
          ) : (
            <li><Link to="/login" className={currentPage === 'login' ? 'active' : ''} onClick={handleLinkClick}>
              <span className="nav-icon">🔐</span>Sign In</Link></li>
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