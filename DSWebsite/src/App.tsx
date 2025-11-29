//import "./App.css";
import Home from "./pages/Home.tsx";
import { Routes, Route } from "react-router-dom";
import Blog from "./pages/Blog.tsx";
import NavigationBar from "./components/NavigationBar.tsx";
import Footer from "./components/Footer.tsx";
import ChatBot from "./components/ChatBot.tsx";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavigationBar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;
