import React from "react";
import ReactDOM from "react-dom/client";

import "./css/index.css";
import "./css/mydiet.css";
import "./css/dietmodal.css";
import "./css/disease.css";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
