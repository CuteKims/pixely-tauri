import { useEffect, useContext } from 'react';

import { WindowStateActions, globalStateContext } from './components/hocs/context';

import bgimage from './assets/bgimage/wallpaper6.jpg';

import Titlebar from './components/titlebar';

import { appWindow } from '@tauri-apps/api/window';
import pagesMap from './components/pages/pages';
import NotificationBanner from './components/modals/notification';
import ActionCenter from './components/modals/actioncenter';

function App() {
    const {state, dispatch} = useContext(globalStateContext);
    const updateWindowSize = () => {
        dispatch({
            category: 'window_state',
            type: WindowStateActions.SetSize,
            value: {
                height: window.innerHeight,
                width: window.innerWidth,
            }
        });
        appWindow.isMaximized().then(isMaximized => {
            dispatch({
                category: 'window_state',
                type: WindowStateActions.SetIsMaximized,
                value: isMaximized
            });
        })
    };
    const updateIsFocus = () => {
        appWindow.isFocused().then(isFocused => {
            dispatch({
                category: 'window_state',
                type: WindowStateActions.SetIsFocus,
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

    const CurrentPage = pagesMap[state.pageStack.slice(-1)[0].pageKey].component;
    return (
        <div id='app-body' style={{width: '100%', height: state.window.size.height, overflow: 'hidden'}}>
            <div id='titlebar-container' style={{position: 'absolute', top: 0, left: 0, zIndex: 100, width: '100%'}}>
                <Titlebar />
            </div>
            <div id='modals-container' style={{position: 'absolute', top: 0, left: 0, zIndex: 99, height: '100%', width: '100%', pointerEvents: 'none'}}>
                <ActionCenter />
                <NotificationBanner />
                
            </div>
            <div key={state.pageStack.slice(-1)[0].pageKey} id='page-container'>
                <CurrentPage />
            </div>
            <div id='background-container'>
                <img src={bgimage} style={{height: '100%', width: '100%', objectFit: 'cover'}}/>
            </div>
        </div>
    )
}

export default App;
