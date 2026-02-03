/**
 * Secure Authentication Context for SoundWolves
 * Provides authentication state and methods throughout the app
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (api.isAuthenticated()) {
          const userData = await api.getCurrentUser();
          setUser(userData);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        // Clear invalid tokens
        api.clearTokens();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    setError(null);
    try {
      await api.login(email, password);
      const userData = await api.getCurrentUser();
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Register function
  const register = useCallback(async (name, email, password, userType = 'user', djName = null) => {
    setError(null);
    try {
      await api.register(name, email, password, userType, djName);
      const userData = await api.getCurrentUser();
      setUser(userData);
      return userData;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await api.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      // Also clear any legacy localStorage data
      localStorage.removeItem('soundwolves_logged_in');
      localStorage.removeItem('soundwolves_user');
      localStorage.removeItem('soundwolves_current_user');
    }
  }, []);

  // Refresh user data
  const refreshUser = useCallback(async () => {
    try {
      if (api.isAuthenticated()) {
        const userData = await api.getCurrentUser();
        setUser(userData);
        return userData;
      }
    } catch (err) {
      console.error('Failed to refresh user:', err);
      throw err;
    }
  }, []);

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
