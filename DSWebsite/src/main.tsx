import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { inject } from "@vercel/analytics";
//import "./index.css";
import App from "./App.tsx";
import { injectSpeedInsights } from "@vercel/speed-insights";

injectSpeedInsights();

inject();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
