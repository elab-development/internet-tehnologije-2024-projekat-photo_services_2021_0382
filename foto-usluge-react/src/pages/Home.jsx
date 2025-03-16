import React from "react";
import ImageSlider from "../components/ImageSlider";
import Card from "../components/Card";
import useLatestServices from "../hooks/useLatestServices";

const Home = () => {
  const { latestServices } = useLatestServices();

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
      {/* Hero Section */}
      <div className="home-text">
        <h1 className="home-heading">Capture Moments, Create Art</h1>
        <h3 className="home-subheading">Freelance Photography at Its Finest</h3>
        <p className="home-description">
          Experience professional photography that brings your vision to life.
          Our experts capture every detail with artistic flair – perfect for personal
          portraits, events, and commercial projects.
        </p>
      </div>

      {/* Automatic Image Slider */}
      <ImageSlider images={sliderImages} interval={3000} className="hero-slider" />

      {/* Latest Services Cards */}
      <div className="latest-services">
        <h2>Our Latest Photography Services</h2>
        <div className="services-slider">
          {latestServices.map((service, index) => (
            <Card
              key={index}
              title={service.name}
              description={service.description}
              price={service.price}
              link={`/services/${service.id}`}
              className="service-card"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
