import { useRef, useState } from 'react';

import bgimage from '../../assets/bgimage/wallpaper9.jpg'

import { PageStackState, pageStackContext, pageStackContextWrapper } from './contextWrapper/page_stack';

import Titlebar from './Titlebar';

import { webviewWindow } from '@tauri-apps/api';
import { PAGES_MAP } from '../../consts/pages';
import ActionCenter from './ActionCenter';

import { GlobalState, globalContextWrapper } from './contextWrapper/global'
import { titlebarPropsAdapter, titlebarRefAdapter } from './Titlebar/adapter';
import { actionCenterPropsAdapter } from './ActionCenter/adapter';

const App: React.FC = () => {
    const globalState = useState<GlobalState>({isActionCenterShow: false, isMaximized: false, windowSize: {width: 960, height: 540}})
    const pageStackState = useState<PageStackState>([{pageKey: 'launcher'}])
    
    let globalContextValue = globalContextWrapper(globalState, webviewWindow.getCurrent())
    let pageStackContextValue = pageStackContextWrapper(pageStackState)

    let CurrentPage = PAGES_MAP[pageStackContextValue.getLastPage().pageKey].component

    const titlebarRef = useRef(titlebarRefAdapter(pageStackContextValue, globalContextValue))

    return (
        <>
            <Titlebar props={titlebarPropsAdapter(pageStackContextValue, globalContextValue)} funcs={titlebarRef.current}/>
            <ActionCenter props={actionCenterPropsAdapter(pageStackContextValue, globalContextValue)}/>
            <ModalContainer />
            <pageStackContext.Provider value={pageStackContextValue}>
                <CurrentPage />
            </pageStackContext.Provider>
            <img src={bgimage} style={{position: 'absolute', height: '100%', width: '100%', objectFit: 'cover', zIndex: -1}}/>
        </>
    )
}



const ModalContainer: React.FC = () => {
    return (
        <div id='modal-container' style={{position: 'absolute', height: '100%', width: '100%', zIndex: 99, pointerEvents: 'none'}}>
            <Watermark />
        </div>
    )
}

const Watermark = () => {
    return <p id='watermark' style={{
        position: 'absolute',
        bottom: 36,
        right: 36,
        fontSize: '15px',
        textShadow: 'none',
        opacity: .75,
        color: 'white',
        textAlign: 'right'
    }}>
        PixelyLauncher Milestone 1
        <br/>
        开发版本：不代表最终品质
    </p>
}

export default App;
