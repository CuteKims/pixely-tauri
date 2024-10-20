import { RouteObject } from "react-router";
import Settings from "./Settings";
import { User } from "./user/User";
import { Launching } from "./launch/Launching";
import { Personalization } from "./personalization/Personalization";
import { About } from "./about/About";
import { Network } from "./network/Network";
import { Notification } from "./notification/Notification";
import { PresetImages } from "./personalization/PresetImages";

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
            element: <Personalization />,
            children: [
                {
                    path: '/settings/personalization/preset_images',
                    id: 'settings.personalization.preset_images',
                    element: <PresetImages />
                }
            ]
        },
        {
            path: '/settings/notification',
            id: 'settings.notification',
            element: <Notification />
        },
        {
            path: '/settings/accessibility',
            id: 'settings.accessibility',
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
            element: <About />
        }
    ]
}