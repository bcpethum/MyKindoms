import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try { return JSON.parse(localStorage.getItem('mk_admin')); } catch { return null; }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkingBypass, setCheckingBypass] = useState(() => {
    const hasAdmin = localStorage.getItem('mk_admin');
    const hasToken = localStorage.getItem('mk_token');
    if (hasAdmin && hasToken && hasToken !== 'adsense_bypass_token') {
      return false;
    }
    return true;
  });

  useEffect(() => {
    const checkBypass = async () => {
      try {
        const { data } = await api.get('/auth/bypass-status');
        if (data.bypassActive) {
          const mockAdmin = { username: 'AdSense Reviewer', email: 'adsense@mykingdoms.com' };
          localStorage.setItem('mk_token', 'adsense_bypass_token');
          localStorage.setItem('mk_admin', JSON.stringify(mockAdmin));
          setAdmin(mockAdmin);
        } else {
          if (localStorage.getItem('mk_token') === 'adsense_bypass_token') {
            localStorage.removeItem('mk_token');
            localStorage.removeItem('mk_admin');
            setAdmin(null);
          }
        }
      } catch (err) {
        console.error('Failed to check bypass status', err);
      } finally {
        setCheckingBypass(false);
      }
    };
    checkBypass();
  }, []);

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

  const updateAdmin = async (payload) => {
    setLoading(true); setError('');
    try {
      const { data } = await api.put('/auth/update', payload);
      localStorage.setItem('mk_admin', JSON.stringify(data.admin));
      setAdmin(data.admin);
      return { success: true, message: data.message };
    } catch (err) {
      const msg = err.response?.data?.message || 'Update failed';
      setError(msg);
      return { success: false, message: msg };
    } finally { setLoading(false); }
  };

  return (
    <AuthContext.Provider value={{ admin, loading, error, login, register, logout, updateAdmin, setError, checkingBypass }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
