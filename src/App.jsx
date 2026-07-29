import { Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Gigs from './pages/Gigs';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import VerifyIdentity from './pages/VerifyIdentity';
import CreateGig from './pages/CreateGig';
import GigDetail from './pages/GigDetail';
import OrderDetail from './pages/OrderDetail';
import MfaSetup from './pages/MfaSetup';
import MfaVerify from './pages/MfaVerify';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/gigs" element={<Gigs />} />
        <Route path="/gigs/:id" element={<GigDetail />} />
        <Route
          path="/verify"
          element={
            <ProtectedRoute>
              <VerifyIdentity />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gigs/new"
          element={
            <ProtectedRoute allowedRoles={['verified', 'admin']}>
              <CreateGig />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetail />
            </ProtectedRoute>
          }
        />
        <Route path="/mfa-verify" element={<MfaVerify />} />
        <Route
          path="/mfa-setup"
          element={
            <ProtectedRoute>
              <MfaSetup />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

const Home = () => (
  <div>
    <section className="fade-up" style={{ textAlign: 'center', padding: '5rem 0 4rem' }}>
      <div className="stamp" style={{ margin: '0 auto 1.5rem' }}>✓</div>
      <h1>Find help from students who actually get it.</h1>
      <p style={{ maxWidth: '480px', margin: '0 auto 2rem' }}>
        Every seller on SkillBridge is a verified student at your university. Real accountability, no anonymous strangers.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/gigs"><button>Browse gigs</button></Link>
        <Link to="/register"><button className="secondary">Become a seller</button></Link>
      </div>
    </section>

    <section style={{ padding: '3rem 0', borderTop: '1px solid var(--glass-border)' }}>
      <div style={featureGrid}>
        <FeatureCard
          number="01"
          title="Verified students only"
          text="Every seller uploads a real student ID, reviewed by an admin before they can post a gig."
        />
        <FeatureCard
          number="02"
          title="Escrow protected"
          text="Funds only release once both buyer and seller confirm the work is done."
        />
        <FeatureCard
          number="03"
          title="Real dispute resolution"
          text="Something go wrong? Admins step in and resolve it, not an algorithm."
        />
      </div>
    </section>

    <section className="card fade-up" style={{ textAlign: 'center', margin: '3rem 0', padding: '3rem 2rem' }}>
      <h2>Have a skill worth sharing?</h2>
      <p style={{ maxWidth: '420px', margin: '0 auto 1.5rem' }}>
        Tutoring, design, code, writing, whatever you're good at. Get verified and start earning from people on your own campus.
      </p>
      <Link to="/register"><button>Get started</button></Link>
    </section>
  </div>
);

const FeatureCard = ({ number, title, text }) => (
  <div className="card">
    <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--lime)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
      {number}
    </div>
    <h3 style={{ marginBottom: '0.4rem' }}>{title}</h3>
    <p style={{ margin: 0, fontSize: '0.9rem' }}>{text}</p>
  </div>
);

const featureGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '1.25rem',
};

export default App;