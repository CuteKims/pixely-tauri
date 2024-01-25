import Launcher from "./launcher/launcher";
import Settings from "./settings/settings";
import Plaza from "./plaza/plaza";

import { subpagesMap as plazaSubpagesMap } from "./plaza/plaza";
import { subpagesMap as settingsSubpagesMap } from "./settings/settings";
import { Playground } from "./playground/playground";

export type SubpageMap = {
    default: string
    map: {
        [key: string]: {
            component: React.ComponentType,
            friendlyName: string,
            display: boolean,
        },
    }
}

export type PageMap = {
    [key: string]: {
        component: React.ComponentType,
        friendlyName: string,
        display: boolean,
        subpages?: SubpageMap,
    },
}

const pagesMap: PageMap = {
    'launcher': {
        component: Launcher,
        friendlyName: '启动台',
        display: true,
    },
    'settings': {
        component: Settings,
        friendlyName: '设置',
        display: true,
        subpages: settingsSubpagesMap,
    },
    'plaza': {
        component: Plaza,
        friendlyName: '广场',
        display: true,
        subpages: plazaSubpagesMap
    },
    'playground': {
        component: Playground,
        friendlyName: 'Playground',
        display: true,
    }
}

export default pagesMap;