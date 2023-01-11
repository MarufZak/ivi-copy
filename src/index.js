import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "@splidejs/react-splide/css";
import "react-loading-skeleton/dist/skeleton.css";
import "./index.css";
import App from "./App";
import { AppProvider } from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);
