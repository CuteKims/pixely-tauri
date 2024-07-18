import { RouteObject } from "react-router";
import Plaza from "./Plaza";
import SubpageVersionManifest from "./versionList/VersionList";

export const plazaRoutes: RouteObject = {
    path: '/plaza',
    id: 'plaza',
    element: <Plaza />,
    children: [
        {
            path: '/plaza/versions',
            id: 'plaza.versions',
            element: <SubpageVersionManifest />
        }
    ]
}