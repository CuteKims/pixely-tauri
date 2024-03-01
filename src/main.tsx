import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./global.css";

// let task: Task = {
//     type: 'async',
//     header: AsyncTaskHeaders.InstallInstance,
//     body: {
//         instanceName: 'itsatest',
//         instanceId: 'itsatest',
//         clientJsonUrl: 'https://piston-meta.mojang.com/v1/packages/e462f7cb66825ebc4b22f83011a027212c41cc73/1.20.4.json'
//     }
// }

// console.log(JSON.stringify(task))
// let invoker = new BackendInvoker(task)

// invoker.invoke().then(result => {
//     console.log(result)
// }).catch(error => {
//     console.error(error)
// })

// const BackendEventListener = listen('test', (event) => {
//     console.log('Got Event from backend!')
//     console.log(event)
// })



ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
    .render(
        <App/>
    );

