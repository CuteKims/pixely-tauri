import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import { GlobalStateProvider } from "./components/hocs/context";
import BackendInvoker, { AsyncTaskHeaders, Task } from "./bridger/invoker";

let task: Task = {
    Async: {
        InstallInstance: {
            instanceName: 'itsatest',
            instanceId: 'itsatest',
            clientJsonUrl: 'https://piston-meta.mojang.com/v1/packages/e462f7cb66825ebc4b22f83011a027212c41cc73/1.20.4.json'
        },
    }
}

console.log(JSON.stringify(task))
let invoker = new BackendInvoker(task)

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