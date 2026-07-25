import { Link } from 'react-router-dom';

const GigCard = ({ gig }) => {
  return (
    <Link to={`/gigs/${gig._id}`} className="card fade-up" style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={categoryTag}>{gig.category}</span>
        <span className="stamp" title="Verified student seller">✓</span>
      </div>
      <h3 style={{ margin: '0.75rem 0 0.4rem' }}>{gig.title}</h3>
      <p style={{ fontSize: '0.85rem', margin: 0 }}>{gig.description.slice(0, 90)}...</p>
      <div style={footerStyle}>
        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--lime)', fontWeight: 600 }}>
          ${gig.price}
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {gig.deliveryDays}d delivery
        </span>
      </div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
        by {gig.seller?.fullName || 'Verified student'}
      </div>
    </Link>
  );
};

const cardStyle = {
  display: 'block',
  color: 'var(--white)',
};

const categoryTag = {
  fontSize: '0.7rem',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: 'var(--text-muted)',
};

const footerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '1rem',
  paddingTop: '0.75rem',
  borderTop: '1px solid var(--glass-border)',
};

export default GigCard;