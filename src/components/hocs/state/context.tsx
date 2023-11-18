import { createContext, useReducer } from "react"

type GlobalState = {
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
    appStateStack: AppState[],
}

type GlobalStateContextType = {
    state: GlobalState,
    dispatch: React.Dispatch<GlobalStateAction>
}

type AppState = {
    name: String,
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
    PopAppStateStack,
    PushAppStateStack,
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
    appStateStack: [],
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
        default: return state
    };
}

export const GlobalStateContext = createContext<GlobalStateContextType>({
    state: initialGlobalState,
    dispatch: () => console.log("Hey! Looks like you're sending state dispatches to THE VOID!"),
    //Those two lines of code above theoretically will never be execuated. If not, then it's a bug.
    
    //I just want my IDE to shut up.
})

export const GlobalStateProvider: React.FC<{children?: React.ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(globalStateReducer, initialGlobalState);
    return (
        <GlobalStateContext.Provider value={{state, dispatch}}>
            {children}
        </GlobalStateContext.Provider>
    )
}