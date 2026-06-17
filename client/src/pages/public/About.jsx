import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';

export default function About() {
  return (
    <div className="static-page">
      <Navbar />
      <div className="static-page__hero">
        <div className="sp-blob sp-blob--1" />
        <div className="sp-blob sp-blob--2" />
        <div className="container static-page__hero-inner">
          <span className="section-eyebrow">Our Story</span>
          <h1 className="static-page__h1">About <span className="gradient-text">MyKingdoms</span></h1>
          <p className="static-page__hero-sub">
            The all-in-one platform that helps creators, entrepreneurs, and builders share their
            world through a single, powerful link — and monetize their audience engagement.
          </p>
        </div>
      </div>

      <div className="container sp-content">

        {/* Mission */}
        <section className="sp-section">
          <div className="sp-section__icon">👑</div>
          <h2 className="sp-section__title">Our Mission</h2>
          <p className="sp-section__body">
            MyKingdoms was founded with a simple mission: <strong>empower every creator to rule
            their digital presence</strong>. In a world where creators share content across dozens
            of platforms — YouTube, Instagram, TikTok, GitHub, personal websites — managing a
            scattered online presence is exhausting.
          </p>
          <p className="sp-section__body">
            We built MyKingdoms to solve this. One link. One kingdom. Every resource, every
            channel, every piece of content — organized beautifully under a single, memorable URL.
            Beyond just linking, we pioneered the concept of <strong>action-gated content</strong>:
            creators can require visitors to follow, subscribe, or engage before unlocking a resource,
            turning passive visitors into active, engaged community members.
          </p>
        </section>

        {/* What We Offer */}
        <section className="sp-section">
          <div className="sp-section__icon">🚀</div>
          <h2 className="sp-section__title">What MyKingdoms Offers</h2>
          <div className="sp-features-grid">
            {[
              { icon: '🔗', title: 'Link in Bio', body: 'Create a beautiful, mobile-optimized page that houses all your important links, social profiles, and content. Share one URL everywhere.' },
              { icon: '🔒', title: 'Gated Resources', body: 'Lock any URL, file download, or text snippet behind social actions. Visitors complete follow/subscribe tasks to unlock your content.' },
              { icon: '📊', title: 'Real-time Analytics', body: 'Track every click, conversion, and visitor with our built-in analytics dashboard. Understand your audience and optimize performance.' },
              { icon: '🎨', title: 'Beautiful Themes', body: 'Choose from 50+ stunning themes designed by professional UI/UX designers. Or customize everything with your own colors and branding.' },
              { icon: '🌐', title: 'Custom Domains', body: 'Connect your own domain name for a fully branded experience. Your kingdom, your URL, your rules.' },
              { icon: '⚡', title: 'Lightning Fast', body: 'Built on modern infrastructure with 98%+ uptime. Your kingdom loads in milliseconds, anywhere in the world, on any device.' },
            ].map((f, i) => (
              <div key={i} className="sp-feature-card">
                <div className="sp-feature-icon">{f.icon}</div>
                <h3 className="sp-feature-title">{f.title}</h3>
                <p className="sp-feature-body">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="sp-section">
          <div className="sp-section__icon">⚙️</div>
          <h2 className="sp-section__title">How MyKingdoms Works</h2>
          <div className="sp-steps">
            {[
              { step: '01', title: 'Create your free account', body: 'Sign up in seconds — no credit card required. You\'ll immediately have access to your admin dashboard and your unique MyKingdoms URL.' },
              { step: '02', title: 'Add and organize your links', body: 'Paste in any URL, upload a file, or paste a text snippet. Set a title, category, and description. Arrange links in any order with drag-and-drop.' },
              { step: '03', title: 'Set up action gates', body: 'Optionally require visitors to complete actions — follow on YouTube, subscribe on Instagram, join your Discord — before unlocking each resource.' },
              { step: '04', title: 'Share your kingdom', body: 'Copy your unique link (mykingdoms.tech/yourname) and share it on your bio, email signature, business cards, or anywhere you connect with your audience.' },
              { step: '05', title: 'Watch your kingdom grow', body: 'Monitor clicks, track engagement, see which resources perform best, and continually optimize your kingdom for maximum impact.' },
            ].map((s, i) => (
              <div key={i} className="sp-step">
                <div className="sp-step__num">{s.step}</div>
                <div>
                  <h3 className="sp-step__title">{s.title}</h3>
                  <p className="sp-step__body">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="sp-section">
          <div className="sp-section__icon">💜</div>
          <h2 className="sp-section__title">Our Values</h2>
          <div className="sp-values-grid">
            {[
              { v: 'Creator First', d: 'Every feature we build starts with a single question: does this make creators\' lives better?' },
              { v: 'Radical Transparency', d: 'We\'re honest about what our platform does, what data we collect, and how we make money.' },
              { v: 'Privacy by Design', d: 'We never sell your data. Your audience belongs to you, not to advertisers.' },
              { v: 'Constant Innovation', d: 'We ship new features weekly, listening obsessively to creator feedback and market trends.' },
            ].map((v, i) => (
              <div key={i} className="sp-value-card">
                <h3 className="sp-value-title">{v.v}</h3>
                <p className="sp-value-desc">{v.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="sp-stats-banner">
          {[
            { n: '12,000+', l: 'Active creators' },
            { n: '5M+', l: 'Clicks tracked' },
            { n: '150+', l: 'Countries reached' },
            { n: '98%', l: 'Uptime SLA' },
          ].map((s, i) => (
            <div key={i} className="sp-stat">
              <span className="sp-stat__num">{s.n}</span>
              <span className="sp-stat__label">{s.l}</span>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="sp-cta">
          <h2>Ready to Build Your Kingdom?</h2>
          <p>Join 12,000+ creators already ruling the internet with a single link.</p>
          <div className="sp-cta-btns">
            <Link to="/admin/login" className="sp-btn sp-btn--primary">Get Started Free →</Link>
            <Link to="/contact" className="sp-btn sp-btn--ghost">Contact Us</Link>
          </div>
        </section>

      </div>

      <footer className="sp-footer">
        <div className="container sp-footer__inner">
          <p>© 2026 MyKingdoms. All rights reserved.</p>
          <div className="sp-footer-links">
            <Link to="/">Home</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .static-page {
          min-height: 100vh;
          background: #050816;
          font-family: 'Inter', sans-serif;
          color: #f8fafc;
        }
        .static-page__hero {
          position: relative;
          padding: 140px 0 80px;
          overflow: hidden;
          text-align: center;
        }
        .sp-blob {
          position: absolute; border-radius: 50%;
          filter: blur(120px); pointer-events: none;
        }
        .sp-blob--1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%);
          top: -150px; left: -100px;
        }
        .sp-blob--2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%);
          bottom: -80px; right: -80px;
        }
        .static-page__hero-inner { position: relative; z-index: 1; }
        .section-eyebrow {
          display: inline-block;
          background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.3);
          color: #c4b5fd; font-size: 0.8rem; font-weight: 700;
          padding: 6px 16px; border-radius: 100px; letter-spacing: 0.5px;
          margin-bottom: 20px; text-transform: uppercase;
        }
        .static-page__h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 800; letter-spacing: -2px;
          line-height: 1.1; margin-bottom: 20px;
        }
        .gradient-text {
          background: linear-gradient(135deg, #a855f7, #f59e0b, #06b6d4);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .static-page__hero-sub {
          max-width: 620px; margin: 0 auto;
          font-size: 1.1rem; color: #94a3b8; line-height: 1.7;
        }

        .sp-content { padding: 60px 0 80px; display: flex; flex-direction: column; gap: 80px; }

        .sp-section { }
        .sp-section__icon { font-size: 2.5rem; margin-bottom: 16px; }
        .sp-section__title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.8rem; font-weight: 700; margin-bottom: 20px;
          letter-spacing: -0.5px;
        }
        .sp-section__body {
          font-size: 1rem; color: #94a3b8; line-height: 1.8; margin-bottom: 16px;
          max-width: 760px;
        }
        .sp-section__body strong { color: #f8fafc; }

        .sp-features-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
          margin-top: 32px;
        }
        .sp-feature-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding: 24px;
          transition: all 0.3s ease;
        }
        .sp-feature-card:hover {
          border-color: rgba(168,85,247,0.3);
          transform: translateY(-4px);
          background: rgba(255,255,255,0.05);
        }
        .sp-feature-icon { font-size: 1.8rem; margin-bottom: 12px; }
        .sp-feature-title { font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
        .sp-feature-body { font-size: 0.85rem; color: #64748b; line-height: 1.65; }

        .sp-steps { display: flex; flex-direction: column; gap: 0; margin-top: 32px; }
        .sp-step {
          display: flex; gap: 24px; padding: 28px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .sp-step:last-child { border-bottom: none; }
        .sp-step__num {
          width: 48px; height: 48px; border-radius: 12px; flex-shrink: 0;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; font-weight: 800; color: #fff;
        }
        .sp-step__title { font-size: 1.05rem; font-weight: 700; margin-bottom: 8px; }
        .sp-step__body { font-size: 0.875rem; color: #94a3b8; line-height: 1.7; }

        .sp-values-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 28px;
        }
        .sp-value-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-left: 3px solid rgba(168,85,247,0.5);
          border-radius: 12px; padding: 20px 22px;
        }
        .sp-value-title { font-size: 1rem; font-weight: 700; margin-bottom: 8px; color: #c4b5fd; }
        .sp-value-desc { font-size: 0.875rem; color: #94a3b8; line-height: 1.65; }

        .sp-stats-banner {
          display: grid; grid-template-columns: repeat(4, 1fr);
          background: linear-gradient(135deg, rgba(124,58,237,0.15), rgba(245,158,11,0.08));
          border: 1px solid rgba(168,85,247,0.2);
          border-radius: 20px; padding: 40px 32px; gap: 24px;
          text-align: center;
        }
        .sp-stat { display: flex; flex-direction: column; gap: 8px; }
        .sp-stat__num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2rem; font-weight: 800;
          background: linear-gradient(135deg, #a855f7, #f59e0b);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .sp-stat__label { font-size: 0.85rem; color: #64748b; font-weight: 600; }

        .sp-cta {
          text-align: center; padding: 60px 40px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 24px;
        }
        .sp-cta h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2rem; font-weight: 800; margin-bottom: 12px;
        }
        .sp-cta p { color: #94a3b8; margin-bottom: 28px; }
        .sp-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
        .sp-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 13px 28px; border-radius: 12px;
          font-size: 0.95rem; font-weight: 700;
          text-decoration: none; transition: all 0.25s ease;
          font-family: 'Inter', sans-serif;
        }
        .sp-btn--primary {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: #fff;
          box-shadow: 0 8px 24px rgba(124,58,237,0.4);
        }
        .sp-btn--primary:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(124,58,237,0.6); }
        .sp-btn--ghost {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3b8;
        }
        .sp-btn--ghost:hover { color: #f8fafc; background: rgba(255,255,255,0.1); }

        .sp-footer {
          background: rgba(255,255,255,0.02);
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 24px 0;
        }
        .sp-footer__inner {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
          font-size: 0.82rem; color: #475569;
        }
        .sp-footer-links { display: flex; gap: 20px; }
        .sp-footer-links a {
          color: #475569; text-decoration: none; transition: color 0.2s ease;
        }
        .sp-footer-links a:hover { color: #a855f7; }

        @media (max-width: 1024px) {
          .sp-features-grid { grid-template-columns: repeat(2, 1fr); }
          .sp-stats-banner { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .static-page__hero { padding: 100px 0 60px; }
          .sp-features-grid { grid-template-columns: 1fr; }
          .sp-values-grid { grid-template-columns: 1fr; }
          .sp-stats-banner { grid-template-columns: repeat(2, 1fr); padding: 28px; }
          .sp-cta { padding: 40px 24px; }
        }
        @media (max-width: 480px) {
          .sp-stats-banner { grid-template-columns: 1fr 1fr; }
          .sp-step { flex-direction: column; gap: 12px; }
        }
      `}</style>
    </div>
  );
}
