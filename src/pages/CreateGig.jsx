import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGig } from '../api/gigsApi';

const CATEGORIES = ['tutoring', 'design', 'coding', 'writing', 'editing', 'other'];

const CreateGig = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'tutoring',
    price: '',
    deliveryDays: '',
  });
  const [error, setError] = useState('');
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
      const res = await createGig({
        ...form,
        price: Number(form.price),
        deliveryDays: Number(form.deliveryDays),
      });
      navigate(`/gigs/${res.data._id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create gig');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-up" style={{ maxWidth: '520px', margin: '3rem auto' }}>
      <h1 style={{ textAlign: 'center' }}>Post a gig</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Title</label>
            <input name="title" value={form.title} onChange={handleChange} required minLength={5} maxLength={100} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Description</label>
            <textarea name="description" rows={4} value={form.description} onChange={handleChange} required minLength={20} maxLength={2000} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Category</label>
            <select name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <label>Price ($)</label>
              <input name="price" type="number" min={1} max={10000} value={form.price} onChange={handleChange} required />
            </div>
            <div style={{ flex: 1 }}>
              <label>Delivery (days)</label>
              <input name="deliveryDays" type="number" min={1} max={90} value={form.deliveryDays} onChange={handleChange} required />
            </div>
          </div>
          {error && <p className="error-text" role="alert">{error}</p>}
          <button type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Posting...' : 'Post gig'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGig;