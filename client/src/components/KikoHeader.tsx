import React from "react";
import logo from "../assets/kiko-robot.png";

const KikoHeader = () => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center', margin: '0 0 18px 0'
  }}>
    <img src={logo} alt="KIKO Robot" style={{
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: '#22263d',
      boxShadow: '0 4px 18px 0 #34a1ff33'
    }} />
    <span style={{
      fontSize: '2.1em',
      letterSpacing: 2,
      color: '#55f8e9',
      fontWeight: 700,
      fontFamily: 'Poppins, Arial, sans-serif'
    }}>
      KIKO AI
    </span>
  </div>
);

export default KikoHeader;
