import React, { useState } from 'react';
import { login, register } from '../api/authApi';

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      if (mode === 'login') {
        const res = await login(email, password);
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        setMessage('Login successful!');
        setLoading(false);
        if (onLogin) onLogin();
      } else {
        await register(email, password);
        setMessage('Registration successful! You can now log in.');
        setMode('login');
        setLoading(false);
      }
    } catch (e: any) {
      if (e.message.includes('400')) {
        setMessage('Password too short or bad email.');
      } else if (e.message.includes('409')) {
        setMessage('User with this email already exists.');
      } else if (e.message.includes('401')) {
        setMessage('Wrong email or password.');
      } else {
        setMessage('Error: ' + (e.message || 'Unknown'));
      }
      setLoading(false);
    }
  }

  return (
    <div style={{ color: "#fff", display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 80 }}>
      <h2 style={{ fontSize: 26, marginBottom: 18 }}>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: 250, gap: 18 }}>
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 8, border: '1px solid #444', fontSize: 16 }}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ padding: 10, borderRadius: 8, border: '1px solid #444', fontSize: 16 }}
        />
        <button type="submit" style={{ padding: 10, borderRadius: 8, background: "#42FF86", border: 'none', fontWeight: 600 }} disabled={loading}>
          {loading ? 'Loading...' : mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
      <div style={{ marginTop: 16 }}>
        {mode === 'login' ? (
          <span>
            Don't have an account?{' '}
            <button onClick={() => setMode('register')} style={{ color: "#42FF86", background: 'none', border: 'none', cursor: 'pointer' }}>
              Register
            </button>
          </span>
        ) : (
          <span>
            Already have an account?{' '}
            <button onClick={() => setMode('login')} style={{ color: "#42FF86", background: 'none', border: 'none', cursor: 'pointer' }}>
              Login
            </button>
          </span>
        )}
      </div>
      {message && (
        <div style={{ color: message.startsWith('Error') ? 'red' : '#42FF86', marginTop: 14 }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
