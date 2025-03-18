import React from "react";
import ImageSlider from "../components/ImageSlider";
import Card from "../components/Card";
import useLatestServices from "../hooks/useLatestServices";
import useCategories from "../hooks/useCategories";

const Home = () => {
  const { latestServices } = useLatestServices();
  const { categories, loading: categoriesLoading } = useCategories();

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

  if (categoriesLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="home-container">
      <div className="home-text">
        <h1 className="home-heading">Capture Moments, Create Art</h1>
        <h3 className="home-subheading">Freelance Photography at Its Finest</h3>
        <p className="home-description">
          Experience professional photography that brings your vision to life.
          Our experts capture every detail with artistic flair – perfect for personal
          portraits, events, and commercial projects.
        </p>
      </div>

      <ImageSlider images={sliderImages} interval={3000} className="hero-slider" />

      <div className="latest-services">
        <h2>Our Latest Photography Services</h2>
        <div className="services-slider">
          {latestServices.map((service) => {

            const categoryObj = categories.find(
              (cat) => cat.id === service.service_category_id
            );
            const categoryName = categoryObj ? categoryObj.name : "";
            return (
              <Card
                key={service.id}
                title={service.name}
                description={service.description}
                category={categoryName}
                price={service.price}
                link={`/services/service/${service.id}`}
                className="service-card"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
