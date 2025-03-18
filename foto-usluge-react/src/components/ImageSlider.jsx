import React, { useState, useEffect } from "react";

// Komponenta za automatski slajder slika
const ImageSlider = ({ images, interval = 3000, className = "", style = {} }) => {
  // State za trenutno prikazanu sliku u slajderu
  const [currentIndex, setCurrentIndex] = useState(0);

  // Efekat koji automatski menja sliku u zadatom intervalu
  useEffect(() => {
    // Postavljanje intervala koji će menjati sliku na svake {interval} milisekunde
    const sliderInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); 
      // Povećavamo indeks, ali kada dostignemo kraj niza vraćamo se na početak (% images.length)
    }, interval);

    // Čišćenje intervala kada se komponenta unmount-uje kako bi se sprečilo curenje memorije
    return () => clearInterval(sliderInterval);
  }, [images, interval]); // Efekat se ponovo pokreće kada se promeni lista slika ili interval

  return (
    // Kontejner za slajder sa mogućnošću dodavanja CSS klasa i stilova
    <div className={`image-slider ${className}`} style={style}>
      {/* Prikaz trenutne slike iz niza */}
      <img
        src={images[currentIndex]} // Postavljanje slike prema trenutnom indeksu
        alt={`Slide ${currentIndex}`} // Opis slike za SEO i pristupačnost
        className="slider-image" // CSS klasa za stilizaciju slike
      />
    </div>
  );
};

// Izvoz komponente kako bi mogla da se koristi u drugim delovima aplikacije
export default ImageSlider;
