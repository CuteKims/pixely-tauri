import { WebviewWindow } from "@tauri-apps/api/webviewWindow"
import { createContext } from "react"

export type RootState = {
    windowSize: {
        width: number,
        height: number,
    }
    isMaximized: boolean,
    isActionCenterShow: boolean,
}

export type RootContext = {
    rootState: RootState,
    toggleMaximize: () => void,
    toggleIsActionCenterShow: () => void,
    setIsActionCenterShow: (isShow: boolean) => void,
    setMinimized: () => void,
    close: () => void,
}

export function globalContextWrapper(state: [RootState, React.Dispatch<React.SetStateAction<RootState>>], appWindow: WebviewWindow): RootContext {
    let [rootState, setRootState] = state
    return {
        rootState,
        toggleMaximize: () => {
            appWindow.isMaximized().then(bool => {
                switch (bool) {
                    case true:
                        appWindow.unmaximize().then(() => setRootState(state => {return {...state, isMaximized: bool}}))
                        break;
                    case false:
                        appWindow.maximize().then(() => setRootState(state => {return {...state, isMaximized: bool}}))
                        break;
                }
                
            })
        },
        toggleIsActionCenterShow: () => {
            setRootState(state => {
                if(state.isActionCenterShow) return {...state, isActionCenterShow: false}
                else return {...state, isActionCenterShow: true}
            })
        },
        setIsActionCenterShow: (isShow) => {
            setRootState(state => {return {...state, isActionCenterShow: isShow}})
        },
        setMinimized: () => {
            appWindow.minimize()
        },
        close: () => {
            appWindow.close()
        }
    }
}

export const rootContext = createContext<RootContext | null>(null)