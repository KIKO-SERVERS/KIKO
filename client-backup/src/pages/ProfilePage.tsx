// src/pages/ProfilePage.tsx
const fakeUser = {
  name: "Sammy Smart",
  avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  mood: "😊",
  quote: "Always ready to help!"
};

export default function ProfilePage() {
  return (
    <div style={{ color: "#fff", padding: 20 }}>
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        background: "#232040", borderRadius: 20, padding: 24, marginBottom: 24
      }}>
        <img src={fakeUser.avatar} alt="avatar"
          style={{
            width: 92, height: 92, borderRadius: "50%",
            border: "3px solid #42FF86", marginBottom: 10
          }} />
        <div style={{ fontWeight: "bold", fontSize: 22 }}>{fakeUser.name} {fakeUser.mood}</div>
        <div style={{ color: "#42FF86", fontSize: 15, marginBottom: 8 }}>KIKO Family User</div>
        <div style={{ color: "#AAA", fontStyle: "italic", fontSize: 15 }}>{fakeUser.quote}</div>
      </div>
      <div style={{
        background: "#222040", borderRadius: 16, padding: 18
      }}>
        <b>My Reminders</b>
        <div style={{ marginTop: 10, color: "#ddd", fontSize: 16 }}>
          No reminders yet.<br />
          <span style={{ color: "#42FF86" }}>Try adding one from the Home page!</span>
        </div>
      </div>
    </div>
  );
}
