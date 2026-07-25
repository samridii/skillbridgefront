import { useState, useEffect } from 'react';
import { getPendingVerifications, approveUser, rejectUser, getDisputeQueue, resolveDispute, getVerificationDoc } from '../api/adminApi';

const AdminDashboard = () => {
  const [pending, setPending] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState('');
  const [docPreview, setDocPreview] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pendingRes, disputesRes] = await Promise.all([
        getPendingVerifications(),
        getDisputeQueue(),
      ]);
      setPending(pendingRes.data);
      setDisputes(disputesRes.data);
    } catch (err) {
      setActionError('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (userId) => {
    setActionError('');
    try {
      await approveUser(userId);
      loadData(); // refetch, keeps the ui in sync with real backend state rather than guessing
    } catch (err) {
      setActionError(err.response?.data?.error || 'Approval failed');
    }
  };

  const handleReject = async (userId) => {
    setActionError('');
    try {
      await rejectUser(userId);
      loadData();
    } catch (err) {
      setActionError(err.response?.data?.error || 'Rejection failed');
    }
  };

  const handleResolve = async (disputeId, resolution) => {
    setActionError('');
    try {
      await resolveDispute(disputeId, resolution, '');
      loadData();
    } catch (err) {
      setActionError(err.response?.data?.error || 'Resolution failed');
    }
  };

  const handleViewDoc = async (userId) => {
    setActionError('');
    try {
      const url = await getVerificationDoc(userId);
      setDocPreview(url);
    } catch (err) {
      setActionError('Failed to load document');
    }
  };

  if (loading) return <p>Loading admin dashboard...</p>;

  return (
    <div className="fade-up">
      <h1>Admin dashboard</h1>
      {actionError && <p className="error-text">{actionError}</p>}

      {docPreview && (
        <div className="card" style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Document preview</h3>
            <button className="secondary" onClick={() => setDocPreview(null)}>Close</button>
          </div>
          <img src={docPreview} alt="Uploaded student ID" style={{ maxWidth: '100%', borderRadius: '8px' }} />
        </div>
      )}

      <section style={{ marginBottom: '2.5rem' }}>
        <h2>Pending verifications</h2>
        {pending.length === 0 && <p>No accounts waiting on review.</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {pending.map((u) => (
            <div key={u._id} className="card" style={rowStyle}>
              <div>
                <strong>{u.fullName}</strong>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {u.universityEmail}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="secondary" onClick={() => handleViewDoc(u._id)}>View ID</button>
                <button onClick={() => handleApprove(u._id)}>Approve</button>
                <button className="secondary" onClick={() => handleReject(u._id)}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Open disputes</h2>
        {disputes.length === 0 && <p>No open disputes.</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {disputes.map((d) => (
            <div key={d._id} className="card" style={rowStyle}>
              <div>
                <strong>Order {d.order?._id?.slice(-6) || 'unknown'}</strong>
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem' }}>{d.reason}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleResolve(d._id, 'resolved_buyer')}>Favor buyer</button>
                <button onClick={() => handleResolve(d._id, 'resolved_seller')}>Favor seller</button>
                <button className="secondary" onClick={() => handleResolve(d._id, 'dismissed')}>Dismiss</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '1rem',
};

export default AdminDashboard;