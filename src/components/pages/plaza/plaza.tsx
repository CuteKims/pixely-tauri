import { Suspense, useContext, useEffect, useState } from 'react'
import pagesMap, { SubpageMap } from '../pages'
import styles from './plaza.module.css'
import { GlobalStateActionTypes, Page, globalStateContext } from '../../hocs/context'
import { SideButton } from '../../shared/button'
import BackendInvoker, { InstantTaskHeaders } from '../../../bridger/invoker'

const Plaza: React.FC = () => {
    let {state, dispatch} = useContext(globalStateContext);

    //fallback
    if(state.pageStack.slice(-1)[0].subpage.length == 0) state = {
        ...state,
        pageStack: [...state.pageStack.slice(0,-1), {
            ...state.pageStack.slice(-1)[0],
            subpage: [{
                page: 'plaza.minecraft',
                subpage: [],
            }]
        }]
    }

    const dispatchPage = (pageKey: string) => {
        dispatch({
            type: GlobalStateActionTypes.PushPageStack,
            value: {
                ...state.pageStack.slice(-1)[0],
                subpage: [{page: pageKey, subpage: []}]
            }
        })
    }

    let Subpage = subpagesMap[state.pageStack.slice(-1)[0].subpage.slice(-1)[0].page].component;

    return (
        <>
            <div id={styles.background}>
                <div id={styles.sidemenu}>
                    {Object.keys(pagesMap['plaza'].subpages).map((key) => (
                        <SideButton key={key} props={{
                            pageKey: key,
                            friendlyName: pagesMap.plaza.subpages[key].friendlyName,
                            display: pagesMap.plaza.subpages[key].display,
                            isSelected: state.pageStack.slice(-1)[0].subpage[0].page == key,
                            dispatchPage,
                        }} />
                    ))}
                </div>
                <div id={styles['page-container']}>
                    <Suspense fallback={<FallbackComponent />}>
                        <Subpage />
                    </Suspense>
                </div>
            </div>
        </>
    )
}

const SidemenuButton: React.FC = () => {
    return (
        <>
            <div className={styles['sidemenu-button']}>
                <p>本体</p>
            </div>
        </>
    )
}

const FallbackComponent: React.FC = () => {
    return (
        <>
            <p style={{paddingTop: 72}}>Loading</p>
        </>
    )
}

const Minecraft: React.FC = () => {
    /*
    const [data, setData] = useState(null);

    useEffect(() => {
        new BackendInvoker({
            Instant: {
                requestHeader: InstantTaskHeaders.VersionManifest,
                requestBody: 'https://piston-meta.mojang.com/mc/game/version_manifest_v2.json'
            }
        }).invoke().then(result => {
            setData({
                state: 'ok',
                data: result
            })
        }).catch(error => setData({state: 'error', data: error}))
    }, [])
    */
    return (
        <FallbackComponent />
    )
}

const DownloadPreview: React.FC = () => {
    return (
        <>
        </>
    )
}

export const subpagesMap: SubpageMap = {
    'plaza.minecraft': {
        component: Minecraft,
        friendlyName: '本体',
        display: true,
    },
    'plaza.modpack': {
        component: Minecraft,
        friendlyName: '整合包',
        display: true,
    },
    'plaza.download_preview': {
        component: DownloadPreview,
        friendlyName: '下载预览',
        display: false,
    }
}

export default Plaza;