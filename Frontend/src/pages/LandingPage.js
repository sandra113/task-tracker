import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css"; // Import CSS file

const LandingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("User registered successfully!");
        navigate("/login");
      } else {
        alert(data.message || "Failed to register");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="landing-container">
      <h1 className="landing-heading">Welcome to Tasky</h1>
      <form onSubmit={handleSubmit} className="landing-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="landing-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="landing-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="landing-input"
        />
        <button type="submit" className="landing-button">
          Sign Up
        </button>
      </form>
      <button onClick={() => navigate("/login")} className="landing-link-button">
        Already Registered? Login
      </button>
    </div>
  );
};

export default LandingPage;
