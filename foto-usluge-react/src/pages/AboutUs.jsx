import React from "react";
import ImageSlider from "../components/ImageSlider";

const AboutUs = () => {
  // Array of image URLs for the About Us slider (slider11.jpg to slider20.jpg)
  const sliderImages = [
    "/assets/slider11.jpg",
    "/assets/slider12.jpg",
    "/assets/slider13.jpg",
    "/assets/slider14.jpg",
    "/assets/slider15.jpg",
    "/assets/slider16.jpg",
    "/assets/slider17.jpg",
    "/assets/slider18.jpg",
    "/assets/slider19.jpg",
    "/assets/slider20.jpg",
  ];

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About PhotoLens</h1>
        <h3>Capturing Life, One Click at a Time</h3>
      </div>

      {/* Reusing the ImageSlider component */}
      <div className="about-slider">
        <ImageSlider images={sliderImages} interval={3000} className="hero-slider" />
      </div>

      <div className="about-content">
        <p>
          PhotoLens is a groundbreaking freelance photography platform that started as a passion project among a small group of visionary creatives. In a humble studio filled with old cameras and dreams, a team of photographers came together to capture the beauty of everyday moments. Their work soon evolved into a collaborative movement that redefined how professional photography is experienced.
        </p>
        <p>
          Founded in 2010, PhotoLens was built on the belief that every moment deserves to be immortalized through art. What began as a local initiative quickly blossomed into a dynamic network connecting talented photographers with clients seeking a unique visual story. With an emphasis on creativity and innovation, PhotoLens has grown into a trusted brand in freelance photography.
        </p>
        <h2>Our Mission</h2>
        <p>
          Our mission at PhotoLens is simple: to empower photographers and inspire visual storytelling. We believe that photography is not just about capturing images—it’s about capturing emotions, memories, and experiences. Through our platform, we provide an opportunity for freelance photographers to showcase their artistry while offering clients a diverse portfolio of creative services.
        </p>
        <h2>How It All Began</h2>
        <p>
          It all started in a small, cramped studio where creativity was the only resource. Amidst stacks of film, a few vintage lenses, and endless cups of coffee, a group of passionate photographers dared to dream big. Their goal was to build a community where every photographer could thrive, regardless of their background.
        </p>
        <p>
          Over the years, our team has grown—both in size and in vision. From local events to international projects, PhotoLens has been at the forefront of creative innovation. We continue to push boundaries, explore new techniques, and embrace cutting-edge technology to keep our storytelling fresh and relevant.
        </p>
        <p>
          Today, PhotoLens stands as a beacon of creativity and professional excellence in the world of freelance photography. We invite you to join us on this visual journey and experience the art of photography like never before.
        </p>
      </div>

      {/* Leadership Team Section */}
      <div className="leadership-team">
        <h2>Our Leadership Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="/assets/leader1.jpg" alt="John Doe" className="team-photo" />
            <h3>Urlich Manson</h3>
            <p>Chief Executive Officer</p>
          </div>
          <div className="team-member">
            <img src="/assets/leader2.jpg" alt="Jane Smith" className="team-photo" />
            <h3>Jane Smith</h3>
            <p>Chief Technology Officer</p>
          </div>
          <div className="team-member">
            <img src="/assets/leader3.jpg" alt="Mark Johnson" className="team-photo" />
            <h3>Mark Johnson</h3>
            <p>Creative Director</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
