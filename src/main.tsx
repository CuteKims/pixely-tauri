import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import { GlobalStateProvider } from "./components/hocs/context";
import BackendInvoker, { AsyncTaskHeaders } from "./bridger/invoker";

let invoker = new BackendInvoker({
    Async: {
        taskHeader: AsyncTaskHeaders.InstallInstance,
        taskBody: {
            instanceName: 'itsatest',
            instanceIcon: 'C:/Users/20475/Pictures/HanamiCraft.png',
            jsonUrl: 'https://piston-meta.mojang.com/v1/packages/e462f7cb66825ebc4b22f83011a027212c41cc73/1.20.4.json'
        }
    }
})

invoker.invoke().then(result => {
    console.log(result)
}).catch(error => {
    console.error(error)
})

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <GlobalStateProvider>
        <App />
    </GlobalStateProvider>
);