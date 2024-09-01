import { useState } from 'react';

import bgimage from '../../../assets/bgimage/wallpaper2.jpg'

import Titlebar from './titlebar/Titlebar';

import ActionCenter from './actionCenter/ActionCenter';

import { titlebarPropsAdapter } from './titlebar/adapter';
import { actionCenterPropsAdapter } from './actionCenter/adapter';
import { Outlet } from 'react-router';
import { RootState, globalContextWrapper, rootContext } from './rootContext';
import { webviewWindow } from '@tauri-apps/api';
import { useBridger } from '../../../bridger/bridger';

import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient'
import * as reactSpring from '@react-spring/three'
import * as drei from '@react-three/drei'
import * as fiber from '@react-three/fiber'

export const bridger = useBridger()

const Root: React.FC = () => {
    const rootContextValue = globalContextWrapper(useState<RootState>({isActionCenterShow: false, isMaximized: false}), webviewWindow.getCurrent())
    return (
        <>
            <Titlebar props={titlebarPropsAdapter(rootContextValue)}/>
            <ActionCenter props={actionCenterPropsAdapter(rootContextValue)}/>
            <ModalContainer />
            <rootContext.Provider value={rootContextValue}>
                <Outlet />
            </rootContext.Provider>
            <ShaderGradientCanvas
                importedFiber={{ ...fiber, ...drei, ...reactSpring }}
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  zIndex: -1,
                }}
            >
                <ShaderGradient
                    control='query'
                    urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&brightness=1.2&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=90&cameraZoom=1&color1=%23ff5005&color2=%23dbba95&color3=%23d0bce1&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=plane&uDensity=1.3&uFrequency=5.5&uSpeed=0.4&uStrength=4&uTime=0&wireframe=false'
                />
            </ShaderGradientCanvas>
            {/* <img src={bgimage} style={{position: 'absolute', height: '100%', width: '100%', objectFit: 'cover', zIndex: -1, transform: rootContextValue.rootState.isActionCenterShow ? 'scale(1.01)' : 'scale(1.05)', transition: '.5s cubic-bezier(0,.8,.2,1)'}}/> */}
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
