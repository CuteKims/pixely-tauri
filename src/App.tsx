import { useEffect, useState, createContext, useReducer } from 'react';

import bgimage from './bgimage/wallpaper5.jpg';

import Titlebar from './components/titlebar';
import Menu from './components/menu';

import AppLauncher from './components/apps/launcher';

type GlobalState = {
    flags: {
        menu: boolean,
        exit: boolean,
        focus: boolean,
    },
    appStateStack: AppState[],
}

type AppState = {
    name: String,
}

type StateAction = {
    type: StateActionTypes,
    payload: any,
}

enum StateActionTypes {
    SetMenuFlag,
    SetExitFlag,
    SetFocusFlag,
    PopAppStateStack,
    PushAppStateStack,
}

const initialGlobalState: GlobalState = {
    flags: {
        menu: true,
        exit: false,
        focus: true,
    },
    appStateStack: [],
}

const GlobalStateReducer = (state: GlobalState, action: StateAction): GlobalState => {
    try {
        switch (action.type) {
            case StateActionTypes.SetMenuFlag: {
                return {
                    ...state,
                    flags: {
                        ...state.flags,
                        menu: action.payload
                    },
                }
            };
            default: return state;
        };
    } catch (error: any) {
        throw new Error(error)
    }
}

function App() {
    const [windowSize, setWindowSize] = useState({height: window.innerHeight, width: window.innerWidth});
    const handleResize = () => {
        setWindowSize({height: window.innerHeight, width: window.innerWidth})
    };
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    });
    return (
        <div id='app-body' style={{width: '100%', height: windowSize.height, overflow: 'hidden'}}>
            <div id='background-container' style={{position: 'absolute', top: 0, left: 0, zIndex: -1, height: '100%', width: '100%'}}>
                <Background />
            </div>
            <div id='titlebar-container' style={{position: 'absolute', top: 0, left: 0, zIndex: 100, width: '100%'}}>
                <Titlebar />
            </div>
            <div id='modal-container' style={{position: 'absolute', top: 0, left: 0, zIndex: 99, height: 'auto', width: 'auto'}}>
                <Menu />
            </div>
            <div id='app-container' style={{}}>
                <AppLauncher />
            </div>
        </div>
    )
}



function Background() {
    return (
        <img src={bgimage} style={{height: '100%', width: '100%', objectFit: 'cover'}}/>
    )
}

export default App;
