// src/pages/ReportFound.jsx
import React, { useState } from "react";
import axios from "axios";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function ReportFound() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = async () => {
    if (!imageFile) return alert("Please select an image first");

    const selectedDate = new Date(`${date}T${time}`);
    const now = new Date();
    if (selectedDate > now) {
      alert("❌ Future date/time is not allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "lostfound_preset");
    formData.append("cloud_name", "dq8e6z8ru");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dq8e6z8ru/image/upload",
        formData
      );
      setImageUrl(res.data.secure_url);
      alert("✅ Image uploaded!");
    } catch (err) {
      alert("❌ Image upload failed");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) return alert("Upload image first");

    try {
      const currentUser = auth.currentUser;
      const reportData = {
        itemName,
        description,
        date,
        time,
        identifier,
        imageUrl,
        createdAt: serverTimestamp(),
        userId: currentUser?.uid || "",
        username: currentUser?.displayName || "Anonymous",
        type: "found",
      };

      await addDoc(collection(db, "lostItems"), reportData);
      alert("📌 Found item reported!");
    } catch (error) {
      console.error("Error reporting:", error);
      alert("❌ Could not submit report.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>📦 Report a Found Item</h2>
        <input
          style={styles.input}
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <textarea
          style={styles.input}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          style={styles.input}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="time"
          style={styles.input}
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <input
          style={styles.input}
          placeholder="Identifier (color, mark...)"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <input
          type="file"
          style={styles.input}
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
        />

        <button
          type="button"
          style={styles.uploadBtn}
          onClick={handleImageUpload}
        >
          Upload Image
        </button>

        {imageUrl && (
          <img src={imageUrl} alt="Preview" style={styles.preview} />
        )}

        <button type="submit" style={styles.submitBtn}>
          Submit Found Report
        </button>
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
    maxWidth: "600px",
    width: "100%",
    backgroundColor: "#1e1e1e",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
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
  uploadBtn: {
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  submitBtn: {
    padding: "12px",
    backgroundColor: "#4caf50",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  preview: {
    maxWidth: "100%",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
};

export default ReportFound;
