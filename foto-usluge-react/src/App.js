import React from "react";
import NavMenu from "./components/NavMenu";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <NavMenu />
      <main>
        <h1>Welcome to Freelance App</h1>
        <p>Explore our services and offerings.</p>
      </main>
      <Footer />
    </div>
  );
}

export default App;
