import { WebviewWindow } from "@tauri-apps/api/window"

export type GlobalState = {
    windowSize: {
        width: number,
        height: number,
    }
    isMaximized: boolean,
    isActionCenterShow: boolean,
}

export type GlobalContext = {
    globalState: GlobalState,
    toggleMaximize: () => void,
    toggleIsActionCenterShow: () => void,
    setIsActionCenterShow: (isShow: boolean) => void,
    setMinimized: () => void,
    close: () => void,
}

export function globalContextWrapper(state: [GlobalState, React.Dispatch<React.SetStateAction<GlobalState>>], appWindow: WebviewWindow): GlobalContext {
    let [globalState, setGlobalState] = state
    return {
        globalState,
        toggleMaximize: () => {
            appWindow.isMaximized().then((isMaximized: boolean) => {
                if(isMaximized) {
                    appWindow.toggleMaximize().then(() => setGlobalState(state => {return {...state, isMaximized: false}}))
                } else {
                    appWindow.toggleMaximize().then(() => setGlobalState(state => {return {...state, isMaximized: true}}))
                }
            })
        },
        toggleIsActionCenterShow: () => {
            setGlobalState(state => {
                if(state.isActionCenterShow) return {...state, isActionCenterShow: false}
                else return {...state, isActionCenterShow: true}
            })
        },
        setIsActionCenterShow: (isShow) => {
            setGlobalState(state => {return {...state, isActionCenterShow: isShow}})
        },
        setMinimized: () => {
            appWindow.minimize()
        },
        close: () => {
            appWindow.close()
        }
    }
}