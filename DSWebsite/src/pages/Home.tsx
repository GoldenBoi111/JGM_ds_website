import React from "react";
import "../App.css";
import SmoothScrollHeroTsx from "../components/SmoothScrollHeroTsx.tsx";
import Particles from "../components/Particles.tsx";
import TextType from "../components/TextType.tsx";
import Footer from "../components/Footer.tsx";

function Home() {
  return (
    <div className="app">
      {/* Search Header */}
      {/* Hero Section */}
      <section className="relative w-full h-screen">
        <TextType
          text={["How can you help develop Peru..."]}
          className="absolute text-5xl font-semibold text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
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
      </section>
      <SmoothScrollHeroTsx />
    </div>
  );
}

export default Home;
