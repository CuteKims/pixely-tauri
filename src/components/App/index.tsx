import { useState } from 'react';

import bgimage from '../../assets/bgimage/wallpaper14.jpg'

import { PageStackState, pageStackContext, pageStackContextWrapper } from './contextWrappers/page_stack';


import Titlebar from './TitleBar';

import { appWindow } from '@tauri-apps/api/window';
import { PAGES_MAP } from '../../consts/pages';
import ActionCenter from './ActionCenter';

import { GlobalState, globalContextWrapper } from './contextWrappers/global'
import { titleBarPropsAdapter } from './TitleBar/adapter';
import { actionCenterPropsAdapter } from './ActionCenter/adapter';

/* This is a Smart component, that means it shouldn't contain ANYTHING related to styles and div elements and only deal with state management and logics. */
const App: React.FC = () => {
    const globalState = useState<GlobalState>({isActionCenterShow: false, isMaximized: false, windowSize: {width: 960, height: 540}})
    const pageStackState = useState<PageStackState>([{pageKey: 'launcher'}])
    
    let globalContextValue = globalContextWrapper(globalState, appWindow)
    let pageStackContextValue = pageStackContextWrapper(pageStackState)

    let CurrentPage = PAGES_MAP[pageStackContextValue.getLastPage().pageKey].component

    return (
        <>
            <Titlebar props={titleBarPropsAdapter(pageStackContextValue, globalContextValue)}/>
            <ActionCenter props={actionCenterPropsAdapter(pageStackContextValue, globalContextValue)}/>
            <ModalPresenter />
            <pageStackContext.Provider value={pageStackContextValue}>
                <CurrentPage />
            </pageStackContext.Provider>
            <img src={bgimage} style={{position: 'absolute', height: '100%', width: '100%', objectFit: 'cover', zIndex: -1}}/>
        </>
    )
}

const ModalPresenter: React.FC = () => {
    return (
        <div id='modal-presenter' style={{position: 'absolute', height: '100%', width: '100%', zIndex: 99, pointerEvents: 'none'}}>
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
