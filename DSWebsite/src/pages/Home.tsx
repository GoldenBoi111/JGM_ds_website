import "../App.css";
import SmoothScrollHero from "../components/SmoothScrollHero.tsx";
import Particles from "../components/Particles.tsx";
import TextType from "../components/TextType.tsx";
import { Helmet } from "react-helmet-async";

function Home() {
  return (
    <>
      <Helmet>
        <title>JGM Innovation - Data Science & AI Solutions for Peru</title>
        <meta name="description" content="JGM Innovation provides cutting-edge data science and AI solutions for education, government, and social impact projects in Peru." />
        <meta name="keywords" content="data science, AI, machine learning, education, government, social impact, Peru, analytics" />
        <link rel="canonical" href="https://jgm-innovation.com" />
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="JGM Innovation - Data Science & AI Solutions for Peru" />
        <meta property="og:description" content="JGM Innovation provides cutting-edge data science and AI solutions for education, government, and social impact projects in Peru." />
        <meta property="og:url" content="https://jgm-innovation.com" />
        {/* Twitter */}
        <meta name="twitter:title" content="JGM Innovation - Data Science & AI Solutions for Peru" />
        <meta name="twitter:description" content="JGM Innovation provides cutting-edge data science and AI solutions for education, government, and social impact projects in Peru." />
      </Helmet>
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
        <SmoothScrollHero />
      </div>
    </>
  );
}

export default Home;
