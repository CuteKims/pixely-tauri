import { useContext, useEffect, useRef, useState } from "react";
import { ManifestVersion } from "../../../../bridger/parser";
import { ScrollBox } from "../../../ui/utils/scrollBox/ScrollBox";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import styles from './NewInstanceForm.module.css'

import iconDirt from '../../../../assets/icons/dirt_block.png'
import iconGrass from '../../../../assets/icons/grass_block.png'
import iconStone from '../../../../assets/icons/stone_block_old.png'

import { addonOptions, loaderOptions } from "./consts";
import { Addons, ModLoaders, VersionType } from "../../../../types/task";
import { Subpage } from "../../../ui/page/Page";

export type InstallationOptionProps = {
    id: string,
    title: string,
    subTitle: string,
    icon: string,
    iconPosition: {
        height?: number,
        width?: number,
        top?: number,
        left?: number
    },
    callback: (versionId: string) => Promise<{version: string, info: string, url: string}[]>
}

export type InstallationSettingProps = {
    title: string,
}


type AddonVersion = {
    loadingState: 'loading' | 'ok' | 'error',
    data?: {version: string, info: string, url: string}[]
    error?: any,
}



type InstanceInfo = {
    instanceId?: string,
    instanceName?: string,
    instanceIcon?: {builtIn: string} | {custom: string}
    modLoader?: {
        type: ModLoaders,
        url: string,
    },
    addons?: {
        type: Addons,
        url: string,
    }[],
    disablingIsolation: boolean
}

export type InternalState = {
    version: ManifestVersion,
    animatePosY: number,
    instanceInfo?: InstanceInfo,
    addonVersions: {
        [key: string]: AddonVersion
    }
}

export const plaza_installer_INITIAL_STATE: InternalState = {
    version: {
        id: '.MISSINGNO',
        type: VersionType.oldAlpha,
        url: '.MISSINGNO',
        time: '2006-03-03T00:00:00+08:00',
        releaseTime: '2006-03-03T00:00:00+08:00',
        sha1: '.MISSINGNO',
        complianceLevel: 0
    },
    animatePosY: 0,
    addonVersions: {
        [ModLoaders.Forge]: {loadingState: 'loading'},
        [ModLoaders.Fabric]: {loadingState: 'loading'},
        [ModLoaders.NeoForge]: {loadingState: 'loading'},
        [ModLoaders.Qulit]: {loadingState: 'loading'},
        [ModLoaders.LiteLoader]: {loadingState: 'loading'},
        [Addons.Optifine]: {loadingState: 'loading'},
        [Addons.Fabricapi]: {loadingState: 'loading'},
        [Addons.Optifabric]: {loadingState: 'loading'},
    }
}

const layoutTransition = {ease: [0,.8,.2,1], duration: .3}

