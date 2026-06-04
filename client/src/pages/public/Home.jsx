import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import '../../index.css';

/* ── tiny animated counter ── */
function Counter({ end, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(end / 60);
          const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else setCount(start);
          }, 20);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ── Particle Background ── */
function ParticleField() {
  return (
    <div className="particle-field" aria-hidden="true">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            animationDuration: `${6 + Math.random() * 12}s`,
            animationDelay: `${Math.random() * 8}s`,
            opacity: 0.2 + Math.random() * 0.4,
          }}
        />
      ))}
    </div>
  );
}

/* ── Step Card for How It Works ── */
function StepCard({ number, icon, title, description, delay }) {
  return (
    <div className="step-card" style={{ animationDelay: delay }}>
      <div className="step-number">{number}</div>
      <div className="step-icon">{icon}</div>
      <h3 className="step-title">{title}</h3>
      <p className="step-desc">{description}</p>
    </div>
  );
}

/* ── Feature Card ── */
function FeatureCard({ icon, title, description, badge, delay }) {
  return (
    <div className="feature-card" style={{ animationDelay: delay }}>
      {badge && <span className="feature-badge">{badge}</span>}
      <div className="feature-icon-wrap">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{description}</p>
    </div>
  );
}

/* ── Testimonial ── */
function TestimonialCard({ avatar, name, role, quote, delay }) {
  return (
    <div className="testimonial-card" style={{ animationDelay: delay }}>
      <div className="testimonial-stars">{'★★★★★'}</div>
      <p className="testimonial-quote">"{quote}"</p>
      <div className="testimonial-author">
        <div className="testimonial-avatar">{avatar}</div>
        <div>
          <p className="testimonial-name">{name}</p>
          <p className="testimonial-role">{role}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Pricing Card ── */
function PricingCard({ plan, price, period, features, cta, highlight, delay }) {
  return (
    <div className={`pricing-card ${highlight ? 'pricing-card--highlight' : ''}`} style={{ animationDelay: delay }}>
      {highlight && <div className="pricing-popular">Most Popular</div>}
      <h3 className="pricing-plan">{plan}</h3>
      <div className="pricing-price">
        <span className="pricing-currency">$</span>
        <span className="pricing-amount">{price}</span>
        <span className="pricing-period">/{period}</span>
      </div>
      <ul className="pricing-features">
        {features.map((f, i) => (
          <li key={i} className="pricing-feature">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="8" fill="rgba(124,58,237,0.2)" />
              <path d="M5 8L7 10L11 6" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>
      <Link to="/admin/login" className={`pricing-cta ${highlight ? 'pricing-cta--primary' : 'pricing-cta--ghost'}`}>
        {cta}
      </Link>
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN HOME PAGE
   ════════════════════════════════════════════ */
export default function Home() {
  const [typedText, setTypedText] = useState('');
  const words = ['Links', 'Brand', 'Kingdom', 'Empire'];
  const wordRef = useRef({ wordIndex: 0, charIndex: 0, deleting: false });

  /* Typing effect */
  useEffect(() => {
    const type = () => {
      const { wordIndex, charIndex, deleting } = wordRef.current;
      const word = words[wordIndex];
      if (!deleting) {
        setTypedText(word.slice(0, charIndex + 1));
        if (charIndex + 1 === word.length) {
          wordRef.current.deleting = true;
          setTimeout(type, 1800);
          return;
        }
        wordRef.current.charIndex += 1;
      } else {
        setTypedText(word.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          wordRef.current.deleting = false;
          wordRef.current.wordIndex = (wordIndex + 1) % words.length;
          wordRef.current.charIndex = 0;
        } else {
          wordRef.current.charIndex -= 1;
        }
      }
      setTimeout(type, deleting ? 60 : 100);
    };
    const t = setTimeout(type, 500);
    return () => clearTimeout(t);
  }, []);

  /* Scroll reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">
      <Navbar />
      <ParticleField />

      {/* ══ HERO ══ */}
      <section id="hero" className="hero">
        {/* Ambient blobs */}
        <div className="hero__blob hero__blob--1" aria-hidden="true" />
        <div className="hero__blob hero__blob--2" aria-hidden="true" />
        <div className="hero__blob hero__blob--3" aria-hidden="true" />

        {/* Orbit ring */}
        <div className="hero__orbit-ring" aria-hidden="true">
          <div className="hero__orbit-dot hero__orbit-dot--1">🔗</div>
          <div className="hero__orbit-dot hero__orbit-dot--2">⭐</div>
          <div className="hero__orbit-dot hero__orbit-dot--3">🚀</div>
        </div>

        <div className="container hero__content">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            ✨ The ultimate link-in-bio platform
          </div>

          <h1 className="hero__heading">
            Rule Your
            <br />
            <span className="gradient-text typing-wrapper">
              {typedText}
              <span className="typing-cursor">|</span>
            </span>
            <br />
            Like a King
          </h1>

          <p className="hero__sub">
            One powerful link to showcase everything you create. Build your kingdom,
            share your world, and command your audience with a single URL.
          </p>

          <div className="hero__cta-group">
            <Link to="/admin/login" className="cta-btn cta-btn--primary" id="hero-create-link">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              Create My First Link
            </Link>
            <button
              className="cta-btn cta-btn--ghost"
              id="hero-watch-demo"
              onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 7L14 10L8 13V7Z" fill="currentColor" />
              </svg>
              See How It Works
            </button>
          </div>

          {/* Social proof */}
          <div className="hero__social-proof">
            <div className="hero__avatars">
              {['👨‍💻', '👩‍🎨', '🧑‍🚀', '👩‍💼', '🧑‍🎤'].map((em, i) => (
                <div key={i} className="hero__avatar" style={{ zIndex: 5 - i }}>
                  {em}
                </div>
              ))}
            </div>
            <p className="hero__proof-text">
              <strong>12,000+</strong> creators already ruling their kingdoms
            </p>
          </div>
        </div>

        {/* Hero visual mockup */}
        <div className="hero__mockup-wrap container">
          <div className="hero__mockup">
            <div className="mockup__bar">
              <span className="mockup__dot mockup__dot--red" />
              <span className="mockup__dot mockup__dot--yellow" />
              <span className="mockup__dot mockup__dot--green" />
              <span className="mockup__url">mykingdoms.tech/yourname</span>
            </div>
            <div className="mockup__profile">
              <div className="mockup__avatar">👑</div>
              <h3 className="mockup__name">@YourKingdom</h3>
              <p className="mockup__bio">Creator · Designer · Builder</p>
            </div>
            <div className="mockup__links">
              {[
                { icon: '🎨', label: 'My Portfolio', color: '#7c3aed' },
                { icon: '📺', label: 'YouTube Channel', color: '#ef4444' },
                { icon: '📸', label: 'Instagram Feed', color: '#f59e0b' },
                { icon: '🛍️', label: 'Online Store', color: '#06b6d4' },
                { icon: '📝', label: 'Latest Blog Post', color: '#10b981' },
              ].map((link, i) => (
                <div key={i} className="mockup__link-item" style={{ animationDelay: `${i * 0.15}s` }}>
                  <span className="mockup__link-icon">{link.icon}</span>
                  <span className="mockup__link-label">{link.label}</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              ))}
            </div>
            <div className="mockup__stats">
              <div className="mockup__stat">
                <span className="mockup__stat-value">4.2K</span>
                <span className="mockup__stat-label">Visits</span>
              </div>
              <div className="mockup__stat">
                <span className="mockup__stat-value">1.8K</span>
                <span className="mockup__stat-label">Clicks</span>
              </div>
              <div className="mockup__stat">
                <span className="mockup__stat-value">43%</span>
                <span className="mockup__stat-label">CTR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ══ STATS STRIP ══ */}
      <section className="stats-strip reveal">
        <div className="container stats-strip__inner">
          {[
            { value: 12000, suffix: '+', label: 'Active Kingdoms' },
            { value: 98, suffix: '%', label: 'Uptime Guaranteed' },
            { value: 5, suffix: 'M+', label: 'Clicks Tracked' },
            { value: 150, suffix: '+', label: 'Countries Reached' },
          ].map((s, i) => (
            <div key={i} className="stat-item">
              <span className="stat-value">
                <Counter end={s.value} suffix={s.suffix} />
              </span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section id="how-it-works" className="section reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Simple Process</span>
            <h2 className="section-title">How it <span className="gradient-text">Works</span></h2>
            <p className="section-subtitle">
              From signup to a fully-crowned kingdom in under 3 minutes
            </p>
          </div>
          <div className="steps-grid">
            <StepCard
              number="01"
              icon="👤"
              title="Create Your Account"
              description="Sign up in seconds. No credit card required. Claim your unique kingdom URL instantly."
              delay="0s"
            />
            <StepCard
              number="02"
              icon="🔗"
              title="Add Your Links"
              description="Paste in any URL — social profiles, websites, videos, stores. Arrange them with simple drag & drop."
              delay="0.1s"
            />
            <StepCard
              number="03"
              icon="🎨"
              title="Design Your Kingdom"
              description="Choose from stunning themes, customize colors, add your branding, and make it uniquely yours."
              delay="0.2s"
            />
            <StepCard
              number="04"
              icon="🚀"
              title="Share & Rule"
              description="Copy your kingdom link, share it everywhere, and watch your audience grow with real-time analytics."
              delay="0.3s"
            />
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══ */}
      <section id="features" className="section section--dark reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Powerful Tools</span>
            <h2 className="section-title">Everything Your <span className="gradient-text">Kingdom Needs</span></h2>
            <p className="section-subtitle">
              Premium features built for creators, influencers, and entrepreneurs
            </p>
          </div>
          <div className="features-grid">
            <FeatureCard
              icon={<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="2" y="4" width="24" height="20" rx="4" fill="url(#f1)" opacity="0.2" /><path d="M6 14h16M6 10h10M6 18h8" stroke="url(#f1)" strokeWidth="2" strokeLinecap="round" /><defs><linearGradient id="f1" x1="2" y1="4" x2="26" y2="24"><stop stopColor="#a855f7" /><stop offset="1" stopColor="#f59e0b" /></linearGradient></defs></svg>}
              title="Unlimited Links"
              description="Add as many links as you want — social profiles, websites, products, videos, and more."
              badge="Core"
              delay="0s"
            />
            <FeatureCard
              icon={<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="14" r="10" stroke="url(#f2)" strokeWidth="2" opacity="0.5" /><path d="M14 8v6l4 4" stroke="url(#f2)" strokeWidth="2" strokeLinecap="round" /><defs><linearGradient id="f2" x1="4" y1="4" x2="24" y2="24"><stop stopColor="#06b6d4" /><stop offset="1" stopColor="#a855f7" /></linearGradient></defs></svg>}
              title="Real-time Analytics"
              description="Track clicks, visitors, device types, and geographic data in a gorgeous live dashboard."
              badge="Pro"
              delay="0.1s"
            />
            <FeatureCard
              icon={<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M4 14C4 8.477 8.477 4 14 4s10 4.477 10 10-4.477 10-10 10S4 19.523 4 14z" stroke="url(#f3)" strokeWidth="2" opacity="0.4" /><path d="M10 14c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" fill="url(#f3)" opacity="0.7" /><defs><linearGradient id="f3" x1="4" y1="4" x2="24" y2="24"><stop stopColor="#10b981" /><stop offset="1" stopColor="#06b6d4" /></linearGradient></defs></svg>}
              title="Custom Domains"
              description="Connect your own domain for a fully branded experience that screams authority."
              delay="0.2s"
            />
            <FeatureCard
              icon={<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="3" y="6" width="22" height="16" rx="3" stroke="url(#f4)" strokeWidth="2" opacity="0.4" /><path d="M14 10v8M10 14h8" stroke="url(#f4)" strokeWidth="2" strokeLinecap="round" /><defs><linearGradient id="f4" x1="3" y1="6" x2="25" y2="22"><stop stopColor="#f59e0b" /><stop offset="1" stopColor="#ef4444" /></linearGradient></defs></svg>}
              title="Drag & Drop Editor"
              description="Rearrange your links effortlessly with an intuitive visual builder — no code needed."
              delay="0.3s"
            />
            <FeatureCard
              icon={<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M7 14l7-7 7 7" stroke="url(#f5)" strokeWidth="2" strokeLinecap="round" opacity="0.6" /><path d="M14 7v14" stroke="url(#f5)" strokeWidth="2" strokeLinecap="round" /><defs><linearGradient id="f5" x1="7" y1="7" x2="21" y2="21"><stop stopColor="#a855f7" /><stop offset="1" stopColor="#06b6d4" /></linearGradient></defs></svg>}
              title="SEO Optimized"
              description="Every kingdom page is fully optimized for search engines with meta tags, OG data, and more."
              delay="0.4s"
            />
            <FeatureCard
              icon={<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M6 6l8 8m8-8L14 14m0 0l8 8m-8-8L6 22" stroke="url(#f6)" strokeWidth="2" strokeLinecap="round" opacity="0.7" /><defs><linearGradient id="f6" x1="6" y1="6" x2="22" y2="22"><stop stopColor="#ef4444" /><stop offset="1" stopColor="#f59e0b" /></linearGradient></defs></svg>}
              title="Branded Themes"
              description="Choose from 50+ stunning themes or build your own with custom CSS — full creative control."
              badge="New"
              delay="0.5s"
            />
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="section reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Social Proof</span>
            <h2 className="section-title">Loved by <span className="gradient-text">Creators</span></h2>
          </div>
          <div className="testimonials-grid">
            <TestimonialCard
              avatar="🧑‍🎨"
              name="Alex Rivera"
              role="Digital Artist & Influencer"
              quote="MyKingdoms transformed how I share my work. One link replaced 6 different ones and my click-through rate doubled overnight!"
              delay="0s"
            />
            <TestimonialCard
              avatar="👩‍💻"
              name="Sarah Chen"
              role="Full-Stack Developer"
              quote="The analytics dashboard alone is worth it. I can see exactly which links my audience clicks and optimize accordingly. Absolute game-changer."
              delay="0.15s"
            />
            <TestimonialCard
              avatar="🧑‍🚀"
              name="Marcus Thompson"
              role="YouTube Creator (2.1M subs)"
              quote="Switched from three other platforms and never looked back. The customization options are insane and it loads lightning fast."
              delay="0.3s"
            />
          </div>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section id="pricing" className="section section--dark reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Simple Pricing</span>
            <h2 className="section-title">Choose Your <span className="gradient-text">Crown</span></h2>
            <p className="section-subtitle">Start free. Upgrade when your kingdom demands it.</p>
          </div>
          <div className="pricing-grid">
            <PricingCard
              plan="Squire"
              price="0"
              period="mo"
              features={['5 Links', 'Basic Analytics', 'MyKingdoms subdomain', 'Standard themes', 'Community support']}
              cta="Start Free"
              delay="0s"
            />
            <PricingCard
              plan="Knight"
              price="9"
              period="mo"
              features={['Unlimited Links', 'Advanced Analytics', 'Custom domain', '50+ Premium themes', 'Priority support', 'No branding']}
              cta="Become a Knight"
              highlight
              delay="0.1s"
            />
            <PricingCard
              plan="King"
              price="29"
              period="mo"
              features={['Everything in Knight', 'Team collaboration', 'API access', 'White-label solution', 'Dedicated support', 'SLA guarantee']}
              cta="Claim the Throne"
              delay="0.2s"
            />
          </div>
        </div>
      </section>

      {/* ══ CTA BANNER ══ */}
      <section className="cta-banner reveal">
        <div className="cta-banner__blob" aria-hidden="true" />
        <div className="container cta-banner__content">
          <div className="cta-banner__crown">👑</div>
          <h2 className="cta-banner__title">
            Ready to Build Your <span className="gradient-text">Kingdom?</span>
          </h2>
          <p className="cta-banner__sub">
            Join 12,000+ creators who've already claimed their throne. No credit card needed.
          </p>
          <Link
            to="/admin/login"
            className="cta-btn cta-btn--primary cta-btn--large"
            id="cta-create-link-bottom"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 4V18M4 11H18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            Create My First Link — It's Free
          </Link>
          <p className="cta-banner__note">✓ Free forever plan &nbsp;·&nbsp; ✓ No setup fees &nbsp;·&nbsp; ✓ Cancel anytime</p>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <div className="footer__logo">
              <span>👑</span>
              <span>My<strong>Kingdoms</strong></span>
            </div>
            <p className="footer__tagline">
              Rule the internet with a single link.
            </p>
            <div className="footer__socials">
              {['🐦', '📸', '💼', '🎵'].map((s, i) => (
                <button key={i} className="footer__social-btn" aria-label="social">{s}</button>
              ))}
            </div>
          </div>
          <div className="footer__links-col">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#how-it-works">How it Works</a></li>
              <li><a href="#hero">Templates</a></li>
            </ul>
          </div>
          <div className="footer__links-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#hero">About</a></li>
              <li><a href="#hero">Blog</a></li>
              <li><a href="#hero">Careers</a></li>
              <li><a href="#hero">Press</a></li>
            </ul>
          </div>
          <div className="footer__links-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#hero">Privacy Policy</a></li>
              <li><a href="#hero">Terms of Service</a></li>
              <li><a href="#hero">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom container">
          <p>© 2025 MyKingdoms. All rights reserved. Built with ❤️ for creators.</p>
          <p>Made with 💜 by the MyKingdoms team</p>
        </div>
      </footer>

      <style>{`
        /* ===== HOME BASE ===== */
        .home {
          min-height: 100vh;
          background: var(--bg-dark);
          overflow-x: hidden;
        }

        /* ===== PARTICLES ===== */
        .particle-field {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .particle {
          position: absolute;
          bottom: -10px;
          background: radial-gradient(circle, rgba(168,85,247,0.8), transparent);
          border-radius: 50%;
          animation: particle-drift linear infinite;
        }

        /* ===== HERO ===== */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 120px 0 60px;
          overflow: hidden;
          z-index: 1;
        }
        .hero__blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          animation: blob-morph 8s ease-in-out infinite;
        }
        .hero__blob--1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%);
          top: -200px; left: -200px;
          animation-delay: 0s;
        }
        .hero__blob--2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%);
          bottom: -100px; right: -100px;
          animation-delay: 3s;
        }
        .hero__blob--3 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%);
          top: 40%; left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 6s;
        }
        .hero__orbit-ring {
          position: absolute;
          width: 700px; height: 700px;
          border: 1px dashed rgba(124,58,237,0.15);
          border-radius: 50%;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .hero__orbit-dot {
          position: absolute;
          font-size: 1.2rem;
          top: 50%; left: 50%;
          margin-top: -0.6rem; margin-left: -0.6rem;
        }
        .hero__orbit-dot--1 { animation: orbit 12s linear infinite; }
        .hero__orbit-dot--2 { animation: orbit 18s linear infinite reverse; animation-delay: -5s; }
        .hero__orbit-dot--3 { animation: orbit 24s linear infinite; animation-delay: -10s; }

        .hero__content {
          text-align: center;
          position: relative;
          z-index: 2;
          animation: fadeInUp 0.8s ease forwards;
        }
        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.3);
          color: #c4b5fd;
          padding: 8px 20px;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 500;
          margin-bottom: 32px;
          animation: fadeInUp 0.8s ease 0.1s both;
        }
        .hero__badge-dot {
          width: 8px; height: 8px;
          background: #a855f7;
          border-radius: 50%;
          animation: pulse-glow 2s ease infinite;
          display: inline-block;
        }
        .hero__heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -2px;
          color: var(--text-primary);
          margin-bottom: 28px;
          animation: fadeInUp 0.8s ease 0.2s both;
        }
        .typing-wrapper {
          display: inline-block;
          min-width: 200px;
        }
        .typing-cursor {
          display: inline-block;
          width: 3px;
          background: #a855f7;
          margin-left: 2px;
          animation: blink 0.8s step-end infinite;
          -webkit-text-fill-color: #a855f7;
          font-weight: 300;
        }
        .hero__sub {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 40px;
          line-height: 1.7;
          animation: fadeInUp 0.8s ease 0.3s both;
        }
        .hero__cta-group {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 0.8s ease 0.4s both;
          margin-bottom: 48px;
        }
        .hero__social-proof {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          animation: fadeInUp 0.8s ease 0.5s both;
        }
        .hero__avatars {
          display: flex;
        }
        .hero__avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(124,58,237,0.2);
          border: 2px solid rgba(124,58,237,0.4);
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          margin-left: -8px;
          transition: transform 0.2s ease;
        }
        .hero__avatar:first-child { margin-left: 0; }
        .hero__avatar:hover { transform: translateY(-4px) scale(1.1); }
        .hero__proof-text {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        .hero__proof-text strong { color: var(--text-primary); }

        /* ── MOCKUP ── */
        .hero__mockup-wrap {
          position: relative;
          z-index: 2;
          margin-top: 60px;
          animation: fadeInUp 0.8s ease 0.6s both;
        }
        .hero__mockup {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          max-width: 420px;
          margin: 0 auto;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
          animation: float 6s ease-in-out infinite;
          backdrop-filter: blur(20px);
        }
        .mockup__bar {
          display: flex; align-items: center; gap: 6px;
          padding: 12px 16px;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .mockup__dot {
          width: 10px; height: 10px;
          border-radius: 50%;
        }
        .mockup__dot--red { background: #ef4444; }
        .mockup__dot--yellow { background: #f59e0b; }
        .mockup__dot--green { background: #10b981; }
        .mockup__url {
          flex: 1; text-align: center;
          font-size: 0.75rem; color: #64748b;
          font-family: monospace;
        }
        .mockup__profile {
          padding: 24px 16px 16px;
          text-align: center;
        }
        .mockup__avatar {
          width: 60px; height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(124,58,237,0.3), rgba(245,158,11,0.2));
          border: 2px solid rgba(124,58,237,0.4);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.8rem;
          margin: 0 auto 10px;
        }
        .mockup__name {
          font-weight: 700; font-size: 0.95rem; color: var(--text-primary);
          margin-bottom: 4px;
        }
        .mockup__bio {
          font-size: 0.75rem; color: var(--text-muted);
        }
        .mockup__links {
          padding: 8px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .mockup__link-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.25s ease;
          animation: fadeInLeft 0.4s ease both;
        }
        .mockup__link-item:hover {
          background: rgba(124,58,237,0.12);
          border-color: rgba(124,58,237,0.3);
          transform: translateX(4px);
        }
        .mockup__link-icon { font-size: 1rem; }
        .mockup__link-label { flex: 1; font-size: 0.82rem; color: var(--text-primary); font-weight: 500; }
        .mockup__stats {
          display: flex;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin-top: 8px;
        }
        .mockup__stat {
          flex: 1; text-align: center;
          padding: 12px 8px;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .mockup__stat:last-child { border-right: none; }
        .mockup__stat-value {
          display: block;
          font-size: 1rem; font-weight: 700;
          background: linear-gradient(135deg, #a855f7, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .mockup__stat-label {
          display: block;
          font-size: 0.65rem; color: var(--text-muted);
          margin-top: 2px;
        }

        /* SCROLL INDICATOR */
        .hero__scroll-indicator {
          position: absolute;
          bottom: 32px;
          left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          color: var(--text-muted);
          font-size: 0.75rem;
          animation: fadeInUp 1s ease 1s both;
          z-index: 2;
        }
        .scroll-mouse {
          width: 22px; height: 36px;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 11px;
          display: flex; justify-content: center; padding-top: 6px;
        }
        .scroll-wheel {
          width: 3px; height: 8px;
          background: #a855f7;
          border-radius: 2px;
          animation: fadeInUp 1s ease infinite alternate;
        }

        /* ===== CTA BUTTONS ===== */
        .cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 1rem; font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          border: none;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .cta-btn:hover::before { opacity: 1; }
        .cta-btn--primary {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: #fff;
          box-shadow: 0 8px 30px rgba(124,58,237,0.4);
        }
        .cta-btn--primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 50px rgba(124,58,237,0.6);
        }
        .cta-btn--ghost {
          background: rgba(255,255,255,0.06);
          color: var(--text-primary);
          border: 1px solid rgba(255,255,255,0.12);
        }
        .cta-btn--ghost:hover {
          background: rgba(255,255,255,0.1);
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.2);
        }
        .cta-btn--large {
          padding: 18px 40px;
          font-size: 1.1rem;
        }

        /* ===== STATS STRIP ===== */
        .stats-strip {
          position: relative; z-index: 1;
          padding: 40px 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
        }
        .stats-strip__inner {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .stat-item {
          text-align: center;
          padding: 16px;
        }
        .stat-value {
          display: block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #a855f7, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 8px;
        }
        .stat-label {
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 500;
        }

        /* ===== SECTION ===== */
        .section {
          position: relative;
          z-index: 1;
          padding: 100px 0;
        }
        .section--dark {
          background: rgba(255,255,255,0.015);
          border-top: 1px solid rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }
        .section-eyebrow {
          display: inline-block;
          color: #a855f7;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 16px;
          background: rgba(168,85,247,0.1);
          padding: 6px 16px;
          border-radius: 100px;
          border: 1px solid rgba(168,85,247,0.2);
        }
        .section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -1px;
          margin-bottom: 20px;
          display: block;
        }
        .section-subtitle {
          color: var(--text-secondary);
          font-size: 1.1rem;
          max-width: 560px;
          margin: 0 auto;
        }

        /* ===== HOW IT WORKS STEPS ===== */
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          position: relative;
        }
        .steps-grid::before {
          content: '';
          position: absolute;
          top: 40px; left: 12%;
          width: 76%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(245,158,11,0.3), transparent);
          pointer-events: none;
        }
        .step-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 32px 24px;
          text-align: center;
          position: relative;
          transition: all 0.35s ease;
          animation: fadeInUp 0.6s ease both;
        }
        .step-card:hover {
          background: var(--bg-card-hover);
          border-color: var(--border-hover);
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.3), 0 0 0 1px rgba(124,58,237,0.1);
        }
        .step-number {
          position: absolute;
          top: -14px; left: 24px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: #fff;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 100px;
          letter-spacing: 1px;
        }
        .step-icon {
          font-size: 2.5rem;
          margin-bottom: 16px;
          display: block;
        }
        .step-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
        }
        .step-desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* ===== FEATURES ===== */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .feature-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 32px;
          position: relative;
          transition: all 0.35s ease;
          animation: fadeInUp 0.6s ease both;
          overflow: hidden;
        }
        .feature-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(124,58,237,0.05) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .feature-card:hover {
          border-color: rgba(124,58,237,0.3);
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .feature-card:hover::after { opacity: 1; }
        .feature-badge {
          position: absolute;
          top: 20px; right: 20px;
          background: linear-gradient(135deg, rgba(124,58,237,0.3), rgba(245,158,11,0.2));
          color: #c4b5fd;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 100px;
          border: 1px solid rgba(124,58,237,0.3);
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .feature-icon-wrap {
          width: 52px; height: 52px;
          background: rgba(124,58,237,0.1);
          border: 1px solid rgba(124,58,237,0.2);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }
        .feature-card:hover .feature-icon-wrap {
          background: rgba(124,58,237,0.2);
          transform: scale(1.1) rotate(3deg);
        }
        .feature-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
        }
        .feature-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        /* ===== TESTIMONIALS ===== */
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .testimonial-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 28px;
          transition: all 0.35s ease;
          animation: fadeInUp 0.6s ease both;
        }
        .testimonial-card:hover {
          border-color: rgba(124,58,237,0.3);
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .testimonial-stars {
          color: #f59e0b;
          font-size: 0.9rem;
          letter-spacing: 2px;
          margin-bottom: 16px;
        }
        .testimonial-quote {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 24px;
          font-style: italic;
        }
        .testimonial-author {
          display: flex; align-items: center; gap: 12px;
        }
        .testimonial-avatar {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(124,58,237,0.15);
          border: 2px solid rgba(124,58,237,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem;
        }
        .testimonial-name {
          font-weight: 700; font-size: 0.9rem; color: var(--text-primary);
        }
        .testimonial-role {
          font-size: 0.78rem; color: var(--text-muted);
          margin-top: 2px;
        }

        /* ===== PRICING ===== */
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: center;
        }
        .pricing-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 36px 32px;
          position: relative;
          transition: all 0.35s ease;
          animation: fadeInUp 0.6s ease both;
        }
        .pricing-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }
        .pricing-card--highlight {
          background: linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(168,85,247,0.08) 100%);
          border-color: rgba(124,58,237,0.4);
          transform: scale(1.04);
          box-shadow: 0 20px 60px rgba(124,58,237,0.25), 0 0 0 1px rgba(124,58,237,0.2);
        }
        .pricing-card--highlight:hover { transform: scale(1.04) translateY(-6px); }
        .pricing-popular {
          position: absolute;
          top: -14px; left: 50%; transform: translateX(-50%);
          background: linear-gradient(135deg, #7c3aed, #f59e0b);
          color: #fff;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 5px 18px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 1px;
          white-space: nowrap;
        }
        .pricing-plan {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-secondary);
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .pricing-price {
          display: flex; align-items: baseline; gap: 2px;
          margin-bottom: 28px;
        }
        .pricing-currency { color: var(--text-secondary); font-size: 1.3rem; font-weight: 600; }
        .pricing-amount {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 3.5rem; font-weight: 800;
          background: linear-gradient(135deg, #a855f7, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .pricing-period { color: var(--text-muted); font-size: 1rem; }
        .pricing-features {
          list-style: none;
          display: flex; flex-direction: column; gap: 12px;
          margin-bottom: 32px;
        }
        .pricing-feature {
          display: flex; align-items: center; gap: 10px;
          font-size: 0.9rem; color: var(--text-secondary);
        }
        .pricing-cta {
          display: block;
          text-align: center;
          padding: 14px;
          border-radius: 10px;
          font-weight: 600; font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.3s ease;
          font-family: 'Inter', sans-serif;
        }
        .pricing-cta--primary {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: #fff;
          box-shadow: 0 8px 25px rgba(124,58,237,0.4);
        }
        .pricing-cta--primary:hover {
          box-shadow: 0 12px 35px rgba(124,58,237,0.6);
          transform: translateY(-2px);
        }
        .pricing-cta--ghost {
          border: 1px solid rgba(255,255,255,0.12);
          color: var(--text-secondary);
        }
        .pricing-cta--ghost:hover {
          background: rgba(255,255,255,0.06);
          color: var(--text-primary);
        }

        /* ===== CTA BANNER ===== */
        .cta-banner {
          position: relative;
          padding: 100px 0;
          text-align: center;
          overflow: hidden;
          z-index: 1;
        }
        .cta-banner__blob {
          position: absolute;
          width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: blob-morph 10s ease-in-out infinite;
        }
        .cta-banner__content {
          position: relative; z-index: 1;
        }
        .cta-banner__crown {
          font-size: 4rem;
          display: block;
          margin-bottom: 24px;
          animation: float 3s ease-in-out infinite;
        }
        .cta-banner__title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          letter-spacing: -1px;
          margin-bottom: 20px;
        }
        .cta-banner__sub {
          color: var(--text-secondary);
          font-size: 1.1rem;
          max-width: 500px;
          margin: 0 auto 40px;
        }
        .cta-banner__note {
          color: var(--text-muted);
          font-size: 0.85rem;
          margin-top: 20px;
        }

        /* ===== FOOTER ===== */
        .footer {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 60px 0 32px;
          position: relative;
          z-index: 1;
        }
        .footer__inner {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
        }
        .footer__logo {
          display: flex; align-items: center; gap: 8px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
        }
        .footer__logo span:first-child { font-size: 1.4rem; }
        .footer__tagline {
          color: var(--text-muted);
          font-size: 0.875rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .footer__socials {
          display: flex; gap: 8px;
        }
        .footer__social-btn {
          width: 36px; height: 36px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.25s ease;
        }
        .footer__social-btn:hover {
          background: rgba(124,58,237,0.15);
          border-color: rgba(124,58,237,0.3);
          transform: translateY(-2px);
        }
        .footer__links-col h4 {
          font-weight: 700; font-size: 0.875rem;
          color: var(--text-primary);
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .footer__links-col ul {
          list-style: none;
          display: flex; flex-direction: column; gap: 10px;
        }
        .footer__links-col a {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s ease;
        }
        .footer__links-col a:hover {
          color: #a855f7;
        }
        .footer__bottom {
          display: flex;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.04);
          color: var(--text-muted);
          font-size: 0.8rem;
        }

        /* ===== SCROLL REVEAL ===== */
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 1024px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
          .steps-grid { grid-template-columns: repeat(2, 1fr); }
          .steps-grid::before { display: none; }
          .pricing-grid { grid-template-columns: 1fr; max-width: 440px; margin: 0 auto; }
          .pricing-card--highlight { transform: none; }
          .pricing-card--highlight:hover { transform: translateY(-6px); }
        }
        @media (max-width: 768px) {
          .hero { padding: 100px 0 40px; }
          .hero__orbit-ring { display: none; }
          .stats-strip__inner { grid-template-columns: repeat(2, 1fr); }
          .features-grid { grid-template-columns: 1fr; }
          .testimonials-grid { grid-template-columns: 1fr; }
          .steps-grid { grid-template-columns: 1fr; }
          .footer__inner { grid-template-columns: 1fr 1fr; gap: 32px; }
          .footer__brand { grid-column: 1 / -1; }
          .footer__bottom { flex-direction: column; gap: 8px; text-align: center; }
        }
        @media (max-width: 480px) {
          .stats-strip__inner { grid-template-columns: repeat(2, 1fr); }
          .hero__cta-group { flex-direction: column; align-items: center; }
          .cta-btn { width: 100%; justify-content: center; max-width: 320px; }
          .footer__inner { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}