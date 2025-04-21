import { useState } from 'react';
import { login as loginService, verifyToken } from '../services/api';
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '../constants';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginService(email, password);
      return data;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  };

  const getCurrentUser = () => {
    const user = localStorage.getItem(AUTH_USER_KEY);
    return user ? JSON.parse(user) : null;
  };

  const verifyAuth = async () => {
    try {
      const data = await verifyToken();
      return data;
    } catch (error) {
      logout();
      throw error;
    }
  };

  return {
    login,
    logout,
    isAuthenticated,
    getCurrentUser,
    verifyAuth,
    loading,
    error
  };
}; 