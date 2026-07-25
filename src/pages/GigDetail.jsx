import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGig } from '../api/gigsApi';
import { createOrder } from '../api/ordersApi';
import { useAuth } from '../context/AuthContext';

const GigDetail = () => {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [error, setError] = useState('');
  const [orderError, setOrderError] = useState('');
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const handleOrder = async () => {
    setOrderError('');
    setOrdering(true);
    try {
      const res = await createOrder(gig._id);
      navigate(`/orders/${res.data._id}`);
    } catch (err) {
      setOrderError(err.response?.data?.error || 'Failed to place order');
    } finally {
      setOrdering(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  const isOwnGig = user && gig.seller?._id === user._id;
  const canOrder = user && user.role !== 'unverified' && !isOwnGig;

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', marginBottom: '1rem' }}>
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

      {orderError && <p className="error-text">{orderError}</p>}

      {!user && <p>Log in as a verified student to order this gig.</p>}
      {isOwnGig && <p>This is your own gig listing.</p>}
      {user && user.role === 'unverified' && <p>Complete verification to order gigs.</p>}
      {canOrder && (
        <button onClick={handleOrder} disabled={ordering} style={{ width: '100%' }}>
          {ordering ? 'Placing order...' : `Order for $${gig.price}`}
        </button>
      )}
    </div>
  );
};

export default GigDetail;