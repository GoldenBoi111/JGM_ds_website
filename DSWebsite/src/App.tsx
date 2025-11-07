import React from "react";
import "./App.css";
import SmoothScrollHero from "./components/SmoothScrollHeroTsx.tsx";
import SplitText from "./components/SplitText.tsx";
import TiltedCard from "./components/TiltedCard";
import GradientBlinds from "./components/GradientBlinds";
import Particles from "./components/Particles.tsx";
import TextType from "./components/TextType.tsx";
const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

function App() {
  return (
    <div className="app">
      {/* Search Header */}
      {/* Hero Section */}
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <div style={{ width: "100%", height: "800px", position: "absolute" }}>
          <TextType
            text={["How you can help develop Peru..."]}
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
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        {/*<GradientBlinds
          gradientColors={["#ff4d00ff", "#de1562ff", "#35156aff", "#62a6ebff"]}
          angle={-20}
          noise={0}
          blindCount={60}
          blindMinWidth={10}
          spotlightRadius={0.3}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={0}
          distortAmount={0}
          shineDirection="right"
          mixBlendMode="lighten"
        />*/}
        <SmoothScrollHero />
      </div>
      {/*<div
        style={{
          width: "100%",
          height: "600px",
          position: "relative",
          backgroundImage:
            "url(https://static.vecteezy.com/system/resources/previews/020/933/072/non_2x/abstract-blur-gradient-background-vector.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <SplitText
          text="How you can help develop Peru"
          className="absolute text-5xl font-semibold text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
          onLetterAnimationComplete={handleAnimationComplete}
        />
        <LightRays
          raysOrigin="top-center"
          raysColor="#yellow"
          raysSpeed={1.5}
          lightSpread={1.5}
          rayLength={1.2}
          followMouse={true}
          pulsating={true}
          mouseInfluence={0.2}
          noiseAmount={0.1}
          distortion={0.05}
          className="absolute custom-rays"
        />
      </div> */}

      {/* Development Areas */}
    </div>
  );
}

export default App;
