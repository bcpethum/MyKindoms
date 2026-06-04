import { createContext, useContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mk_admin')); } catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (email, password) => {
    setLoading(true); setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('mk_token', data.token);
      localStorage.setItem('mk_admin', JSON.stringify(data.admin));
      setAdmin(data.admin);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
      return { success: false, message: msg };
    } finally { setLoading(false); }
  };

  const register = async (username, email, password) => {
    setLoading(true); setError('');
    try {
      const { data } = await api.post('/auth/register', { username, email, password });
      localStorage.setItem('mk_token', data.token);
      localStorage.setItem('mk_admin', JSON.stringify(data.admin));
      setAdmin(data.admin);
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
      return { success: false, message: msg };
    } finally { setLoading(false); }
  };

  const logout = () => {
    localStorage.removeItem('mk_token');
    localStorage.removeItem('mk_admin');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, error, login, register, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
