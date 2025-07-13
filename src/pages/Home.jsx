// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";




function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUsername(userSnap.data().username || "User");
        }
      }
    };

    fetchUsername();
  }, []);

  return (
    <div style={styles.container}>
      <h1>👋 Hi, {username}</h1>
      <p style={styles.text}>
        Welcome to the Lost & Found portal. Here, you can help reunite people with their missing belongings or report an item you've lost yourself.
      </p>
      <h3>What would you like to do?</h3>
      <div style={styles.buttonContainer}>
        <button onClick={() => navigate("/report-lost")} style={styles.button}>
          📍 Report Lost Item
        </button>
        <button onClick={() => navigate("/report-found")} style={styles.button}>
          🧾 Report Found Item
        </button>
        <button onClick={() => navigate("/view-items")} style={styles.viewBtn}>
          🔍 View All Lost Items
        </button>
      </div>
    </div>
  );
}
<button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>

const styles = {
  container: {
    textAlign: "center",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },
  text: {
    fontSize: "18px",
    margin: "20px auto",
    maxWidth: "600px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "30px",
  },
  button: {
    padding: "15px 30px",
    fontSize: "16px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  viewBtn: {
    padding: "15px 30px",
    fontSize: "16px",
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};


export default Home;
