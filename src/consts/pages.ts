import { PageMap } from "../types/consts";

import Launcher from "../components/pages/Launcher";
import Settings from "../components/pages/Settings";
import Plaza from "../components/pages/Plaza";
import Playground from "../components/pages/Playground";

import SUBPAGES_MAP_SETTINGS from "../components/pages/Settings/consts";
import SUBPAGES_MAP_PLAZA from "../components/pages/Plaza/consts";

export const PAGES_MAP: PageMap = {
    'launcher': {
        component: Launcher,
        friendlyName: '启动台',
        display: true,
    },
    'settings': {
        component: Settings,
        friendlyName: '设置',
        display: true,
        subpages: SUBPAGES_MAP_SETTINGS,
    },
    'plaza': {
        component: Plaza,
        friendlyName: '广场',
        display: true,
        subpages: SUBPAGES_MAP_PLAZA
    },
    'playground': {
        component: Playground,
        friendlyName: 'Playground',
        display: true,
    }
}