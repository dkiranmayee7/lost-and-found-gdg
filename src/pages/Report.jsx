// src/pages/Report.jsx
import React, { useState } from "react";
import "../styles.css";

import axios from "axios";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Report() {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleImageUpload = async () => {
    if (!imageFile) return alert("Please select an image first");

    setLoading(true);
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
      alert("✅ Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to upload image.");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) return alert("Please upload an image.");

    const selectedDate = new Date(`${date}T${time}`);
    const now = new Date();
    if (selectedDate > now) {
      alert("❌ Future date/time is not allowed.");
      return;
    }

    const lostItem = {
      itemName,
      description,
      date,
      time,
      identifier,
      imageUrl,
      found: false,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "lostItems"), lostItem);
      alert("📝 Lost item reported successfully!");
      setItemName("");
      setDescription("");
      setDate("");
      setTime("");
      setIdentifier("");
      setImageFile(null);
      setImageUrl("");
    } catch (err) {
      console.error("Error reporting item:", err);
      alert("❌ Failed to report item.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>📋 Report a Lost Item</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Item Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.textarea}
        />
        <input
          type="date"
          value={date}
          max={today}
          onChange={(e) => setDate(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Item Identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          required
          style={styles.input}
        />
        <button
          type="button"
          onClick={handleImageUpload}
          disabled={loading}
          style={styles.uploadButton}
        >
          {loading ? "Uploading..." : "Upload Image"}
        </button>
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded"
            style={styles.previewImage}
          />
        )}
        <button type="submit" style={styles.submitButton}>
          Submit Report
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",          // centers horizontally
    justifyContent: "center",      // centers vertically
    minHeight: "100vh",            // full screen height
    padding: "30px",
    maxWidth: "600px",
    margin: "auto",
    fontFamily: "Arial",
    color: "#fff",                 // white text for visibility
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#333",
    color: "#fff",
    border: "1px solid #777",
    borderRadius: "4px",
  },
  textarea: {
    marginBottom: "15px",
    padding: "10px",
    fontSize: "16px",
    height: "100px",
    backgroundColor: "#333",
    color: "#fff",
    border: "1px solid #777",
    borderRadius: "4px",
  },
  uploadButton: {
    backgroundColor: "#1976d2",
    color: "white",
    padding: "10px",
    border: "none",
    marginBottom: "15px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  submitButton: {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "12px",
    border: "none",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  previewImage: {
    maxWidth: "100%",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
};


export default Report;
