// src/pages/ClaimForm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "../styles.css";

function ClaimForm() {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const [claimedName, setClaimedName] = useState("");
  const [claimedDescription, setClaimedDescription] = useState("");
  const [originalItem, setOriginalItem] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setCurrentUser(user);
      else navigate("/login");
    });
  }, [navigate]);

  useEffect(() => {
    const fetchItem = async () => {
      const itemRef = doc(db, "lostItems", itemId);
      const itemSnap = await getDoc(itemRef);
      if (itemSnap.exists()) {
        setOriginalItem(itemSnap.data());
      } else {
        alert("Item not found.");
        navigate("/view-items");
      }
    };
    fetchItem();
  }, [itemId, navigate]);

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    const matched =
      claimedName.trim().toLowerCase() === originalItem.itemName.toLowerCase() &&
      originalItem.description.toLowerCase().includes(claimedDescription.trim().toLowerCase());

    if (matched) {
      try {
        await updateDoc(doc(db, "lostItems", itemId), {
          foundBy: currentUser.displayName || currentUser.email,
          foundAt: serverTimestamp(),
        });
        alert("✅ Match confirmed! Marked as found by you.");
        navigate("/found-items");
      } catch (err) {
        console.error("Error updating:", err);
        alert("❌ Something went wrong while claiming.");
      }
    } else {
      alert("❌ Claim details do not match.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>🔍 Claim This Item</h2>
      <form onSubmit={handleClaimSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Item Name"
          value={claimedName}
          onChange={(e) => setClaimedName(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Describe the item"
          value={claimedDescription}
          onChange={(e) => setClaimedDescription(e.target.value)}
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Submit Claim</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    color: "white",
    padding: "30px",
    fontFamily: "Arial",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
    width: "100%",
    backgroundColor: "#1e1e1e",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#2c2c2c",
    border: "1px solid #444",
    borderRadius: "5px",
    color: "white",
  },
  textarea: {
    marginBottom: "15px",
    padding: "10px",
    fontSize: "16px",
    height: "100px",
    backgroundColor: "#2c2c2c",
    border: "1px solid #444",
    borderRadius: "5px",
    color: "white",
  },
  button: {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "12px",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "5px",
    cursor: "pointer",
  },
};


export default ClaimForm;
