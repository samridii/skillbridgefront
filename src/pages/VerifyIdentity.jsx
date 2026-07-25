import { useState } from 'react';
import { uploadVerificationDoc } from '../api/verificationApi';
import { useAuth } from '../context/AuthContext';

const VerifyIdentity = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    setLoading(true);
    try {
      await uploadVerificationDoc(file);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  if (user?.role === 'verified' || user?.role === 'admin' || user?.role === 'moderator') {
    return (
      <div className="fade-up" style={{ maxWidth: '480px', margin: '3rem auto', textAlign: 'center' }}>
        <div className="stamp" style={{ margin: '0 auto 1rem' }}>✓</div>
        <h1>You're already verified</h1>
        <p>Your account has full access to post and order gigs.</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="fade-up" style={{ maxWidth: '480px', margin: '3rem auto', textAlign: 'center' }}>
        <h1>Document submitted</h1>
        <p>Your ID is now pending review by an admin. This usually takes 1-2 days.</p>
      </div>
    );
  }

  return (
    <div className="fade-up" style={{ maxWidth: '480px', margin: '3rem auto' }}>
      <h1 style={{ textAlign: 'center' }}>Verify your identity</h1>
      <p style={{ textAlign: 'center' }}>
        Upload a photo of your student ID so we can confirm you're a current student. Your document is encrypted and only visible to admins during review.
      </p>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Student ID (JPG, PNG, or PDF, max 5MB)</label>
            <input
              type="file"
              accept="image/jpeg,image/png,application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
          {error && <p className="error-text" role="alert">{error}</p>}
          <button type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Uploading...' : 'Submit for review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyIdentity;