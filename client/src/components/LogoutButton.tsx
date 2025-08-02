import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    // Можно добавить ещё user/email, если сохраняли
    window.dispatchEvent(new Event("storage")); // триггерим обновление авторизации везде
    navigate("/login");
  }

  return (
    <button onClick={handleLogout} style={{
      marginTop: 18,
      background: "#ea394f",
      color: "#fff",
      border: "none",
      borderRadius: 12,
      padding: "12px 0",
      width: "100%",
      fontWeight: 700,
      fontSize: 17,
      cursor: "pointer"
    }}>
      Logout
    </button>
  );
};

export default LogoutButton;
