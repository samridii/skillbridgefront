import { useState } from 'react';
import { setupMfa, verifyMfaSetup } from '../api/mfaApi';

const MfaSetup = () => {
  const [qrImage, setQrImage] = useState(null);
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const startSetup = async () => {
    setError('');
    try {
      const res = await setupMfa();
      setQrImage(res.data.qrImage);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to start MFA setup');
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await verifyMfaSetup(token);
      setDone(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid code');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="fade-up" style={{ maxWidth: '420px', margin: '3rem auto', textAlign: 'center' }}>
        <div className="stamp" style={{ margin: '0 auto 1rem' }}>✓</div>
        <h1>MFA enabled</h1>
        <p>Your account now requires a code from your authenticator app at login.</p>
      </div>
    );
  }

  return (
    <div className="fade-up" style={{ maxWidth: '420px', margin: '3rem auto' }}>
      <h1 style={{ textAlign: 'center' }}>Set up two factor authentication</h1>
      <div className="card">
        {!qrImage && (
          <>
            <p>Add an extra layer of security using an authenticator app like Google Authenticator or Authy.</p>
            <button onClick={startSetup} style={{ width: '100%' }}>Generate QR code</button>
          </>
        )}
        {qrImage && (
          <>
            <p>Scan this with your authenticator app, then enter the 6 digit code it shows.</p>
            <img src={qrImage} alt="MFA QR code" style={{ display: 'block', margin: '0 auto 1rem', maxWidth: '200px' }} />
            <form onSubmit={handleVerify}>
              <div style={{ marginBottom: '1rem' }}>
                <label>6 digit code</label>
                <input value={token} onChange={(e) => setToken(e.target.value)} maxLength={6} required />
              </div>
              {error && <p className="error-text">{error}</p>}
              <button type="submit" disabled={loading} style={{ width: '100%' }}>
                {loading ? 'Verifying...' : 'Confirm and enable'}
              </button>
            </form>
          </>
        )}
        {error && !qrImage && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
};

export default MfaSetup;