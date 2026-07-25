import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../api/authApi';

const Layout = ({ children }) => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <nav style={navStyle}>
        <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
          SkillBridge
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/gigs" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Browse gigs</Link>
          {user ? (
            <>
              {user.role === 'unverified' ? (
                <Link to="/verify" style={{ fontSize: '0.85rem', color: 'var(--lime)' }}>Get verified</Link>
              ) : (
                <>
                  <span className="stamp">✓</span>
                  <Link to="/gigs/new" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Post a gig</Link>
                </>
              )}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {user.role}
              </span>
              <button className="secondary" onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Log in</Link>
              <Link to="/register"><button>Sign up</button></Link>
            </>
          )}
        </div>
      </nav>
      <main className="container">{children}</main>
    </div>
  );
};

const navStyle = {
  position: 'sticky',
  top: 0,
  zIndex: 100,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  background: 'rgba(6, 10, 26, 0.7)',
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid var(--glass-border)',
};

export default Layout;