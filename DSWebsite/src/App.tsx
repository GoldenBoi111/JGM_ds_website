//import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import NavigationBar from "./components/NavigationBar.tsx";
import Footer from "./components/Footer.tsx";
import ChatBot from "./components/ChatBot.tsx";
import { Helmet } from "react-helmet-async";
import JSONLD from "./components/JSONLD";

// Lazy load pages for code splitting
const Home = lazy(() => import("./pages/Home.tsx"));
const BlogIndex = lazy(() => import("./pages/BlogIndex.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.tsx"));
const SignUpPage = lazy(() => import("./pages/SignUpPage.tsx"));

// Loading component for suspense
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-zinc-900">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Organization schema for structured data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "JGM Innovation",
  description:
    "Providing cutting-edge data science and AI solutions for education, government, and social impact projects.",
  url: "https://jgm-innovation.com",
  logo: "https://jgm-innovation.com/logo512.png",
  foundingDate: "2023",
  founder: {
    "@type": "Person",
    name: "JGM Team",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+51 123 456 789",
    contactType: "customer service",
    email: "contact@jgm-innovation.com",
    areaServed: "PE",
    availableLanguage: "English",
  },
  sameAs: [
    "https://twitter.com/jgminnovation",
    "https://facebook.com/jgminnovation",
    "https://instagram.com/jgminnovation",
    "https://linkedin.com/company/jgminnovation",
  ],
};

function App() {
  return (
    <>
      <Helmet>
        <title>JGM Innovation - Data Science & AI Solutions</title>
        <meta
          name="description"
          content="JGM Innovation provides cutting-edge data science and AI solutions for education, government, and social impact projects."
        />
        <meta
          name="keywords"
          content="data science, AI, machine learning, education, government, social impact, Peru, analytics"
        />
        <meta name="author" content="JGM Innovation" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://jgm-innovation.com" />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="JGM Innovation - Data Science & AI Solutions"
        />
        <meta
          property="og:description"
          content="JGM Innovation provides cutting-edge data science and AI solutions for education, government, and social impact projects."
        />
        <meta property="og:url" content="https://jgm-innovation.com" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="JGM Innovation - Data Science & AI Solutions"
        />
        <meta
          name="twitter:description"
          content="JGM Innovation provides cutting-edge data science and AI solutions for education, government, and social impact projects."
        />
      </Helmet>
      <JSONLD schema={organizationSchema} />
      <div className="flex flex-col min-h-screen">
        <NavigationBar />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </>
  );
}

export default App;
