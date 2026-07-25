import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [universityEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login({ universityEmail, password });
      if (res.data.mfaRequired) {
        navigate('/mfa-verify'); // dont set user yet, session isnt fully trusted until mfa passes
        return;
      }
      setUser({ email: universityEmail, role: res.data.role });
      navigate('/');
    } catch (err) {
      // backend intentionally sends generic messages, we just display them as is
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '3rem auto' }}>
      <h1>Log in</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>University email</label>
            <input
              type="email"
              value={universityEmail}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-text" role="alert">{error}</p>}
          <button type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      </div>
      <p style={{ marginTop: '1rem' }}>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;