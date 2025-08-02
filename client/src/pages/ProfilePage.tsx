import React, { useEffect, useState } from "react";
import KikoHeader from "../components/KikoHeader";
import myPhoto from "../assets/my-photo.png";
import { apiFetch } from "../api/authApi";
import LogoutButton from "../components/LogoutButton";
const ProfilePage = () => {
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    apiFetch("http://localhost:3000/auth/me")
      .then((data) => {
        if (mounted) setUser(data);
      })
      .catch((err) => {
        if (mounted) setError("Failed to load profile");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="kiko-card">
      <KikoHeader />
      <img
        src={myPhoto}
        alt="User Avatar"
        style={{
          width: 90,
          height: 90,
          borderRadius: "50%",
          margin: "12px auto 16px",
          border: "3px solid #55f8e9",
          background: "#22263d"
        }}
      />
      <h2 style={{margin:"15px 0 0 0"}}>
        {loading ? "Loading..." : user?.email || "Unknown User"}
      </h2>
      <p style={{margin:"8px 0 18px 0", color:"#7e92ce"}}>Main user</p>

      {error && <div style={{color: "red"}}>{error}</div>}

      <div style={{margin:"18px 0", background:"#202344", borderRadius:12, padding:16}}>
        <div style={{margin:"8px 0"}}><b>Next plan:</b> Remind to take medicine at 21:00</div>
      </div>
      <button
        onClick={() => alert("Edit profile feature coming soon!")}
        style={{
          background: "linear-gradient(90deg, #55f8e9 0%, #34a1ff 100%)",
          border: "none",
          borderRadius: 14,
          padding: "12px 0",
          width: "100%",
          fontWeight: 700,
          fontSize: 18,
          color: "#22263d",
          cursor: "pointer",
          marginTop: 16
        }}
      >Edit Profile</button>
      <LogoutButton />

    </div>
  );
};

export default ProfilePage;
