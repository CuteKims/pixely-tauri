export type SubpageMap = {
    default: string
    map: {
        [key: string]: {
            component: React.ComponentType,
            friendlyName: string,
            display: boolean,
            initialState?: any
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