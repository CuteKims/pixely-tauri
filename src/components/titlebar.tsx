import { appWindow } from '@tauri-apps/api/window'

import styles from './titlebar.module.css'

import { useContext } from 'react'
import { GlobalState, PageStackActions, WindowStateActions, globalStateContext } from './hocs/context'
import pagesMap from './pages/pages'
import BackendInvoker, { AsyncTaskHeaders, InstantTaskHeaders, TaskTypes } from '../bridger/invoker'
import { NotificationChannels } from '../bridger/notif'

const TitlebarButton:  React.FC<{children: React.ReactNode, props: {
    position: 'flex-start' | 'flex-end'
    callback: VoidFunction
}}> = ({children, props}) => {
    return (
        <div className={styles.button} style={{justifyContent: props.position}} onClick={props.callback}>
            {children}
        </div>
    )
}


const Titlebar: React.FC = () => {
    const {state, dispatch} = useContext(globalStateContext);
    const openMenu = () => {
        dispatch({
            category: 'window_state',
            type: WindowStateActions.SetMenu,
            value: state.modals.menu ? false : true,
        });
    };
    const back = () => {
        if (state.modals.menu) {
            dispatch({
                category: 'window_state',
                type: WindowStateActions.SetMenu,
                value: false
            })
        } else {
            dispatch({
                category: 'page_stack',
                type: PageStackActions.Pop,
                value: null,
            });
        }
        
    };

    const testFunc = () => {
        // new BackendInvoker({
        //     type: 'instant',
        //     header: InstantTaskHeaders.TestCaller,
        //     body: null
        // }).invoke().then(result => {
        //     console.log(result);
        // }).catch(error => {
        //     console.error(error);
        // });
        dispatch({
            category: 'window_state',
            type: WindowStateActions.PushNotif,
            value: {
                timestamp: Date.now(),
                uuid: Date.now(),
                channel: NotificationChannels.Test,
                payload: {
                    string: 'Hello!'
                }
            }
        })
        // console.log(state)
    };

    return (
        <div id={styles.titlebar} style={state.window.isFocused ? {opacity: 1} : {opacity: .5}} data-tauri-drag-region>
            {/* Back button */}
            <TitlebarButton props={{position: 'flex-start', callback: back}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="36" viewBox="0 0 48 36">
                    <path d="M-1019-1177.653l.707-.707,0,0,4.643-4.643.707.707-4.143,4.144h12.792v1h-12.793l4.146,4.146-.706.707Z" transform="translate(1035.29 1196.149)" fill="currentColor"/>
                </svg>
            </TitlebarButton>
            {/* Menu button */}
            <TitlebarButton props={{position: 'flex-start', callback: openMenu}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="36" viewBox="0 0 48 36">
                    <rect width="14" height="1" transform="translate(17 13)" fill="currentColor"/>
                    <rect width="14" height="1" transform="translate(17 18)" fill="currentColor"/>
                    <rect width="14" height="1" transform="translate(17 23)" fill="currentColor"/>
                </svg>
            </TitlebarButton>
            {/* Test button */}
            <TitlebarButton props={{position: 'flex-start', callback: testFunc}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="36" viewBox="0 0 48 36">
                    <rect width="14" height="1" transform="translate(17 18)" fill="currentColor"/>
                </svg>
            </TitlebarButton>
            <Title state={state}/>
            {/* Minimize button */}
            <TitlebarButton props={{position: 'flex-end', callback: back}}>
                <p style={{height: 36, width: 48, textAlign: 'center', paddingTop: 7, fontSize: 16}}>
                    ?
                </p>
            </TitlebarButton>
            {/* Minimize button */}
            <TitlebarButton props={{position: 'flex-end', callback: () => appWindow.minimize()}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="36" viewBox="0 0 48 36">
                    <rect width="10" height="1" transform="translate(19 22)" fill="currentColor"/>
                </svg>
            </TitlebarButton>
            {/* Maximize button */}
            <TitlebarButton props={{position: 'flex-end', callback: () => appWindow.toggleMaximize()}}>
                {state.window.isMaximized ? <>
                    <svg width="48.000000" height="36.000000" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <path d="M22 13L29 13L29 21L27 21L27 23L19 23L19 15L21 15L21 13L22 13ZM28 14L22 14L22 15L27 15L27 20L28 20L28 14ZM22 16L20 16L20 22L26 22L26 16L22 16Z" fillRule="evenodd" fill="currentColor"/>
                    </svg>
                </> : <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="36" viewBox="0 0 48 36">
                        <path d="M-854,11h-9V1h10V11Zm0-1V2h-8v8Z" transform="translate(882 12)" fill="currentColor"/>
                    </svg>
                </>}
            </TitlebarButton>
            {/* Close button */}
            <div
            className={styles['button-close']}
            onClick={() => appWindow.close()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="36" viewBox="0 0 48 36">
                    <path d="M-1925.7-1176.989l-4.6,4.6-.706-.707,4.6-4.6-4.6-4.6.707-.707,4.6,4.6,4.6-4.6.707.707-4.6,4.6,4.6,4.6-.707.707Z" transform="translate(1949.697 1195.697)" fill="currentColor"/>
                </svg>
            </div>
        </div>
    )
}

const Title: React.FC<{state: GlobalState}> = ({state}) => {
    return (
        <>
            <p className={styles.title} data-tauri-drag-region>{pagesMap[state.pageStack.slice(-1)[0].pageKey].friendlyName}</p>
        </>
    )
}

export default Titlebar;