import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import PrivacyPage from "./pages/PrivacyPage";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import BottomNav from "./components/BottomNav";
import { refreshToken } from "./api/authApi";  // ← NEW!
import "./App.css";

const getIsLoggedIn = () => !!localStorage.getItem("token");

function App() {
  const [loggedIn, setLoggedIn] = useState(getIsLoggedIn());
  const [loading, setLoading] = useState(true);

  // Try refresh token on app load (refresh on expired/missing access_token)
  useEffect(() => {
    const tryRefresh = async () => {
      const token = localStorage.getItem("token");
      const refresh_token = localStorage.getItem("refresh_token");
      if (!token && refresh_token) {
        try {
          const data = await refreshToken(refresh_token);
          localStorage.setItem("token", data.access_token);
          setLoggedIn(true);
        } catch {
          setLoggedIn(false);
        }
      } else {
        setLoggedIn(getIsLoggedIn());
      }
      setLoading(false);
    };
    tryRefresh();
    // Sync state on localStorage change (logout/login in other tabs)
    const onStorage = () => setLoggedIn(getIsLoggedIn());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <nav>
        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>Profile</NavLink>
        <NavLink to="/privacy" className={({ isActive }) => isActive ? "active" : ""}>Privacy</NavLink>
        <NavLink to="/chat" className={({ isActive }) => isActive ? "active" : ""}>AI Chat</NavLink>
        {!loggedIn && (
          <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>Login</NavLink>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route
          path="/profile"
          element={loggedIn ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={loggedIn ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/" /> : <LoginPage onLogin={() => setLoggedIn(true)} />}
        />
      </Routes>
      <BottomNav />
    </Router>
  );
}

export default App;
