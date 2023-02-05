import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import 'antd/dist/reset.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
        <GoogleOAuthProvider clientId="263472488704-ultad9gpfegen1mga0v9k69id5crnt2a.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
    </HashRouter>
  </React.StrictMode>
);
