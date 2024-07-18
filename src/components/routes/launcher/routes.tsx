import { RouteObject } from "react-router";
import Launcher from "./Launcher";

export const launcherRoutes: RouteObject = {
    path: '/launcher',
    id: 'launcher',
    element: <Launcher />,
    children: [
        {
            path: '/launcher/:instanceId',
            id: 'launcher.instance',
            element: <></>
        }
    ]
}