import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import { GlobalStateProvider } from "./components/hocs/state/context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <GlobalStateProvider>
            <App />
        </GlobalStateProvider>
    </React.StrictMode>
);