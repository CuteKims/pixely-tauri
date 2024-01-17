import { useEffect, useContext } from 'react';

import { GlobalStateActionTypes, globalStateContext } from './components/hocs/context';

import bgimage from './assets/bgimage/wallpaper2.jpg';

import Titlebar from './components/titlebar';

import { appWindow } from '@tauri-apps/api/window';
import pagesMap from './components/pages/pages';
import NotificationBanner from './components/modals/notification';
import ActionCenter from './components/modals/actioncenter';

import styles from './App.module.css'

function App() {
    const {state, dispatch} = useContext(globalStateContext);
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
    // useEffect(() => {
    //     updateWindowSize();
    //     updateIsFocus();
    // }, []);

    // Listen to window events and update GlobalStates.
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

    const CurrentPage = pagesMap[state.pageStack.slice(-1)[0].page].component;
    return (
        <div id='app-body' style={{width: '100%', height: state.window.size.height, overflow: 'hidden'}}>
            <div id={styles['background-container']} style={{transform: state.modals.menu ? 'scale(1) translateY(0px)' : 'scale(1.2) translateY(36px)'}}>
                <img src={bgimage} style={{height: '100%', width: '100%', objectFit: 'cover'}}/>
            </div>
            <div id='titlebar-container' style={{position: 'absolute', top: 0, left: 0, zIndex: 100, width: '100%'}}>
                <Titlebar />
            </div>
            <div id='modals-container' style={{position: 'absolute', top: 0, left: 0, zIndex: 99, height: '100%', width: '100%', pointerEvents: 'none'}}>
                <ActionCenter />
                <NotificationBanner />
            </div>
            <div key={state.pageStack.slice(-1)[0].page} id='page-container' style={state.modals.menu ? {transform: 'scale(.9)', height: '112%', top: '-6%'} : {transform: 'scale(1)', height: '100%', top: '0%'}}>
                <CurrentPage />
            </div>
        </div>
    )
}

export default App;
