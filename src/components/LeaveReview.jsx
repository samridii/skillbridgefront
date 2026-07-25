import { useState } from 'react';
import { createReview } from '../api/reviewsApi';

const LeaveReview = ({ orderId, onDone }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createReview(orderId, rating, comment);
      setSubmitted(true);
      onDone?.();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return <p style={{ marginTop: '1rem' }}>Thanks for your review.</p>;

  return (
    <div className="card" style={{ marginTop: '1.5rem' }}>
      <h3 style={{ marginTop: 0 }}>Leave a review</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.75rem' }}>
          <label>Rating</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} star{n > 1 ? 's' : ''}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <label>Comment (optional)</label>
          <textarea rows={3} value={comment} onChange={(e) => setComment(e.target.value)} maxLength={1000} />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit review'}</button>
      </form>
    </div>
  );
};

export default LeaveReview;