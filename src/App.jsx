// src/App.jsx
import React, { useEffect } from 'react';
import { auth, provider } from './firebase';

function App() {
  useEffect(() => {
    console.log("Auth object:", auth);
    console.log("Google provider:", provider);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Lost and Found</h1>
      <p>If you see this, Firebase is connected ✅</p>
    </div>
  );
}

export default App;
