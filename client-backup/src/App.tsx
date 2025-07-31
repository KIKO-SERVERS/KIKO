import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PrivacyPage from './pages/PrivacyPage';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <Router>
      <div style={{
        background: 'linear-gradient(135deg,#1B1833 60%,#292845 100%)',
        minHeight: '100vh',
        paddingBottom: 80
      }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
        </Routes>
      </div>
      <BottomNav />
    </Router>
  );
}

export default App;
