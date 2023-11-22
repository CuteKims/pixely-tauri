import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./global.css";
import { GlobalStateProvider } from "./components/hocs/context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <GlobalStateProvider>
            <App />
        </GlobalStateProvider>
    </React.StrictMode>
);