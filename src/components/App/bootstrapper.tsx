import { Children, useRef } from "react"

type L10n = {
    key: string,
    variables?: {
        [variable: string]: string
    }
}

type StateStore = {
    [storeId: number]: any
}

type PageRegistry = {
    [domain: string]: {
        [scope: string]: RegisteredPage
    }
}

type RegisteredPage = {
    [id: string]: {
        component?: React.ReactNode,
        l10n?: L10n,
        children: RegisteredPage
    }
}

type PageRegistryKey = {
    domain: string,
    scope: string,
    path: string[],
    l10n: L10n,
}

let testKey: PageRegistryKey = {
    domain: "pixely",
    scope: "plaza",
    path: ["cores"],
    l10n: {
        key: "scope.plaza.cores",
    }
}

function pageRegistryFactory(pageRegistry: PageRegistry) {
    return {
        register: (key: PageRegistryKey, component: any) => {
            let registeredPage: RegisteredPage
            
            const getChildren = () => {
                try {
                    let childrenPages = pageRegistry[key.domain][key.scope]
                    for (let index in key.path) {
                        registeredPage = childrenPages[key.path[index]].children ?? {}
                    }
                    return registeredPage
                } catch {
                    return {}
                }
            }

            registeredPage = {
                [key.path[key.path.length - 1] ?? "default"]: {
                    component,
                    l10n: key.l10n,
                    children: getChildren()
                }
            }

            key.path.pop()
            key.path.reverse()

            for (let index in key.path) {
                registeredPage = {
                    [key.path[index]]: {
                        children: registeredPage
                    }
                }
            }

            pageRegistry = Object.assign(pageRegistry, {
                [key.domain]: Object.assign(
                    pageRegistry[key.domain] ?? {},
                    { [key.scope]: Object.assign((pageRegistry[key.domain] ?? {})[key.scope] ?? {}, registeredPage) }
                )
            })
        }
    }
}

function stateStoreFactory(stateStore: StateStore) {
    return {

    }
}

export function useBootstrapper() {
    let pageRegistry = pageRegistryFactory(useRef<PageRegistry>({}).current)
    let stateStore = stateStoreFactory(useRef<StateStore>({}).current)

    return [pageRegistry, stateStore]
}