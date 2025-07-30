import React from "react";
import KikoHeader from "../components/KikoHeader";
import myPhoto from "../assets/my-photo.png"; 

const ProfilePage = () => (
  <div className="kiko-card">
    <KikoHeader />
    <img
      src={myPhoto}
      alt="User Avatar"
      style={{
        width: 92,
        height: 92,
        borderRadius: "50%",
        margin: "12px auto 16px",
        border: "3px solid #55f8e9",
        background: "#22263d"
      }}
    />
    <h2 style={{margin:"18px 0 0 0"}}>Bufatima Nurmuhammad kyzy</h2>
    <p style={{margin:"8px 0 18px 0", color:"#7e92ce"}}>Main user</p>
    <div style={{margin:"18px 0", background:"#202344", borderRadius:12, padding:16}}>
      <div style={{margin:"8px 0"}}><b>KIKO roles:</b> Assistant, Storyteller, Timer, Calls</div>
      <div style={{margin:"8px 0"}}><b>Connected devices:</b> Projector, Lights, Music, Kitchen</div>
      <div style={{margin:"8px 0"}}><b>Next plan:</b> Remind to take medicine at 21:00</div>
    </div>
<button
  onClick={() => alert("Edit profile feature coming soon!")}
  style={{
    background: "linear-gradient(90deg, #55f8e9 0%, #34a1ff 100%)",
    border: "none",
    borderRadius: 14,
    padding: "14px 0",
    width: "100%",
    fontWeight: 700,
    fontSize: 18,
    color: "#22263d",
    cursor: "pointer",
    marginTop: 16
  }}
>Edit Profile</button>

  </div>
);

export default ProfilePage;
