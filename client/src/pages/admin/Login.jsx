import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/authStore.jsx';

export default function Login() {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const { login, register, loading, error, setError } = useAuth();
  const navigate = useNavigate();

  const set = (k) => (e) => {
    setError('');
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    let res;
    if (mode === 'login') {
      res = await login(form.email, form.password);
    } else {
      if (!form.username.trim()) return;
      res = await register(form.username, form.email, form.password);
    }
    if (res.success) navigate('/admin/dashboard');
  };

  return (
    <div className="auth-page">
      {/* Background blobs */}
      <div className="auth-blob auth-blob--1" />
      <div className="auth-blob auth-blob--2" />

      <div className="auth-card">
        {/* Logo */}
        <Link to="/" className="auth-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L28 8V16C28 22.627 22.627 28 16 28C9.373 28 4 22.627 4 16V8L16 2Z" fill="url(#al)" />
            <path d="M11 12L16 8L21 12V20H11V12Z" fill="rgba(255,255,255,0.9)" />
            <circle cx="16" cy="16" r="2.5" fill="url(#al)" />
            <defs>
              <linearGradient id="al" x1="4" y1="2" x2="28" y2="28">
                <stop stopColor="#a855f7" /><stop offset="1" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>
          <span>My<strong>Kingdoms</strong></span>
        </Link>

        <h1 className="auth-title">
          {mode === 'login' ? 'Welcome back, King 👑' : 'Claim your throne 👑'}
        </h1>
        <p className="auth-sub">
          {mode === 'login'
            ? "Sign in to manage your kingdom"
            : "Create your free account in seconds"}
        </p>

        {/* Mode toggle */}
        <div className="auth-toggle">
          <button
            className={`auth-toggle-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => { setMode('login'); setError(''); }}
          >Sign In</button>
          <button
            className={`auth-toggle-btn ${mode === 'register' ? 'active' : ''}`}
            onClick={() => { setMode('register'); setError(''); }}
          >Sign Up</button>
        </div>

        <form className="auth-form" onSubmit={submit}>
          {mode === 'register' && (
            <div className="auth-field">
              <label>Username</label>
              <div className="auth-input-wrap">
                <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2 16c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                  type="text" placeholder="yourkingdom" required
                  value={form.username} onChange={set('username')}
                  className="auth-input" autoComplete="username"
                />
              </div>
            </div>
          )}

          <div className="auth-field">
            <label>Email</label>
            <div className="auth-input-wrap">
              <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 6l7 5 7-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="email" placeholder="king@kingdom.com" required
                value={form.email} onChange={set('email')}
                className="auth-input" autoComplete="email"
              />
            </div>
          </div>

          <div className="auth-field">
            <label>Password</label>
            <div className="auth-input-wrap">
              <svg className="auth-input-icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="4" y="8" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M6 8V6a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••" required minLength={6}
                value={form.password} onChange={set('password')}
                className="auth-input" autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
              <button type="button" className="auth-eye" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                {showPass
                  ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M1 9s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke="currentColor" strokeWidth="1.5" /><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" /><line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  : <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M1 9s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke="currentColor" strokeWidth="1.5" /><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" /></svg>
                }
              </button>
            </div>
          </div>

          {error && (
            <div className="auth-error">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#ef4444" strokeWidth="1.5" />
                <path d="M8 5v3M8 11h.01" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {error}
            </div>
          )}

          <button type="submit" className="auth-submit" disabled={loading} id="auth-submit-btn">
            {loading ? (
              <span className="auth-spinner" />
            ) : (
              <>
                {mode === 'login' ? 'Sign In to Kingdom' : 'Create My Kingdom'}
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 9h10M10 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </button>
        </form>

        <p className="auth-footer-text">
          {mode === 'login'
            ? <>No kingdom yet? <button onClick={() => { setMode('register'); setError(''); }}>Create one free →</button></>
            : <>Already a king? <button onClick={() => { setMode('login'); setError(''); }}>Sign in →</button></>
          }
        </p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap');
        .auth-page {
          min-height: 100vh;
          background: #050816;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }
        .auth-blob {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(100px);
        }
        .auth-blob--1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%);
          top: -150px; left: -150px;
          animation: blob-morph 10s ease-in-out infinite;
        }
        .auth-blob--2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%);
          bottom: -100px; right: -100px;
          animation: blob-morph 13s ease-in-out infinite reverse;
        }
        .auth-card {
          width: 100%;
          max-width: 440px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 40px;
          position: relative;
          z-index: 1;
          backdrop-filter: blur(24px);
          animation: fadeInUp 0.6s ease both;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5);
        }
        .auth-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none;
          color: #f8fafc;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 32px;
        }
        .auth-logo strong {
          background: linear-gradient(135deg, #a855f7, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .auth-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }
        .auth-sub {
          color: #64748b;
          font-size: 0.9rem;
          margin-bottom: 28px;
        }
        .auth-toggle {
          display: flex;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          padding: 4px;
          margin-bottom: 28px;
          gap: 4px;
        }
        .auth-toggle-btn {
          flex: 1;
          padding: 8px;
          border-radius: 7px;
          border: none;
          background: none;
          color: #64748b;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.25s ease;
        }
        .auth-toggle-btn.active {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: #fff;
          box-shadow: 0 4px 12px rgba(124,58,237,0.4);
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .auth-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .auth-field label {
          font-size: 0.82rem;
          font-weight: 600;
          color: #94a3b8;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .auth-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        .auth-input-icon {
          position: absolute;
          left: 14px;
          color: #475569;
          pointer-events: none;
          flex-shrink: 0;
        }
        .auth-input {
          width: 100%;
          padding: 12px 14px 12px 44px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          color: #f8fafc;
          font-size: 0.95rem;
          font-family: 'Inter', sans-serif;
          transition: all 0.25s ease;
          outline: none;
        }
        .auth-input::placeholder { color: #475569; }
        .auth-input:focus {
          border-color: rgba(124,58,237,0.5);
          background: rgba(124,58,237,0.06);
          box-shadow: 0 0 0 3px rgba(124,58,237,0.1);
        }
        .auth-eye {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #475569;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.2s ease;
        }
        .auth-eye:hover { color: #94a3b8; }
        .auth-error {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 8px;
          padding: 10px 14px;
          color: #fca5a5;
          font-size: 0.875rem;
        }
        .auth-submit {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(124,58,237,0.4);
          margin-top: 4px;
        }
        .auth-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(124,58,237,0.55);
        }
        .auth-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .auth-spinner {
          width: 20px; height: 20px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin-slow 0.7s linear infinite;
        }
        .auth-footer-text {
          text-align: center;
          color: #64748b;
          font-size: 0.875rem;
          margin-top: 24px;
        }
        .auth-footer-text button {
          background: none;
          border: none;
          color: #a855f7;
          cursor: pointer;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          font-size: inherit;
          transition: color 0.2s ease;
        }
        .auth-footer-text button:hover { color: #c4b5fd; }
      `}</style>
    </div>
  );
}