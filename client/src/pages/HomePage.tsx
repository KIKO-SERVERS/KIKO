import React from "react";
import KikoHeader from "../components/KikoHeader";

const HomePage = () => (
  <div className="kiko-card">
    <KikoHeader />
    <h2 style={{ color: "#fff", fontSize: "2em", marginBottom: 18 }}>
      Welcome Home!
    </h2>
    <p style={{ fontSize: 18, color: "#c7e3fa", marginBottom: 28 }}>
      I am KIKO, your smart home assistant. I can tell a bedtime story, remind you of events, find a recipe, call your family, and help you with anything your household needs!
    </p>
    <div style={{
      background: "#202344",
      borderRadius: 14,
      padding: 20,
      marginBottom: 18,
      boxShadow: "0 2px 14px 0 #34a1ff17"
    }}>
      <b>Try a voice command:</b>
      <div style={{ margin: "12px 0 0 0", fontStyle: "italic", color: "#55f8e9" }}>
        "Kiko, tell a fairy tale!"<br />
        "Kiko, show me a pasta recipe"<br />
        "Kiko, turn on the kitchen lights"
      </div>
    </div>
<button
  onClick={() => alert("Feature coming soon!")}
  style={{
    background: "linear-gradient(90deg, #55f8e9 0%, #34a1ff 100%)",
    border: "none",
    borderRadius: 14,
    padding: "14px 0",
    width: "100%",
    fontWeight: 700,
    fontSize: 18,
    color: "#22263d",
    cursor: "pointer"
  }}
>Learn more about KIKO</button>

  </div>
);

export default HomePage;
