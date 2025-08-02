import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function AuthPage() {
  const { login, register, isAuthenticated } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      if (mode === "login") {
        await login(email, password);
        setMessage("Login successful!");
        // Optionally, redirect or refresh here!
      } else {
        await register(email, password);
        setMessage("Registration successful! Please log in.");
      }
      setEmail("");
      setPassword("");
    } catch (err: any) {
      // Use error response from API if available
      if (err.message?.includes("409")) setError("Email already registered.");
      else if (err.message?.includes("400") || err.message?.includes("minLength")) setError("Password must be at least 6 characters.");
      else setError("Internal server error");
    }
  }

  // If already authenticated, redirect to main
  if (isAuthenticated) return <div style={{ color: "#42FF86", marginTop: 100 }}>You are already logged in!</div>;

  return (
    <div style={{
      color: "#fff", display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 80
    }}>
      <h2 style={{ fontSize: 32, marginBottom: 18 }}>{mode === "login" ? "Login" : "Register"}</h2>
      {message && (
        <div style={{ color: "#42FF86", textAlign: 'center', marginBottom: 16 }}>
          {message}
          {mode === "register" && (
            <div>
              <button onClick={() => setMode("login")} style={{
                marginTop: 12,
                background: "none", border: "none", color: "#42FF86", textDecoration: "underline", cursor: "pointer"
              }}>Go to Login</button>
            </div>
          )}
        </div>
      )}
      {!message && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: 350, gap: 18 }}>
          <input
            type="email"
            placeholder="Email"
            autoComplete="username"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ padding: 10, borderRadius: 8, border: '1px solid #444', fontSize: 16 }}
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            style={{ padding: 10, borderRadius: 8, border: '1px solid #444', fontSize: 16 }}
          />
          <button
            type="submit"
            style={{ padding: 10, borderRadius: 8, background: "#42FF86", border: 'none', fontWeight: 600 }}
          >
            {mode === "login" ? "Login" : "Register"}
          </button>
          {error && <div style={{ color: "salmon", textAlign: 'center' }}>{error}</div>}
        </form>
      )}
      <div style={{ marginTop: 24 }}>
        {mode === "login" ? (
          <>
            Don't have an account?{" "}
            <span style={{ color: "#42FF86", cursor: "pointer" }} onClick={() => { setMode("register"); setMessage(null); setError(null); }}>
              Register
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span style={{ color: "#42FF86", cursor: "pointer" }} onClick={() => { setMode("login"); setMessage(null); setError(null); }}>
              Login
            </span>
          </>
        )}
      </div>
    </div>
  );
}