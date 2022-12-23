import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
        <GoogleOAuthProvider clientId="263472488704-rbtb895n6km7s82asa1fbsqgk7iupcn5.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
    </HashRouter>
  </React.StrictMode>
);
