import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CryptoContext from "./context_api/CryptoContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CryptoContext Children={<App />} />
    </BrowserRouter>
  </React.StrictMode>
);
