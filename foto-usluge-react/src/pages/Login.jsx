// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";

const sliderImages = [
  "/assets/slider1.jpg","/assets/slider2.jpg","/assets/slider3.jpg",
  "/assets/slider4.jpg","/assets/slider5.jpg","/assets/slider6.jpg",
  "/assets/slider7.jpg","/assets/slider8.jpg","/assets/slider9.jpg",
  "/assets/slider10.jpg",
];

const Login = () => {
  const navigate = useNavigate();
  // login form state
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");

  // reset-password modal state
  const [showReset, setShowReset]           = useState(false);
  const [resetEmail, setResetEmail]         = useState("");
  const [newPassword, setNewPassword]       = useState("");
  const [confirmNewPassword, setConfirmNew] = useState("");
  const [resetError, setResetError]         = useState("");
  const [resetSuccess, setResetSuccess]     = useState("");
  const [resetting, setResetting]           = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/login",
        { email, password }
      );
      const { token, user } = data;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate(user.role === "seller" ? "/seller-home" : "/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleReset = async e => {
    e.preventDefault();
    setResetError("");
    setResetSuccess("");
    if (newPassword !== confirmNewPassword) {
      setResetError("Passwords do not match");
      return;
    }
    setResetting(true);
    try {
      const payload = {
        email: resetEmail,
        new_password: newPassword
      };
      await axios.post("http://127.0.0.1:8000/api/reset-password", payload);
      setResetSuccess("Password reset successful! You can now sign in.");
      // clear fields
      setResetEmail("");
      setNewPassword("");
      setConfirmNew("");
    } catch (err) {
      setResetError(err.response?.data?.message || "Reset failed");
    } finally {
      setResetting(false);
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
            type="email" value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password" value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">Sign In</button>
          <p className="toggle">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
          <p className="toggle">
            <button
              type="button"
              className="link-btn"
              onClick={() => { setShowReset(true); setResetError(""); setResetSuccess(""); }}
            >
              Forgot password?
            </button>
          </p>
        </form>
      </div>

      {showReset && (
        <div className="reset-modal-overlay">
          <div className="reset-modal-content">
            <button
              className="reset-close-btn"
              onClick={() => setShowReset(false)}
            >
              &times;
            </button>
            <h2>Reset Password</h2>
            {resetError && <p className="error">{resetError}</p>}
            {resetSuccess && <p className="success">{resetSuccess}</p>}
            <form onSubmit={handleReset}>
              <label>Email</label>
              <input
                type="email"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                required
              />
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
              />
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={e => setConfirmNew(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn-primary"
                disabled={resetting}
              >
                {resetting ? "Resetting…" : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
