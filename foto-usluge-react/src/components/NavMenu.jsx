import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const NavMenu = () => {
  const [breadcrumbsOpen, setBreadcrumbsOpen] = useState(false);

  const toggleBreadcrumbs = () => {
    setBreadcrumbsOpen(!breadcrumbsOpen);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="nav-container">
        {/* Left - Logo */}
        <div className="nav-left">
          <img src="/assets/logo.png" alt="Freelance Logo" className="nav-logo" />
        </div>

        {/* Right - Nav Links */}
        <div className="nav-right">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About Us</a></li>
          </ul>
        </div>

        {/* Bottom Center - Arrow in Black Circle */}
        <div className="nav-center" onClick={toggleBreadcrumbs}>
          <div className="arrow-circle">
            {breadcrumbsOpen ? <IoIosArrowUp className="arrow-icon" /> : <IoIosArrowDown className="arrow-icon" />}
          </div>
        </div>
      </nav>

      {/* Breadcrumbs Section */}
      {breadcrumbsOpen && (
        <div className="breadcrumbs">
          <p>
            <a href="#home">Home</a> &gt; <span>Current Page</span>
          </p>
        </div>
      )}
    </>
  );
};

export default NavMenu;
