import React from "react";
//import "./App.css";
import Home from "./pages/Home.tsx";
import { Routes, Route } from "react-router-dom";
import SchoolDropOutRates from "./pages/SchoolDropOutRates.tsx";
import { SiAlwaysdata } from "react-icons/si";
import SearchBar from "./components/SearchBar.tsx";
import EducationQuality from "./pages/EducationQuality.tsx";
import ChildDevelopmentIndex from "./pages/ChildDevelopmentIndex.tsx";
import Footer from "./components/Footer.tsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/school-dropout-rates"
            element={<SchoolDropOutRates />}
          />
          <Route path="/education-quality" element={<EducationQuality />} />
          <Route
            path="/child-development-index"
            element={<ChildDevelopmentIndex />}
          />
          <Route path="/datascience-education" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
