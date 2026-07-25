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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>University Email</label>
          <input
            type="email"
            value={universityEmail}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p role="alert">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default Login;