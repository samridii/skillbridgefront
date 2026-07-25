import { useState, useEffect } from 'react';
import { listGigs } from '../api/gigsApi';
import GigCard from '../components/GigCard';

const CATEGORIES = ['all', 'tutoring', 'design', 'coding', 'writing', 'editing', 'other'];

const Gigs = () => {
  const [gigs, setGigs] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGigs = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await listGigs(category === 'all' ? null : category);
        setGigs(res.data);
      } catch (err) {
        setError('Failed to load gigs');
      } finally {
        setLoading(false);
      }
    };
    fetchGigs();
  }, [category]);

  return (
    <div>
      <h1>Browse gigs</h1>
      <div style={filterRow}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={category === c ? '' : 'secondary'}
            onClick={() => setCategory(c)}
            style={{ padding: '0.4em 1.1em', fontSize: '0.8rem' }}
          >
            {c}
          </button>
        ))}
      </div>

      {loading && <p>Loading gigs...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && gigs.length === 0 && (
        <p>No gigs found in this category yet.</p>
      )}

      <div style={gridStyle}>
        {gigs.map((gig) => (
          <GigCard key={gig._id} gig={gig} />
        ))}
      </div>
    </div>
  );
};

const filterRow = {
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
  marginBottom: '2rem',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  gap: '1.25rem',
};

export default Gigs;