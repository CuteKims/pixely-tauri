import { Suspense, useContext, useEffect, useState } from 'react'
import pagesMap, { SubpageMap } from '../pages'
import styles from './plaza.module.css'
import { GlobalStateActionTypes, Page, globalStateContext } from '../../hocs/context'
import { SideButton } from '../../shared/button'
import BackendInvoker, { InstantTaskHeaders } from '../../../bridger/invoker'

import iconDirt from '../../../assets/icons/dirt_block.png'
import iconGrass from '../../../assets/icons/grass_block.png'
import iconStone from '../../../assets/icons/stone_block_old.png'
import { ManifestVersion, ParsedTaskResponse, VersionManifest, VersionType } from '../../../bridger/parser'

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
            }],
        }],
    };

    const buttonCallback = (pageKey: string) => {
        dispatch({
            type: GlobalStateActionTypes.PushPageStack,
            value: {
                ...state.pageStack.slice(-1)[0],
                subpage: [{page: pageKey, subpage: []}]
            },
        });
    };

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
                            callback: buttonCallback,
                        }} />
                    ))}
                </div>
                <div id='subpage-container' key={state.pageStack.slice(-1)[0].subpage.slice(-1)[0].page}>
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
            <p>Loading</p>
        </>
    )
}

const Minecraft: React.FC = () => {
    const [data, setData] = useState<{state: 'loading' | 'ok' | 'error', data: null | VersionManifest | Error}>({state: 'loading', data: null});
    useEffect(() => {
        new BackendInvoker({
            Instant: {
                taskHeader: InstantTaskHeaders.VersionManifest,
                taskBody: 'https://bmclapi2.bangbang93.com/mc/game/version_manifest_v2.json',
                //taskBody: 'https://piston-meta.mojang.com/mc/game/version_manifest_v2.json',
            }
        }).invoke().then(result => {
            setData({
                state: 'ok',
                data: (result as ParsedTaskResponse<InstantTaskHeaders>).body as VersionManifest
            })
        }).catch(error => {
            setData({state: 'error', data: error});
        })
    }, []);
    function callback(version: ManifestVersion) {
        console.log(version);
    };
    return (
        <>
            <div id={styles['version-manifest']}>
                {(() => {
                    switch (data.state) {
                        case 'loading': return <FallbackComponent />
                        case 'error': return <p>{(data.data as Error).name + ': ' + (data.data as Error).message}</p>
                        case 'ok': return (data.data as VersionManifest).map(version => <ComponentManifestVersion key={version.id} props={{version, callback}}/>)
                    }
                })()}
            </div>
        </>
    )
}

const ComponentManifestVersion: React.FC<{props: {
    version: ManifestVersion,
    callback: (args: ManifestVersion) => void,
}}> = ({props}) => {
    return (
        <div className={styles['component-manifest-version']} onClick={() => props.callback(props.version)}>
            <img src={(() => {
                switch (props.version.type) {
                    case VersionType.snapshot: return iconDirt;
                    case VersionType.release: return iconGrass;
                    default: return iconStone;
                }
            })()}/>
            <div className={styles['title-container']}>
                <p>{props.version.id}</p>
                <p className={styles.subtitle}>{(() => {
                    let type: string;
                    switch (props.version.type) {
                        case VersionType.snapshot: type = '快照'; break;
                        case VersionType.release: type = '正式版'; break;
                        case VersionType.oldAlpha: type = '早期版本'; break;
                        case VersionType.oldBeta: type = '早期版本'; break;
                    }
                    let date: Date = new Date(props.version.releaseTime);
                    return type + ' ' + date.getFullYear() + '-' + date.getMonth().toString().padStart(2, '0') + '-' + date.getDay().toString().padStart(2, '0') + ' ' + date.getHours() + ':' + date.getMinutes().toString().padStart(2, '0')
                })()}</p>
            </div>
        </div>
    )
}

const DownloadPreview: React.FC = () => {
    const version: ManifestVersion = {
        id: '1.12.2',
        type: VersionType.release,
        url: 'https://piston-meta.mojang.com/v1/packages/832d95b9f40699d4961394dcf6cf549e65f15dc5/1.12.2.json',
        time: '2023-06-07T11:49:20+00:00',
        releaseTime: '2017-09-18T08:39:46+00:00',
        sha1: '832d95b9f40699d4961394dcf6cf549e65f15dc5',
        complianceLevel: 0,
    };
    return (
        <>
            <div>

            </div>
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
        display: true,
    }
}

export default Plaza;