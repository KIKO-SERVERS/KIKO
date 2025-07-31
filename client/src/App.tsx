import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import PrivacyPage from "./pages/PrivacyPage";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import BottomNav from "./components/BottomNav";  // ← ADD THIS LINE
import "./App.css";


const isLoggedIn = () => !!localStorage.getItem("token");

function App() {
  return (
    <Router>
      <nav>
        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>Profile</NavLink>
        <NavLink to="/privacy" className={({ isActive }) => isActive ? "active" : ""}>Privacy</NavLink>
        <NavLink to="/chat" className={({ isActive }) => isActive ? "active" : ""}>AI Chat</NavLink>
        {!isLoggedIn() && (
          <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>Login</NavLink>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route
          path="/profile"
          element={isLoggedIn() ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={isLoggedIn() ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={isLoggedIn() ? <Navigate to="/" /> : <LoginPage />}
        />
      </Routes>
      <BottomNav />
    </Router>
  );
}

export default App;
