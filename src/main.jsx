import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Report from "./pages/Report";
import ViewItems from "./pages/ViewItems"; 
import FoundItems from "./pages/FoundItems";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import ClaimForm from "./pages/ClaimForm";
import Dashboard from "./pages/Dashboard";



ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/report" element={<Report />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/view-items" element={<ViewItems />} />
      <Route path="/found-items" element={<FoundItems />} />
      <Route path="/report-lost" element={<ReportLost />} />
      <Route path="/report-found" element={<ReportFound />} />
      <Route path="/claim/:itemId" element={<ClaimForm />} />
      <Route path="/dashboard" element={<Dashboard />} />

    </Routes>
  </BrowserRouter>
);
