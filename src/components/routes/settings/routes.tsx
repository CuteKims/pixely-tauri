import { RouteObject } from "react-router";
import Settings from "./Settings";
import { StackList } from "../../ui/dataDisplay/list/List";
import { ListItem } from "../../ui/dataDisplay/list/ListItem";
import { Subpage } from "../../ui/page/Page";
import { ScrollBox } from "../../ui/utils/scrollBox/ScrollBox";
import { User } from "./user/User";

export const settingsRoutes: RouteObject = {
    path: '/settings',
    id: 'settings',
    element: <Settings />,
    children: [
        {
            path: '/settings/user',
            id: 'settings.user',
            element: <User />
        },
        {
            path: '/settings/launch',
            id: 'settings.launch',
            element: <></>
        },
        {
            path: '/settings/network',
            id: 'settings.network',
            element: <></>
        },
        {
            path: '/settings/personalization',
            id: 'settings.personalization',
            element: <></>
        },
        {
            path: '/settings/notification',
            id: 'settings.notification',
            element: <></>
        },
        {
            path: '/settings/advanced',
            id: 'settings.advanced',
            element: <></>
        },
        {
            path: '/settings/about',
            id: 'settings.about',
            element: <></>
        }
    ]
}