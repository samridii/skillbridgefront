import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder, confirmOrder } from '../api/ordersApi';
import { useAuth } from '../context/AuthContext';
import OrderMessages from '../components/OrderMessages';
import LeaveReview from '../components/LeaveReview';
import RaiseDispute from '../components/RaiseDispute';

const STATUS_LABELS = {
  pending: 'Pending',
  in_progress: 'In progress',
  released: 'Completed',
  disputed: 'Disputed',
  cancelled: 'Cancelled',
};

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [confirming, setConfirming] = useState(false);
  const { user } = useAuth();

  const loadOrder = async () => {
    try {
      const res = await getOrder(id);
      setOrder(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Order not found');
    }
  };

  useEffect(() => {
    loadOrder();
  }, [id]);

  const handleConfirm = async () => {
    setConfirming(true);
    setError('');
    try {
      await confirmOrder(id);
      loadOrder(); // refetch, dont assume outcome locally, atomic backend logic decides real status
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to confirm');
    } finally {
      setConfirming(false);
    }
  };

  if (error) return <p className="error-text">{error}</p>;
  if (!order) return <p>Loading...</p>;

  const isBuyer = order.buyer === user?._id;
  const myConfirmed = isBuyer ? order.buyerConfirmed : order.sellerConfirmed;
  const canConfirm = order.status === 'in_progress' && !myConfirmed;

  return (
    <div className="fade-up card" style={{ maxWidth: '520px', margin: '2rem auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.4rem' }}>Order</h1>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          #{order._id.slice(-6)}
        </span>
      </div>

      <p style={{ marginBottom: '1.5rem' }}>
        Status: <strong style={{ color: order.status === 'released' ? 'var(--lime)' : 'var(--white)' }}>
          {STATUS_LABELS[order.status]}
        </strong>
      </p>

      <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
        <div>Buyer confirmed: {order.buyerConfirmed ? '✓' : '—'}</div>
        <div>Seller confirmed: {order.sellerConfirmed ? '✓' : '—'}</div>
      </div>

      {error && <p className="error-text">{error}</p>}

      {canConfirm && (
        <button onClick={handleConfirm} disabled={confirming} style={{ width: '100%' }}>
          {confirming ? 'Confirming...' : 'Confirm completion'}
        </button>
      )}
      {myConfirmed && order.status === 'in_progress' && (
        <p>Waiting for the other party to confirm.</p>
      )}
      <OrderMessages orderId={order._id} />

      {order.status === 'released' && isBuyer && (
        <LeaveReview orderId={order._id} onDone={loadOrder} />
      )}

      {(order.status === 'in_progress' || order.status === 'released') && (
        <RaiseDispute orderId={order._id} onDone={loadOrder} />
      )}
    </div>
    
  );
};

export default OrderDetail;