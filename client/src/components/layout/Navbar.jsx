import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        {/* Logo */}
        <div className="navbar__logo" onClick={() => scrollTo('hero')}>
          <div className="navbar__logo-icon">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L28 8V16C28 22.627 22.627 28 16 28C9.373 28 4 22.627 4 16V8L16 2Z" fill="url(#crown-grad)"/>
              <path d="M11 12L16 8L21 12V20H11V12Z" fill="rgba(255,255,255,0.9)"/>
              <circle cx="16" cy="16" r="2.5" fill="url(#crown-grad)"/>
              <defs>
                <linearGradient id="crown-grad" x1="4" y1="2" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#a855f7"/>
                  <stop offset="100%" stopColor="#f59e0b"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="navbar__logo-text">
            My<span className="navbar__logo-highlight">Kingdoms</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <ul className="navbar__links" id="navbar-links">
          <li>
            <button className="navbar__link" onClick={() => scrollTo('how-it-works')}>
              How it works
            </button>
          </li>
          <li>
            <button className="navbar__link" onClick={() => scrollTo('features')}>
              Features
            </button>
          </li>
          <li>
            <button className="navbar__link" onClick={() => scrollTo('pricing')}>
              Pricing
            </button>
          </li>
        </ul>

        {/* Auth Buttons */}
        <div className="navbar__auth">
          <Link to="/admin/login" className="navbar__btn navbar__btn--ghost" id="navbar-signin">
            Sign In
          </Link>
          <Link to="/admin/login" className="navbar__btn navbar__btn--primary" id="navbar-signup">
            Get Started
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="navbar-hamburger"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}>
        <button className="navbar__mobile-link" onClick={() => scrollTo('how-it-works')}>How it works</button>
        <button className="navbar__mobile-link" onClick={() => scrollTo('features')}>Features</button>
        <button className="navbar__mobile-link" onClick={() => scrollTo('pricing')}>Pricing</button>
        <div className="navbar__mobile-auth">
          <Link to="/admin/login" className="navbar__btn navbar__btn--ghost" onClick={() => setMenuOpen(false)}>Sign In</Link>
          <Link to="/admin/login" className="navbar__btn navbar__btn--primary" onClick={() => setMenuOpen(false)}>Get Started</Link>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 16px 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: slide-in-nav 0.6s ease forwards;
        }
        .navbar--scrolled {
          background: rgba(5, 8, 22, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(124, 58, 237, 0.2);
          padding: 10px 0;
          box-shadow: 0 4px 40px rgba(0, 0, 0, 0.4);
        }
        .navbar__inner {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          text-decoration: none;
          flex-shrink: 0;
        }
        .navbar__logo-icon {
          width: 36px;
          height: 36px;
          filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.5));
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        .navbar__logo:hover .navbar__logo-icon {
          transform: scale(1.1) rotate(5deg);
          filter: drop-shadow(0 0 16px rgba(168, 85, 247, 0.8));
        }
        .navbar__logo-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #f8fafc;
          letter-spacing: -0.5px;
        }
        .navbar__logo-highlight {
          background: linear-gradient(135deg, #a855f7, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .navbar__links {
          display: flex;
          list-style: none;
          gap: 4px;
          margin-left: auto;
        }
        .navbar__link {
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.25s ease;
          position: relative;
        }
        .navbar__link::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #a855f7, #f59e0b);
          border-radius: 1px;
          transition: width 0.3s ease;
        }
        .navbar__link:hover {
          color: #f8fafc;
          background: rgba(255,255,255,0.06);
        }
        .navbar__link:hover::after {
          width: 60%;
        }
        .navbar__auth {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .navbar__btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 18px;
          border-radius: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.25s ease;
          cursor: pointer;
          border: none;
          font-family: 'Inter', sans-serif;
        }
        .navbar__btn--ghost {
          color: #94a3b8;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .navbar__btn--ghost:hover {
          color: #f8fafc;
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.2);
        }
        .navbar__btn--primary {
          color: #fff;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
        }
        .navbar__btn--primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.6);
          background: linear-gradient(135deg, #6d28d9, #9333ea);
        }
        .navbar__btn--primary svg {
          transition: transform 0.25s ease;
        }
        .navbar__btn--primary:hover svg {
          transform: translateX(3px);
        }
        .navbar__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          margin-left: auto;
        }
        .navbar__hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #94a3b8;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .navbar__hamburger--open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
          background: #a855f7;
        }
        .navbar__hamburger--open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .navbar__hamburger--open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
          background: #a855f7;
        }
        .navbar__mobile-menu {
          display: none;
          flex-direction: column;
          padding: 16px 24px 24px;
          border-top: 1px solid rgba(255,255,255,0.06);
          background: rgba(5, 8, 22, 0.95);
          backdrop-filter: blur(24px);
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
        }
        .navbar__mobile-menu--open {
          max-height: 400px;
        }
        .navbar__mobile-link {
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 1rem;
          font-weight: 500;
          padding: 14px 0;
          text-align: left;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: color 0.25s ease;
        }
        .navbar__mobile-link:hover { color: #f8fafc; }
        .navbar__mobile-auth {
          display: flex;
          gap: 12px;
          margin-top: 20px;
        }
        .navbar__mobile-auth .navbar__btn {
          flex: 1;
          justify-content: center;
        }
        @media (max-width: 768px) {
          .navbar__links, .navbar__auth { display: none; }
          .navbar__hamburger { display: flex; }
          .navbar__mobile-menu { display: flex; }
        }
      `}</style>
    </nav>
  );
}
