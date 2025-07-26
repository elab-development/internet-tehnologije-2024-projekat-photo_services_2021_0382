// src/pages/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";
import CustomSelect from "../components/CustomSelect";
import useImageUploadImgBB from "../hooks/useImageUploadImgBB";

const sliderImages = [
  "/assets/slider1.jpg","/assets/slider2.jpg","/assets/slider3.jpg",
  "/assets/slider4.jpg","/assets/slider5.jpg","/assets/slider6.jpg",
  "/assets/slider7.jpg","/assets/slider8.jpg","/assets/slider9.jpg",
  "/assets/slider10.jpg",
];

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("buyer");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const {
    imageUrl,
    uploadImage,
    loading: uploading,
    error: uploadError,
  } = useImageUploadImgBB();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!imageUrl) {
      setError("Please upload a profile picture.");
      return;
    }
    try {
      await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        role,
        password,
        password_confirmation: passwordConfirmation,
        profile_picture: imageUrl,
      });
      navigate("/");
    } catch (err) {
      const errs = err.response?.data?.errors;
      if (errs) {
        setError(Object.values(errs).flat().join(" "));
      } else {
        setError(err.response?.data?.message || "Registration failed");
      }
    }
  };

  return (
    <div className="auth-split">
      <div className="auth-split-left">
        <ImageSlider
          images={sliderImages}
          interval={3000}
          className="auth-slider"
        />
      </div>
      <div className="auth-split-right">
        <form className="auth-form" onSubmit={handleSubmit}>
          <img src="/assets/logo.png" alt="Logo" className="auth-logo" />
          <h2>Create Account</h2>
          {error && <p className="error">{error}</p>}

          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <CustomSelect
            label="Account Type"
            value={role}
            onChange={setRole}
            options={[
              { value: "buyer", label: "Buyer" },
              { value: "seller", label: "Seller" },
            ]}
          />

          <label>Profile Picture</label>
          <input
            id="profilePic"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
          <label htmlFor="profilePic" className="upload-btn">
            {uploading
              ? "Uploading…"
              : imageUrl
              ? "Change Photo"
              : "Upload Photo"}
          </label>
          {uploadError && <p className="error">{uploadError}</p>}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="profile-preview"
            />
          )}

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={e => setPasswordConfirmation(e.target.value)}
            required
          />

          <button type="submit" className="btn-primary">
            Register
          </button>
          <p className="toggle">
            Already have an account? <Link to="/">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
