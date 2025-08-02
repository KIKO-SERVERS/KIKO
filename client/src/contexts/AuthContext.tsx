import React, { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, register as apiRegister } from "../api/authApi";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem("refresh_token"));

  // On mount, try to "auto-login" from storage
  useEffect(() => {
    if (token) {
      // Here you could fetch user info or validate token
      setUser({ email: localStorage.getItem("email") || "" });
    }
  }, [token]);

  // Handle login
  async function handleLogin(email: string, password: string) {
    const res = await apiLogin(email, password);
    setToken(res.access_token);
    setRefreshToken(res.refresh_token);
    setUser({ email });
    localStorage.setItem("token", res.access_token);
    localStorage.setItem("refresh_token", res.refresh_token);
    localStorage.setItem("email", email);
  }

  // Handle logout
  function handleLogout() {
    setToken(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("email");
  }

  // Refresh token logic (simplified)
  async function refreshAccessToken() {
    if (!refreshToken) return;
    const res = await fetch("http://localhost:3000/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    if (res.ok) {
      const data = await res.json();
      setToken(data.access_token);
      localStorage.setItem("token", data.access_token);
      return data.access_token;
    } else {
      handleLogout();
    }
  }

  return (
    <AuthContext.Provider value={{
      user, token, refreshToken,
      login: handleLogin, logout: handleLogout,
      register: apiRegister,
      refreshAccessToken,
      isAuthenticated: !!token
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
