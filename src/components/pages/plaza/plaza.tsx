import { useContext, useEffect, useRef, useState } from 'react'
import pagesMap, { SubpageMap } from '../pages'
import styles from './plaza.module.css'
import { Page, PageStackActions, globalStateContext } from '../../hocs/context'
import { SideButton } from '../../shared/button'
import BackendInvoker, { InstantTaskHeaders } from '../../../bridger/invoker'


import { ManifestVersion, ParsedTaskResponse, VersionManifest, VersionType } from '../../../bridger/parser'
import { ScrollBox } from '../../hocs/scrollbox'
import { motion, AnimatePresence } from 'framer-motion'
import { IconArrow, IconDownload, IconSearch } from '../../shared/icons'
import SubpageInstaller from './installer/installer'
import { SubpageVersionManifest } from './version_manifest/version_manifest'

//MainComponent
const Plaza: React.FC = () => {
    let {state, dispatch} = useContext(globalStateContext);

    let subpageKey = state.pageStack.slice(-1)[0].subpage?.pageKey;

    if(subpageKey == undefined) {
        subpageKey = 'plaza.version_manifest'
        dispatch({
            category: 'page_stack',
            type: PageStackActions.Replace,
            value: {
                pageKey: 'plaza',
                subpage: {
                    pageKey: 'plaza.version_manifest'
                }
            }
        })
    }

    let SubpageComponent = subpagesMap[subpageKey].component;

    const buttonCallback = (pageKey: string) => {
        dispatch({
            category: 'page_stack',
            type: PageStackActions.SetSubpage,
            value: {
                pageKey
            }
        });
    };

    return (
        <>
            <div id={styles.background} />
            <div id={styles.container}>
                <div id={styles.sidemenu}>
                    {Object.keys(pagesMap['plaza'].subpages).map((key) => (
                        <SideButton key={key} props={{
                            pageKey: key,
                            friendlyName: pagesMap.plaza.subpages[key].friendlyName,
                            display: pagesMap.plaza.subpages[key].display,
                            isSelected: subpageKey == key,
                            callback: buttonCallback,
                        }} />
                    ))}
                </div>
                <SubpageComponent />
            </div>
        </>
    )
}

export const FallbackComponent: React.FC = () => {
    return (
        <>
            <p style={{width: '100%', textAlign: 'center', fontSize: '16px', marginTop: 32}}>Loading</p>
        </>
    )
}




const Playground: React.FC = () => {
    return (
        <div>

        </div>
    )
}

export const subpagesMap: SubpageMap = {
    'plaza.version_manifest': {
        component: SubpageVersionManifest,
        friendlyName: '本体',
        display: true,
    },
    'plaza.modpack': {
        component: SubpageVersionManifest,
        friendlyName: '整合包',
        display: true,
    },
    'plaza.installer': {
        component: SubpageInstaller,
        friendlyName: '安装',
        display: false,
    },
    'plaza.playgroud': {
        component: Playground,
        friendlyName: 'Playground',
        display: true,
    }
}

export default Plaza;