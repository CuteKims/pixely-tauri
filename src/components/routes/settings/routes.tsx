import { RouteObject } from "react-router";
import Settings from "./Settings";
import { StackList } from "../../ui/dataDisplay/list/List";
import { ListItem } from "../../ui/dataDisplay/list/ListItem";
import { Subpage } from "../../ui/page/Page";
import { ScrollBox } from "../../ui/utils/scrollBox/ScrollBox";
import { User } from "./user/User";
import { Launching } from "./launch/Launching";
import { Personalization } from "./personalization/Personalization";
import { About } from "./about/About";
import { Network } from "./network/Network";
import { Notification } from "./notification/Notification";

export const settingsRoutes: RouteObject = {
    path: '/settings',
    id: 'settings',
    element: <Settings />,
    children: [
        {
            path: '/settings/user',
            id: 'settings.user',
            element: <User />,
        },
        {
            path: '/settings/launching',
            id: 'settings.launching',
            element: <Launching />
        },
        {
            path: '/settings/network',
            id: 'settings.network',
            element: <Network />
        },
        {
            path: '/settings/personalization',
            id: 'settings.personalization',
            element: <Personalization />
        },
        {
            path: '/settings/notification',
            id: 'settings.notification',
            element: <Notification />
        },
        {
            path: '/settings/advanced',
            id: 'settings.advanced',
            element: <></>
        },
        {
            path: '/settings/about',
            id: 'settings.about',
            element: <About />
        }
    ]
}