// src/api/authApi.ts

const API_URL = "http://localhost:3000";

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    let errMsg = "Login failed";
    try {
      const data = await res.json();
      if (data?.message) errMsg = data.message;
    } catch {}
    throw new Error(errMsg);
  }
  return res.json(); // Вернёт {access_token, refresh_token}
}

export async function register(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    let errMsg = "Registration failed";
    try {
      const data = await res.json();
      if (Array.isArray(data?.message)) errMsg = data.message.join(' ');
      else if (data?.message) errMsg = data.message;
    } catch {}
    throw new Error(errMsg);
  }
  return res.json();
}

// --- Новый код для refresh токена ---
export async function refreshToken(refresh_token: string) {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token }),
  });

  if (!res.ok) throw new Error("Token refresh failed");
  return res.json(); // { access_token: ... }
}

// --- Универсальный защищённый fetch ---
export async function apiFetch(url: string, options: any = {}) {
  let access_token = localStorage.getItem("token");
  let refresh_token = localStorage.getItem("refresh_token");

  options.headers = {
    ...options.headers,
    Authorization: access_token ? `Bearer ${access_token}` : undefined,
  };

  let res = await fetch(url, options);

  // Если access_token протух (401), пробуем refresh
  if (res.status === 401 && refresh_token) {
    try {
      const data = await refreshToken(refresh_token);
      localStorage.setItem("token", data.access_token);
      options.headers.Authorization = `Bearer ${data.access_token}`;
      res = await fetch(url, options);
    } catch {
      // Refresh не удался — выходим
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      window.location.href = "/login";
      throw new Error("Session expired, please log in again.");
    }
  }

  if (!res.ok) {
    let errMsg = "Request failed";
    try {
      const data = await res.json();
      if (data?.message) errMsg = data.message;
    } catch {}
    throw new Error(errMsg);
  }

  return res.json();
}
