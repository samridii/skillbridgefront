import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Gigs from './pages/Gigs';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/gigs" element={<Gigs />} />
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