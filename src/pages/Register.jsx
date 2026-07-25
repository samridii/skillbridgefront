import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { register } from '../api/authApi';

const Register = () => {
  const [form, setForm] = useState({ universityEmail: '', password: '', fullName: '' });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!captchaToken) {
      setError('Please complete the CAPTCHA');
      return;
    }

    setLoading(true);
    try {
      await register({ ...form, captchaToken });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fade-up" style={{ maxWidth: '400px', margin: '4rem auto', textAlign: 'center' }}>
        <div className="stamp" style={{ margin: '0 auto 1rem' }}>✓</div>
        <p>Account created. Your account is pending verification. Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="fade-up" style={{ maxWidth: '400px', margin: '3rem auto' }}>
      <h1 style={{ textAlign: 'center' }}>Register</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Full name</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>University email</label>
            <input name="universityEmail" type="email" value={form.universityEmail} onChange={handleChange} required />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Password</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={10} />
            <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              At least 10 characters, with uppercase, lowercase, number, and symbol
            </small>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              onChange={(token) => setCaptchaToken(token)}
              theme="dark"
            />
          </div>
          {error && <p className="error-text" role="alert">{error}</p>}
          <button type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
      </div>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Already have an account? <Link to="/login" style={{ color: 'var(--lime)' }}>Login</Link>
      </p>
    </div>
  );
};

export default Register;