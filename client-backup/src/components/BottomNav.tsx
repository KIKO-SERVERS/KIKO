// src/components/BottomNav.tsx
import { NavLink } from 'react-router-dom';
import { FiHome, FiUser, FiShield } from 'react-icons/fi';

const navStyle = {
  position: 'fixed', left: 0, right: 0, bottom: 0, height: 62,
  display: 'flex', justifyContent: 'space-around', alignItems: 'center',
  background: '#232040', borderTop: '1.5px solid #292845', zIndex: 99
};

const linkStyle = { flex: 1, textAlign: "center", paddingTop: 4, color: "#aaa", textDecoration: "none" };
const activeStyle = { color: '#42FF86', fontWeight: 700 };

export default function BottomNav() {
  return (
    <nav style={navStyle as any}>
      <NavLink to="/" style={({isActive})=> isActive ? {...linkStyle, ...activeStyle} : linkStyle }>
        <FiHome size={26} />
        <div style={{ fontSize: 13 }}>Home</div>
      </NavLink>
      <NavLink to="/profile" style={({isActive})=> isActive ? {...linkStyle, ...activeStyle} : linkStyle }>
        <FiUser size={26} />
        <div style={{ fontSize: 13 }}>Profile</div>
      </NavLink>
      <NavLink to="/privacy" style={({isActive})=> isActive ? {...linkStyle, ...activeStyle} : linkStyle }>
        <FiShield size={26} />
        <div style={{ fontSize: 13 }}>Privacy</div>
      </NavLink>
    </nav>
  );
}
