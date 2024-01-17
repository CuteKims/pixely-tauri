import { createContext, useReducer } from "react"

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
}

export type GlobalStateContext = {
    state: GlobalState,
    dispatch: React.Dispatch<GlobalStateAction>
}

export type Page = {
    page: string,
    internalState?: any,
    subpage: Page[],
}

type GlobalStateAction = {
    type: GlobalStateActionTypes,
    value: any,
}

export enum GlobalStateActionTypes {
    SetMenuFlag,
    SetExitFlag,
    SetIsFocus,
    SetIsMaximized,
    SetWindowSize,
    PopPageStack,
    PushPageStack,
    ReplacePageStack,
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
    pageStack: [{page: 'launcher', subpage: []}],
}

const globalStateReducer = (state: GlobalState, action: GlobalStateAction): GlobalState => {
    switch (action.type) {
        case GlobalStateActionTypes.SetMenuFlag: {
            return {
                ...state,
                modals: {
                    ...state.modals,
                    menu: action.value
                },
            };
        };
        case GlobalStateActionTypes.SetIsFocus: {
            return {
                ...state,
                window: {
                    ...state.window,
                    isFocused: action.value
                }
            }
        };
        case GlobalStateActionTypes.SetIsMaximized: {
            return {
                ...state,
                window: {
                    ...state.window,
                    isMaximized: action.value
                }
            }
        };
        case GlobalStateActionTypes.SetWindowSize: {
            return {
                ...state,
                window: {
                    ...state.window,
                    size: action.value
                }
            }
        };
        case GlobalStateActionTypes.PushPageStack: {
            let returnValue: GlobalState;
            //比对入栈页面和堆栈最后一个页面
            if(action.value.page == state.pageStack.slice(-1)[0].page && action.value.subpage.length == 0) returnValue = state;
            else returnValue = {
                ...state,
                pageStack: [...state.pageStack, action.value]
            };
            return returnValue
        };
        case GlobalStateActionTypes.PopPageStack: {
            if (!(state.pageStack.length > 1)) {
                return globalStateReducer(state, action={type: GlobalStateActionTypes.SetMenuFlag, value: true})
            };

            return {
                ...state,
                pageStack: state.pageStack.slice(0,-1)
            }
        };
        case GlobalStateActionTypes.ReplacePageStack: {
            let returnValue: GlobalState;
            if(action.value.page == state.pageStack.slice(-1)[0].page && action.value.subpage.length == 0) return state;

            returnValue = {
                ...state,
                pageStack: state.pageStack.splice(state.pageStack.length - 1, 1, action.value)
            };
            return returnValue
        }
        default: return state
    };
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