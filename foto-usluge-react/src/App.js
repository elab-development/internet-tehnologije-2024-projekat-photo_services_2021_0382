import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import "./App.css"

function App() {
  return (
    <Router>
      <NavMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
