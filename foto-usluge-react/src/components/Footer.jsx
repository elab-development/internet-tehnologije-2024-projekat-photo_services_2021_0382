import React from "react";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* Left - Support Email */}
      <div className="footer-left">
        <p>Support: <a href="mailto:support@freelance.com">support@freelance.com</a></p>
      </div>

      {/* Center - Logo & Copyright */}
      <div className="footer-center">
        <img src="/assets/logo.png" alt="Freelance Logo" className="footer-logo" />
        <p>© {new Date().getFullYear()} Freelance. All rights reserved.</p>
      </div>

      {/* Right - Social Icons */}
      <div className="footer-right">
        <a href="https://www.instagram.com/accounts/login/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="social-icon" />
        </a>
        <a href="https://www.tiktok.com/login" target="_blank" rel="noopener noreferrer">
          <FaTiktok className="social-icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
