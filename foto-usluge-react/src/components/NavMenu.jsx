import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// Navigacioni meni koji uključuje breadcrumb navigaciju
const NavMenu = () => {
  // State za otvaranje/zatvaranje breadcrumbs sekcije
  const [breadcrumbsOpen, setBreadcrumbsOpen] = useState(false);

  // Dohvatanje trenutne rute iz React Router-a
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean); // Razdvaja URL u segmente
  //console.log(location.pathname.split("/").filter(Boolean));
  // false "" undefined null --> ovo su vam sve falsy values
  // sve ostalo --> truthy values

  // Provera da li je korisnik na početnoj stranici
  const isHomePage = pathSegments.length === 0;

  // Funkcija za otvaranje/zatvaranje breadcrumbs sekcije
  const toggleBreadcrumbs = () => {
    setBreadcrumbsOpen(!breadcrumbsOpen);
  };

  // Breadcrumbs niz koji će čuvati putanju do trenutne stranice
  const breadcrumbs = [];

  if (!isHomePage) {
    // Dodajemo početnu stranicu kao prvi breadcrumb
    breadcrumbs.push(
      <React.Fragment key="home">
        <Link to="/">Home</Link>
      </React.Fragment>
    );

    // Generisanje breadcrumb elemenata na osnovu trenutne putanje
    let accumulatedPath = "";
    let segmentText = "";
    pathSegments.forEach((segment, index) => {
      accumulatedPath += `/${segment}`;

      // Mapiranje segmenata URL-a u čitljive naslove
      if (segment === "about") {
        segmentText = "About Us";
      } else if (segment === "services") {
        segmentText = "Services";
      } else if (segment === "service") {
        segmentText = "Service Details";
        index++; // Pomeranje indexa za jedan ako je segment "service"
      } else {
        segmentText = "";
      }

      // Provera da li je poslednji segment u nizu
      const isLast = index === pathSegments.length - 1;
      if (segmentText !== "") {
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
      {/* Navigaciona traka */}
      <nav className="nav-container">
        {/* Leva strana - Logo */}
        <div className="nav-left">
          <img src="/assets/logo.png" alt="Freelance Logo" className="nav-logo" />
        </div>

        {/* Desna strana - Navigacioni linkovi */}
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

        {/* Prikaz strelice za breadcrumbs ako nismo na početnoj stranici */}
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

      {/* Prikaz breadcrumbs sekcije ako je otvorena i ako nismo na početnoj stranici */}
      {!isHomePage && breadcrumbsOpen && (
        <div className="breadcrumbs">
          <p style={{ marginLeft: "60px", marginTop: "30px", fontSize: "20px" }}>
            {breadcrumbs}
          </p>
        </div>
      )}
    </>
  );
};

export default NavMenu;
