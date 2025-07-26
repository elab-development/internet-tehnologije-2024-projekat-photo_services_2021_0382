// src/pages/SellerHome.jsx
import React from "react";
import ImageSlider from "../components/ImageSlider";

const SellerHome = () => {
  const sliderImages = [
    "/assets/slider1.jpg",
    "/assets/slider2.jpg",
    "/assets/slider3.jpg",
    "/assets/slider4.jpg",
    "/assets/slider5.jpg",
    "/assets/slider6.jpg",
    "/assets/slider7.jpg",
    "/assets/slider8.jpg",
    "/assets/slider9.jpg",
    "/assets/slider10.jpg",
  ];

  return (
    <div className="home-container">
      <div className="home-text">
        <h1 className="home-heading">Welcome, Seller!</h1>
        <h3 className="home-subheading">Showcase Your Photography</h3>
        <p className="home-description">
          As a valued PhotoLens seller, you can list your services, set your prices, 
          and manage your portfolio all in one place. Let the world see your vision 
          through breathtaking images you capture.
        </p>
      </div>

      <ImageSlider
        images={sliderImages}
        interval={3000}
        className="hero-slider"
      />
    </div>
  );
};

export default SellerHome;
