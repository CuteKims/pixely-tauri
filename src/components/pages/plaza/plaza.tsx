import { Suspense, useContext, useEffect, useState } from 'react'
import pagesMap, { SubpageMap } from '../pages'
import styles from './plaza.module.css'
import { GlobalStateActionTypes, globalStateContext } from '../../hocs/context'
import { SideButton } from '../../shared/button'
import BackendInvoker, { InstantTaskHeaders } from '../../../bridger/invoker'

import iconDirt from '../../../assets/icons/dirt_block.png'
import iconGrass from '../../../assets/icons/grass_block.png'
import iconStone from '../../../assets/icons/stone_block_old.png'
import { ManifestVersion, MinecraftInstance, ParsedTaskResponse, VersionManifest, VersionType } from '../../../bridger/parser'
import { ScrollBox } from '../../hocs/scrollbox'

//MainComponent
const Plaza: React.FC = () => {
    let {state, dispatch} = useContext(globalStateContext);

    //fallback
    if(state.pageStack.slice(-1)[0].subpage.length == 0) state = {
        ...state,
        pageStack: [...state.pageStack.slice(0,-1), {
            ...state.pageStack.slice(-1)[0],
            subpage: [{
                page: 'plaza.version_manifest',
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
            <div id={styles.background} />
            <div id={styles.container}>
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
                <Subpage />
            </div>
        </>
    )
}

const FallbackComponent: React.FC = () => {
    return (
        <>
            <p style={{width: '100%', textAlign: 'center', fontSize: '16px', marginTop: 32}}>Loading</p>
        </>
    )
}

const PageVersionManifest: React.FC = () => {
    const [data, setData] = useState<{state: 'loading' | 'ok' | 'error', data: null | VersionManifest | any}>({state: 'loading', data: null});
    const [filter, setFilter] = useState<string>('');
    useEffect(() => {
        new BackendInvoker({
            Instant: {
                VersionManifest: 'https://bmclapi2.bangbang93.com/mc/game/version_manifest_v2.json'
            }
        }).invoke().then(result => {
            setTimeout(() => {
                setData({
                    state: 'ok',
                    data: (result as ParsedTaskResponse<InstantTaskHeaders>).body as VersionManifest
                })
            }, 300)
            
        }).catch(error => {
            setData({state: 'error', data: error});
        })
    }, []);
    function callback(version: ManifestVersion) {
        console.log(version);
    };
    return (
        <ScrollBox>
            <div id='subpage'>
                <div style={{position: 'relative', height: '40px', marginBottom: '18px', display: 'flex'}}>
                    <input type='search' id={styles.searchbox} onChange={(element => {setFilter(element.currentTarget.value)})} placeholder='搜索版本...'/>
                    <div style={{position: 'absolute', top: '11px', left: '12px'}}>
                        <SearchIcon />
                    </div>
                </div>
                
                {(() => {
                    switch (data.state) {
                        case 'loading': return <FallbackComponent />;
                        case 'error': return <p>{data.data}</p>;
                        case 'ok': return (
                            <div id={styles['version-manifest']}>
                                {listFilter((data.data as VersionManifest), filter).map(version => <MinecraftVersion key={version.id} props={{version, callback}}/>)}
                            </div>
                        );
                    };
                })()}
            </div>
        </ScrollBox>
    )
}

function listFilter(manifest: VersionManifest, filter: string): ManifestVersion[] {
    let returnValue: ManifestVersion[] = [];
    if(filter.search('-') !== 0) {

    }
    manifest.versions.forEach((version) => {
        if (version.id.search(filter) !== -1) returnValue.push(version);
    });
    return returnValue
}

const SearchIcon: React.FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style={{color: 'var(--default-font-color)'}}>
            <path d="M16,14.937l-4.024-4.076A6.773,6.773,0,0,0,8.138.159,6.661,6.661,0,0,0,.634,3.88,6.8,6.8,0,0,0,2.593,12.1a6.625,6.625,0,0,0,8.357-.146l4,4.046ZM6.682,12.009a5.255,5.255,0,1,1,5.2-5.255,5.226,5.226,0,0,1-5.2,5.255Z" transform="translate(0.001 0.005)" fill="currentColor"/>
        </svg>
    )
}

const MinecraftVersion: React.FC<{props: {
    version: ManifestVersion,
    callback: (args: ManifestVersion) => void,
}}> = ({props}) => {
    return (
        <div className={styles['component-manifest-version']} onClick={() => props.callback(props.version)}>
            <div className={styles.bgcolor}>
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
                        return type
                        + ' '
                        + date.getFullYear()
                        + '-'
                        + date.getMonth().toString().padStart(2, '0')
                        + '-'
                        + date.getDay().toString().padStart(2, '0')
                        + ' '
                        + date.getHours()
                        + ':'
                        + date.getMinutes().toString().padStart(2, '0')
                    })()}</p>
                </div>
            </div>
        </div>
    )
}

const PageDownloadPreview: React.FC = () => {
    // const version: ManifestVersion = {
    //     id: '1.12.2',
    //     type: VersionType.release,
    //     url: 'https://piston-meta.mojang.com/v1/packages/832d95b9f40699d4961394dcf6cf549e65f15dc5/1.12.2.json',
    //     time: '2023-06-07T11:49:20+00:00',
    //     releaseTime: '2017-09-18T08:39:46+00:00',
    //     sha1: '832d95b9f40699d4961394dcf6cf549e65f15dc5',
    //     complianceLevel: 0,
    // };
    return (
        <>
            <div>

            </div>
        </>
    )
}

export const subpagesMap: SubpageMap = {
    'plaza.version_manifest': {
        component: PageVersionManifest,
        friendlyName: '本体',
        display: true,
    },
    'plaza.modpack': {
        component: PageVersionManifest,
        friendlyName: '整合包',
        display: true,
    },
    'plaza.download_preview': {
        component: PageDownloadPreview,
        friendlyName: '下载预览',
        display: true,
    }
}

export default Plaza;