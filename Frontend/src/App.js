import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import "./styles/global.css";
import "./App.css";

function App() {
  // Define isAuthenticated based on token availability
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