const Plaza_Installer: React.FC = () => {
    const scrollBoxRef = useRef<HTMLDivElement>(null)

    const pageStackContextValue = useContext(pageStackContext)

    let [internalState, setInternalState] = useState<InternalState>({
        version: {
            id: '.MISSINGNO',
            type: VersionType.oldAlpha,
            url: '.MISSINGNO',
            time: '2006-03-03T00:00:00+08:00',
            releaseTime: '2006-03-03T00:00:00+08:00',
            sha1: '.MISSINGNO',
            complianceLevel: 0
        },
        animatePosY: 0,
        addonVersions: {
            [ModLoaders.Forge]: {loadingState: 'loading'},
            [ModLoaders.Fabric]: {loadingState: 'loading'},
            [ModLoaders.NeoForge]: {loadingState: 'loading'},
            [ModLoaders.Qulit]: {loadingState: 'loading'},
            [ModLoaders.LiteLoader]: {loadingState: 'loading'},
            [Addons.Optifine]: {loadingState: 'loading'},
            [Addons.Fabricapi]: {loadingState: 'loading'},
            [Addons.Optifabric]: {loadingState: 'loading'},
        }
    })

    return (
        <>
            <ScrollBox ref={scrollBoxRef}>
                <Subpage style={{paddingBottom: '136px', gap: '18px'}}>
                    <div>
                        <p className={styles.header} style={{opacity: .75}}>{'版本 ' + internalState.version.id}</p>
                        <p className={styles.header} style={{fontSize: '24px'}}>新实例创建向导</p>
                    </div>
                    <LayoutGroup>
                        <Chapter props={{footer: '这些设置会影响什么？'}}>
                            <InstallationSettings props={{title: '实例名'}} key='name'/>
                            <InstallationSettings props={{title: '选择图标...'}} key='icon'/>
                        </Chapter>
                        <Chapter props={{header: '模组加载器', footer: '这些都是什么？我该如何选择？'}}>
                            {loaderOptions.map((props) => <InstallationOption props={props} key={props.id} versionId={internalState?.version?.id} scrollBoxRef={scrollBoxRef}/>)}
                        </Chapter>
                        <Chapter props={{header: '其他安装项', footer: '这些都是什么？我该如何选择？'}}>
                            {addonOptions.map((props) => <InstallationOption props={props} key={props.id} versionId={internalState?.version?.id} scrollBoxRef={scrollBoxRef}/>)}
                        </Chapter>
                        <Chapter props={{header: '高级安装选项', footer: '这些设置意味着什么？'}}>
                            <InstallationSettings props={{title: '实例唯一ID'}} key='id'/>
                            <InstallationSettings props={{title: '禁用版本隔离（不推荐）'}} key='isolation'/>
                        </Chapter>
                    </LayoutGroup>
                </Subpage>
            </ScrollBox>
            <InstallerPreviewer version={internalState?.version} animatePosY={internalState?.animatePosY}/>
        </>
    )
}

