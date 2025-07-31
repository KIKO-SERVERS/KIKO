import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // Store token (simulate JWT)
    localStorage.setItem('token', 'FAKE-JWT-TOKEN');
    localStorage.setItem('username', username);
    // Redirect to Home or Chat
    navigate('/');
  }

  return (
    <div style={{ color: "#fff", display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 80 }}>
      <h2 style={{ fontSize: 26, marginBottom: 18 }}>Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: 250, gap: 18 }}>
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 8, border: '1px solid #444', fontSize: 16 }}
        />
        <button type="submit" style={{ padding: 10, borderRadius: 8, background: "#42FF86", border: 'none', fontWeight: 600 }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
