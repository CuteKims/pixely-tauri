import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState, useEffect, useRef } from "react";
import BackendInvoker, { InstantTaskHeaders } from "../../../../bridger/invoker";
import { VersionManifest, ParsedTaskResponse, ManifestVersion, VersionType } from "../../../../bridger/parser";
import { globalStateContext, PageStackActions } from "../../../hocs/context";
import { ScrollBox } from "../../../hocs/scrollbox";
import { IconSearch } from "../../../shared/icons";
import { FallbackComponent } from "../plaza";

import styles from "./version_manifest.module.css"

import iconDirt from '../../../../assets/icons/dirt_block.png'
import iconGrass from '../../../../assets/icons/grass_block.png'
import iconStone from '../../../../assets/icons/stone_block_old.png'

type InternalState = {
    loadingState: 'loading' | 'ok' | 'error',
    data?: VersionManifest,
    error?: any,
    filter?: string
}

export const SubpageVersionManifest: React.FC = () => {
    const {state, dispatch} = useContext(globalStateContext);
    let internalState = state.pageStack.slice(-1)[0].subpage?.internalState as InternalState | undefined
    
    if(!internalState) {
        internalState = {
            loadingState: 'loading',
        }
    }

    useEffect(() => {
        if(!internalState?.data) {
            new BackendInvoker({
                type: 'instant',
                header: InstantTaskHeaders.GetVersionManifest,
                body: 'https://bmclapi2.bangbang93.com/mc/game/version_manifest_v2.json',
            }).invoke().then(result => {
                setTimeout(() => {
                    dispatch({
                        category: 'page_stack',
                        type: PageStackActions.SetSubpageInternalState,
                        value: {
                            loadingState: 'ok',
                            data: (result as ParsedTaskResponse<InstantTaskHeaders>).body as VersionManifest,
                        }
                    })
                }, 300)
            }).catch(error => {
                dispatch({
                    category: 'page_stack',
                    type: PageStackActions.SetSubpageInternalState,
                    value: {
                        loadingState: 'error',
                        error: error,
                    }
                })
            })
        }
    }, []);

    function callback(version: ManifestVersion, animatePosition: {x: number | undefined, y: number | undefined}) {
        dispatch({
            category: 'page_stack',
            type: PageStackActions.SetSubpage,
            value: {
                pageKey: 'plaza.installer',
                internalState: {
                    version,
                    animatePosition,
                }
            },
        });
    };

    function setFilter(filter: string) {
        dispatch({
            category: 'page_stack',
            type: PageStackActions.SetSubpageInternalState,
            value: {
                ...internalState,
                filter
            }
        })
    }

    return (
        <ScrollBox>
            <div id='subpage'>
                <div style={{position: 'relative', height: '40px', marginBottom: '18px', display: 'flex'}}>
                    <input type='search' id={styles.searchbox} onChange={(element => {setFilter(element.currentTarget.value)})} placeholder={internalState?.filter ?? '搜索版本...'}/>
                    <div style={{position: 'absolute', top: '11px', left: '12px'}}>
                        <IconSearch />
                    </div>
                </div>
                
                {(() => {
                    switch (internalState.loadingState) {
                        case 'loading': return <FallbackComponent />;
                        case 'error': return <p>{internalState.error}</p>;
                        case 'ok': return (
                            <div id={styles['version-manifest']}>
                                <AnimatePresence>
                                    {listFilter((internalState?.data as VersionManifest), internalState?.filter ?? '').map(version => <MinecraftVersion key={version.id} props={{version, callback}}/>)}
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
    callback: (version: ManifestVersion, animatePosition: {x: number | undefined, y: number | undefined}) => void,
}}> = ({props}) => {
    let ref = useRef<HTMLDivElement | null>(null)
    return (
        <motion.div
        layout
        initial={{scale: .9, opacity: 0}}
        animate={{scale: 1, opacity: 1}}
        exit={{scale: .9, opacity: 0}}
        transition={{duration: .3, ease: [0,.8,.2,1]}}
        className={styles['component-manifest_version']} onClick={() => props.callback(props.version, {x: ref.current?.getBoundingClientRect().x, y: ref.current?.getBoundingClientRect().y})}
        key={props.version.id}
        ref={ref}
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