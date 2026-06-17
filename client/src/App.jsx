import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/public/Home';
import LinkPage from './pages/public/LinkPage';
import About from './pages/public/About';
import Privacy from './pages/public/Privacy';
import Terms from './pages/public/Terms';
import Contact from './pages/public/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import { useAuth } from './store/authStore.jsx';

/* ── Guards ── */
function ProtectedRoute({ children }) {
  const { admin } = useAuth();
  const token = localStorage.getItem('mk_token');
  if (!admin && !token) return <Navigate to="/signin" replace />;
  return children;
}

function GuestRoute({ children }) {
  const { admin } = useAuth();
  const token = localStorage.getItem('mk_token');
  if (admin || token) return <Navigate to="/admin/dashboard" replace />;
  return children;
}

export default function App() {
  const { checkingBypass } = useAuth();

  if (checkingBypass) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#090d16',
        color: '#94a3b8',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{
          border: '3px solid rgba(255,255,255,0.05)',
          borderTop: '3px solid #a855f7',
          borderRadius: '50%',
          width: '28px',
          height: '28px',
          animation: 'spin 0.8s linear infinite',
          marginBottom: '14px'
        }} />
        <span style={{ fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.8 }}>Initializing...</span>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />

        {/* Static content pages */}
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth — redirect to dashboard if already logged in */}
        <Route path="/signin" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/signup" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/admin/login" element={<GuestRoute><Login /></GuestRoute>} />

        {/* Protected */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        {/* Public link details */}
        <Route path="/link/:id" element={<LinkPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
