import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [adminInfo, setAdminInfo] = useState(() => {
    const storedAdmin = localStorage.getItem('adminInfo');
    return storedAdmin ? JSON.parse(storedAdmin) : null;
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setAdminInfo(data);
      localStorage.setItem('adminInfo', JSON.stringify(data));
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to login');
      throw err;
    }
  };

  const signup = async (fullName, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/auth/register', { fullName, email, password });
      setAdminInfo(data);
      localStorage.setItem('adminInfo', JSON.stringify(data));
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to signup');
      throw err;
    }
  };

  const logout = () => {
    setAdminInfo(null);
    localStorage.removeItem('adminInfo');
  };

  return (
    <AuthContext.Provider value={{ adminInfo, login, signup, logout, loading, error }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
