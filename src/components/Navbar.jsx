import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

function Navbar() {
  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>🔎 Lost & Found</div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>🏠 Home</Link>
        <Link to="/dashboard" style={styles.link}>📊 Dashboard</Link>
        <Link to="/found-items" style={styles.link}>📦 Found Items</Link>
        <button onClick={handleLogout} style={styles.logoutBtn}>🚪 Logout</button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#1e1e1e",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 999,
  },
  logo: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  links: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
  },
  logoutBtn: {
    backgroundColor: "#d32f2f",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Navbar;
