import ReactDOM from "react-dom/client";
import "./global.css";
import { RouteObject, RouterProvider, createMemoryRouter } from "react-router";
import React from "react";
import Root from "./components/routes/_root/Root";

import "./i18n/i18n";
import { launcherRoutes } from "./components/routes/launcher/routes";
import { playgroundRoutes } from "./components/routes/playground/routes";
import { plazaRoutes } from "./components/routes/plaza/routes";
import { settingsRoutes } from "./components/routes/settings/routes";
import { listen } from "@tauri-apps/api/event";

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

listen('rasterizer_bridger', event => {
    console.log(JSON.parse(event.payload as string))
})

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Root />,
        children: [
            launcherRoutes,
            plazaRoutes,
            settingsRoutes,
            playgroundRoutes
        ]
    }
]

const router = createMemoryRouter(routes)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
    .render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );

