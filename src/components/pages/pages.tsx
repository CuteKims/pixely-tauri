import Launcher from "./launcher/launcher";
import Settings from "./settings/settings";

type Map = {
    [key: string]: {
        component: React.ComponentType,
        friendlyName: string,
    },
}

const pagesMap: Map = {
    'launcher': {
        component: Launcher,
        friendlyName: '启动台'
    },
    'settings': {
        component: Settings,
        friendlyName: '设置'
    },
}

export default pagesMap;