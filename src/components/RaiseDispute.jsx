import { useState } from 'react';
import { raiseDispute } from '../api/disputesApi';

const RaiseDispute = ({ orderId, onDone }) => {
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await raiseDispute(orderId, reason);
      setSubmitted(true);
      onDone?.();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to raise dispute');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return <p style={{ marginTop: '1rem' }}>Dispute raised, an admin will review it.</p>;

  if (!open) {
    return (
      <button className="secondary" style={{ marginTop: '1rem' }} onClick={() => setOpen(true)}>
        Raise a dispute
      </button>
    );
  }

  return (
    <div className="card" style={{ marginTop: '1.5rem' }}>
      <h3 style={{ marginTop: 0 }}>Raise a dispute</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.75rem' }}>
          <label>What went wrong?</label>
          <textarea rows={3} value={reason} onChange={(e) => setReason(e.target.value)} required minLength={10} maxLength={1000} />
        </div>
        {error && <p className="error-text">{error}</p>}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit dispute'}</button>
          <button type="button" className="secondary" onClick={() => setOpen(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default RaiseDispute;