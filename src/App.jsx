import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  );
}

const Home = () => (
  <div>
    <h1>Find help from students who actually get it.</h1>
    <p>Every seller on SkillBridge is a verified student at your university. Real accountability, real accountability, no anonymous strangers.</p>
  </div>
);

export default App;