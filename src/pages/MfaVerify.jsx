import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyMfaLogin } from '../api/mfaApi';
import { getMe } from '../api/authApi';
import { useAuth } from '../context/AuthContext';

const MfaVerify = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await verifyMfaLogin(token);
      const me = await getMe(); // now that mfaPassed is true, session is fully trusted
      setUser(me.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-up" style={{ maxWidth: '380px', margin: '4rem auto' }}>
      <h1 style={{ textAlign: 'center' }}>Enter your code</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>6 digit authenticator code</label>
            <input value={token} onChange={(e) => setToken(e.target.value)} maxLength={6} required autoFocus />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MfaVerify;