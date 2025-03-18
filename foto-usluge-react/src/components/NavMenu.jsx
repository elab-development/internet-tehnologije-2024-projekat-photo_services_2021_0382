import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const NavMenu = () => {
  const [breadcrumbsOpen, setBreadcrumbsOpen] = useState(false);

  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const isHomePage = pathSegments.length === 0;

  const toggleBreadcrumbs = () => {
    setBreadcrumbsOpen(!breadcrumbsOpen);
  };

  const breadcrumbs = [];

  if (!isHomePage) {
    breadcrumbs.push(
      <React.Fragment key="home">
        <Link to="/">Home</Link>
      </React.Fragment>
    );

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
      const isLast = index === pathSegments.length - 1;
      if(segmentText !== ""){
        if (!isLast) {
          breadcrumbs.push(
            <React.Fragment key={accumulatedPath}>
              {" > "}
              <Link to={accumulatedPath}>{segmentText}</Link>
            </React.Fragment>
          );
        } else {
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
      <nav className="nav-container">
        <div className="nav-left">
          <img src="/assets/logo.png" alt="Freelance Logo" className="nav-logo" />
        </div>

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

      {!isHomePage && breadcrumbsOpen && (
        <div className="breadcrumbs">
          <p style={{marginLeft:"60px", marginTop:"30px", fontSize:"20px"}}>{breadcrumbs}</p>
        </div>
      )}
    </>
  );
};

export default NavMenu;
