// src/pages/HomePage.tsx
const actions = [
  { emoji: "📚", label: "Tell me a Story", sub: "Bedtime, fairytales, or fun facts!" },
  { emoji: "🍲", label: "Find a Recipe", sub: "Let’s cook together!" },
  { emoji: "🎬", label: "Movie Time!", sub: "Start the projector and enjoy a film." },
  { emoji: "⏰", label: "Reminders", sub: "Set plans and never forget." }
];

export default function HomePage() {
  return (
    <div style={{ color: "#fff", padding: 20 }}>
      <h1 style={{ marginBottom: 12, fontWeight: 800, letterSpacing: 1 }}>
        👋 Hi, I'm KIKO! What would you like to do?
      </h1>
      <div style={{
        display: "grid",
        gap: 18,
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))"
      }}>
        {actions.map(({emoji, label, sub}) =>
          <div key={label} style={cardStyle}>
            <div style={{ fontSize: 38, marginBottom: 8 }}>{emoji}</div>
            <div style={{ fontWeight: 600 }}>{label}</div>
            <div style={{ color: "#AAA", fontSize: 14, marginTop: 4 }}>{sub}</div>
          </div>
        )}
      </div>
    </div>
  );
}
const cardStyle = {
  borderRadius: 20,
  background: "linear-gradient(135deg,#232040 60%,#25235d 100%)",
  boxShadow: "0 2px 16px #25235690",
  padding: 24,
  textAlign: "center",
  minHeight: 110,
  transition: "transform 0.2s",
  cursor: "pointer"
};
