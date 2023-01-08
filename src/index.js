import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@splidejs/react-splide/css";
import App from "./App";
import AppProvider from "./context/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
      <AppProvider>
        <App /> 
      </AppProvider>
  </StrictMode>
);
