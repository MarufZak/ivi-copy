import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@splidejs/react-splide/css";
import App from "./App";
import AppProvider from "./context/AppContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App /> 
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
