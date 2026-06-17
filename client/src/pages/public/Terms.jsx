import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';

export default function Terms() {
  const updated = 'June 17, 2026';
  return (
    <div className="static-page">
      <Navbar />
      <div className="static-page__hero">
        <div className="sp-blob sp-blob--1" />
        <div className="sp-blob sp-blob--2" />
        <div className="container static-page__hero-inner">
          <span className="section-eyebrow">Legal</span>
          <h1 className="static-page__h1">Terms of <span className="gradient-text">Service</span></h1>
          <p className="static-page__hero-sub">
            Please read these terms carefully before using MyKingdoms. By using our platform, you agree to be bound by these terms.
          </p>
          <p className="sp-last-updated">Last Updated: {updated}</p>
        </div>
      </div>

      <div className="container sp-legal-content">

        <div className="sp-toc">
          <h3>Table of Contents</h3>
          <ol>
            <li><a href="#acceptance">Acceptance of Terms</a></li>
            <li><a href="#description">Description of Service</a></li>
            <li><a href="#accounts">User Accounts</a></li>
            <li><a href="#acceptable-use">Acceptable Use Policy</a></li>
            <li><a href="#prohibited">Prohibited Content</a></li>
            <li><a href="#intellectual-property">Intellectual Property</a></li>
            <li><a href="#creator-content">Creator Content</a></li>
            <li><a href="#monetization">Monetization</a></li>
            <li><a href="#disclaimers">Disclaimers</a></li>
            <li><a href="#limitation">Limitation of Liability</a></li>
            <li><a href="#termination">Termination</a></li>
            <li><a href="#governing-law">Governing Law</a></li>
            <li><a href="#contact">Contact</a></li>
          </ol>
        </div>

        <div className="sp-legal-body">

          <section id="acceptance" className="sp-legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using MyKingdoms (mykingdoms.tech), you agree to be bound by these Terms of Service ("Terms") and all applicable laws and regulations. If you do not agree with any part of these Terms, you may not access or use our Service.</p>
            <p>These Terms constitute a legally binding agreement between you ("User") and MyKingdoms ("we," "our," or "us"). We reserve the right to update these Terms at any time by posting a revised version on this page.</p>
          </section>

          <section id="description" className="sp-legal-section">
            <h2>2. Description of Service</h2>
            <p>MyKingdoms is a link-in-bio and content distribution platform that allows registered users ("Creators") to:</p>
            <ul>
              <li>Create a personalized profile page accessible via a unique URL</li>
              <li>Add, manage, and share links, file downloads, and text snippets</li>
              <li>Gate content behind social engagement actions (e.g., subscribing to YouTube channels, following on Instagram)</li>
              <li>Track engagement analytics including click counts and visitor statistics</li>
              <li>Customize the appearance and organization of their content</li>
            </ul>
            <p>We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time with or without notice.</p>
          </section>

          <section id="accounts" className="sp-legal-section">
            <h2>3. User Accounts</h2>
            <h3>Account Registration</h3>
            <p>To use Creator features, you must register for an account by providing a valid username and email address and creating a password. You are responsible for maintaining the security of your account credentials.</p>
            <h3>Account Responsibilities</h3>
            <ul>
              <li>You must be at least 13 years of age to create an account</li>
              <li>You are responsible for all activity that occurs under your account</li>
              <li>You must not share your account credentials with third parties</li>
              <li>You must notify us immediately of any unauthorized use of your account</li>
              <li>You must provide accurate and current account information</li>
            </ul>
            <h3>Account Termination</h3>
            <p>We reserve the right to suspend or terminate accounts that violate these Terms, remain inactive for extended periods, or are associated with fraudulent activity.</p>
          </section>

          <section id="acceptable-use" className="sp-legal-section">
            <h2>4. Acceptable Use Policy</h2>
            <p>When using MyKingdoms, you agree to:</p>
            <ul>
              <li>Comply with all applicable local, national, and international laws and regulations</li>
              <li>Only share content for which you have appropriate rights and permissions</li>
              <li>Accurately represent your content through titles, descriptions, and categories</li>
              <li>Respect the intellectual property rights of others</li>
              <li>Not engage in any activity that disrupts or interferes with the Service</li>
              <li>Not attempt to gain unauthorized access to any systems or data</li>
              <li>Not use automated tools, bots, or scripts to interact with the Service in ways that violate these Terms</li>
            </ul>
          </section>

          <section id="prohibited" className="sp-legal-section">
            <h2>5. Prohibited Content</h2>
            <p>You may NOT use MyKingdoms to share, distribute, or link to any content that:</p>
            <ul>
              <li>Is illegal, harmful, threatening, abusive, harassing, or defamatory</li>
              <li>Infringes upon any patent, trademark, trade secret, copyright, or other intellectual property rights</li>
              <li>Contains viruses, malware, ransomware, or other harmful code</li>
              <li>Is sexually explicit, pornographic, or inappropriate for minors</li>
              <li>Promotes violence, discrimination, or hate speech based on race, gender, religion, nationality, sexual orientation, or disability</li>
              <li>Constitutes spam, phishing attempts, or deceptive practices</li>
              <li>Violates any individual's privacy rights</li>
              <li>Is involved in illegal gambling, drug trafficking, or other illicit activities</li>
              <li>Impersonates any person, entity, or organization</li>
            </ul>
            <p>Violation of this section may result in immediate account termination and potential reporting to appropriate authorities.</p>
          </section>

          <section id="intellectual-property" className="sp-legal-section">
            <h2>6. Intellectual Property</h2>
            <h3>Our Property</h3>
            <p>The MyKingdoms platform, including its design, features, code, branding, and documentation, is the intellectual property of MyKingdoms. You may not copy, modify, distribute, or create derivative works from our platform without explicit written permission.</p>
            <h3>Trademarks</h3>
            <p>"MyKingdoms" and related logos are trademarks of MyKingdoms. You may not use these trademarks without our prior written consent.</p>
          </section>

          <section id="creator-content" className="sp-legal-section">
            <h2>7. Creator Content</h2>
            <h3>Your Content</h3>
            <p>You retain ownership of all content you create and share through MyKingdoms ("Your Content"). By publishing content on our platform, you grant MyKingdoms a worldwide, non-exclusive, royalty-free license to host, display, and serve Your Content to visitors as necessary to operate the Service.</p>
            <h3>Content Responsibility</h3>
            <p>You are solely responsible for the accuracy, legality, and appropriateness of Your Content. We do not endorse, represent, or guarantee the accuracy of any content shared through our platform.</p>
            <h3>Content Removal</h3>
            <p>We reserve the right to remove any content that violates these Terms at our sole discretion, without prior notice. We will attempt to notify you when content is removed.</p>
          </section>

          <section id="monetization" className="sp-legal-section">
            <h2>8. Monetization and Advertising</h2>
            <p>MyKingdoms monetizes the platform by displaying Google AdSense advertisements on public link pages. As a creator, you acknowledge and agree that:</p>
            <ul>
              <li>Advertisements may be displayed to visitors of your public link pages</li>
              <li>You will not implement any mechanism to block, interfere with, or circumvent these advertisements</li>
              <li>Ad revenue from your pages goes to MyKingdoms to fund the free Service</li>
              <li>Premium plans remove advertising from your pages</li>
            </ul>
            <p>Creators on paid plans (Knight and King) will not have advertisements displayed on their pages.</p>
          </section>

          <section id="disclaimers" className="sp-legal-section">
            <h2>9. Disclaimers</h2>
            <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
            <p>We do not warrant that:</p>
            <ul>
              <li>The Service will be uninterrupted, timely, secure, or error-free</li>
              <li>The results obtained from using the Service will be accurate or reliable</li>
              <li>The quality of any content or information obtained through the Service will meet your expectations</li>
              <li>Any errors in the Service will be corrected</li>
            </ul>
          </section>

          <section id="limitation" className="sp-legal-section">
            <h2>10. Limitation of Liability</h2>
            <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, MYKINGDOMS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.</p>
            <p>In no event shall our total liability to you for all claims exceed the greater of $100 USD or the amount you have paid to us in the past 12 months.</p>
          </section>

          <section id="termination" className="sp-legal-section">
            <h2>11. Termination</h2>
            <p>Either party may terminate this agreement at any time. You may delete your account at any time from your dashboard. We may terminate or suspend your access to the Service immediately, without prior notice, for any reason, including if you violate these Terms.</p>
            <p>Upon termination, your right to use the Service ceases immediately. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, disclaimers, and limitations of liability.</p>
          </section>

          <section id="governing-law" className="sp-legal-section">
            <h2>12. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with applicable law. Any disputes arising from these Terms or your use of the Service shall be resolved through binding arbitration or in the courts of competent jurisdiction.</p>
            <p>If any provision of these Terms is found to be unenforceable, the remaining provisions will continue to be valid and enforceable.</p>
          </section>

          <section id="contact" className="sp-legal-section">
            <h2>13. Contact</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <div className="sp-contact-info">
              <p>📧 <strong>Email:</strong> <a href="mailto:legal@mykingdoms.tech">legal@mykingdoms.tech</a></p>
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
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/contact">Contact</Link>
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
        .static-page__hero-sub { max-width: 620px; margin: 0 auto 12px; font-size: 1.05rem; color: #94a3b8; line-height: 1.7; }
        .sp-last-updated { font-size: 0.82rem; color: #475569; }
        .sp-legal-content { padding: 40px 0 80px; display: flex; gap: 48px; align-items: flex-start; }
        .sp-toc { position: sticky; top: 100px; width: 240px; flex-shrink: 0; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 24px; }
        .sp-toc h3 { font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin-bottom: 16px; }
        .sp-toc ol { list-style: none; display: flex; flex-direction: column; gap: 8px; padding: 0; }
        .sp-toc a { color: #94a3b8; text-decoration: none; font-size: 0.82rem; transition: color 0.2s ease; }
        .sp-toc a:hover { color: #a855f7; }
        .sp-legal-body { flex: 1; display: flex; flex-direction: column; gap: 48px; }
        .sp-legal-section h2 { font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; font-weight: 700; margin-bottom: 16px; color: #f8fafc; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 12px; }
        .sp-legal-section h3 { font-size: 1rem; font-weight: 700; color: #c4b5fd; margin: 20px 0 10px; }
        .sp-legal-section p { font-size: 0.9rem; color: #94a3b8; line-height: 1.8; margin-bottom: 14px; }
        .sp-legal-section ul, .sp-legal-section ol { padding-left: 20px; display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px; }
        .sp-legal-section li { font-size: 0.875rem; color: #94a3b8; line-height: 1.7; }
        .sp-legal-section strong { color: #f8fafc; }
        .sp-legal-section a { color: #a855f7; text-decoration: none; }
        .sp-legal-section a:hover { text-decoration: underline; }
        .sp-contact-info { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 20px 24px; display: flex; flex-direction: column; gap: 10px; margin-top: 8px; }
        .sp-contact-info p { margin: 0; font-size: 0.9rem; }
        .sp-footer { background: rgba(255,255,255,0.02); border-top: 1px solid rgba(255,255,255,0.05); padding: 24px 0; }
        .sp-footer__inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; font-size: 0.82rem; color: #475569; }
        .sp-footer-links { display: flex; gap: 20px; }
        .sp-footer-links a { color: #475569; text-decoration: none; transition: color 0.2s ease; }
        .sp-footer-links a:hover { color: #a855f7; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
        @media (max-width: 900px) { .sp-legal-content { flex-direction: column; gap: 32px; } .sp-toc { position: static; width: 100%; } }
      `}</style>
    </div>
  );
}
