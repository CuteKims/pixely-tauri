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
    flags: {
        menu: boolean,
        exit: boolean,
    },
    pageStack: Page[],
}

export type GlobalStateContext = {
    state: GlobalState,
    dispatch: React.Dispatch<GlobalStateAction>
}

export type Page = {
    page: string,
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
    flags: {
        menu: true,
        exit: false,
    },
    pageStack: [{page: 'launcher'}],
}

const globalStateReducer = (state: GlobalState, action: GlobalStateAction): GlobalState => {
    switch (action.type) {
        case GlobalStateActionTypes.SetMenuFlag: {
            return {
                ...state,
                flags: {
                    ...state.flags,
                    menu: action.value
                },
            };
        };
        case GlobalStateActionTypes.SetExitFlag: {
            return {
                ...state,
                flags: {
                    ...state.flags,
                    exit: action.value
                }
            }
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
            return {
                ...state,
                pageStack: [...state.pageStack, action.value]
            }
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