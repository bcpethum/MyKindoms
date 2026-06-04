import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/public/Home';
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
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />

        {/* Auth — redirect to dashboard if already logged in */}
        <Route path="/signin"       element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/signup"       element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/admin/login"  element={<GuestRoute><Login /></GuestRoute>} />

        {/* Protected */}
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
