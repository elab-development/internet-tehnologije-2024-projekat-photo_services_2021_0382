// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";

const sliderImages = [
  "/assets/slider1.jpg", "/assets/slider2.jpg", "/assets/slider3.jpg",
  "/assets/slider4.jpg", "/assets/slider5.jpg", "/assets/slider6.jpg",
  "/assets/slider7.jpg", "/assets/slider8.jpg", "/assets/slider9.jpg",
  "/assets/slider10.jpg",
];

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post("http://127.0.0.1:8000/api/login", {
        email, password,
      });
      const { token, user } = data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-split">
      <div className="auth-split-left">
        <ImageSlider images={sliderImages} interval={3000} className="auth-slider" />
      </div>
      <div className="auth-split-right">
        <form className="auth-form" onSubmit={handleSubmit}>
          <img src="/assets/logo.png" alt="PhotoLens Logo" className="auth-logo" />
          <h2>Sign In</h2>
          {error && <p className="error">{error}</p>}
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">Sign In</button>
          <p className="toggle">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
