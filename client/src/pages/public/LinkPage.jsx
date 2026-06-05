import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';

/* ─── Share Modal ─────────────────────────────── */
const SHARE_PLATFORMS = [
  {
    id: 'copy', label: 'Copy Link', icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ), bg: '#374151', action: 'copy',
  },
  { id: 'twitter', label: 'X (Twitter)', icon: '𝕏', bg: '#000000', action: 'twitter' },
  { id: 'facebook', label: 'Facebook', icon: 'f', bg: '#1877f2', action: 'facebook' },
  { id: 'whatsapp', label: 'WhatsApp', icon: '💬', bg: '#25d366', action: 'whatsapp' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'in', bg: '#0a66c2', action: 'linkedin' },
  { id: 'telegram', label: 'Telegram', icon: '✈️', bg: '#229ed9', action: 'telegram' },
  { id: 'reddit', label: 'Reddit', icon: '🔴', bg: '#ff4500', action: 'reddit' },
];

function ShareModal({ url, title, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleShare = (platform) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    };
    if (urls[platform]) window.open(urls[platform], '_blank', 'noopener,noreferrer');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="lp-modal-overlay" onClick={onClose}>
      <div className="lp-share-modal" onClick={e => e.stopPropagation()}>
        <h3 className="lp-share-title">Share</h3>

        <div className="lp-share-platforms">
          {SHARE_PLATFORMS.map(p => (
            <button
              key={p.id}
              className="lp-share-platform"
              onClick={() => p.action === 'copy' ? handleCopy() : handleShare(p.action)}
              title={p.label}
            >
              <div className="lp-share-icon" style={{ background: p.id === 'copy' && copied ? '#10b981' : p.bg }}>
                {p.id === 'copy'
                  ? (copied
                    ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : p.icon)
                  : <span className="lp-share-emoji">{p.icon}</span>
                }
              </div>
              <span>{p.id === 'copy' && copied ? 'Copied!' : p.label}</span>
            </button>
          ))}
        </div>

        <div className="lp-share-url-bar">
          <input readOnly value={url} className="lp-share-url-input" />
          <button className="lp-share-copy-btn" onClick={handleCopy}>
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>

        <button className="lp-share-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

/* ─── Main LinkPage ───────────────────────────── */
export default function LinkPage() {
  const { id } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [completedActions, setCompletedActions] = useState({});
  const [unlocked, setUnlocked] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [activeCountdowns, setActiveCountdowns] = useState({});
  const [snippetCopied, setSnippetCopied] = useState(false);
  const intervalsRef = useRef({});

  const pageUrl = window.location.href;

  useEffect(() => {
    return () => {
      Object.values(intervalsRef.current).forEach(clearInterval);
    };
  }, []);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/links/${id}`);
        setLink(data.link);
        // If no actions, auto-unlock
        if (!data.link.actions || data.link.actions.length === 0) {
          setUnlocked(true);
        }
      } catch {
        setError('Link not found or has been removed.');
      } finally {
        setLoading(false);
      }
    };
    fetchLink();
  }, [id]);

  const handleAction = async (action, idx) => {
    if (intervalsRef.current[idx]) return;

    // Open the action URL in a new tab
    if (action.url) {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    }
    // Track click on the main link
    await api.post(`/links/click/${id}`).catch(() => {});

    // Start 10s countdown
    let secondsLeft = 10;
    setActiveCountdowns(prev => ({ ...prev, [idx]: secondsLeft }));

    intervalsRef.current[idx] = setInterval(() => {
      secondsLeft -= 1;
      if (secondsLeft <= 0) {
        clearInterval(intervalsRef.current[idx]);
        delete intervalsRef.current[idx];

        setActiveCountdowns(prev => {
          const next = { ...prev };
          delete next[idx];
          return next;
        });
        setCompletedActions(prev => {
          const next = { ...prev, [idx]: true };
          if (link.actions && Object.keys(next).length >= link.actions.length) {
            setUnlocked(true);
          }
          return next;
        });
      } else {
        setActiveCountdowns(prev => ({ ...prev, [idx]: secondsLeft }));
      }
    }, 1000);
  };

  const handleUnlock = () => {
    const lt = link?.linkType || 'url';
    if (unlocked) {
      if (lt === 'url' || lt === 'file') {
        window.open(link.url, '_blank', 'noopener,noreferrer');
      }
      // snippet: content is shown inline, no redirect needed
    }
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(link?.content || '').then(() => {
      setSnippetCopied(true);
      setTimeout(() => setSnippetCopied(false), 2000);
    });
  };

  const completedCount = Object.keys(completedActions).length;
  const totalActions = link?.actions?.length || 0;
  const progress = totalActions > 0 ? Math.round((completedCount / totalActions) * 100) : 100;

  if (loading) {
    return (
      <div className="lp-page lp-page--center">
        <div className="lp-spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="lp-page lp-page--center">
        <div className="lp-error-card">
          <div className="lp-error-icon">🔗</div>
          <h2>Link Not Found</h2>
          <p>{error}</p>
          <Link to="/" className="lp-back-btn">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="lp-page">
      {/* Background */}
      <div className="lp-bg-blob lp-bg-blob--1" />
      <div className="lp-bg-blob lp-bg-blob--2" />

      {/* Top bar */}
      <div className="lp-topbar">
        <Link to="/" className="lp-logo">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L28 8V16C28 22.627 22.627 28 16 28C9.373 28 4 22.627 4 16V8L16 2Z" fill="url(#lpg)"/>
            <path d="M11 12L16 8L21 12V20H11V12Z" fill="rgba(255,255,255,0.9)"/>
            <circle cx="16" cy="16" r="2.5" fill="url(#lpg)"/>
            <defs>
              <linearGradient id="lpg" x1="4" y1="2" x2="28" y2="28">
                <stop stopColor="#a855f7"/><stop offset="1" stopColor="#f59e0b"/>
              </linearGradient>
            </defs>
          </svg>
          <span>My<strong>Kingdoms</strong></span>
        </Link>

      </div>

      {/* Main card */}
      <div className="lp-card-wrap">
        <div className="lp-card">
          {/* Link title */}
          <h1 className="lp-card-title">{link.title}</h1>
          <p className="lp-card-sub">
            {unlocked
              ? (link.linkType === 'snippet' ? '📋 Snippet unlocked! Scroll down to see it.' :
                 link.linkType === 'file' ? '🎉 File unlocked! Click below to download.' :
                 '🎉 Link unlocked! Click below to visit.')
              : (link.linkType === 'file' ? 'Complete the actions to download the file' :
                 link.linkType === 'snippet' ? 'Complete the actions to reveal the snippet' :
                 'Complete the actions to unlock')}
          </p>

          {/* Action buttons */}
          {link.actions && link.actions.length > 0 && (
            <div className="lp-actions-list">
              {link.actions.map((action, idx) => {
                const done = completedActions[idx];
                const countdown = activeCountdowns[idx];
                const isCounting = countdown !== undefined;
                return (
                  <button
                    key={idx}
                    className={`lp-action-btn ${done ? 'lp-action-btn--done' : ''} ${isCounting ? 'lp-action-btn--counting' : ''}`}
                    style={{ '--action-color': done ? '#10b981' : (isCounting ? '#4b5563' : (action.color || '#7c3aed')) }}
                    onClick={() => handleAction(action, idx)}
                    disabled={done || isCounting}
                  >
                    {done ? (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Done!
                      </>
                    ) : isCounting ? (
                      <>
                        <span className="lp-action-spinner" />
                        Please wait {countdown}s...
                      </>
                    ) : (
                      <>
                        <span className="lp-action-icon">{action.icon}</span>
                        {action.label}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Progress */}
          {totalActions > 0 && (
            <div className="lp-progress-section">
              <div className="lp-progress-row">
                <span className="lp-progress-label">Unlock progress</span>
                <span className="lp-progress-count">{completedCount}/{totalActions} done</span>
              </div>
              <div className="lp-progress-track">
                <div className="lp-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {/* Unlock button / action — depends on link type */}
          {(() => {
            const lt = link?.linkType || 'url';
            if (lt === 'snippet' && unlocked) {
              return (
                <div className="lp-snippet-reveal">
                  <div className="lp-snippet-header">
                    <span>📋 Snippet revealed!</span>
                    <button className="lp-snippet-copy-btn" onClick={handleCopySnippet}>
                      {snippetCopied ? '✓ Copied!' : 'Copy'}
                    </button>
                  </div>
                  <pre className="lp-snippet-content">{link.content}</pre>
                </div>
              );
            }
            if (lt === 'file' && unlocked) {
              return (
                <a
                  className="lp-unlock-btn lp-unlock-btn--active lp-download-btn"
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2v14M8 12l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Download File →
                </a>
              );
            }
            return (
              <button
                className={`lp-unlock-btn ${unlocked ? 'lp-unlock-btn--active' : ''}`}
                onClick={handleUnlock}
                disabled={!unlocked}
              >
                {unlocked ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M7 11V7a5 5 0 0110 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Visit Link →
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    {lt === 'file' ? 'Unlock to download' : lt === 'snippet' ? 'Unlock to reveal' : 'Unlock link'}
                  </>
                )}
              </button>
            );
          })()}
        </div>

        {/* Share card below */}
        <div className="lp-share-card">
          <button className="lp-share-card-btn" onClick={() => setShowShare(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="18" cy="5" r="3" stroke="currentColor" strokeWidth="2"/>
              <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              <circle cx="18" cy="19" r="3" stroke="currentColor" strokeWidth="2"/>
              <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Share this link
          </button>
          <p className="lp-share-card-url">{pageUrl.length > 48 ? pageUrl.slice(0, 48) + '…' : pageUrl}</p>
        </div>
      </div>

      {/* Share modal */}
      {showShare && (
        <ShareModal
          url={pageUrl}
          title={link.title}
          onClose={() => setShowShare(false)}
        />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .lp-page {
          min-height: 100vh;
          background: #050816;
          font-family: 'Inter', sans-serif;
          color: #f8fafc;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow-x: hidden;
        }
        .lp-page--center { justify-content: center; }

        /* Blobs */
        .lp-bg-blob {
          position: fixed; border-radius: 50%;
          pointer-events: none; filter: blur(120px); z-index: 0;
        }
        .lp-bg-blob--1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%);
          top: -200px; left: -150px;
        }
        .lp-bg-blob--2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%);
          bottom: -100px; right: -100px;
        }

        /* Top bar */
        .lp-topbar {
          width: 100%; max-width: 640px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px;
          position: relative; z-index: 10;
        }
        .lp-logo {
          display: flex; align-items: center; gap: 8px;
          text-decoration: none; color: #f8fafc;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem; font-weight: 700;
        }
        .lp-logo strong {
          background: linear-gradient(135deg, #a855f7, #f59e0b);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .lp-topbar-actions { display: flex; align-items: center; gap: 10px; }
        .lp-share-trigger {
          display: flex; align-items: center; gap: 6px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: #94a3b8; font-size: 0.82rem; font-weight: 600;
          padding: 7px 14px; cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
        }
        .lp-share-trigger:hover { color: #f8fafc; background: rgba(255,255,255,0.1); }
        .lp-dots-btn {
          display: flex; flex-direction: column; align-items: center; gap: 3px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; padding: 8px 10px; cursor: pointer;
          transition: all 0.2s ease;
        }
        .lp-dots-btn span {
          display: block; width: 4px; height: 4px;
          background: #64748b; border-radius: 50%;
        }
        .lp-dots-btn:hover span { background: #a855f7; }

        /* Card */
        .lp-card-wrap {
          width: 100%; max-width: 480px;
          padding: 0 20px 40px;
          position: relative; z-index: 1;
          display: flex; flex-direction: column; gap: 16px;
        }
        .lp-card {
          background: #0d1628;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 32px 28px;
          display: flex; flex-direction: column; gap: 20px;
          box-shadow: 0 32px 64px rgba(0,0,0,0.5);
          animation: fadeInUp 0.5s ease both;
        }
        @keyframes fadeInUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }

        .lp-card-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem; font-weight: 700;
          text-align: center; color: #f8fafc;
          letter-spacing: -0.5px;
        }
        .lp-card-sub {
          text-align: center; color: #64748b;
          font-size: 0.875rem; margin-top: -12px;
        }

        /* Action buttons */
        .lp-actions-list { display: flex; flex-direction: column; gap: 10px; }
        .lp-action-btn {
          width: 100%; padding: 14px 20px;
          border-radius: 12px; border: none;
          background: var(--action-color, #7c3aed);
          color: #fff; font-size: 0.95rem; font-weight: 700;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        .lp-action-btn:hover:not(:disabled) { transform: translateY(-2px); filter: brightness(1.1); box-shadow: 0 10px 30px rgba(0,0,0,0.4); }
        .lp-action-btn--done { background: #065f46 !important; opacity: 0.8; cursor: default; }
        .lp-action-btn:disabled { cursor: default; }
        .lp-action-icon { font-size: 1.1rem; }
        .lp-action-btn--counting { opacity: 0.85; cursor: not-allowed; }
        .lp-action-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.25);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }

        /* Progress */
        .lp-progress-section { display: flex; flex-direction: column; gap: 8px; }
        .lp-progress-row { display: flex; justify-content: space-between; align-items: center; }
        .lp-progress-label { font-size: 0.82rem; color: #64748b; font-weight: 600; }
        .lp-progress-count { font-size: 0.82rem; color: #10b981; font-weight: 700; }
        .lp-progress-track {
          height: 4px; background: rgba(255,255,255,0.08);
          border-radius: 2px; overflow: hidden;
        }
        .lp-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #7c3aed, #10b981);
          border-radius: 2px;
          transition: width 0.6s ease;
        }

        /* Unlock button */
        .lp-unlock-btn {
          width: 100%; padding: 16px;
          border-radius: 12px; border: none;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          color: #475569; font-size: 1rem; font-weight: 700;
          font-family: 'Inter', sans-serif;
          cursor: not-allowed;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: all 0.4s ease;
        }
        .lp-unlock-btn--active {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border-color: transparent; color: #fff;
          cursor: pointer;
          box-shadow: 0 8px 28px rgba(124,58,237,0.5);
        }
        .lp-unlock-btn--active:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(124,58,237,0.6); }

        /* Share card */
        .lp-share-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 16px 20px;
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
        }
        .lp-share-card-btn {
          display: flex; align-items: center; gap: 8px;
          background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.3);
          border-radius: 9px; padding: 9px 16px;
          color: #c4b5fd; font-size: 0.875rem; font-weight: 600;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: all 0.2s ease; white-space: nowrap;
        }
        .lp-share-card-btn:hover { background: rgba(124,58,237,0.25); }
        .lp-share-card-url {
          font-size: 0.75rem; color: #334155;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }

        /* Spinner */
        .lp-spinner {
          width: 40px; height: 40px;
          border: 3px solid rgba(124,58,237,0.2);
          border-top-color: #a855f7;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* Error */
        .lp-error-card {
          text-align: center; padding: 40px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px; max-width: 360px;
        }
        .lp-error-icon { font-size: 3rem; margin-bottom: 16px; opacity: 0.4; }
        .lp-error-card h2 { font-size: 1.3rem; font-weight: 700; margin-bottom: 8px; }
        .lp-error-card p { color: #64748b; font-size: 0.9rem; margin-bottom: 20px; }
        .lp-back-btn {
          display: inline-block;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: #fff; text-decoration: none;
          padding: 10px 20px; border-radius: 9px;
          font-weight: 700; font-size: 0.875rem;
        }

        /* ── Share Modal ── */
        .lp-modal-overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(8px);
          display: flex; align-items: flex-end; justify-content: center;
          padding: 20px;
          animation: fadein 0.2s ease;
        }
        @keyframes fadein { from{opacity:0} to{opacity:1} }

        .lp-share-modal {
          background: #0f1729;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px 24px 20px 20px;
          width: 100%; max-width: 480px;
          padding: 28px 24px;
          display: flex; flex-direction: column; gap: 20px;
          animation: slideUp 0.3s ease;
          box-shadow: 0 -20px 60px rgba(0,0,0,0.6);
        }
        @keyframes slideUp { from{transform:translateY(40px);opacity:0} to{transform:translateY(0);opacity:1} }

        .lp-share-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.2rem; font-weight: 700; color: #f8fafc;
        }
        .lp-share-platforms {
          display: flex; gap: 16px; overflow-x: auto; padding-bottom: 4px;
        }
        .lp-share-platforms::-webkit-scrollbar { display: none; }
        .lp-share-platform {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          background: none; border: none; cursor: pointer;
          font-family: 'Inter', sans-serif; flex-shrink: 0;
          transition: transform 0.2s ease;
        }
        .lp-share-platform:hover { transform: translateY(-3px); }
        .lp-share-icon {
          width: 52px; height: 52px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem; font-weight: 900; color: #fff;
          transition: background 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }
        .lp-share-emoji { font-size: 1.3rem; }
        .lp-share-platform span:last-child {
          font-size: 0.72rem; color: #64748b;
          white-space: nowrap; text-align: center;
        }

        .lp-share-url-bar {
          display: flex; gap: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px; padding: 4px 4px 4px 14px;
          align-items: center;
        }
        .lp-share-url-input {
          flex: 1; background: none; border: none;
          color: #94a3b8; font-size: 0.82rem;
          font-family: 'Inter', sans-serif; outline: none;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .lp-share-copy-btn {
          padding: 8px 16px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border: none; border-radius: 7px;
          color: #fff; font-size: 0.82rem; font-weight: 700;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: all 0.2s ease; white-space: nowrap;
          flex-shrink: 0;
        }
        .lp-share-copy-btn:hover { box-shadow: 0 4px 12px rgba(124,58,237,0.4); }

        .lp-share-close {
          width: 100%; padding: 14px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; color: #94a3b8;
          font-size: 0.95rem; font-weight: 600;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
        }
        .lp-share-close:hover { background: rgba(255,255,255,0.09); color: #f8fafc; }

        /* Snippet reveal */
        .lp-snippet-reveal {
          display: flex; flex-direction: column; gap: 10px;
          animation: fadeInUp 0.4s ease;
        }
        .lp-snippet-header {
          display: flex; align-items: center; justify-content: space-between;
          font-size: 0.875rem; font-weight: 700; color: #10b981;
        }
        .lp-snippet-copy-btn {
          padding: 5px 16px;
          background: rgba(16,185,129,0.15);
          border: 1px solid rgba(16,185,129,0.3);
          border-radius: 7px; color: #34d399;
          font-size: 0.78rem; font-weight: 700;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
        }
        .lp-snippet-copy-btn:hover { background: rgba(16,185,129,0.25); }
        .lp-snippet-content {
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; padding: 16px 20px;
          font-size: 0.85rem; font-family: 'Courier New', monospace;
          color: #a5f3fc; white-space: pre-wrap; word-break: break-all;
          line-height: 1.7; max-height: 260px; overflow-y: auto;
        }

        /* File download button */
        .lp-download-btn {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          text-decoration: none;
          background: linear-gradient(135deg, #0ea5e9, #06b6d4) !important;
          border-color: transparent !important; color: #fff !important;
          box-shadow: 0 8px 28px rgba(6,182,212,0.45) !important;
          cursor: pointer;
        }
        .lp-download-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(6,182,212,0.6) !important; }

        @media (max-width: 480px) {
          .lp-card { padding: 24px 20px; }
          .lp-card-title { font-size: 1.3rem; }
          .lp-share-modal { border-radius: 24px 24px 0 0; }
          .lp-modal-overlay { padding: 0; align-items: flex-end; }
        }
      `}</style>
    </div>
  );
}
