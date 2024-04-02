import { createContext } from "react"

export type Page = {
    pageKey: string,
    internalState?: any,
    subpage?: Subpage,
}

export type Subpage = {
    pageKey: string,
    internalState?: any
}

export type PageStackState = Page[]

export type PageStackContext = {
    state: PageStackState
    getLastPage: () => Page,
    getLastSubpage: () => Subpage | undefined,
    getLastInternalState: () => any,
    getLastSubpageInternalState: () => any,
    
    pushPage: (page: Page) => void,
    pushSubpage: (page: Subpage) => void,
    popPage: () => void
    
    setLastInternalState: (callback: (latestInternalState: any, latestPageKey: string) => any) => void,
    setLastSubpageInternalState: (callback: (latestSubpageInternalState: any, latestSubpageKey: string) => any) => void,
}

export function pageStackContextWrapper(state: [Page[], React.Dispatch<React.SetStateAction<Page[]>>]): PageStackContext {
    let [pageStackState, setPageStackState] = state
    return {
        state: pageStackState,
        getLastPage: (): Page => {
            return pageStackState[pageStackState.length - 1]
        },
        getLastSubpage: (): Subpage | undefined => {
            return pageStackState[pageStackState.length - 1].subpage
        },
        getLastInternalState: () => {
            return pageStackState[pageStackState.length - 1].internalState
        },
        getLastSubpageInternalState: () => {
            return pageStackState[pageStackState.length - 1].subpage?.internalState
        },
        pushPage: (page): void => {
            setPageStackState(pageStack => [...pageStack, page])
        },
        pushSubpage: (subpage): void => {
            setPageStackState(pageStack => {
                let newPage: Page = {
                    pageKey: pageStack.slice(-1)[0].pageKey
                }
                newPage.subpage = subpage
                console.log(newPage)
                return [...pageStack, newPage]
            })
        },
        popPage: (): void => {
            setPageStackState(pageStack => {
                if(pageStack.length == 1) return pageStack;
                return [...pageStack.slice(0, -1)]
            })
        },
        setLastInternalState: (callback): void => {
            setPageStackState(pageStack => {
                let page = pageStack.slice(-1)[0]
                page.internalState = callback(page.internalState, page.pageKey)
                return [...pageStack]
            })
        },
        setLastSubpageInternalState: (callback): void => {
            setPageStackState(pageStack => {
                let subpage = pageStack.slice(-1)[0].subpage
                if(subpage !== undefined) {
                    subpage.internalState = callback(subpage.internalState, subpage.pageKey)
                } else {
                    console.error('pageStackContext was trying to set internalState to an non-existing subpage.')
                }
                return [...pageStack]
            })
        }
    }
}

export const pageStackContext = createContext<PageStackContext | null>(null)