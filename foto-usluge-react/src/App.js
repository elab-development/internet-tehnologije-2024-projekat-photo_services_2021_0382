// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import NavMenu from "./components/NavMenu";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SellerHome from "./pages/SellerHome";
import MyOffers from "./pages/MyOffers";
import SellerServices from './pages/SellerServices';
import "./App.css";

function App() {
  // track whether token exists in sessionStorage
  const [loggedIn, setLoggedIn] = useState(!!sessionStorage.getItem("token"));

  useEffect(() => {
    // poll every second for token changes
    const id = setInterval(() => {
      const has = !!sessionStorage.getItem("token");
      setLoggedIn(has);
      if (has) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
      } else {
        delete axios.defaults.headers.common["Authorization"];
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Router>
      {loggedIn && <NavMenu />}
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={loggedIn ? <Navigate to="/home" /> : <Login />} />
        <Route path="/register" element={loggedIn ? <Navigate to="/home" /> : <Register />} />

        {/* Protected */}
        <Route path="/home" element={loggedIn ? <Home /> : <Navigate to="/" />} />
        <Route path="/about" element={loggedIn ? <AboutUs /> : <Navigate to="/" />} />
        <Route path="/services" element={loggedIn ? <Services /> : <Navigate to="/" />} />
        <Route
          path="/services/service/:id"
          element={loggedIn ? <ServiceDetails /> : <Navigate to="/" />}
        />
        <Route path="/my-offers" element={loggedIn ? <MyOffers /> : <Navigate to="/" />} />
        <Route path="/seller-home" element={<SellerHome />} />
        <Route path="/seller-services" element={<SellerServices />} />
      </Routes>
      {loggedIn && <Footer />}
    </Router>
  );
}

export default App;
