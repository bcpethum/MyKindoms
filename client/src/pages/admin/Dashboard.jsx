import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/authStore.jsx';
import api from '../../services/api';

/* ─── Icons ─────────────────────────────────── */
const Icon = ({ d, size = 18, stroke = 'currentColor', fill = 'none' }) => (
  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path d={d} stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ICONS = {
  link: 'M8 4H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-2M11 3h4m0 0v4m0-4L9 9',
  linkChain: 'M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71',
  bio: 'M4 6h16M4 10h16M4 14h10',
  analytics: 'M3 17l4-8 4 4 4-6 4 4',
  audience: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
  settings: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z',
  trash: 'M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6',
  edit: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z',
  copy: 'M8 4H6a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2h-2M8 4a2 2 0 012-2h2a2 2 0 012 2M8 4h6',
  external: 'M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3',
  plus: 'M12 5v14M5 12h14',
  check: 'M5 13l4 4L19 7',
  close: 'M18 6L6 18M6 6l12 12',
  logout: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
  eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z',
  crown: 'M2 17l3-9 5 4 2-7 2 7 5-4 3 9H2z',
  chart: 'M18 20V10M12 20V4M6 20v-6',
  globe: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z',
};

/* ─── Sidebar nav items ─── */
const NAV = [
  { id: 'links', label: 'Links', icon: ICONS.linkChain },
  { id: 'bio', label: 'Link-in-bio', icon: ICONS.bio },
  { id: 'analytics', label: 'Analytics', icon: ICONS.analytics },
  { id: 'audience', label: 'Audience', icon: ICONS.audience },
  { id: 'settings', label: 'Settings', icon: ICONS.settings },
];

/* ─── Action Catalog ─── */
const ACTION_CATALOG = [
  {
    category: '⚡ Popular',
    items: [
      { type: 'youtube_subscribe', label: 'YouTube Subscribe', icon: '▶️', color: '#ef4444', placeholder: 'https://youtube.com/@channel' },
      { type: 'follow_twitter', label: 'Follow on X', icon: '𝕏', color: '#1d9bf0', placeholder: 'https://x.com/username' },
      { type: 'follow_instagram', label: 'Follow Instagram', icon: '📸', color: '#e1306c', placeholder: 'https://instagram.com/username' },
      { type: 'follow_tiktok', label: 'Follow TikTok', icon: '🎵', color: '#010101', placeholder: 'https://tiktok.com/@username' },
      { type: 'join_discord', label: 'Join Discord', icon: '💬', color: '#5865f2', placeholder: 'https://discord.gg/invite' },
      { type: 'whatsapp', label: 'WhatsApp', icon: '💚', color: '#25d366', placeholder: 'https://wa.me/phonenumber' },
    ],
  },
  {
    category: '🌐 Social',
    items: [
      { type: 'follow_facebook', label: 'Follow Facebook', icon: '👥', color: '#1877f2', placeholder: 'https://facebook.com/page' },
      { type: 'follow_linkedin', label: 'Follow LinkedIn', icon: '💼', color: '#0a66c2', placeholder: 'https://linkedin.com/in/username' },
      { type: 'follow_twitch', label: 'Follow Twitch', icon: '🟣', color: '#9146ff', placeholder: 'https://twitch.tv/username' },
      { type: 'follow_spotify', label: 'Follow Spotify', icon: '🎧', color: '#1db954', placeholder: 'https://open.spotify.com/artist/...' },
      { type: 'follow_pinterest', label: 'Follow Pinterest', icon: '📌', color: '#e60023', placeholder: 'https://pinterest.com/username' },
      { type: 'follow_snapchat', label: 'Add Snapchat', icon: '👻', color: '#fffc00', placeholder: 'https://snapchat.com/add/username' },
    ],
  },
  {
    category: '🔗 General',
    items: [
      { type: 'visit_page', label: 'Visit a page', icon: '🌐', color: '#7c3aed', placeholder: 'https://example.com' },
      { type: 'watch_video', label: 'Watch a video', icon: '📺', color: '#ef4444', placeholder: 'https://youtube.com/watch?v=...' },
      { type: 'download_file', label: 'Download file', icon: '⬇️', color: '#06b6d4', placeholder: 'https://example.com/file.pdf' },
      { type: 'read_article', label: 'Read an article', icon: '📖', color: '#f59e0b', placeholder: 'https://blog.example.com/post' },
      { type: 'fill_form', label: 'Fill out a form', icon: '📝', color: '#10b981', placeholder: 'https://forms.example.com' },
    ],
  },
  {
    category: '🛒 Commerce',
    items: [
      { type: 'buy_product', label: 'Buy a product', icon: '🛍️', color: '#f59e0b', placeholder: 'https://shop.example.com/product' },
      { type: 'leave_review', label: 'Leave a review', icon: '⭐', color: '#eab308', placeholder: 'https://g.page/r/...' },
      { type: 'use_coupon', label: 'Use a coupon code', icon: '🎟️', color: '#8b5cf6', placeholder: 'Coupon code or URL' },
    ],
  },
];

/* ─── Action Selector Modal ─── */
function ActionSelectorModal({ onSelect, onClose }) {
  const [query, setQuery] = useState('');
  const filtered = ACTION_CATALOG.map(cat => ({
    ...cat,
    items: cat.items.filter(i => i.label.toLowerCase().includes(query.toLowerCase())),
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="action-modal-overlay" onClick={onClose}>
      <div className="action-modal" onClick={e => e.stopPropagation()}>
        <div className="action-modal__head">
          <h3>Select your action</h3>
          <button className="action-modal__close" onClick={onClose}>✕</button>
        </div>
        <div className="action-modal__search">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <circle cx="7" cy="7" r="5" stroke="#64748b" strokeWidth="1.5"/>
            <path d="M11 11l4 4" stroke="#64748b" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            autoFocus
            type="text"
            placeholder="Search platforms, actions..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="action-search-input"
          />
        </div>
        <div className="action-modal__body">
          {filtered.map(cat => (
            <div key={cat.category} className="action-category">
              <p className="action-category__label">{cat.category}</p>
              <div className="action-category__grid">
                {cat.items.map(item => (
                  <button
                    key={item.type}
                    className="action-chip"
                    style={{ '--chip-color': item.color }}
                    onClick={() => onSelect(item)}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="action-modal__empty">
              <p>No actions found for "{query}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Tiny toast ─── */
function Toast({ msg, type, onClose }) {
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [msg]);
  if (!msg) return null;
  return (
    <div className={`toast toast--${type}`}>
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        {type === 'success'
          ? <path d="M4 9l4 4 6-7" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          : <path d="M9 6v4M9 13h.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>}
      </svg>
      {msg}
      <button onClick={onClose}>×</button>
    </div>
  );
}

/* ─── Stat Card ─── */
function StatCard({ label, value, sub, color }) {
  return (
    <div className="stat-card">
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value" style={{ color }}>{value}</p>
      <p className="stat-card__sub">{sub}</p>
    </div>
  );
}

/* ─── Link Row ─── */
function LinkRow({ link, onEdit, onDelete, onToggle, onCopy }) {
  return (
    <div className={`link-row ${!link.active ? 'link-row--inactive' : ''}`}>
      <div className="link-row__drag" title="Drag to reorder">⠿</div>
      <div className="link-row__info">
        <div className="link-row__icon">
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
            <path d={ICONS.linkChain} stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p className="link-row__title">{link.title || 'Untitled'}</p>
          <p className="link-row__url">{link.url}</p>
        </div>
      </div>
      <div className="link-row__meta">
        <span className="link-row__clicks">
          <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
            <path d={ICONS.eye} stroke="#64748b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {link.clicks ?? 0} clicks
        </span>
        <label className="toggle-switch" title={link.active ? 'Disable' : 'Enable'}>
          <input type="checkbox" checked={link.active} onChange={() => onToggle(link)} />
          <span className="toggle-track" />
        </label>
        <button className="icon-btn" onClick={() => onCopy(`${window.location.origin}/link/${link._id}`)} title="Copy Page URL">
          <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
            <path d={ICONS.copy} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="icon-btn" onClick={() => onEdit(link)} title="Edit">
          <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
            <path d={ICONS.edit} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="icon-btn icon-btn--danger" onClick={() => onDelete(link._id)} title="Delete">
          <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
            <path d={ICONS.trash} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN DASHBOARD
   ════════════════════════════════════════════ */
export default function Dashboard() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState('links');
  const [linksTab, setLinksTab] = useState('overview'); // 'overview' | 'create'
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [links, setLinks] = useState([]);
  const [linksLoading, setLinksLoading] = useState(true);

  const [form, setForm] = useState({ title: '', url: '' });
  const [editingLink, setEditingLink] = useState(null);
  const [actions, setActions] = useState([]);
  const [showActionModal, setShowActionModal] = useState(false);

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ msg: '', type: 'success' });

  const formRef = useRef(null);

  /* ── Redirect if not logged in ── */
  useEffect(() => {
    if (!admin && !localStorage.getItem('mk_token')) navigate('/signin');
  }, [admin]);

  /* ── Fetch links ── */
  const fetchLinks = async () => {
    try {
      setLinksLoading(true);
      const { data } = await api.get('/links');
      setLinks(Array.isArray(data) ? data : data.links || []);
    } catch {
      setLinks([]);
    } finally {
      setLinksLoading(false);
    }
  };

  useEffect(() => { fetchLinks(); }, []);

  /* ── Helpers ── */
  const showToast = (msg, type = 'success') => setToast({ msg, type });
  const clearToast = () => setToast({ msg: '', type: 'success' });

  const setField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  /* ── Actions helpers ── */
  const addAction = (item) => {
    setActions(prev => [...prev, { ...item, actionUrl: '' }]);
    setShowActionModal(false);
  };
  const removeAction = (idx) => setActions(prev => prev.filter((_, i) => i !== idx));
  const updateActionUrl = (idx, val) => setActions(prev => prev.map((a, i) => i === idx ? { ...a, actionUrl: val } : a));

  const resetForm = () => {
    setForm({ title: '', url: '' });
    setEditingLink(null);
    setActions([]);
  };

  /* ── Create / Update ── */
  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.url.trim() || !form.title.trim()) return;

    // Auto-add https://
    let url = form.url.trim();
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;

    const payload = {
      ...form,
      url,
      actions: actions.map(a => ({
        type: a.type,
        label: a.label,
        url: a.actionUrl || '',
        icon: a.icon || '',
        color: a.color || '',
      })),
    };

    setSaving(true);
    try {
      let linkId = '';
      if (editingLink) {
        const res = await api.put(`/links/${editingLink._id}`, payload);
        linkId = res.data?.link?._id || editingLink._id;
        showToast('Link updated!');
      } else {
        const res = await api.post('/links', payload);
        linkId = res.data?.link?._id;
        showToast('Link created!');
      }
      resetForm();
      if (linkId) {
        navigate(`/link/${linkId}`);
      } else {
        setLinksTab('overview');
        fetchLinks();
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save link', 'error');
    } finally {
      setSaving(false);
    }
  };

  /* ── Delete ── */
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this link?')) return;
    try {
      await api.delete(`/links/${id}`);
      showToast('Link deleted');
      fetchLinks();
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  /* ── Toggle active ── */
  const handleToggle = async (link) => {
    try {
      await api.put(`/links/${link._id}`, { active: !link.active });
      fetchLinks();
    } catch {
      showToast('Failed to update', 'error');
    }
  };

  /* ── Open edit ── */
  const handleEdit = (link) => {
    setEditingLink(link);
    setForm({ title: link.title || '', url: link.url || '' });
    setActions((link.actions || []).map(a => ({ ...a, actionUrl: a.url })));
    setLinksTab('create');
    setTimeout(() => formRef.current?.querySelector('input')?.focus(), 100);
  };

  /* ── Copy URL ── */
  const handleCopy = (url) => {
    navigator.clipboard.writeText(url).then(() => showToast('URL copied!'));
  };

  /* ── Logout ── */
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  /* ── Stats ── */
  const totalClicks = links.reduce((s, l) => s + (l.clicks || 0), 0);
  const activeCount = links.filter((l) => l.active).length;

  /* ─── Render sections ─── */
  const renderLinks = () => (
    <div className="dash-main">
      {/* Header */}
      <div className="dash-header">
        <div className="dash-header__left">
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
            <path d={ICONS.linkChain} stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1>Links
            <span>{linksTab === 'create' ? (editingLink ? ' — Edit link' : ' — Create new link') : ''}</span>
          </h1>
        </div>
        <div className="dash-header__right">
          <button className="dash-btn dash-btn--primary" onClick={() => { resetForm(); setLinksTab('create'); }} id="dash-create-btn">
            <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
              <path d={ICONS.plus} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
            New Link
          </button>
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="dash-tabs">
        <button className={`dash-tab ${linksTab === 'overview' ? 'active' : ''}`} onClick={() => { resetForm(); setLinksTab('overview'); }}>
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
            <path d="M3 3h5v5H3zM10 3h5v5h-5zM3 10h5v5H3zM10 10h5v5h-5z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Overview
        </button>
        <button className={`dash-tab ${linksTab === 'create' ? 'active' : ''}`} onClick={() => { resetForm(); setLinksTab('create'); }}>
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
            <path d={ICONS.plus} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          {editingLink ? 'Edit' : 'Create'}
        </button>
      </div>

      {/* Content */}
      <div className="dash-body">
        {linksTab === 'overview' && (
          <>
            {/* Stats row */}
            <div className="stats-row">
              <StatCard label="Total Links" value={links.length} sub="in your kingdom" color="#a855f7"/>
              <StatCard label="Active" value={activeCount} sub="currently live" color="#10b981"/>
              <StatCard label="Total Clicks" value={totalClicks.toLocaleString()} sub="all time" color="#06b6d4"/>
              <StatCard label="Disabled" value={links.length - activeCount} sub="hidden links" color="#f59e0b"/>
            </div>

            {/* Links list */}
            <div className="links-section">
              <div className="links-section__head">
                <h2>All Links <span>({links.length})</span></h2>
                <p>Manage and track all your kingdom links</p>
              </div>

              {linksLoading ? (
                <div className="dash-loading">
                  <div className="dash-spinner" />
                  <span>Loading your kingdom...</span>
                </div>
              ) : links.length === 0 ? (
                <div className="dash-empty">
                  <div className="dash-empty__icon">🔗</div>
                  <h3>No links yet</h3>
                  <p>Create your first link to start building your kingdom</p>
                  <button className="dash-btn dash-btn--primary" onClick={() => setLinksTab('create')}>
                    Create First Link
                  </button>
                </div>
              ) : (
                <div className="links-list">
                  {links.map((link) => (
                    <LinkRow
                      key={link._id}
                      link={link}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onToggle={handleToggle}
                      onCopy={handleCopy}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {linksTab === 'create' && (
          <div className="create-layout">
            {/* Form panel */}
            <div className="create-form-panel" ref={formRef}>
              <form onSubmit={handleSave} className="create-form">
                {/* URL type selector */}
                <div className="type-tabs">
                  <button type="button" className="type-tab active">
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                      <path d={ICONS.linkChain} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    URL
                  </button>
                  <button type="button" className="type-tab">
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                      <path d="M3 4h12v10H3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 8h4M7 11h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    File
                  </button>
                  <button type="button" className="type-tab">
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                      <path d="M3 3h12v12H3zM7 7h4M7 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Snippet
                  </button>
                </div>

                {/* Fields */}
                <div className="cf-group">
                  <label className="cf-label">
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                      <path d={ICONS.linkChain} stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Destination URL <span>*</span>
                  </label>
                  <input
                    className="cf-input"
                    type="text"
                    placeholder="https://example.com"
                    value={form.url}
                    onChange={setField('url')}
                    required
                    id="create-url-input"
                  />
                </div>

                <div className="cf-group">
                  <label className="cf-label">
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                      <path d={ICONS.bio} stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                    Link Title <span>*</span>
                  </label>
                  <input
                    className="cf-input"
                    type="text"
                    placeholder="My Awesome Link"
                    value={form.title}
                    onChange={setField('title')}
                    required
                    id="create-title-input"
                  />
                </div>

                {/* ── ACTIONS SECTION ── */}
                <div className="actions-section">
                  <div className="actions-section__head">
                    <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                      <path d="M13 2L3 10h7l-1 6 8-10h-7l1-6z" stroke="#a855f7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>ACTIONS</span>
                    <span className="actions-section__hint">Visitors complete these to unlock your link</span>
                  </div>

                  {actions.length === 0 && (
                    <p className="actions-empty-hint">No actions yet — add one below to gate your link</p>
                  )}

                  {actions.map((action, idx) => (
                    <div key={idx} className="action-row">
                      <span className="action-row__num">{idx + 1}.</span>
                      <div className="action-row__body">
                        <div className="action-row__chip" style={{ borderColor: action.color + '55', background: action.color + '18' }}>
                          <span>{action.icon}</span>
                          <span style={{ color: action.color }}>{action.label}</span>
                        </div>
                        <input
                          className="cf-input cf-input--sm"
                          type="text"
                          placeholder={action.placeholder || 'Enter a URL'}
                          value={action.actionUrl || ''}
                          onChange={e => updateActionUrl(idx, e.target.value)}
                        />
                      </div>
                      <button type="button" className="action-row__delete" onClick={() => removeAction(idx)} title="Remove">
                        <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                          <path d={ICONS.trash} stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="add-action-btn"
                    onClick={() => setShowActionModal(true)}
                    id="add-action-btn"
                  >
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                      <path d={ICONS.plus} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
                    </svg>
                    Add action
                  </button>
                </div>

                {/* Save / Cancel row */}
                <div className="cf-actions">
                  <button type="button" className="dash-btn dash-btn--ghost" onClick={() => { resetForm(); setLinksTab('overview'); }}>
                    Cancel
                  </button>
                  <button type="submit" className="dash-btn dash-btn--primary" disabled={saving} id="create-save-btn">
                    {saving ? <span className="dash-spinner dash-spinner--sm" /> : null}
                    {saving ? 'Saving…' : (editingLink ? 'Update Link' : 'Create Link')}
                  </button>
                </div>
              </form>

              {/* Action selector modal */}
              {showActionModal && (
                <ActionSelectorModal
                  onSelect={addAction}
                  onClose={() => setShowActionModal(false)}
                />
              )}
            </div>

            {/* Preview panel */}
            <div className="preview-panel">
              <div className="preview-panel__head">
                <span>PREVIEW</span>
                <button
                  className="dash-btn dash-btn--primary dash-btn--sm"
                  disabled={saving || !form.url || !form.title}
                  onClick={handleSave}
                  id="preview-create-btn"
                >
                  <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
                    <path d={ICONS.check} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {editingLink ? 'Update' : 'Create'}
                </button>
              </div>

              <div className="preview-card">
                {form.url || form.title ? (
                  <>
                    {/* Link header */}
                    <div className="preview-link-header">
                      <h4 className="preview-link-title-lg">{form.title || 'Your Link'}</h4>
                      <p className="preview-link-sub">Complete the actions to unlock</p>
                    </div>

                    {/* Action buttons preview */}
                    {actions.length > 0 && (
                      <div className="preview-actions-list">
                        {actions.map((a, i) => (
                          <div
                            key={i}
                            className="preview-action-btn"
                            style={{ background: a.color || '#7c3aed' }}
                          >
                            <span>{a.icon}</span>
                            <span>{a.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Unlock progress */}
                    <div className="preview-unlock">
                      <div className="preview-progress-row">
                        <span className="preview-unlock__label">Unlock progress</span>
                        <span className="preview-progress__text preview-progress__text--green">
                          {actions.length > 0 ? `0/${actions.length} done` : '0/0 done'}
                        </span>
                      </div>
                      <div className="preview-progress">
                        <div className="preview-progress__bar" style={{ width: '0%' }} />
                      </div>
                      <button
                        className={`preview-unlock-btn ${form.title && form.url ? 'preview-unlock-btn--ready' : ''}`}
                        onClick={handleSave}
                        disabled={!form.title || !form.url || saving}
                      >
                        <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                          <path d="M13 8V6a4 4 0 00-8 0v2M5 8h8a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1V9a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Unlock link
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="preview-empty">
                    <div className="preview-empty-icon">🔗</div>
                    <p>Fill in the form to see a preview</p>
                  </div>
                )}
              </div>

              {/* Kingdom URL card */}
              <div className="kingdom-url-card">
                <p className="kingdom-url__label">Your Kingdom URL</p>
                <div className="kingdom-url__wrap">
                  <svg width="13" height="13" viewBox="0 0 18 18" fill="none">
                    <path d={ICONS.globe} stroke="#a855f7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>mykingdoms.tech/<strong>{admin?.username || 'you'}</strong></span>
                  <button onClick={() => handleCopy(`https://mykingdoms.tech/${admin?.username || 'you'}`)} className="copy-url-btn">
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="dash-main">
      <div className="dash-header">
        <div className="dash-header__left">
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
            <path d={ICONS.chart} stroke="#06b6d4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1>Analytics</h1>
        </div>
      </div>
      <div className="dash-body">
        <div className="stats-row">
          <StatCard label="Total Clicks" value={totalClicks.toLocaleString()} sub="all time" color="#06b6d4"/>
          <StatCard label="Active Links" value={activeCount} sub="generating traffic" color="#10b981"/>
          <StatCard label="Avg CTR" value={links.length ? Math.round((totalClicks / (links.length || 1)) * 10) / 10 : 0} sub="clicks per link" color="#a855f7"/>
          <StatCard label="Top Link" value={links.sort((a,b)=>(b.clicks||0)-(a.clicks||0))[0]?.title?.slice(0,10) || '—'} sub="most clicked" color="#f59e0b"/>
        </div>
        <div className="analytics-chart-area">
          <div className="chart-placeholder">
            <div className="chart-bars">
              {(links.length > 0 ? links : Array(5).fill({clicks:0,title:'—'})).slice(0,7).map((l,i)=>{
                const max = Math.max(...links.map(x=>x.clicks||0), 1);
                const h = Math.round(((l.clicks||0)/max)*100);
                return (
                  <div key={i} className="chart-bar-wrap">
                    <div className="chart-bar" style={{height:`${Math.max(h,4)}%`}} title={`${l.clicks||0} clicks`} />
                    <span className="chart-bar-label">{(l.title||'').slice(0,6) || `L${i+1}`}</span>
                  </div>
                );
              })}
            </div>
            <p className="chart-title">Clicks per Link</p>
          </div>
          {links.length > 0 && (
            <div className="top-links-table">
              <h3>Top Performing Links</h3>
              <table>
                <thead><tr><th>Title</th><th>URL</th><th>Clicks</th><th>Status</th></tr></thead>
                <tbody>
                  {[...links].sort((a,b)=>(b.clicks||0)-(a.clicks||0)).map(l=>(
                    <tr key={l._id}>
                      <td>{l.title}</td>
                      <td><a href={l.url} target="_blank" rel="noreferrer">{l.url.slice(0,30)}…</a></td>
                      <td><strong>{l.clicks||0}</strong></td>
                      <td><span className={`badge ${l.active?'badge--green':'badge--gray'}`}>{l.active?'Active':'Off'}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderBio = () => (
    <div className="dash-main">
      <div className="dash-header">
        <div className="dash-header__left">
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
            <path d={ICONS.bio} stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <h1>Link-in-bio</h1>
        </div>
        <div className="dash-header__right">
          <a href={`https://mykingdoms.tech/${admin?.username}`} target="_blank" rel="noreferrer" className="dash-btn dash-btn--ghost">
            <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
              <path d={ICONS.external} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            View Public Page
          </a>
        </div>
      </div>
      <div className="dash-body">
        <div className="bio-preview-wrap">
          <div className="bio-phone">
            <div className="bio-phone__screen">
              <div className="bio-profile">
                <div className="bio-avatar">👑</div>
                <h3>@{admin?.username || 'yourkingdom'}</h3>
                <p>Creator · Builder · King</p>
              </div>
              <div className="bio-links-preview">
                {links.filter(l=>l.active).slice(0,5).map((l,i)=>(
                  <div key={i} className="bio-link-item">
                    <span>🔗</span>
                    <span>{l.title}</span>
                  </div>
                ))}
                {links.filter(l=>l.active).length === 0 && (
                  <div className="bio-link-item bio-link-item--empty">No active links yet</div>
                )}
              </div>
            </div>
          </div>
          <div className="bio-info">
            <h2>Your Public Kingdom Page</h2>
            <p>This is what visitors see at your kingdom URL. Manage your links in the Links section to update what appears here.</p>
            <div className="bio-url-display">
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d={ICONS.globe} stroke="#a855f7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>mykingdoms.tech/<strong>{admin?.username || 'you'}</strong></span>
            </div>
            <div className="bio-actions">
              <button className="dash-btn dash-btn--primary" onClick={() => handleCopy(`https://mykingdoms.tech/${admin?.username}`)}>
                Copy Link
              </button>
              <button className="dash-btn dash-btn--ghost" onClick={() => setActiveNav('links')}>
                Manage Links →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="dash-main">
      <div className="dash-header">
        <div className="dash-header__left">
          <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
            <path d={ICONS.settings} stroke="#94a3b8" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1>Settings</h1>
        </div>
      </div>
      <div className="dash-body">
        <div className="settings-grid">
          <div className="settings-section">
            <h3>Account</h3>
            <div className="settings-field">
              <label>Username</label>
              <div className="settings-value">{admin?.username}</div>
            </div>
            <div className="settings-field">
              <label>Email</label>
              <div className="settings-value">{admin?.email}</div>
            </div>
          </div>
          <div className="settings-section">
            <h3>Danger Zone</h3>
            <p className="settings-danger-note">These actions are irreversible.</p>
            <button className="dash-btn dash-btn--danger" onClick={handleLogout}>
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                <path d={ICONS.logout} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeNav) {
      case 'links': return renderLinks();
      case 'bio': return renderBio();
      case 'analytics': return renderAnalytics();
      case 'audience': return <div className="dash-main"><div className="dash-header"><div className="dash-header__left"><h1>Audience</h1></div></div><div className="dash-body"><div className="dash-empty"><div className="dash-empty__icon">👥</div><h3>Coming Soon</h3><p>Audience insights will be available soon.</p></div></div></div>;
      case 'settings': return renderSettings();
      default: return renderLinks();
    }
  };

  return (
    <div className="dashboard">
      <Toast msg={toast.msg} type={toast.type} onClose={clearToast} />

      {/* ── Sidebar overlay (mobile) ── */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ── Sidebar ── */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
        {/* Logo */}
        <div className="sidebar__logo">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <path d="M16 2L28 8V16C28 22.627 22.627 28 16 28C9.373 28 4 22.627 4 16V8L16 2Z" fill="url(#dg)"/>
            <path d="M11 12L16 8L21 12V20H11V12Z" fill="rgba(255,255,255,0.9)"/>
            <circle cx="16" cy="16" r="2.5" fill="url(#dg)"/>
            <defs>
              <linearGradient id="dg" x1="4" y1="2" x2="28" y2="28">
                <stop stopColor="#a855f7"/><stop offset="1" stopColor="#f59e0b"/>
              </linearGradient>
            </defs>
          </svg>
          <span>My<strong>Kingdoms</strong></span>
        </div>

        {/* Primary nav */}
        <nav className="sidebar__nav">
          {NAV.slice(0, 3).map((item) => (
            <button
              key={item.id}
              className={`sidebar__nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}
              id={`nav-${item.id}`}
            >
              <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
                <path d={item.icon} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {item.label}
              {item.id === 'analytics' && <span className="sidebar__badge">Live</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar__divider">
          <span>Insights</span>
          <span className="sidebar__live-dot" />
        </div>

        <nav className="sidebar__nav">
          {NAV.slice(3).map((item) => (
            <button
              key={item.id}
              className={`sidebar__nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}
              id={`nav-${item.id}`}
            >
              <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
                <path d={item.icon} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom user */}
        <div className="sidebar__bottom">
          <div className="sidebar__upgrade">
            <div className="sidebar__upgrade-icon">⭐</div>
            <div>
              <p className="sidebar__upgrade-title">Upgrade to King</p>
              <p className="sidebar__upgrade-sub">Unlock full analytics</p>
            </div>
            <span className="sidebar__upgrade-badge">PRO</span>
          </div>
          <div className="sidebar__user">
            <div className="sidebar__user-avatar">{(admin?.username || 'K')[0].toUpperCase()}</div>
            <div className="sidebar__user-info">
              <p>{admin?.username || 'Admin'}</p>
              <p>{admin?.email || ''}</p>
            </div>
            <button className="sidebar__logout" onClick={handleLogout} title="Sign out">
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                <path d={ICONS.logout} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main area ── */}
      <main className="dash-content">
        {/* Mobile topbar */}
        <div className="mobile-topbar">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <span /><span /><span />
          </button>
          <span className="mobile-title">My<strong>Kingdoms</strong></span>
        </div>

        {renderContent()}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .dashboard {
          display: flex;
          min-height: 100vh;
          background: #050816;
          font-family: 'Inter', sans-serif;
          color: #f8fafc;
        }

        /* ══ SIDEBAR ══ */
        .sidebar {
          width: 240px;
          min-height: 100vh;
          background: #080f1e;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          flex-shrink: 0;
          z-index: 100;
          transition: transform 0.3s ease;
        }
        .sidebar__logo {
          display: flex; align-items: center; gap: 10px;
          padding: 20px 20px 16px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.05rem; font-weight: 700;
          color: #f8fafc;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 8px;
        }
        .sidebar__logo strong {
          background: linear-gradient(135deg, #a855f7, #f59e0b);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .sidebar__nav {
          display: flex; flex-direction: column; gap: 2px;
          padding: 4px 12px;
        }
        .sidebar__nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px;
          border-radius: 8px;
          border: none;
          background: none;
          color: #64748b;
          font-size: 0.88rem; font-weight: 500;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
          text-align: left;
          position: relative;
        }
        .sidebar__nav-item:hover { color: #94a3b8; background: rgba(255,255,255,0.04); }
        .sidebar__nav-item.active {
          color: #f8fafc;
          background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.2);
        }
        .sidebar__nav-item.active svg path { stroke: #a855f7; }
        .sidebar__badge {
          margin-left: auto;
          font-size: 0.62rem; font-weight: 700;
          background: rgba(16,185,129,0.15);
          color: #34d399;
          padding: 2px 6px; border-radius: 4px;
          border: 1px solid rgba(16,185,129,0.2);
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .sidebar__divider {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 20px 8px;
          font-size: 0.7rem; font-weight: 700;
          color: #334155; text-transform: uppercase; letter-spacing: 2px;
        }
        .sidebar__live-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #10b981;
          animation: pulse-glow 2s ease infinite;
          margin-left: auto;
        }
        .sidebar__bottom {
          margin-top: auto;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 12px;
        }
        .sidebar__upgrade {
          display: flex; align-items: center; gap: 10px;
          background: linear-gradient(135deg, rgba(124,58,237,0.15), rgba(245,158,11,0.08));
          border: 1px solid rgba(124,58,237,0.2);
          border-radius: 10px; padding: 12px;
          margin-bottom: 10px; cursor: pointer;
        }
        .sidebar__upgrade-icon { font-size: 1.2rem; }
        .sidebar__upgrade-title { font-size: 0.82rem; font-weight: 700; color: #f8fafc; }
        .sidebar__upgrade-sub { font-size: 0.72rem; color: #64748b; margin-top: 1px; }
        .sidebar__upgrade-badge {
          margin-left: auto; font-size: 0.62rem; font-weight: 800;
          background: linear-gradient(135deg, #7c3aed, #f59e0b);
          color: #fff; padding: 3px 7px; border-radius: 4px;
          letter-spacing: 1px;
        }
        .sidebar__user {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 4px;
        }
        .sidebar__user-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          display: flex; align-items: center; justify-content: center;
          font-weight: 700; font-size: 0.9rem; flex-shrink: 0;
        }
        .sidebar__user-info { flex: 1; overflow: hidden; }
        .sidebar__user-info p:first-child { font-size: 0.82rem; font-weight: 600; color: #f8fafc; truncate: ellipsis; white-space: nowrap; overflow: hidden; }
        .sidebar__user-info p:last-child { font-size: 0.72rem; color: #475569; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .sidebar__logout {
          background: none; border: none; color: #475569;
          cursor: pointer; padding: 4px; border-radius: 6px;
          transition: all 0.2s ease; display: flex;
        }
        .sidebar__logout:hover { color: #ef4444; background: rgba(239,68,68,0.1); }

        /* ══ MAIN CONTENT ══ */
        .dash-content {
          flex: 1; display: flex; flex-direction: column;
          min-width: 0; overflow-x: hidden;
        }
        .dash-main { flex: 1; display: flex; flex-direction: column; }

        /* ── Header ── */
        .dash-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 28px 0;
          gap: 16px;
        }
        .dash-header__left {
          display: flex; align-items: center; gap: 10px;
        }
        .dash-header__left h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.35rem; font-weight: 700;
          color: #f8fafc; letter-spacing: -0.5px;
        }
        .dash-header__left h1 span { color: #64748b; font-weight: 400; font-size: 1.1rem; }
        .dash-header__right { display: flex; gap: 10px; }

        /* ── Tabs ── */
        .dash-tabs {
          display: flex; gap: 4px;
          padding: 16px 28px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          margin-bottom: 0;
        }
        .dash-tab {
          display: flex; align-items: center; gap: 7px;
          padding: 10px 16px;
          background: none; border: none;
          color: #64748b;
          font-size: 0.875rem; font-weight: 500;
          cursor: pointer; font-family: 'Inter', sans-serif;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          transition: all 0.2s ease;
        }
        .dash-tab:hover { color: #94a3b8; }
        .dash-tab.active { color: #f8fafc; border-bottom-color: #a855f7; }

        /* ── Body ── */
        .dash-body { padding: 24px 28px; flex: 1; }

        /* ── Buttons ── */
        .dash-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 9px 18px;
          border-radius: 9px; border: none;
          font-size: 0.875rem; font-weight: 600;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: all 0.25s ease; text-decoration: none;
        }
        .dash-btn--primary {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: #fff;
          box-shadow: 0 4px 12px rgba(124,58,237,0.35);
        }
        .dash-btn--primary:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 20px rgba(124,58,237,0.5); }
        .dash-btn--primary:disabled { opacity: 0.6; cursor: not-allowed; }
        .dash-btn--ghost {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3b8;
        }
        .dash-btn--ghost:hover { background: rgba(255,255,255,0.09); color: #f8fafc; }
        .dash-btn--danger {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          color: #fca5a5;
        }
        .dash-btn--danger:hover { background: rgba(239,68,68,0.2); }
        .dash-btn--sm { padding: 6px 12px; font-size: 0.8rem; }

        /* ── Stats row ── */
        .stats-row {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 16px; margin-bottom: 24px;
        }
        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 20px;
          transition: all 0.3s ease;
        }
        .stat-card:hover { border-color: rgba(124,58,237,0.2); transform: translateY(-2px); }
        .stat-card__label { font-size: 0.78rem; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
        .stat-card__value { font-family: 'Space Grotesk', sans-serif; font-size: 2rem; font-weight: 700; line-height: 1; margin-bottom: 4px; }
        .stat-card__sub { font-size: 0.75rem; color: #475569; }

        /* ── Links section ── */
        .links-section__head { margin-bottom: 16px; }
        .links-section__head h2 {
          font-size: 1.05rem; font-weight: 700; color: #f8fafc; margin-bottom: 4px;
        }
        .links-section__head h2 span { color: #64748b; font-weight: 400; }
        .links-section__head p { font-size: 0.82rem; color: #475569; }

        /* ── Link rows ── */
        .links-list { display: flex; flex-direction: column; gap: 8px; }
        .link-row {
          display: flex; align-items: center; gap: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px; padding: 14px 16px;
          transition: all 0.25s ease;
        }
        .link-row:hover { border-color: rgba(124,58,237,0.25); background: rgba(124,58,237,0.04); }
        .link-row--inactive { opacity: 0.5; }
        .link-row__drag { color: #334155; font-size: 1.1rem; cursor: grab; line-height: 1; user-select: none; }
        .link-row__info { display: flex; align-items: center; gap: 12px; flex: 1; min-width: 0; }
        .link-row__icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.2);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .link-row__title { font-size: 0.9rem; font-weight: 600; color: #f8fafc; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 300px; }
        .link-row__url { font-size: 0.78rem; color: #475569; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 300px; }
        .link-row__meta { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .link-row__clicks { display: flex; align-items: center; gap: 4px; font-size: 0.78rem; color: #64748b; }

        /* ── Toggle switch ── */
        .toggle-switch { position: relative; display: inline-block; width: 36px; height: 20px; cursor: pointer; }
        .toggle-switch input { opacity: 0; width: 0; height: 0; }
        .toggle-track {
          position: absolute; inset: 0;
          background: #1e293b;
          border-radius: 10px;
          transition: background 0.25s ease;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .toggle-track::after {
          content: ''; position: absolute;
          width: 14px; height: 14px;
          background: #475569; border-radius: 50%;
          top: 2px; left: 2px;
          transition: all 0.25s ease;
        }
        .toggle-switch input:checked + .toggle-track { background: rgba(124,58,237,0.5); border-color: rgba(124,58,237,0.4); }
        .toggle-switch input:checked + .toggle-track::after { transform: translateX(16px); background: #a855f7; }

        /* ── Icon buttons ── */
        .icon-btn {
          width: 30px; height: 30px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 7px;
          color: #64748b;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease;
        }
        .icon-btn:hover { color: #f8fafc; background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.15); }
        .icon-btn--danger:hover { color: #fca5a5; background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.2); }

        /* ── Create layout ── */
        .create-layout { display: grid; grid-template-columns: 1fr 360px; gap: 24px; align-items: start; }
        .create-form-panel {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 24px;
        }
        .create-form { display: flex; flex-direction: column; gap: 20px; }

        /* Type tabs */
        .type-tabs { display: flex; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 10px; padding: 4px; gap: 4px; }
        .type-tab {
          flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 8px; border-radius: 7px; border: none;
          background: none; color: #64748b;
          font-size: 0.82rem; font-weight: 600;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
        }
        .type-tab.active {
          background: linear-gradient(135deg, rgba(124,58,237,0.3), rgba(168,85,247,0.2));
          color: #c4b5fd;
          border: 1px solid rgba(124,58,237,0.3);
        }

        /* Form fields */
        .cf-group { display: flex; flex-direction: column; gap: 8px; }
        .cf-label {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.8rem; font-weight: 700;
          color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;
        }
        .cf-label span { color: #a855f7; }
        .cf-input {
          width: 100%; padding: 12px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px; color: #f8fafc;
          font-size: 0.95rem; font-family: 'Inter', sans-serif;
          outline: none; transition: all 0.25s ease;
        }
        .cf-input::placeholder { color: #334155; }
        .cf-input:focus { border-color: rgba(124,58,237,0.5); background: rgba(124,58,237,0.05); box-shadow: 0 0 0 3px rgba(124,58,237,0.1); }

        /* Advanced */
        .cf-advanced summary { font-size: 0.82rem; color: #64748b; cursor: pointer; user-select: none; transition: color 0.2s ease; list-style: none; display: flex; align-items: center; gap: 6px; }
        .cf-advanced summary::before { content: '▸'; font-size: 0.7rem; }
        .cf-advanced[open] summary::before { content: '▾'; }
        .cf-advanced summary:hover { color: #94a3b8; }
        .cf-advanced__body { margin-top: 12px; padding: 14px; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px solid rgba(255,255,255,0.05); }
        .cf-advanced__note { font-size: 0.82rem; color: #475569; }
        .cf-actions { display: flex; gap: 10px; justify-content: flex-end; padding-top: 4px; }

        /* ── Preview Panel ── */
        .preview-panel {
          display: flex; flex-direction: column; gap: 16px; position: sticky; top: 20px;
        }
        .preview-panel__head {
          display: flex; align-items: center; justify-content: space-between;
          font-size: 0.72rem; font-weight: 700;
          color: #475569; letter-spacing: 2px; text-transform: uppercase;
        }
        .preview-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 20px;
          display: flex; flex-direction: column; gap: 16px;
        }
        .preview-link-card {
          display: flex; align-items: center; gap: 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 12px 14px;
        }
        .preview-link-icon { font-size: 1.2rem; }
        .preview-link-info { flex: 1; min-width: 0; }
        .preview-link-title { font-size: 0.88rem; font-weight: 600; color: #f8fafc; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .preview-link-url { font-size: 0.75rem; color: #475569; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .preview-unlock { display: flex; flex-direction: column; gap: 10px; }
        .preview-unlock__label { font-size: 0.8rem; color: #64748b; font-weight: 600; }
        .preview-progress { height: 4px; background: rgba(255,255,255,0.08); border-radius: 2px; overflow: hidden; }
        .preview-progress__bar { height: 100%; background: linear-gradient(90deg, #7c3aed, #a855f7); border-radius: 2px; transition: width 0.4s ease; }
        .preview-progress__text { font-size: 0.72rem; color: #64748b; text-align: right; }
        .preview-unlock-btn {
          width: 100%; padding: 11px;
          border-radius: 9px; border: none;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          color: #64748b;
          font-size: 0.875rem; font-weight: 600;
          cursor: pointer; font-family: 'Inter', sans-serif;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          transition: all 0.3s ease;
        }
        .preview-unlock-btn--ready {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: #fff; border-color: transparent;
          box-shadow: 0 6px 20px rgba(124,58,237,0.4);
        }
        .preview-unlock-btn--ready:hover { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(124,58,237,0.5); }
        .preview-unlock-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .preview-empty { text-align: center; padding: 20px; }
        .preview-empty-icon { font-size: 2rem; margin-bottom: 8px; opacity: 0.4; }
        .preview-empty p { font-size: 0.82rem; color: #475569; }

        /* Kingdom URL card */
        .kingdom-url-card {
          background: rgba(124,58,237,0.08);
          border: 1px solid rgba(124,58,237,0.2);
          border-radius: 12px; padding: 16px;
        }
        .kingdom-url__label { font-size: 0.72rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
        .kingdom-url__wrap {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.85rem; color: #94a3b8;
        }
        .kingdom-url__wrap strong { color: #c4b5fd; }
        .copy-url-btn {
          margin-left: auto; padding: 4px 12px;
          background: rgba(124,58,237,0.2); border: 1px solid rgba(124,58,237,0.3);
          border-radius: 6px; color: #c4b5fd;
          font-size: 0.75rem; font-weight: 600;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
        }
        .copy-url-btn:hover { background: rgba(124,58,237,0.3); }

        /* ── Loading / Empty ── */
        .dash-loading {
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          padding: 60px; color: #475569; font-size: 0.9rem;
        }
        .dash-spinner {
          width: 32px; height: 32px;
          border: 3px solid rgba(124,58,237,0.2);
          border-top-color: #a855f7;
          border-radius: 50%;
          animation: spin-slow 0.8s linear infinite;
        }
        .dash-spinner--sm { width: 16px; height: 16px; border-width: 2px; }
        .dash-empty {
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          padding: 60px; text-align: center;
        }
        .dash-empty__icon { font-size: 3rem; opacity: 0.4; }
        .dash-empty h3 { font-size: 1.1rem; font-weight: 700; color: #f8fafc; }
        .dash-empty p { font-size: 0.875rem; color: #475569; max-width: 300px; }

        /* ── Analytics ── */
        .analytics-chart-area { display: flex; flex-direction: column; gap: 24px; }
        .chart-placeholder {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 24px;
        }
        .chart-bars {
          display: flex; align-items: flex-end; gap: 12px;
          height: 160px; margin-bottom: 16px;
        }
        .chart-bar-wrap { display: flex; flex-direction: column; align-items: center; gap: 6px; flex: 1; height: 100%; justify-content: flex-end; }
        .chart-bar {
          width: 100%; background: linear-gradient(180deg, #a855f7, rgba(124,58,237,0.3));
          border-radius: 6px 6px 0 0;
          transition: height 0.5s ease;
          min-height: 4px;
        }
        .chart-bar-label { font-size: 0.7rem; color: #475569; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 60px; text-align: center; }
        .chart-title { font-size: 0.8rem; color: #475569; text-align: center; font-weight: 600; }
        .top-links-table {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 24px;
        }
        .top-links-table h3 { font-size: 1rem; font-weight: 700; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; font-size: 0.72rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.06); }
        td { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 0.875rem; color: #94a3b8; }
        td a { color: #a855f7; text-decoration: none; }
        td a:hover { text-decoration: underline; }
        td strong { color: #f8fafc; }
        .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; }
        .badge--green { background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.2); }
        .badge--gray { background: rgba(100,116,139,0.15); color: #94a3b8; border: 1px solid rgba(100,116,139,0.2); }

        /* ── Bio ── */
        .bio-preview-wrap { display: grid; grid-template-columns: auto 1fr; gap: 40px; align-items: center; }
        .bio-phone {
          width: 220px; height: 420px;
          background: #0f1729;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 32px;
          overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.5);
          flex-shrink: 0;
        }
        .bio-phone__screen { padding: 20px 16px; height: 100%; overflow-y: auto; }
        .bio-profile { text-align: center; margin-bottom: 16px; }
        .bio-avatar { font-size: 2.5rem; display: block; margin: 0 auto 8px; }
        .bio-profile h3 { font-size: 0.9rem; font-weight: 700; margin-bottom: 4px; }
        .bio-profile p { font-size: 0.72rem; color: #64748b; }
        .bio-links-preview { display: flex; flex-direction: column; gap: 8px; }
        .bio-link-item {
          display: flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px; padding: 8px 10px;
          font-size: 0.78rem; color: #f8fafc;
        }
        .bio-link-item--empty { justify-content: center; color: #475569; font-style: italic; }
        .bio-info h2 { font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; font-weight: 700; margin-bottom: 12px; }
        .bio-info p { color: #64748b; font-size: 0.9rem; line-height: 1.6; margin-bottom: 20px; }
        .bio-url-display { display: flex; align-items: center; gap: 8px; background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.2); border-radius: 10px; padding: 12px 16px; font-size: 0.9rem; color: #94a3b8; margin-bottom: 20px; }
        .bio-url-display strong { color: #c4b5fd; }
        .bio-actions { display: flex; gap: 12px; }

        /* ── Settings ── */
        .settings-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 700px; }
        .settings-section { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; padding: 24px; }
        .settings-section h3 { font-size: 1rem; font-weight: 700; margin-bottom: 16px; color: #f8fafc; }
        .settings-field { display: flex; flex-direction: column; gap: 4px; margin-bottom: 14px; }
        .settings-field label { font-size: 0.72rem; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700; }
        .settings-value { font-size: 0.9rem; color: #94a3b8; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 10px 14px; }
        .settings-danger-note { font-size: 0.82rem; color: #475569; margin-bottom: 16px; }

        /* ── Toast ── */
        .toast {
          position: fixed; top: 20px; right: 20px; z-index: 9999;
          display: flex; align-items: center; gap: 10px;
          background: #0f1729;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px; padding: 12px 16px;
          font-size: 0.875rem; color: #f8fafc;
          box-shadow: 0 16px 40px rgba(0,0,0,0.5);
          animation: fadeInRight 0.3s ease;
          max-width: 340px;
        }
        .toast--success { border-left: 3px solid #10b981; }
        .toast--error { border-left: 3px solid #ef4444; }
        .toast button { background: none; border: none; color: #475569; cursor: pointer; font-size: 1.1rem; margin-left: 4px; line-height: 1; }
        .toast button:hover { color: #94a3b8; }

        /* ── Mobile ── */
        .mobile-topbar {
          display: none;
          align-items: center; gap: 12px;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: #080f1e;
          position: sticky; top: 0; z-index: 50;
        }
        .mobile-menu-btn {
          background: none; border: none; cursor: pointer;
          display: flex; flex-direction: column; gap: 4px; padding: 4px;
        }
        .mobile-menu-btn span { display: block; width: 20px; height: 2px; background: #94a3b8; border-radius: 1px; }
        .mobile-title { font-family: 'Space Grotesk', sans-serif; font-size: 1rem; font-weight: 700; color: #f8fafc; }
        .mobile-title strong { background: linear-gradient(135deg, #a855f7, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .sidebar-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 99; backdrop-filter: blur(4px); }

        @keyframes fadeInRight { from { opacity:0; transform: translateX(20px); } to { opacity:1; transform: translateX(0); } }
        @keyframes fadeInUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes blob-morph { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }
        @keyframes pulse-glow { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes fadeInScale { from { opacity:0; transform: scale(0.95) translateY(10px); } to { opacity:1; transform: scale(1) translateY(0); } }

        /* ══ ACTIONS SECTION ══ */
        .actions-section {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 20px;
          display: flex; flex-direction: column; gap: 14px;
        }
        .actions-section__head {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.78rem; font-weight: 800;
          color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px;
        }
        .actions-section__hint {
          font-size: 0.72rem; font-weight: 400;
          color: #475569; letter-spacing: 0; text-transform: none;
          margin-left: 4px;
        }
        .actions-empty-hint {
          font-size: 0.82rem; color: #475569;
          font-style: italic; text-align: center;
          padding: 8px 0;
        }

        /* ── Action row ── */
        .action-row {
          display: flex; align-items: flex-start; gap: 10px;
        }
        .action-row__num {
          font-size: 0.82rem; color: #64748b; font-weight: 700;
          padding-top: 12px; flex-shrink: 0; width: 18px; text-align: right;
        }
        .action-row__body {
          flex: 1; display: flex; flex-direction: column; gap: 8px;
        }
        .action-row__chip {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 14px;
          border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.1);
          font-size: 0.85rem; font-weight: 600;
          width: 100%;
        }
        .action-row__delete {
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.15);
          border-radius: 8px;
          color: #ef4444; cursor: pointer;
          padding: 8px; display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease; flex-shrink: 0; margin-top: 8px;
        }
        .action-row__delete:hover { background: rgba(239,68,68,0.18); }

        /* ── Smaller input variant ── */
        .cf-input--sm { padding: 9px 12px; font-size: 0.875rem; }

        /* ── Add action button ── */
        .add-action-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: 11px;
          background: rgba(255,255,255,0.025);
          border: 1px dashed rgba(255,255,255,0.15);
          border-radius: 10px;
          color: #64748b; font-size: 0.875rem; font-weight: 600;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: all 0.25s ease;
        }
        .add-action-btn:hover {
          color: #a855f7;
          border-color: rgba(168,85,247,0.4);
          background: rgba(168,85,247,0.06);
        }

        /* ══ ACTION SELECTOR MODAL ══ */
        .action-modal-overlay {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

        .action-modal {
          background: #0d1628;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          width: 100%; max-width: 580px;
          max-height: 80vh;
          display: flex; flex-direction: column;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6);
          animation: fadeInScale 0.25s ease;
          overflow: hidden;
        }
        .action-modal__head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 24px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .action-modal__head h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.1rem; font-weight: 700; color: #f8fafc;
        }
        .action-modal__close {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; color: #94a3b8;
          width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 0.9rem;
          transition: all 0.2s ease;
        }
        .action-modal__close:hover { color: #f8fafc; background: rgba(255,255,255,0.1); }

        .action-modal__search {
          display: flex; align-items: center; gap: 10px;
          padding: 12px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .action-search-input {
          flex: 1; background: none; border: none;
          color: #f8fafc; font-size: 0.9rem;
          font-family: 'Inter', sans-serif; outline: none;
        }
        .action-search-input::placeholder { color: #475569; }

        .action-modal__body {
          overflow-y: auto; padding: 16px 20px 20px;
          display: flex; flex-direction: column; gap: 20px;
        }
        .action-modal__body::-webkit-scrollbar { width: 4px; }
        .action-modal__body::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.4); border-radius: 2px; }

        .action-modal__empty {
          text-align: center; padding: 32px;
          color: #475569; font-size: 0.9rem;
        }

        /* ── Action categories ── */
        .action-category { }
        .action-category__label {
          font-size: 0.72rem; font-weight: 800;
          color: #475569; text-transform: uppercase;
          letter-spacing: 1.5px; margin-bottom: 10px;
        }
        .action-category__grid {
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .action-chip {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 7px 14px;
          border-radius: 8px;
          border: 1px solid rgba(var(--chip-color, 124,58,237), 0.3);
          background: rgba(0,0,0,0.2);
          color: #f8fafc;
          font-size: 0.82rem; font-weight: 600;
          cursor: pointer; font-family: 'Inter', sans-serif;
          transition: all 0.2s ease;
          border-color: var(--chip-color, #7c3aed);
          border-width: 1px;
          border-style: solid;
          border-color: color-mix(in srgb, var(--chip-color, #a855f7) 40%, transparent);
        }
        .action-chip:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
          background: color-mix(in srgb, var(--chip-color, #a855f7) 15%, transparent);
        }

        /* ══ PREVIEW updates ══ */
        .preview-link-header {
          text-align: center; padding: 8px 0 4px;
        }
        .preview-link-title-lg {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.1rem; font-weight: 700; color: #f8fafc;
          margin-bottom: 4px;
        }
        .preview-link-sub {
          font-size: 0.78rem; color: #64748b;
        }
        .preview-actions-list {
          display: flex; flex-direction: column; gap: 8px;
        }
        .preview-action-btn {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 11px 16px;
          border-radius: 10px;
          color: #fff; font-size: 0.875rem; font-weight: 700;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .preview-progress-row {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 8px;
        }
        .preview-progress__text--green { color: #10b981 !important; font-weight: 600; }

        @media (max-width: 1024px) {
          .stats-row { grid-template-columns: repeat(2, 1fr); }
          .create-layout { grid-template-columns: 1fr; }
          .preview-panel { position: static; }
          .bio-preview-wrap { grid-template-columns: 1fr; }
          .settings-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .sidebar { position: fixed; left: 0; top: 0; transform: translateX(-100%); box-shadow: 8px 0 40px rgba(0,0,0,0.5); }
          .sidebar--open { transform: translateX(0); }
          .mobile-topbar { display: flex; }
          .stats-row { grid-template-columns: repeat(2, 1fr); }
          .link-row__meta { gap: 6px; }
          .link-row__clicks { display: none; }
          .dash-body { padding: 16px; }
          .dash-header { padding: 16px 16px 0; }
          .dash-tabs { padding: 12px 16px 0; }
          .action-modal { max-height: 90vh; }
        }
        @media (max-width: 480px) {
          .stats-row { grid-template-columns: 1fr 1fr; }
          .action-category__grid { gap: 6px; }
          .action-chip { font-size: 0.78rem; padding: 6px 10px; }
        }
      `}</style>
    </div>
  );
}