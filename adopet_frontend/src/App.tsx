import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./components/signin/SignIn";
import Header from "./components/templates/Header";
import Footer from "./components/templates/Footer";
import Home from "./components/pages/Home";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
