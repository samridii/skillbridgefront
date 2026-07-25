import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getGig } from '../api/gigsApi';

const GigDetail = () => {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await getGig(id);
        setGig(res.data);
      } catch (err) {
        setError('Gig not found');
      } finally {
        setLoading(false);
      }
    };
    fetchGig();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="fade-up card" style={{ maxWidth: '640px', margin: '2rem auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          {gig.category}
        </span>
        <span className="stamp" title="Verified student seller">✓</span>
      </div>
      <h1>{gig.title}</h1>
      <p>{gig.description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--lime)', fontSize: '1.5rem', fontWeight: 700 }}>
            ${gig.price}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
            · {gig.deliveryDays} day delivery
          </span>
        </div>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          by {gig.seller?.fullName || 'Verified student'}
        </span>
      </div>
    </div>
  );
};

export default GigDetail;