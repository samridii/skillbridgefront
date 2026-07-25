import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/authApi';

const Register = () => {
  const [form, setForm] = useState({ universityEmail: '', password: '', fullName: '' });
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
    setLoading(true);
    try {
      await register(form);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <p>Account created. Your account is pending verification. Redirecting to login...</p>;
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} required />
        </div>
        <div>
          <label>University Email</label>
          <input name="universityEmail" type="email" value={form.universityEmail} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={10} />
          <small>At least 10 characters, with uppercase, lowercase, number, and symbol</small>
        </div>
        {error && <p role="alert">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;