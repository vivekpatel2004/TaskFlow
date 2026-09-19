import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";


const savedTheme =
    localStorage.getItem("taskflow-theme");


if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
} else {
    document.documentElement.classList.remove("dark");
}


ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);