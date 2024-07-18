import { useEffect, useState } from 'react';

import bgimage from '../../../assets/bgimage/wallpaper6.jpg'

import Titlebar from './titlebar/Titlebar';

import ActionCenter from './actionCenter/ActionCenter';

import { titlebarPropsAdapter } from './titlebar/adapter';
import { actionCenterPropsAdapter } from './actionCenter/adapter';
import { Outlet, useNavigate, useRoutes } from 'react-router';
import { RootState, globalContextWrapper, rootContext } from './rootContext';
import { webviewWindow } from '@tauri-apps/api';
import { routes } from '../../../main';

const Root: React.FC = () => {
    const rootContextValue = globalContextWrapper(useState<RootState>({isActionCenterShow: false, isMaximized: false, windowSize: {width: 854, height: 480}}), webviewWindow.getCurrent())
    const navigate = useNavigate()
    useEffect(() => {
        navigate('launcher')
    }, [])
    return (
        <>
            <Titlebar props={titlebarPropsAdapter(rootContextValue)}/>
            <ActionCenter props={actionCenterPropsAdapter(rootContextValue)}/>
            <ModalContainer />
            <rootContext.Provider value={rootContextValue}>
                <Outlet />
            </rootContext.Provider>
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
        bottom: 0,
        right: 0,
        fontSize: '15px',
        textShadow: 'none',
        opacity: .75,
        color: 'white',
        textAlign: 'right',
        margin: '0px',
        backgroundColor: 'rgba(0,0,0,.5)'
    }}>
        PixelyLauncher Milestone 2
        <br/>
        开发版本：不代表最终品质
    </p>
}

export default Root;
