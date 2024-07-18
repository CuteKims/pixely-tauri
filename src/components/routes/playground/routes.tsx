import { RouteObject } from "react-router";
import Playground from "./Playground";

export const playgroundRoutes: RouteObject = {
    path: '/playground',
    id: 'playground',
    element: <Playground />
}