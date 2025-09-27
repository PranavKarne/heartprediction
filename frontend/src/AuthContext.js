
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      // Check if user is already logged in (from localStorage or sessionStorage)
      const savedUser = localStorage.getItem('cardiopredict_user');
      const token = localStorage.getItem('cardiopredict_token');
      
      if (savedUser && token) {
        try {
          // Verify token is still valid
          const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setUser(JSON.parse(savedUser));
            } else {
              // Token is invalid, clear stored data
              localStorage.removeItem('cardiopredict_user');
              localStorage.removeItem('cardiopredict_token');
            }
          } else {
            // Token is invalid, clear stored data
            localStorage.removeItem('cardiopredict_user');
            localStorage.removeItem('cardiopredict_token');
          }
        } catch (error) {
          console.error('Auth check error:', error);
          localStorage.removeItem('cardiopredict_user');
          localStorage.removeItem('cardiopredict_token');
        }
      }
      setIsLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  const login = async (email, password, remember = false) => {
    try {
      // Simulate API call - replace with actual authentication logic
      const response = await mockLogin(email, password);
      
      if (response.success) {
        const userData = {
          id: response.user.id,
          email: response.user.email,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          loginTime: new Date().toISOString()
        };
        
        setUser(userData);
        
        // Store user data based on remember preference
        if (remember) {
          localStorage.setItem('cardiopredict_user', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('cardiopredict_user', JSON.stringify(userData));
        }
        
        return { success: true, user: userData };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const signup = async (formData) => {
    try {
      // Simulate API call - replace with actual signup logic
      const response = await mockSignup(formData);
      
      if (response.success) {
        const userData = {
          id: response.user.id,
          email: response.user.email,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          loginTime: new Date().toISOString()
        };
        
        setUser(userData);
        
        // Store user data
        if (formData.remember) {
          localStorage.setItem('cardiopredict_user', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('cardiopredict_user', JSON.stringify(userData));
        }
        
        return { success: true, user: userData };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: 'Signup failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cardiopredict_user');
    sessionStorage.removeItem('cardiopredict_user');
    localStorage.removeItem('cardiopredict_token');
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  const updateUserProfile = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('cardiopredict_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    signup,
    logout,
    isAuthenticated,
    updateUserProfile,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// API Base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Real API functions
const mockLogin = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      // Store the JWT token
      localStorage.setItem('cardiopredict_token', data.token);
      return {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName
        }
      };
    } else {
      return {
        success: false,
        error: data.message || 'Login failed'
      };
    }
  } catch (error) {
    console.error('Login API error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection.'
    };
  }
};

const mockSignup = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Store the JWT token
      localStorage.setItem('cardiopredict_token', data.token);
      return {
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName
        }
      };
    } else {
      return {
        success: false,
        error: data.message || 'Registration failed'
      };
    }
  } catch (error) {
    console.error('Signup API error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection.'
    };
  }
};