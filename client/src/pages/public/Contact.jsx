import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const setField = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSubmitting(true);
    // Simulate submission (replace with real API call when backend is ready)
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="static-page">
      <Navbar />
      <div className="static-page__hero">
        <div className="sp-blob sp-blob--1" />
        <div className="sp-blob sp-blob--2" />
        <div className="container static-page__hero-inner">
          <span className="section-eyebrow">We're here to help</span>
          <h1 className="static-page__h1">Contact <span className="gradient-text">Us</span></h1>
          <p className="static-page__hero-sub">
            Have a question, feedback, or need support? We'd love to hear from you.
            Our team typically responds within 24 hours.
          </p>
        </div>
      </div>

      <div className="container ct-content">

        <div className="ct-info-col">

          {/* Contact info cards */}
          {[
            { icon: '📧', title: 'Email Support', value: 'support@mykingdoms.tech', sub: 'Typically responds within 24 hours', href: 'mailto:support@mykingdoms.tech' },
            { icon: '🔒', title: 'Privacy Inquiries', value: 'privacy@mykingdoms.tech', sub: 'Data, GDPR, and privacy requests', href: 'mailto:privacy@mykingdoms.tech' },
            { icon: '⚖️', title: 'Legal', value: 'legal@mykingdoms.tech', sub: 'Terms, copyright, and legal matters', href: 'mailto:legal@mykingdoms.tech' },
          ].map((c, i) => (
            <a key={i} href={c.href} className="ct-info-card">
              <div className="ct-info-icon">{c.icon}</div>
              <div>
                <p className="ct-info-title">{c.title}</p>
                <p className="ct-info-value">{c.value}</p>
                <p className="ct-info-sub">{c.sub}</p>
              </div>
            </a>
          ))}

          {/* Quick links */}
          <div className="ct-quick-links">
            <p className="ct-quick-links__title">Quick Links</p>
            <Link to="/about" className="ct-quick-link">→ About MyKingdoms</Link>
            <Link to="/privacy" className="ct-quick-link">→ Privacy Policy</Link>
            <Link to="/terms" className="ct-quick-link">→ Terms of Service</Link>
            <Link to="/#faq" className="ct-quick-link">→ FAQ</Link>
          </div>
        </div>

        {/* Contact Form */}
        <div className="ct-form-col">
          {submitted ? (
            <div className="ct-success">
              <div className="ct-success-icon">✅</div>
              <h2>Message Sent!</h2>
              <p>Thank you for reaching out, <strong>{form.name}</strong>. We've received your message and will reply to <strong>{form.email}</strong> within 24 hours.</p>
              <button className="ct-success-btn" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="ct-form" onSubmit={handleSubmit}>
              <h2 className="ct-form__title">Send Us a Message</h2>
              <p className="ct-form__sub">Fill out the form below and we'll get back to you as soon as possible.</p>

              <div className="ct-row-two">
                <div className="ct-field-group">
                  <label className="ct-label">Your Name *</label>
                  <input
                    className="ct-input"
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={setField('name')}
                    required
                    id="contact-name"
                  />
                </div>
                <div className="ct-field-group">
                  <label className="ct-label">Email Address *</label>
                  <input
                    className="ct-input"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={setField('email')}
                    required
                    id="contact-email"
                  />
                </div>
              </div>

              <div className="ct-field-group">
                <label className="ct-label">Subject</label>
                <select className="ct-input ct-select" value={form.subject} onChange={setField('subject')} id="contact-subject">
                  <option value="">Select a topic...</option>
                  <option value="General Question">General Question</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Billing & Plans">Billing & Plans</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Report Abuse">Report Abuse</option>
                  <option value="Privacy / Data Request">Privacy / Data Request</option>
                  <option value="Partnership Inquiry">Partnership Inquiry</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="ct-field-group">
                <label className="ct-label">Message *</label>
                <textarea
                  className="ct-textarea"
                  placeholder="Tell us how we can help you. Include as much detail as possible so we can assist you quickly."
                  value={form.message}
                  onChange={setField('message')}
                  rows={6}
                  required
                  id="contact-message"
                />
              </div>

              <button
                type="submit"
                className="ct-submit-btn"
                disabled={submitting || !form.name.trim() || !form.email.trim() || !form.message.trim()}
                id="contact-submit"
              >
                {submitting ? (
                  <><span className="ct-spinner" /> Sending...</>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M2 9L16 2L9 16L7.5 10.5L2 9Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Send Message
                  </>
                )}
              </button>

              <p className="ct-form__note">
                By submitting this form, you agree to our{' '}
                <Link to="/privacy">Privacy Policy</Link> and{' '}
                <Link to="/terms">Terms of Service</Link>.
              </p>
            </form>
          )}
        </div>

      </div>

      <footer className="sp-footer">
        <div className="container sp-footer__inner">
          <p>© 2026 MyKingdoms. All rights reserved.</p>
          <div className="sp-footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .static-page { min-height: 100vh; background: #050816; font-family: 'Inter', sans-serif; color: #f8fafc; }
        .static-page__hero { position: relative; padding: 140px 0 80px; overflow: hidden; text-align: center; }
        .sp-blob { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; }
        .sp-blob--1 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%); top: -150px; left: -100px; }
        .sp-blob--2 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%); bottom: -80px; right: -80px; }
        .static-page__hero-inner { position: relative; z-index: 1; }
        .section-eyebrow { display: inline-block; background: rgba(124,58,237,0.15); border: 1px solid rgba(124,58,237,0.3); color: #c4b5fd; font-size: 0.8rem; font-weight: 700; padding: 6px 16px; border-radius: 100px; letter-spacing: 0.5px; margin-bottom: 20px; text-transform: uppercase; }
        .static-page__h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 800; letter-spacing: -2px; line-height: 1.1; margin-bottom: 16px; }
        .gradient-text { background: linear-gradient(135deg, #a855f7, #f59e0b, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .static-page__hero-sub { max-width: 580px; margin: 0 auto; font-size: 1.05rem; color: #94a3b8; line-height: 1.7; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

        .ct-content {
          padding: 60px 0 80px;
          display: grid; grid-template-columns: 320px 1fr;
          gap: 48px; align-items: flex-start;
        }

        /* Info column */
        .ct-info-col { display: flex; flex-direction: column; gap: 16px; }
        .ct-info-card {
          display: flex; gap: 16px; align-items: flex-start;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px; padding: 18px 20px;
          text-decoration: none; color: inherit;
          transition: all 0.25s ease;
        }
        .ct-info-card:hover {
          border-color: rgba(168,85,247,0.3);
          background: rgba(255,255,255,0.05);
          transform: translateY(-2px);
        }
        .ct-info-icon { font-size: 1.5rem; flex-shrink: 0; margin-top: 2px; }
        .ct-info-title { font-size: 0.78rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .ct-info-value { font-size: 0.9rem; font-weight: 600; color: #a855f7; margin-bottom: 4px; }
        .ct-info-sub { font-size: 0.78rem; color: #475569; }

        .ct-quick-links {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px; padding: 18px 20px;
          display: flex; flex-direction: column; gap: 10px;
          margin-top: 8px;
        }
        .ct-quick-links__title { font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #475569; margin-bottom: 4px; }
        .ct-quick-link { color: #94a3b8; text-decoration: none; font-size: 0.875rem; transition: color 0.2s ease; }
        .ct-quick-link:hover { color: #a855f7; }

        /* Form column */
        .ct-form-col {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px; padding: 36px 40px;
        }
        .ct-form { display: flex; flex-direction: column; gap: 22px; }
        .ct-form__title { font-family: 'Space Grotesk', sans-serif; font-size: 1.6rem; font-weight: 700; margin-bottom: 4px; }
        .ct-form__sub { font-size: 0.875rem; color: #94a3b8; }
        .ct-row-two { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .ct-field-group { display: flex; flex-direction: column; gap: 8px; }
        .ct-label { font-size: 0.82rem; font-weight: 700; color: #94a3b8; }
        .ct-input {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px; color: #f8fafc;
          font-family: 'Inter', sans-serif; font-size: 0.875rem;
          padding: 12px 14px; transition: border-color 0.2s ease;
        }
        .ct-input:focus { outline: none; border-color: rgba(168,85,247,0.6); box-shadow: 0 0 0 3px rgba(168,85,247,0.1); }
        .ct-input::placeholder { color: #475569; }
        .ct-select {
          appearance: none;
          background: rgba(255,255,255,0.04) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%2364748b' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") no-repeat right 12px center;
          cursor: pointer;
        }
        .ct-select option { background: #0d1628; color: #f8fafc; }
        .ct-textarea {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px; color: #f8fafc;
          font-family: 'Inter', sans-serif; font-size: 0.875rem;
          padding: 12px 14px; resize: vertical;
          transition: border-color 0.2s ease; line-height: 1.6;
        }
        .ct-textarea:focus { outline: none; border-color: rgba(168,85,247,0.6); box-shadow: 0 0 0 3px rgba(168,85,247,0.1); }
        .ct-textarea::placeholder { color: #475569; }
        .ct-submit-btn {
          width: 100%; padding: 14px 28px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none; border-radius: 12px;
          color: #fff; font-size: 1rem; font-weight: 700;
          font-family: 'Inter', sans-serif; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: all 0.25s ease;
          box-shadow: 0 8px 24px rgba(124,58,237,0.4);
        }
        .ct-submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(124,58,237,0.6); }
        .ct-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .ct-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .ct-form__note { font-size: 0.78rem; color: #475569; text-align: center; }
        .ct-form__note a { color: #a855f7; text-decoration: none; }
        .ct-form__note a:hover { text-decoration: underline; }

        /* Success state */
        .ct-success {
          text-align: center; padding: 48px 24px;
          display: flex; flex-direction: column; align-items: center; gap: 16px;
        }
        .ct-success-icon { font-size: 3.5rem; }
        .ct-success h2 { font-family: 'Space Grotesk', sans-serif; font-size: 1.8rem; font-weight: 700; }
        .ct-success p { color: #94a3b8; font-size: 0.95rem; line-height: 1.7; max-width: 400px; }
        .ct-success strong { color: #f8fafc; }
        .ct-success-btn {
          padding: 12px 28px; background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; color: #94a3b8;
          font-size: 0.875rem; font-weight: 600;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: all 0.2s ease; margin-top: 8px;
        }
        .ct-success-btn:hover { color: #f8fafc; background: rgba(255,255,255,0.1); }

        .sp-footer { background: rgba(255,255,255,0.02); border-top: 1px solid rgba(255,255,255,0.05); padding: 24px 0; }
        .sp-footer__inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; font-size: 0.82rem; color: #475569; }
        .sp-footer-links { display: flex; gap: 20px; }
        .sp-footer-links a { color: #475569; text-decoration: none; transition: color 0.2s ease; }
        .sp-footer-links a:hover { color: #a855f7; }

        @media (max-width: 900px) {
          .ct-content { grid-template-columns: 1fr; gap: 32px; }
          .ct-form-col { padding: 24px; }
        }
        @media (max-width: 480px) {
          .ct-row-two { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
