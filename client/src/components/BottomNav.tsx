import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUser, FiMessageCircle, FiShield, FiLogIn } from "react-icons/fi";

const navStyle: React.CSSProperties = {
  position: 'fixed',
  left: 0, right: 0, bottom: 0,
  height: 40,
  background: '#232040',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  borderTop: '1.5px solid #292845',
  zIndex: 99
};

const linkStyle: React.CSSProperties = {
  flex: 1,
  textAlign: "center",
  color: "#aaa",
  paddingTop: 8,
  textDecoration: "none",
  fontSize: 13
};

const activeStyle: React.CSSProperties = {
  color: '#42FF86',
  fontWeight: 700
};

const isLoggedIn = () => !!localStorage.getItem("token");

const BottomNav = () => (
  <nav style={navStyle}>
    <NavLink to="/" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle }>
      <FiHome size={24} /><div>Home</div>
    </NavLink>
    <NavLink to="/chat" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle }>
      <FiMessageCircle size={24} /><div>AI Chat</div>
    </NavLink>
    <NavLink to="/profile" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle }>
      <FiUser size={24} /><div>Profile</div>
    </NavLink>
    <NavLink to="/privacy" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle }>
      <FiShield size={24} /><div>Privacy</div>
    </NavLink>
    {!isLoggedIn() && (
      <NavLink to="/login" style={({ isActive }) => isActive ? { ...linkStyle, ...activeStyle } : linkStyle }>
        <FiLogIn size={24} /><div>Login</div>
      </NavLink>
    )}
  </nav>
);

export default BottomNav;
