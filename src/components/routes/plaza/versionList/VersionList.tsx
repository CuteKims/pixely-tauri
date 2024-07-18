import { useContext, useEffect, useRef, useState } from "react";
import BackendInvoker from "../../../../bridger/invoker";
import { VersionManifest, ParsedTaskResponse, ManifestVersion } from "../../../../bridger/parser";
import { ScrollBox } from "../../../ui/utils/scrollBox/ScrollBox";
import { IconArrow, IconSearch } from "../../../ui/icons";

import styles from "./VersionList.module.css"

import iconDirt from '../../../../assets/icons/dirt_block.png'
import iconGrass from '../../../../assets/icons/grass_block.png'
import iconStone from '../../../../assets/icons/stone_block_old.png'
import { InstantTaskHeaders } from "../../../../types/task";
import { VersionTypes } from "../../../../types/instance";

import { plaza_installer_INITIAL_STATE } from "../newInstanceForm/NewInstanceForm";
import { Subpage } from "../../../ui/page/Page";
import { StackList } from "../../../ui/dataDisplay/list/List";
import { ListItem } from "../../../ui/dataDisplay/list/ListItem";
import Glass from "../../../ui/surfaces/glass/Glass";
import { ScrollRestoration } from "react-router-dom";

type InternalState = {
    loadingState: 'loading' | 'ok' | 'error',
    data?: VersionManifest,
    error?: any,
    filter: string
}

export const plaza_versionManifest_INITIAL_STATE: InternalState = {
    loadingState: 'loading',
    filter: ''
}

const SearchBox: React.FC<{callback: (arg: string) => void, value: string, float?: boolean} > = ({callback, value, float}) => {
    return (
        <div 
            style={float ? 
                {flexGrow: 1, position: 'relative', height: '40px', display: 'flex', backdropFilter: 'blur(10px)', border: 'solid 1px rgba(255, 255, 255, .2)', boxShadow: '0px 8px 16px rgba(0, 0, 0, .3)', pointerEvents: 'all'} :
                {flexGrow: 1, position: 'relative', height: '40px', display: 'flex'}
            }
        >
            <input
                type='search'
                id={styles.searchbox}
                onChange={(element => callback(element.currentTarget.value))}
                placeholder={'搜索版本...'}
                value={value}
                autoComplete="off"
            />
            <div style={{position: 'absolute', top: '11px', left: '12px'}}>
                <IconSearch />
            </div>
        </div>
    )
}

const SubpageVersionManifest: React.FC = () => {
    const pageStackContextValue = useContext(pageStackContext)!
    const scrollBoxRef = useRef<HTMLDivElement>(null)
    let [internalState, setInternalState] = useState(plaza_versionManifest_INITIAL_STATE)
    useEffect(() => {
        if(internalState.loadingState == 'loading') {
            new BackendInvoker({
                type: 'instant',
                header: InstantTaskHeaders.GetVersionManifest,
                body: 'https://piston-meta.mojang.com/mc/game/version_manifest_v2.json',
            }).invoke().then(result => {
                setTimeout(() => {
                    setInternalState({
                        loadingState: 'ok',
                        data: (result as ParsedTaskResponse<InstantTaskHeaders>).body as VersionManifest,
                        error: internalState.error,
                        filter: internalState.filter
                    })
                }, 300)
            }).catch(error => {
                setInternalState({
                    loadingState: 'error',
                    error: error,
                    data: internalState.data,
                    filter: internalState.filter
                })
            })
        }
    }, []);

    function setFilter(filter: string) {
        pageStackContextValue.setLastSubpageInternalState(state => ({
            ...state,
            filter
        }))
    }

    return (
        <ScrollBox
            ref={scrollBoxRef}
            float={
                <Glass sx={{height: '36px', width: 'auto', marginTop: '18px'}}>

                </Glass>
                // <div style={{display: 'flex', gap: '18px', marginTop: '18px'}}>
                //     <SearchBox callback={setFilter} value={internalState.filter} float/>
                //     <div id={styles['back-to-top']} onClick={() => scrollBoxRef.current?.scrollTo({top: 0, behavior: 'smooth'})}>
                //         <div>
                //             <IconArrow direction='up'/>
                //         </div>
                //     </div>
                // </div>
            }
        >
            <ScrollRestoration />
            <Subpage>
                <div style={{display: 'flex', flexDirection: 'column', gap: '18px'}}>
                    <SearchBox callback={setFilter} value={internalState.filter}/>
                    {(() => {
                        switch (internalState.loadingState) {
                            case 'loading': return <FallbackComponent />;
                            case 'error': return <p>{internalState.error}</p>;
                            case 'ok': return (
                                <StackList gap={4}>
                                    {listFilter((internalState?.data as VersionManifest), internalState.filter).map(version => <ListItem key={version.id} text={{primary: version.id, secondary: version.type + ' ' + version.time}} clickable/>)}
                                </StackList>
                            );
                        };
                    })()}
                </div>
            </Subpage>
        </ScrollBox>
    )
}

function listFilter(manifest: VersionManifest, filter: string): ManifestVersion[] {
    let returnValue: ManifestVersion[] = [];
    manifest.versions.forEach((version) => {
        if (version.id.search(filter) !== -1) returnValue.push(version);
    });
    return returnValue.slice(0,200)
}

const MinecraftVersion: React.FC<{props: {
    version: ManifestVersion,
    callback: (version: ManifestVersion, animatePosY: number | undefined) => void,
}}> = ({props}) => {
    let ref = useRef<HTMLDivElement | null>(null)
    return (
        <div
            className={styles['component-manifest_version']} onClick={() => props.callback(props.version, ref.current?.getBoundingClientRect().y)}
            key={props.version.id}
            ref={ref}
        >
            <div className={styles.bgcolor}>
                <img src={(() => {
                    switch (props.version.type) {
                        case VersionTypes.snapshot: return iconDirt;
                        case VersionTypes.release: return iconGrass;
                        default: return iconStone;
                    }
                })()}/>
                <div className={styles['title_container']}>
                    <p>{props.version.id}</p>
                    <p className={styles.subtitle}>{(() => {
                        let type: string;
                        switch (props.version.type) {
                            case VersionTypes.snapshot: type = '快照'; break;
                            case VersionTypes.release: type = '正式版'; break;
                            case VersionTypes.oldAlpha: type = '早期版本'; break;
                            case VersionTypes.oldBeta: type = '早期版本'; break;
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

export default SubpageVersionManifest