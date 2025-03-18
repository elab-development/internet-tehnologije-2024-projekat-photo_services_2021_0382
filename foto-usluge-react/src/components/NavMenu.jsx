import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const NavMenu = () => {
  const [breadcrumbsOpen, setBreadcrumbsOpen] = useState(false);

  // Get current route info
  const location = useLocation();
  // Split the pathname on "/" and remove empty items
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // If there are no segments, we are on home page
  const isHomePage = pathSegments.length === 0;

  // Toggle breadcrumbs
  const toggleBreadcrumbs = () => {
    setBreadcrumbsOpen(!breadcrumbsOpen);
  };

  // Build a dynamic breadcrumb trail
  // Example: If pathname === "/services/design",
  // pathSegments = ["services", "design"].
  // We'll produce: Home > [Link to /services] > [Current: design]
  const breadcrumbs = [];
  // Always show "Home" link first if not home page
  if (!isHomePage) {
    breadcrumbs.push(
      <React.Fragment key="home">
        <Link to="/">Home</Link>
      </React.Fragment>
    );

    // Build incremental paths for each segment
    let accumulatedPath = "";
    let segmentText = "";
    pathSegments.forEach((segment, index) => {
      accumulatedPath += `/${segment}`;

      if(segment === "about"){
        segmentText = "About Us";
      }else if(segment === "services"){
        segmentText = "Services";
      }else if(segment === "service"){
        segmentText = "Service Details";
        index++;
      }else{
        segmentText = "";
      }
      // If this is the last segment, show plain text
      const isLast = index === pathSegments.length - 1;
      if(segmentText !== ""){
        if (!isLast) {
          // Intermediate segment -> Link
          breadcrumbs.push(
            <React.Fragment key={accumulatedPath}>
              {" > "}
              <Link to={accumulatedPath}>{segmentText}</Link>
            </React.Fragment>
          );
        } else {
          // Final segment -> Current page text
          breadcrumbs.push(
            <React.Fragment key={accumulatedPath}>
              {" > "}
              <span>{segmentText}</span>
            </React.Fragment>
          );
        }
      }

    });
  }

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
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>

        {/* Show arrow circle ONLY if not home page */}
        {!isHomePage && (
          <div className="nav-center" onClick={toggleBreadcrumbs}>
            <div className="arrow-circle">
              {breadcrumbsOpen ? (
                <IoIosArrowUp className="arrow-icon" />
              ) : (
                <IoIosArrowDown className="arrow-icon" />
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Breadcrumbs Section (only if not home page) */}
      {!isHomePage && breadcrumbsOpen && (
        <div className="breadcrumbs">
          <p style={{marginLeft:"60px", marginTop:"30px", fontSize:"20px"}}>{breadcrumbs}</p>
        </div>
      )}
    </>
  );
};

export default NavMenu;
