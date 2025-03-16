import React, { useState, useEffect } from "react";

const ImageSlider = ({ images, interval = 3000, className = "", style = {} }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    return () => clearInterval(sliderInterval);
  }, [images, interval]);

  return (
    <div className={`image-slider ${className}`} style={style}>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="slider-image"
      />
    </div>
  );
};

export default ImageSlider;
