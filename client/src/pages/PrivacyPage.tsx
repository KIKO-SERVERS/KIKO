import React from "react";
import KikoHeader from "../components/KikoHeader";

const PrivacyPage = () => (
  <div className="kiko-card">
    <KikoHeader />
    <h2 style={{ color: "#fff", fontSize: "1.6em", marginBottom: 18 }}>
      Privacy & Security
    </h2>
    <div style={{
      background: "#202344",
      borderRadius: 14,
      padding: 20,
      marginBottom: 18,
      color: "#e8ebfd",
      fontSize: 17,
      textAlign: "left"
    }}>
      <b>KIKO AI cares about your safety!</b>
      <ul style={{marginTop:12}}>
        <li>Your voice commands are processed locally.</li>
        <li>Family data is never sent to outside servers.</li>
        <li>You control which devices are connected.</li>
        <li>KIKO never stores or records conversations without your permission.</li>
      </ul>
    </div>
    <div style={{fontSize:15, color:"#55f8e9", marginTop: 12}}>
      If you have privacy questions — just ask KIKO!
    </div>
  </div>
);

export default PrivacyPage;
