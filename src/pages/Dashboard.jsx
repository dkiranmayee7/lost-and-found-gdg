// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../firebase";


function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    found: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const snapshot = await getDocs(collection(db, "lostItems"));
      const total = snapshot.size;
      const found = snapshot.docs.filter((doc) => doc.data().foundBy).length;
      const pending = total - found;
      setStats({ total, found, pending });
    };
    fetchStats();
  }, []);

  return (
    <div style={styles.container}>
      <h2>📊 Dashboard Summary</h2>
      <div style={styles.card}>Total Reports: {stats.total}</div>
      <div style={styles.card}>Items Found: {stats.found}</div>
      <div style={styles.card}>Pending Items: {stats.pending}</div>
    </div>
  );
}

const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#121212",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
      fontFamily: "Arial",
      textAlign: "center",
    },
    summaryBox: {
      backgroundColor: "#1e1e1e",
      color: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.4)",
      margin: "10px",
      width: "250px",
      textAlign: "center",
      border: "1px solid #333",
    },
    grid: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "20px",
      marginTop: "30px",
    },
  };
  

export default Dashboard;
