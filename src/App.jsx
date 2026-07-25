import { Routes, Route } from 'react-router-dom';
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
      </Routes>
    </Layout>
  );
}

const Home = () => (
  <div className="fade-up" style={{ textAlign: 'center', padding: '4rem 0' }}>
    <div className="stamp" style={{ margin: '0 auto 1.5rem' }}>✓</div>
    <h1>Find help from students who actually get it.</h1>
    <p style={{ maxWidth: '480px', margin: '0 auto' }}>
      Every seller on SkillBridge is a verified student at your university. Real accountability, no anonymous strangers.
    </p>
  </div>
);

export default App;