const InstallerPreviewer: React.FC<{version: ManifestVersion | undefined, animatePosY: number | undefined}> = ({version, animatePosY}) => {
    const transition = {ease: [0,.6,.4,1], duration: .5 + (Math.abs(((window.innerHeight - 94) - (animatePosY ?? 0))) * .00025)}
    return (
        <div style={{width: '100%', height: '100%', position: 'relative', top: '-100%', pointerEvents: 'none'}}>
            <div style={{height: '100%', padding: '0px 36px', display: 'flex', flexDirection: 'column'}}>
                <motion.div
                id={styles['installer_previewer']}
                initial={{translateY: -((window.innerHeight - 94) - (animatePosY ?? 0)), height: 56}}
                animate={{translateY: 0, height: 62}}
                transition={transition}>
                    <motion.img
                    src={(() => {
                        switch (version?.type) {
                            case VersionType.snapshot: return iconDirt;
                            case VersionType.release: return iconGrass;
                            default: return iconStone;
                        }
                    })()}
                    initial={{height: 32, width: 32, margin: 12}}
                    animate={{height: 36, width: 36, margin: 14}}
                    transition={transition}/>
                    <div style={{margin: 'auto', marginLeft: '0px'}}>
                        <motion.p
                        style={{fontSize: '18px', transformOrigin: 'left'}}
                        initial={{opacity: 0, translateY: -10, scale: .8}}
                        animate={{opacity: 1,translateY: 0, scale: 1}}
                        transition={transition}>
                            新实例
                        </motion.p>
                        <motion.p
                        initial={{fontSize: '15px', opacity: 1, translateY: -21}}
                        animate={{fontSize: '14px', opacity: .75, translateY: 0}}
                        transition={transition}>
                            {version?.id ?? '.MISSINGNO'}
                        </motion.p>
                        <motion.p
                        style={{position: 'absolute', bottom: '11px', fontSize: '12px', transformOrigin: 'left'}}
                        initial={{opacity: .75, translateY: 0, scale: 1}}
                        animate={{opacity: 0, translateY: 14, scale: .5}}
                        transition={transition}>
                            {(() => {
                                let type: string = '早期版本';
                                switch (version?.type) {
                                    case VersionType.snapshot: type = '快照'; break;
                                    case VersionType.release: type = '正式版'; break;
                                }
                                let date: Date = new Date(version?.releaseTime ?? '2006-03-03T00:00:00+08:00');
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
                            })()}
                        </motion.p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

const InstallationSettings: React.FC<{props: InstallationSettingProps}> = ({props}) => {
    return (
        <motion.div layout='position' transition={layoutTransition} className={styles['installation_settings-container']}>
            <p style={{marginLeft: '18px'}}>{props.title}</p>
        </motion.div>
    )
}



const InstallationOption: React.FC<{props: InstallationOptionProps, versionId: string, scrollBoxRef: React.RefObject<HTMLDivElement>, state: [InternalState, React.Dispatch<React.SetStateAction<InternalState>>]}> = ({props, versionId, scrollBoxRef, state}) => {
    
    const [internalState, setInternalState] = state
    
    const selfRef = useRef<HTMLDivElement>(null)

    const pageStackContextValue = useContext(pageStackContext)

    const [isOpen, setIsOpen] = useState(false)

    function clickHandler() {
        if(internalState.addonVersions![props.id].loadingState !== 'ok') return;
        setIsOpen(isOpen => {
            if(isOpen) {
                return false
            } else {
                setTimeout(() => {scrollBoxRef.current?.scrollTo({
                    top: selfRef.current?.offsetTop ? selfRef.current?.offsetTop - 72 : undefined,
                    left: 0,
                    behavior: 'smooth'
                })}, 200)
                return true
            }
        })
    }

    useEffect(() => {
        if(internalState.addonVersions![props.id].loadingState !== 'loading') return;

        props.callback(versionId).then(result => {
            setInternalState(((state: InternalState, subpageKey: string) => {
                if(subpageKey !== 'plaza.installer') {
                    console.warn('An async operation was interrupted by user.')
                    return state
                }
                state.addonVersions[props.id] = {
                    loadingState: 'ok',
                    data: result
                }
                return state
            })(state, subpageKey))
        })
    }, [])

    return (
        <motion.div layout='position' transition={layoutTransition} ref={selfRef}>
            <div className={styles['installation_option-container']} onClick={clickHandler}>
                <div className={styles['image_container']}>
                    <img src={props.icon} style={{...props.iconPosition, position: 'relative', margin: 'auto', filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,.3))'}}/>
                </div>
                <div className={styles['text_container']}>
                    <p style={{fontSize: '18px'}}>{props.title}</p>
                    <p style={{fontSize: '13px', opacity: .75}}>{internalState.addonVersions[props.id].loadingState + ', arrayLength: ' + internalState.addonVersions[props.id].data?.length}</p>
                </div>
            </div>
            <AnimatePresence>
                {isOpen ? (
                    <div className={styles['installation_option-versions_background']} style={{height: window.innerHeight - 272}}>
                        <motion.div className={styles['installation_option-scrollbox_container']}>
                            <ScrollBox fullHeight>
                                <div className={styles['installation_option-versions_container']}>
                                    {internalState.addonVersions[props.id].data!.map(element => (
                                        <div key={element.version} className={styles['version']} onClick={() => console.log()}>
                                            <p style={{margin: 'auto 8px auto 16px'}}>{element.version}</p>
                                            <p style={{fontSize: '12px', opacity: .75, margin: 'auto 0px'}}>{element.info}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollBox>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
        </motion.div>
    )
}

const Chapter: React.FC<{children: React.ReactNode, props: {
    header?: string
    footer?: string
}}> = ({props, children}) => {
    return (
        <motion.div layout='position' transition={layoutTransition}>
            {(() => {if(props.header) return <p className={styles.header} style={{marginBottom: '8px'}}>{props.header}</p>})()}
            <div style={{display: 'flex', flexDirection: 'column', gap: '1px'}}>
                {children}
            </div>
            {(() => {if(props.footer) return <motion.p layout='position' transition={layoutTransition} className={styles.header} style={{marginTop: '4px', fontSize: '12px', textAlign: 'right', opacity: .75, cursor: 'help'}}>{props.footer}</motion.p>})()}
        </motion.div>
    )
}

export default Plaza_Installer