import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { AuthContextProvider } from "./context/AuthContext";
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
