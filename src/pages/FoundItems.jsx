// src/pages/FoundItems.jsx
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";


function FoundItems() {
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "lostItems"), where("foundBy", "!=", null));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFoundItems(items);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={styles.container}>
      <h2>✅ Found Items</h2>
      {foundItems.length === 0 ? (
        <p>No items have been marked as found yet.</p>
      ) : (
        <div style={styles.grid}>
          {foundItems.map((item) => (
            <div key={item.id} style={styles.card}>
              <h3>{item.itemName}</h3>
              {item.imageUrl && (
                <img src={item.imageUrl} alt="Item" style={styles.image} />
              )}
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Date:</strong> {item.date}</p>
              <p><strong>Time:</strong> {item.time}</p>
              <p><strong>Identifier:</strong> {item.identifier}</p>
              <p style={{ color: "green" }}>
                ✅ Found by <strong>{item.foundBy || "Unknown"}</strong>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
    color: "white",
    padding: "30px",
    fontFamily: "Arial",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "20px",
    width: "100%",
    maxWidth: "1000px",
  },
  card: {
    border: "1px solid #333",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#1e1e1e",
    color: "white",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
  },
  image: {
    maxWidth: "100%",
    borderRadius: "6px",
    marginBottom: "10px",
    border: "1px solid #555",
  },
};

export default FoundItems;
