import { useContext, useEffect, useState } from 'react'
import pagesMap, { SubpageMap } from '../pages'
import styles from './plaza.module.css'
import { PageStackActions, globalStateContext } from '../../hocs/context'
import { SideButton } from '../../shared/button'
import BackendInvoker, { InstantTaskHeaders } from '../../../bridger/invoker'

import iconDirt from '../../../assets/icons/dirt_block.png'
import iconGrass from '../../../assets/icons/grass_block.png'
import iconStone from '../../../assets/icons/stone_block_old.png'
import { ManifestVersion, ParsedTaskResponse, VersionManifest, VersionType } from '../../../bridger/parser'
import { ScrollBox } from '../../hocs/scrollbox'
import { motion, AnimatePresence } from 'framer-motion'
import { IconArrow, IconDownload, IconSearch } from '../../shared/icons'

//MainComponent
const Plaza: React.FC = () => {
    let {state, dispatch} = useContext(globalStateContext);

    let subpageKey = state.pageStack.slice(-1)[0].subpage?.pageKey;
    if(subpageKey == undefined) subpageKey = 'plaza.version_manifest'

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

const FallbackComponent: React.FC = () => {
    return (
        <>
            <p style={{width: '100%', textAlign: 'center', fontSize: '16px', marginTop: 32}}>Loading</p>
        </>
    )
}

const PageVersionManifest: React.FC = () => {
    const {state, dispatch} = useContext(globalStateContext)
    const [data, setData] = useState<{state: 'loading' | 'ok' | 'error', data: null | VersionManifest | any}>({state: 'loading', data: null});
    const [filter, setFilter] = useState<string>('');
    useEffect(() => {
        new BackendInvoker({
            type: 'instant',
            header: InstantTaskHeaders.GetVersionManifest,
            body: 'https://bmclapi2.bangbang93.com/mc/game/version_manifest_v2.json',
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
        dispatch({
            category: 'page_stack',
            type: PageStackActions.SetSubpage,
            value: {
                pageKey: 'plaza.install_preview',
                internalState: version
            }
        });
    };
    return (
        <ScrollBox>
            <div id='subpage'>
                <div style={{position: 'relative', height: '40px', marginBottom: '18px', display: 'flex'}}>
                    <input type='search' id={styles.searchbox} onChange={(element => {setFilter(element.currentTarget.value)})} placeholder='搜索版本...'/>
                    <div style={{position: 'absolute', top: '11px', left: '12px'}}>
                        <IconSearch />
                    </div>
                </div>
                
                {(() => {
                    switch (data.state) {
                        case 'loading': return <FallbackComponent />;
                        case 'error': return <p>{data.data}</p>;
                        case 'ok': return (
                            <div id={styles['version-manifest']}>
                                <AnimatePresence>
                                    {listFilter((data.data as VersionManifest), filter).map(version => <MinecraftVersion key={version.id} props={{version, callback}}/>)}
                                </AnimatePresence>
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

const MinecraftVersion: React.FC<{props: {
    version: ManifestVersion,
    callback: (args: ManifestVersion) => void,
}}> = ({props}) => {
    return (
        <motion.div
        layout
        initial={{scale: .9, opacity: 0}}
        animate={{scale: 1, opacity: 1}}
        exit={{scale: .9, opacity: 0}}
        transition={{duration: .3, ease: [0,.8,.2,1]}}
        className={styles['component-manifest_version']} onClick={() => props.callback(props.version)}
        key={props.version.id}
        >
            <div className={styles.bgcolor}>
                <img src={(() => {
                    switch (props.version.type) {
                        case VersionType.snapshot: return iconDirt;
                        case VersionType.release: return iconGrass;
                        default: return iconStone;
                    }
                })()}/>
                <div className={styles['title_container']}>
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
        </motion.div>
    )
}

const PageInstallPreview: React.FC = () => {
    const {state, dispatch} = useContext(globalStateContext);
    let version = state.pageStack.slice(-1)[0].subpage?.internalState as ManifestVersion | undefined
    if(version == undefined) version = {
        id: 'MISSINGNO.',
        type: VersionType.oldAlpha,
        url: 'MISSINGNO.',
        time: 'MISSINGNO.',
        releaseTime: 'MISSINGNO.',
        sha1: 'MISSINGNO.',
        complianceLevel: 0,
    }
    return (
        <div style={{width: '100%', height: '100%'}}>
            <ScrollBox>
                <div id='subpage' style={{paddingBottom: '136px'}}>
                    <p style={{fontSize: '15px', textShadow: '0px 0px 4px rgba(0, 0, 0, .5), 0px 4px 8px rgba(0, 0, 0, .5)', color: 'white', opacity: .75, marginLeft: '0px'}}>{version.id}</p>
                    <p style={{fontSize: '24px', textShadow: '0px 0px 4px rgba(0, 0, 0, .5), 0px 4px 8px rgba(0, 0, 0, .5)', color: 'white', marginLeft: '0px'}}>实例创建向导</p>
                </div>
            </ScrollBox>
            <div style={{width: '100%', height: '100%', position: 'relative', top: '-100%', pointerEvents: 'none'}}>
                <div style={{height: '100%', padding: '0px 36px', display: 'flex', flexDirection: 'column'}}>
                    <div id={styles['installer_previewer']}>
                        <img src={(() => {
                            switch (version.type) {
                                case VersionType.snapshot: return iconDirt;
                                case VersionType.release: return iconGrass;
                                default: return iconStone;
                            }
                        })()}/>
                        <div style={{margin: 'auto', marginLeft: '0px'}}>
                            <p style={{fontSize: '18px'}}>新实例</p>
                            <p style={{fontSize: '14px', opacity: .75}}>{version.id}</p>
                        </div>
                        <div style={{margin: 'auto', marginRight: '18px', transform: 'scale(.8)'}}>
                            <IconDownload/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
        component: PageVersionManifest,
        friendlyName: '本体',
        display: true,
    },
    'plaza.modpack': {
        component: PageVersionManifest,
        friendlyName: '整合包',
        display: true,
    },
    'plaza.install_preview': {
        component: PageInstallPreview,
        friendlyName: '下载预览',
        display: false,
    },
    'plaza.playgroud': {
        component: Playground,
        friendlyName: 'Playground',
        display: true,
    }
}

export default Plaza;