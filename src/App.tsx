import { useEffect, useState, createContext, useReducer, ProviderProps, useContext } from 'react';

import { GlobalStateActionTypes, GlobalStateContext } from './components/hocs/state/context';

import bgimage from './assets/bgimage/wallpaper14.jpg';

import Titlebar from './components/titlebar';
import Menu from './components/models/menu';

import AppLauncher from './components/apps/launcher';
import { appWindow } from '@tauri-apps/api/window';



function App() {
    const {state, dispatch} = useContext(GlobalStateContext);
    const updateWindowSize = () => {
        dispatch({
            type: GlobalStateActionTypes.SetWindowSize,
            value: {
                height: window.innerHeight,
                width: window.innerWidth,
            }
        });
        appWindow.isMaximized().then(isMaximized => {
            dispatch({
                type: GlobalStateActionTypes.SetIsMaximized,
                value: isMaximized
            });
        })
    };
    const updateIsFocus = () => {
        appWindow.isFocused().then(isFocused => {
            dispatch({
                type: GlobalStateActionTypes.SetIsFocus,
                value: isFocused
            });
        })
    };
    //Update initialGlobalState after the first render.
    useEffect(() => {
        updateWindowSize();
        updateIsFocus();
    }, []);

    //Listen to window events and update GlobalStates.
    useEffect(() => {
        window.addEventListener('resize', updateWindowSize);
        window.addEventListener('focus', updateIsFocus);
        window.addEventListener('blur', updateIsFocus);
        return () => {
            window.removeEventListener('resize', updateWindowSize);
            window.removeEventListener('focus', updateIsFocus);
            window.removeEventListener('blur', updateIsFocus);
        }
    });
    return (
        <div id='app-body' style={{width: '100%', height: state.window.size.height, overflow: 'hidden'}}>
            <div id='background-container' style={{position: 'absolute', top: 0, left: 0, zIndex: -1, height: '100%', width: '100%'}}>
                <Background />
            </div>
            <div id='titlebar-container' style={{position: 'absolute', top: 0, left: 0, zIndex: 100, width: '100%'}}>
                <Titlebar />
            </div>
            <div id='modal-container' style={{position: 'absolute', top: 0, left: 0, zIndex: 99, height: '100%', width: '100%', pointerEvents: 'none'}}>
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
