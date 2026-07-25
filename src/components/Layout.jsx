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
    <div>
      <nav style={navStyle}>
        <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 600 }}>
          SkillBridge
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link to="/gigs">Browse gigs</Link>
          {user ? (
            <>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--slate)' }}>
                {user.role}
              </span>
              <button className="secondary" onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/register">
                <button>Sign up</button>
              </Link>
            </>
          )}
        </div>
      </nav>
      <main className="container">{children}</main>
    </div>
  );
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  borderBottom: '1px solid var(--line)',
  background: 'var(--white)',
};

export default Layout;