import { useState } from 'react';
import { createPortal } from 'react-dom'

import bgimage from '../../../assets/bgimage/wallpaper14.jpg'

import Titlebar from './titlebar/Titlebar';

import ActionCenter from './actionCenter/ActionCenter';

import { titlebarPropsAdapter } from './titlebar/adapter';
import { actionCenterPropsAdapter } from './actionCenter/adapter';
import { Outlet } from 'react-router';
import { RootState, globalContextWrapper, rootContext } from './rootContext';
import { webviewWindow } from '@tauri-apps/api';
import { useBridger } from '../../../bridger/bridger';
import { AnimatePresence } from 'framer-motion';

export const bridger = useBridger()

const Root: React.FC = () => {
    const rootContextValue = globalContextWrapper(useState<RootState>({isActionCenterShow: false, isMaximized: false}), webviewWindow.getCurrent())
    return (
        <>
            <div id="foreground-container">
                <div id="titlebar-container">
                    <Titlebar props={titlebarPropsAdapter(rootContextValue)} />
                </div>
                <div id="modal-container">
                    <ModalContainer />
                    <ActionCenter props={actionCenterPropsAdapter(rootContextValue)}/>
                </div>
            </div>
            <div id="root-outlet-container">
                <rootContext.Provider value={rootContextValue}>
                    <Outlet />
                </rootContext.Provider>
            </div>
            <div id="background-container">
                <img src={bgimage} style={{height: '100%', width: '100%', objectFit: 'cover', transform: rootContextValue.rootState.isActionCenterShow ? 'scale(1.01)' : 'scale(1.05)', transition: '.5s cubic-bezier(0,.8,.2,1)'}}/>
            </div>
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
    return <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,.2)',
        backdropFilter: 'blur(8px)'
    }}>
        <p id='watermark' style={{
            fontSize: '15px',
            textShadow: 'none',
            opacity: .75,
            color: 'white',
            textAlign: 'right',
            margin: '0px',
        }}>
            PixelyLauncher Milestone 2
            <br/>
            开发版本：不代表最终品质
        </p>
    </div>
    
}

export default Root;
