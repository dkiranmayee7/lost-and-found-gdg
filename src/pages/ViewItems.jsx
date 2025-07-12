// src/pages/ViewItems.jsx
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

function ViewItems() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const q = query(
      collection(db, "lostItems"),
      where("createdAt", ">=", thirtyDaysAgo)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(list);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={styles.container}>
      <h2>🧾 View Reported Items</h2>
      {items.length === 0 ? (
        <p>No items reported in the last 30 days.</p>
      ) : (
        <div style={styles.grid}>
          {items.map((item) => (
            <div key={item.id} style={styles.card}>
              <h3>{item.itemName}</h3>
              <button
                style={styles.claimBtn}
                onClick={() => navigate(`/claim/${item.id}`)}
              >
                Claim as Mine
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "30px", fontFamily: "Arial", maxWidth: "800px", margin: "auto" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" },
  card: { border: "1px solid #ccc", borderRadius: "8px", padding: "15px", backgroundColor: "#f2f2f2" },
  claimBtn: { marginTop: "10px", backgroundColor: "#1976d2", color: "#fff", padding: "8px", border: "none", cursor: "pointer" },
};

export default ViewItems;
