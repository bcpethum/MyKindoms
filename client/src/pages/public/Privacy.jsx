import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';

export default function Privacy() {
  const updated = 'June 17, 2026';
  return (
    <div className="static-page">
      <Navbar />
      <div className="static-page__hero">
        <div className="sp-blob sp-blob--1" />
        <div className="sp-blob sp-blob--2" />
        <div className="container static-page__hero-inner">
          <span className="section-eyebrow">Legal</span>
          <h1 className="static-page__h1"><span className="gradient-text">Privacy</span> Policy</h1>
          <p className="static-page__hero-sub">
            We believe in radical transparency. Here's exactly what data we collect, why we collect it, and how we protect it.
          </p>
          <p className="sp-last-updated">Last Updated: {updated}</p>
        </div>
      </div>

      <div className="container sp-legal-content">

        <div className="sp-toc">
          <h3>Table of Contents</h3>
          <ol>
            <li><a href="#overview">Overview</a></li>
            <li><a href="#data-collected">Information We Collect</a></li>
            <li><a href="#how-we-use">How We Use Your Information</a></li>
            <li><a href="#cookies">Cookies and Tracking</a></li>
            <li><a href="#advertising">Advertising (Google AdSense)</a></li>
            <li><a href="#third-parties">Third-Party Services</a></li>
            <li><a href="#data-security">Data Security</a></li>
            <li><a href="#your-rights">Your Rights</a></li>
            <li><a href="#children">Children's Privacy</a></li>
            <li><a href="#changes">Changes to This Policy</a></li>
            <li><a href="#contact-us">Contact Us</a></li>
          </ol>
        </div>

        <div className="sp-legal-body">

          <section id="overview" className="sp-legal-section">
            <h2>1. Overview</h2>
            <p>MyKingdoms ("we," "our," or "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy describes how we collect, use, and share information when you use our platform at mykingdoms.tech (the "Service").</p>
            <p>By using MyKingdoms, you agree to the collection and use of information in accordance with this policy. If you do not agree with this policy, please do not use our Service.</p>
          </section>

          <section id="data-collected" className="sp-legal-section">
            <h2>2. Information We Collect</h2>
            <h3>Information You Provide</h3>
            <ul>
              <li><strong>Account Information:</strong> When you create an account, we collect your username and email address. Passwords are encrypted using industry-standard bcrypt hashing before storage.</li>
              <li><strong>Content Data:</strong> URLs, file links, text snippets, link titles, descriptions, and categories you create and publish on our platform.</li>
              <li><strong>Contact Information:</strong> If you contact us via email or our contact form, we collect the information you provide (name, email, and message).</li>
            </ul>
            <h3>Information Collected Automatically</h3>
            <ul>
              <li><strong>Usage Data:</strong> We collect information about how you interact with our Service, including pages visited, links clicked, actions completed, and time spent on pages.</li>
              <li><strong>Device Information:</strong> Browser type, operating system, device type, and screen resolution.</li>
              <li><strong>IP Address:</strong> Used for geographic analytics and security purposes. We do not store raw IP addresses long-term.</li>
              <li><strong>Click Analytics:</strong> When visitors click on gated links, we track the click count to provide creators with engagement statistics.</li>
            </ul>
          </section>

          <section id="how-we-use" className="sp-legal-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve the MyKingdoms Service</li>
              <li>Create and manage your account and your created links</li>
              <li>Provide analytics dashboards showing your link performance</li>
              <li>Send important service notifications and security alerts</li>
              <li>Respond to your questions, support requests, and feedback</li>
              <li>Detect and prevent fraud, abuse, and security incidents</li>
              <li>Comply with legal obligations</li>
              <li>Display relevant advertisements through Google AdSense (visitors to public pages only)</li>
            </ul>
            <p>We do <strong>not</strong> sell your personal information to third parties.</p>
          </section>

          <section id="cookies" className="sp-legal-section">
            <h2>4. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar tracking technologies to enhance your experience on our Service.</p>
            <h3>Types of Cookies We Use</h3>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for the Service to function. These include your authentication token (stored in localStorage as <code>mk_token</code>) and session data. You cannot opt out of these without losing access to authenticated features.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site. We use anonymized usage statistics to improve performance and user experience.</li>
              <li><strong>Advertising Cookies:</strong> Used by Google AdSense to serve relevant advertisements on our public link pages. These cookies may be set by Google to track visitor behavior across websites for personalized advertising.</li>
            </ul>
            <h3>Managing Cookies</h3>
            <p>You can control cookies through your browser settings. Note that disabling certain cookies may affect the functionality of our Service. You can also opt out of personalized Google advertising at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">g.co/adsettings</a>.</p>
          </section>

          <section id="advertising" className="sp-legal-section">
            <h2>5. Advertising — Google AdSense</h2>
            <p>MyKingdoms uses Google AdSense to display advertisements on public link pages. Google AdSense is a service provided by Google LLC.</p>
            <p>Google AdSense may use cookies, web beacons, and similar tracking technologies to:</p>
            <ul>
              <li>Serve advertisements based on your prior visits to our site and other sites on the Internet</li>
              <li>Measure advertising effectiveness and limit ad repetition</li>
              <li>Provide aggregate data to advertisers</li>
            </ul>
            <p>Google's advertising cookies enable it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ad Settings</a>. Alternatively, you may opt out through the Network Advertising Initiative opt-out page at <a href="http://www.networkadvertising.org/managing/opt_out.asp" target="_blank" rel="noopener noreferrer">networkadvertising.org</a>.</p>
            <p>For more information on how Google uses data from sites that use Google AdSense, please visit: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/partner-sites</a>.</p>
          </section>

          <section id="third-parties" className="sp-legal-section">
            <h2>6. Third-Party Services</h2>
            <p>We use the following third-party services to operate MyKingdoms:</p>
            <ul>
              <li><strong>MongoDB Atlas:</strong> Secure cloud database hosting for storing your account and link data. Subject to MongoDB's privacy policy.</li>
              <li><strong>Microsoft Azure:</strong> Cloud hosting infrastructure for our web application. Subject to Microsoft's privacy policies.</li>
              <li><strong>Google AdSense:</strong> Advertising network that serves ads on our public pages. Governed by Google's Privacy Policy.</li>
              <li><strong>Google Fonts:</strong> Typography service that loads fonts used in our interface. Google may collect minimal font-serving analytics.</li>
            </ul>
            <p>We do not control how these third parties use data they collect. We encourage you to review their individual privacy policies.</p>
          </section>

          <section id="data-security" className="sp-legal-section">
            <h2>7. Data Security</h2>
            <p>We take the security of your data seriously and implement the following measures:</p>
            <ul>
              <li><strong>Password Hashing:</strong> All passwords are hashed using bcrypt with industry-standard salt rounds before being stored. We never store plain-text passwords.</li>
              <li><strong>JWT Authentication:</strong> Authentication uses signed JSON Web Tokens with expiration times. Tokens are stored in localStorage and sent as Authorization headers.</li>
              <li><strong>HTTPS Encryption:</strong> All data transmitted between your browser and our servers is encrypted using TLS/SSL.</li>
              <li><strong>Access Control:</strong> Only authenticated users can access their own link data. Our API enforces owner-based access control on all write operations.</li>
            </ul>
            <p>While we implement strong security measures, no method of transmission over the Internet or method of electronic storage is 100% secure. We cannot guarantee absolute security.</p>
          </section>

          <section id="your-rights" className="sp-legal-section">
            <h2>8. Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal data:</p>
            <ul>
              <li><strong>Access:</strong> You may request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> You may request that we correct inaccurate or incomplete information.</li>
              <li><strong>Deletion:</strong> You may request that we delete your account and associated data. You can also delete individual links from your dashboard at any time.</li>
              <li><strong>Data Portability:</strong> You may request your data in a machine-readable format.</li>
              <li><strong>Objection:</strong> You may object to certain processing of your data, including for direct marketing purposes.</li>
            </ul>
            <p>To exercise any of these rights, please contact us at <a href="mailto:privacy@mykingdoms.tech">privacy@mykingdoms.tech</a>.</p>
          </section>

          <section id="children" className="sp-legal-section">
            <h2>9. Children's Privacy</h2>
            <p>MyKingdoms is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately. If we discover we have collected information from a child under 13, we will promptly delete it.</p>
          </section>

          <section id="changes" className="sp-legal-section">
            <h2>10. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of significant changes by updating the "Last Updated" date at the top of this page and, for material changes, by sending a notification to your registered email address.</p>
            <p>We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.</p>
          </section>

          <section id="contact-us" className="sp-legal-section">
            <h2>11. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
            <div className="sp-contact-info">
              <p>📧 <strong>Email:</strong> <a href="mailto:privacy@mykingdoms.tech">privacy@mykingdoms.tech</a></p>
              <p>🌐 <strong>Website:</strong> <a href="https://mykingdoms.tech" target="_blank" rel="noopener noreferrer">mykingdoms.tech</a></p>
              <p>📬 <strong>Contact Form:</strong> <Link to="/contact">mykingdoms.tech/contact</Link></p>
            </div>
          </section>

        </div>
      </div>

      <footer className="sp-footer">
        <div className="container sp-footer__inner">
          <p>© 2026 MyKingdoms. All rights reserved.</p>
          <div className="sp-footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
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
          line-height: 1.1; margin-bottom: 16px;
        }
        .gradient-text {
          background: linear-gradient(135deg, #a855f7, #f59e0b, #06b6d4);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .static-page__hero-sub {
          max-width: 620px; margin: 0 auto 12px;
          font-size: 1.05rem; color: #94a3b8; line-height: 1.7;
        }
        .sp-last-updated { font-size: 0.82rem; color: #475569; }

        .sp-legal-content { padding: 40px 0 80px; display: flex; gap: 48px; align-items: flex-start; }

        .sp-toc {
          position: sticky; top: 100px;
          width: 240px; flex-shrink: 0;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 24px;
        }
        .sp-toc h3 {
          font-size: 0.8rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 1px; color: #64748b; margin-bottom: 16px;
        }
        .sp-toc ol { list-style: none; display: flex; flex-direction: column; gap: 8px; padding: 0; counter-reset: toc; }
        .sp-toc li { counter-increment: toc; }
        .sp-toc a {
          color: #94a3b8; text-decoration: none; font-size: 0.82rem;
          transition: color 0.2s ease;
        }
        .sp-toc a:hover { color: #a855f7; }

        .sp-legal-body { flex: 1; display: flex; flex-direction: column; gap: 48px; }

        .sp-legal-section { }
        .sp-legal-section h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem; font-weight: 700; margin-bottom: 16px;
          color: #f8fafc; border-bottom: 1px solid rgba(255,255,255,0.06);
          padding-bottom: 12px;
        }
        .sp-legal-section h3 {
          font-size: 1rem; font-weight: 700; color: #c4b5fd;
          margin: 20px 0 10px;
        }
        .sp-legal-section p {
          font-size: 0.9rem; color: #94a3b8; line-height: 1.8; margin-bottom: 14px;
        }
        .sp-legal-section ul, .sp-legal-section ol {
          padding-left: 20px; display: flex; flex-direction: column; gap: 10px;
          margin-bottom: 14px;
        }
        .sp-legal-section li { font-size: 0.875rem; color: #94a3b8; line-height: 1.7; }
        .sp-legal-section strong { color: #f8fafc; }
        .sp-legal-section a { color: #a855f7; text-decoration: none; }
        .sp-legal-section a:hover { text-decoration: underline; }
        .sp-legal-section code {
          background: rgba(168,85,247,0.15);
          border: 1px solid rgba(168,85,247,0.25);
          padding: 2px 6px; border-radius: 4px;
          font-family: monospace; font-size: 0.82rem; color: #c4b5fd;
        }

        .sp-contact-info {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 20px 24px;
          display: flex; flex-direction: column; gap: 10px;
          margin-top: 8px;
        }
        .sp-contact-info p { margin: 0; font-size: 0.9rem; }

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

        @media (max-width: 900px) {
          .sp-legal-content { flex-direction: column; gap: 32px; }
          .sp-toc { position: static; width: 100%; }
        }
      `}</style>
    </div>
  );
}
