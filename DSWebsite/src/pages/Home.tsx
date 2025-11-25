import React from "react";
import "../App.css";
import SmoothScrollHero from "../components/SmoothScrollHeroTsx.tsx";
import Particles from "../components/Particles.tsx";
import TextType from "../components/TextType.tsx";
const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};
import { Routes, Route } from "react-router-dom";
import Footer from "../components/Footer.tsx";

function Home() {
  return (
    <div className="flex-col app">
      {/* Search Header */}
      {/* Hero Section */}
      <section className="relative w-full h-screen">
        <div style={{ width: "100%", height: "600px", position: "relative" }}>
          <div style={{ width: "100%", height: "800px", position: "absolute" }}>
            <TextType
              text={["How can you help develop Peru..."]}
              className="absolute text-5xl font-semibold text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              typingSpeed={75}
              pauseDuration={1500}
              loop={false}
              showCursor={true}
              cursorCharacter="|"
            />
            <Particles
              particleColors={["#ffffff", "#ffffff"]}
              particleCount={200}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover={false}
              alphaParticles={false}
              disableRotation={false}
            />
          </div>
          <div className="flex-auto">
            <SmoothScrollHero />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
