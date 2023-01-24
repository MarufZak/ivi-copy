import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "@splidejs/react-splide/css";
import "react-loading-skeleton/dist/skeleton.css";
import "./index.css";
import App from "./App";
import { AppProvider, AuthProvider } from "./context";
import { AuthWrapper } from "./components";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <AuthWrapper>
            <App />
          </AuthWrapper>
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
);
