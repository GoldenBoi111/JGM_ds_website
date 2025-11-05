import React from "react";
import "./App.css";
import SplitText from "./components/SplitText.tsx";
import TiltedCard from "./components/TiltedCard";
import TextType from "./components/TextType";
import GradientBlinds from "./components/GradientBlinds";
const handleAnimationComplete = () => {
  console.log("All letters have animated!");
};

function App() {
  return (
    <div className="app">
      {/* Search Header */}
      <header className="header">
        <div className="search-box">
          <span className="icon">⚙️</span>
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
      </header>

      {/* Hero Section */}
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <GradientBlinds
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
        />
        <TextType
          text={["How you can help develop Peru", ""]}
          className="absolute text-5xl font-semibold text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          typingSpeed={75}
          pauseDuration={1500}
          loop={true}
          showCursor={true}
          cursorCharacter="|"
        />
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
      <section className="development">
        <h2>Areas of development</h2>
        <div className="cards">
          <div className="card p-10">
            <h3>School Dropout rates</h3>
            <TiltedCard
              imageSrc="https://media.istockphoto.com/id/171306436/photo/red-brick-high-school-building-exterior.jpg?s=612x612&w=0&k=20&c=vksDyCVrfCpvb9uk4-wcBYu6jbTZ3nCOkGHPSgNy-L0="
              altText="XYZ School"
              captionText="XYZ School"
              containerHeight="200px"
              containerWidth="200px"
              imageHeight="200px"
              imageWidth="200px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p
                  style={{
                    fontFamily: "Helvetica Neue",
                    fontWeight: "bold",
                    WebkitTextStrokeWidth: 0.5,
                    WebkitTextStrokeColor: "black",
                    color: "gold",
                    fontSize: 30,
                    padding: 6,
                  }}>
                  XYZ School
                </p>
              }
            />
            <p className="py-2">
              Call out a feature, benefit, or value of you site that can stand
              on its own.
            </p>
          </div>
          <div className="card">
            <h3>Education Quality</h3>
            <TiltedCard
              imageSrc="https://media.istockphoto.com/id/171306436/photo/red-brick-high-school-building-exterior.jpg?s=612x612&w=0&k=20&c=vksDyCVrfCpvb9uk4-wcBYu6jbTZ3nCOkGHPSgNy-L0="
              altText="XYZ School"
              captionText="XYZ School"
              containerHeight="200px"
              containerWidth="200px"
              imageHeight="200px"
              imageWidth="200px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p
                  style={{
                    fontFamily: "Helvetica Neue",
                    fontWeight: "bold",
                    WebkitTextStrokeWidth: 0.5,
                    WebkitTextStrokeColor: "black",
                    color: "gold",
                    fontSize: 30,
                    padding: 6,
                  }}>
                  XYZ School
                </p>
              }
            />
            <p className="py-2">
              Call out a feature, benefit, or value of your site that can stand
              on its own.
            </p>
          </div>
          <div className="card">
            <h3>Child Development index</h3>
            <TiltedCard
              imageSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkSilI0EKLP6lMPQQAvBkF6KOxweyreZCPvw&s"
              altText="XYZ School"
              captionText="XYZ School"
              containerHeight="200px"
              containerWidth="200px"
              imageHeight="200px"
              imageWidth="200px"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p
                  style={{
                    fontFamily: "Helvetica Neue",
                    fontWeight: "bold",
                    WebkitTextStrokeWidth: 0.5,
                    WebkitTextStrokeColor: "black",
                    color: "gold",
                    fontSize: 30,
                    padding: 6,
                  }}>
                  Child
                </p>
              }
            />
            <p className="py-2">
              Call out a feature, benefit, or value of your site that can stand
              on its own.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
