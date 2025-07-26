// src/components/NavMenu.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const NavMenu = () => {
  const [breadcrumbsOpen, setBreadcrumbsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const profileRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const isHomePage = pathSegments.length === 0;

  // load user from sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // close profile menu on outside click
  useEffect(() => {
    const handler = e => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleBreadcrumbs = () => setBreadcrumbsOpen(o => !o);
  const toggleProfileMenu = () => setProfileMenuOpen(o => !o);

  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/logout");
    } catch (e) {
      console.error(e);
    }
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  // Select menu items based on role
  const menuItems = user?.role === "seller"
    ? [
        { to: "/seller-home",    label: "Home"     },
        { to: "/seller-services", label: "Services" },
        { to: "/seller-offers",   label: "Offers"   },
      ]
    : [
        { to: "/",         label: "Home"     },
        { to: "/services", label: "Services" },
        { to: "/about",    label: "About Us" },
      ];

  // build breadcrumbs...
  const breadcrumbs = [];
  if (!isHomePage) {
    breadcrumbs.push(
      <React.Fragment key="home">
        <Link to={menuItems[0].to}>{menuItems[0].label}</Link>
      </React.Fragment>
    );
    let acc = "";
    pathSegments.forEach((seg, i) => {
      acc += `/${seg}`;
      let text = 
        seg === "about"    ? "About Us" :
        seg === "services" ? "Services" :
        seg === "service"  ? "Service Details" : "";
      if (!text) return;
      const isLast = i === pathSegments.length - 1;
      breadcrumbs.push(
        <React.Fragment key={acc}>
          {" > "}
          {isLast ? <span>{text}</span> : <Link to={acc}>{text}</Link>}
        </React.Fragment>
      );
    });
  }

  return (
    <>
      <nav className="nav-container">
        <div className="nav-left">
          <img src="/assets/logo.png" alt="PhotoLens Logo" className="nav-logo" />
        </div>

        <div className="nav-right">
          <ul>
            {menuItems.map(item => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>

          {user && (
            <div
              className="nav-profile"
              ref={profileRef}
              onClick={toggleProfileMenu}
              style={{ marginRight: "2rem" }}
            >
              <img
                src={user.profile_picture}
                alt={`${user.name} avatar`}
                className="nav-avatar"
              />
              <div className="nav-user-info">
                <span className="nav-username">{user.name}</span>
                <span className="nav-role">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>

              {profileMenuOpen && (
                <div className="nav-profile-menu">
                  {/* always show My Offers in profile menu */}
                  <Link to="/my-offers" className="nav-menu-item">
                    My Offers
                  </Link>
                  <button
                    className="nav-logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
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
          <p style={{ marginLeft: "60px", marginTop: "30px", fontSize: "20px" }}>
            {breadcrumbs}
          </p>
        </div>
      )}
    </>
  );
};

export default NavMenu;
