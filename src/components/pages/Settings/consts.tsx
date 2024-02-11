import React from "react";
import { SubpageMap } from "../../../types/consts";

const SettingsPage = React.lazy(() => import('./Settings_Subpage'))

const SUBPAGES_MAP_SETTINGS: SubpageMap = {
    default: 'settings.user',
    map: {
        'settings.user': {
            component: SettingsPage,
            friendlyName: '用户账户',
            display: true,
        },
        'settings.launch': {
            component: SettingsPage,
            friendlyName: '启动',
            display: true,
        },
        'settings.network': {
            component: SettingsPage,
            friendlyName: '网络',
            display: true,
        },
        'settings.personalization': {
            component: SettingsPage,
            friendlyName: '个性化',
            display: true,
        },
        'settings.notification': {
            component: SettingsPage,
            friendlyName: '通知',
            display: true,
        },
        'settings.advanced': {
            component: SettingsPage,
            friendlyName: '高级',
            display: true,
        },
        'settings.about': {
            component: SettingsPage,
            friendlyName: '关于',
            display: true,
        },
    }
}

export default SUBPAGES_MAP_SETTINGS