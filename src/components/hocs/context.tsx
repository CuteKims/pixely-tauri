import { createContext, useReducer } from "react"
import { Notification, NotificationChannels } from "../../bridger/notif"
import pagesMap from "../pages/pages"

export type Page = {
    pageKey: string,
    internalState?: any,
    subpage?: Subpage,
}

export type Subpage = {
    pageKey: string,
    internalState?: any
}

export type GlobalState = {
    window: {
        size: {
            height: number,
            width: number,
        },
        isFocused: boolean,
        isMaximized: boolean,
    }
    modals: {
        menu: boolean,
        image: string | null,
    },
    pageStack: Page[],
    notifArray: Notification<NotificationChannels>[]
}

export type GlobalStateAction = PageStackAction<PageStackActions> | WindowStateAction<WindowStateActions> | ModalStateAction<ModalStateActions>

type PageStackAction<T extends PageStackActions> = {
    category: 'page_stack'
    type: T,
    value: PageStackActionTypes[T]
}

type WindowStateAction<T extends WindowStateActions> = {
    category: 'window_state'
    type: T,
    value: WindowStateActionTypes[T],
}

type ModalStateAction<T extends ModalStateActions> = {
    category: 'modal_state'
    type: T,
    value: ModalStateActionTypes[T]
}

export enum PageStackActions {
    Push,
    Pop,
    Replace,
    SetInternalState,
    PushSubpage,
    SetSubpageInternalState,
}

export enum WindowStateActions {
    SetIsFocus,
    SetIsMaximized,
    SetSize,
    PushNotif,
    DelNotif,
    SetMenu, //This is TEMPORARY. To be moved to ModalState.
}

export enum ModalStateActions {
    AddModal,
    DelModel,
}

type PageStackActionTypes = {
    [PageStackActions.Pop]: {
        times: number,
    },
    [PageStackActions.Push]: Page,
    [PageStackActions.Replace]: Page,
    [PageStackActions.SetInternalState]: any,
    [PageStackActions.PushSubpage]: Subpage,
    [PageStackActions.SetSubpageInternalState]: any,
}

type WindowStateActionTypes = {
    [WindowStateActions.SetIsFocus]: boolean,
    [WindowStateActions.SetIsMaximized]: boolean,
    [WindowStateActions.SetSize]: {
        height: number,
        width: number,
    }
    [WindowStateActions.PushNotif]: Notification<NotificationChannels>,
    [WindowStateActions.DelNotif]: number,
    [WindowStateActions.SetMenu]: boolean,
}

type ModalStateActionTypes = {
    [ModalStateActions.AddModal]: string,
    [ModalStateActions.DelModel]: number,
}



const globalStateReducer = (state: GlobalState, action: GlobalStateAction): GlobalState => {
    switch (action.category) {
        case 'page_stack': {
            return pageStackReducer(state, action)
        };
        case "window_state": {
            return windowStateReducer(state, action)
        };
        case "modal_state": {
            return modalStateReducer(state, action)
        };
        default: return state
    }
}

const pageStackReducer = (state: GlobalState, action: PageStackAction<PageStackActions>): GlobalState => {
    switch (action.type) {
        case PageStackActions.Push: {
            //Compare between last page and new page.
            if(action.value.pageKey == state.pageStack.slice(-1)[0].pageKey && action.value.subpage == undefined) return state;
            let page = action.value as Page
            if(!page.subpage && pagesMap[page.pageKey].subpages) page.subpage = {pageKey: pagesMap[page.pageKey].subpages!.default}
            return {
                ...state,
                pageStack: [...state.pageStack, page]
            };
        };
        case PageStackActions.Pop: {
            if (!(state.pageStack.length > 1)) return windowStateReducer(state, {
                category: "window_state",
                type: WindowStateActions.SetMenu,
                value: true
            })
            return {
                ...state,
                pageStack: state.pageStack.slice(0,-1)
            }
        };
        case PageStackActions.Replace: {
            if(action.value.page == state.pageStack.slice(-1)[0].pageKey && action.value.subpage.length == 0) return state;
            return {
                ...state,
                pageStack: [...state.pageStack.slice(0, -1), action.value]
            }
        }
        case PageStackActions.SetInternalState: {
            let newPage = {...state.pageStack.slice(-1)[0]};
            newPage.internalState = action.value;
            return pageStackReducer(state, {
                category: 'page_stack',
                type: PageStackActions.Replace,
                value: newPage
            })
        }
        case PageStackActions.PushSubpage: {
            let newPage = {...state.pageStack.slice(-1)[0]};
            newPage.subpage = action.value;
            let returnState = pageStackReducer(state, {
                category: 'page_stack',
                type: PageStackActions.Push,
                value: newPage
            });
            return returnState
        }
        case PageStackActions.SetSubpageInternalState: {
            let newPage = {...state.pageStack.slice(-1)[0]};
            if(newPage.subpage) newPage.subpage.internalState = action.value;
            else {
                console.error('Tried to set internalState, but subpage is non-exist. \npageStack:'); //I guess I need to implement an global error handler to display error message.
                console.error(state.pageStack);                                                      //To do in the future. For now, this works just fine by me.
            }
            return pageStackReducer(state, {
                category: 'page_stack',
                type: PageStackActions.Replace,
                value: newPage
            })
        }
        default: return state
    }
}

const windowStateReducer = (state: GlobalState, action: WindowStateAction<WindowStateActions>): GlobalState => {
    switch (action.type) {
        case WindowStateActions.SetIsFocus: {
            return {
                ...state,
                window: {
                    ...state.window,
                    isFocused: action.value as boolean
                }
            }
        };
        case WindowStateActions.SetIsMaximized: {
            return {
                ...state,
                window: {
                    ...state.window,
                    isMaximized: action.value as boolean
                }
            }
        };
        case WindowStateActions.SetSize: {
            return {
                ...state,
                window: {
                    ...state.window,
                    size: action.value as {
                        height: number,
                        width: number
                    }
                }
            }
        };
        case WindowStateActions.SetMenu: {
            return {
                ...state,
                modals: {
                    ...state.modals,
                    menu: action.value as boolean
                }
            }
        };
        case WindowStateActions.PushNotif: {
            return {
                ...state,
                notifArray: [action.value as Notification<NotificationChannels>, ...state.notifArray]
            }
        };
        case WindowStateActions.DelNotif: {

        }
        default: return state
    };
}

const modalStateReducer = (state: GlobalState, action: ModalStateAction<ModalStateActions>): GlobalState => {
    switch (action.type) {
        case ModalStateActions.AddModal: {
            return state
        };
        case ModalStateActions.DelModel: {
            return state
        };
        default: return state;
    }
}

const initialGlobalState: GlobalState = {
    window: {
        size: {
            height: 540,
            width: 960,
        },
        isFocused: true,
        isMaximized: false,
    },
    modals: {
        menu: false,
        image: null,
    },
    pageStack: [{pageKey: 'launcher'}],
    notifArray: []
}

export type GlobalStateContext = {
    state: GlobalState,
    dispatch: React.Dispatch<GlobalStateAction>
}

export const globalStateContext = createContext<GlobalStateContext>({
    state: initialGlobalState,
    dispatch: () => console.log("Hey! Looks like you're sending state dispatches to THE VOID!"),
    //Those two lines of code above theoretically will never be execuated. If not, then it's a bug.
    
    //I just want my IDE to shut up.
})

export const GlobalStateProvider: React.FC<{children?: React.ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(globalStateReducer, initialGlobalState);
    return (
        <globalStateContext.Provider value={{state, dispatch}}>
            {children}
        </globalStateContext.Provider>
    )
}