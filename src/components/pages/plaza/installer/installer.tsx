import { useContext, useRef } from "react";
import { GlobalStateContext, globalStateContext } from "../../../hocs/context";
import { ManifestVersion, ModLoaders, VersionType } from "../../../../bridger/parser";
import { ScrollBox } from "../../../hocs/scrollbox";
import { motion } from "framer-motion";
import styles from './installer.module.css'

import iconDirt from '../../../../assets/icons/dirt_block.png'
import iconGrass from '../../../../assets/icons/grass_block.png'
import iconStone from '../../../../assets/icons/stone_block_old.png'

import { IconDownload } from "../../../shared/icons";
import { addonOptions, loaderOptions } from "./consts";

export type InstallationOptionProps = {
    title: string,
    subTitle: string,
    icon: string,
    iconPosition: {
        height?: number,
        width?: number,
        top?: number,
        left?: number
    },
    callback: () => Promise<{version: string, info: string, url: string}[]>
}

export type InstallationSettingProps = {
    title: string,
}

enum Addons {
    Optifine = 'Optifine',
    Fabricapi = 'Fabricapi',
    optifabric = 'Optifabric',
    liteloaderapi = 'Liteloaderapi'
}

type AddonVersion = {
    loadingState: 'loading' | 'ok' | 'error',
    data?: {version: string, info: string, url: string}[]
    error?: any,
}

type InternalState = {
    version: ManifestVersion,
    animatePosY?: number,
    instanceInfo?: InstanceInfo,
    addonVersions?: {
        [key: string]: AddonVersion
    }
}

type InstanceInfo = {
    instanceId: string,
    instanceName: string,
    instanceIcon: {builtIn: string} | {custom: string}
    modLoader: {
        type: ModLoaders,
        url: string,
    },
    addons: {
        type: Addons,
        url: string,
    }[],
    disablingIsolation: boolean
}

const SubpageInstaller: React.FC = () => {
    const {state, dispatch} = useContext(globalStateContext);
    let internalState = state.pageStack.slice(-1)[0].subpage?.internalState as InternalState | undefined

    return (
        <div style={{width: '100%', height: '100%'}}>
            <ScrollBox>
                <div id='subpage' style={{paddingBottom: '136px', display: 'flex', flexDirection: 'column', gap: '18px'}}>
                    <div>
                        <p className={styles.header} style={{opacity: .75}}>{internalState?.version.id ?? '.MISSINGNO'}</p>
                        <p className={styles.header} style={{fontSize: '24px'}}>新实例创建向导</p>
                    </div>
                    <Chapter props={{footer: '这些设置会影响什么？'}}>
                        <InstallationSettings props={{title: '实例名'}}/>
                        <InstallationSettings props={{title: '选择图标...'}}/>
                    </Chapter>
                    <Chapter props={{header: '模组加载器', footer: '这些都是什么？我该如何选择？'}}>
                        {loaderOptions.map((props, index) => <InstallationOption props={props} key={index}/>)}
                    </Chapter>
                    <Chapter props={{header: '其他安装项', footer: '这些都是什么？我该如何选择？'}}>
                        {addonOptions.map((props, index) => <InstallationOption props={props} key={index}/>)}
                    </Chapter>
                    <Chapter props={{header: '高级安装选项', footer: '这些设置意味着什么？'}}>
                        <InstallationSettings props={{title: '实例唯一ID'}}/>
                        <InstallationSettings props={{title: '禁用版本隔离（不推荐）'}}/>
                    </Chapter>
                </div>
            </ScrollBox>
            <InstallerPreviewer version={internalState?.version} animatePosY={internalState?.animatePosY}/>
        </div>
    )
}

const InstallerPreviewer: React.FC<{version: ManifestVersion | undefined, animatePosY: number | undefined}> = ({version, animatePosY}) => {
    const transition = {ease: [0,.8,.2,1], duration: .5 + (Math.abs(((window.innerHeight - 94) - (animatePosY ?? 0))) * .00025)}
    return (
        <div style={{width: '100%', height: '100%', position: 'relative', top: '-100%', pointerEvents: 'none'}}>
            <div style={{height: '100%', padding: '0px 36px', display: 'flex', flexDirection: 'column'}}>
                <motion.div
                id={styles['installer_previewer']}
                initial={{translateY: -((window.innerHeight - 94) - (animatePosY ?? 0)), height: 56}}
                animate={{translateY: 0, height: 64}}
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
        <div className={styles['installation_settings-container']}>
            <p style={{marginLeft: '18px'}}>{props.title}</p>
        </div>
    )
}



const InstallationOption: React.FC<{props: InstallationOptionProps}> = ({props}) => {
    const {state, dispatch} = useContext(globalStateContext);
    let internalState = state.pageStack.slice(-1)[0].subpage?.internalState as InternalState | undefined

    return (
        <div className={styles['installation_option-container']}>
            <div className={styles['image_container']}>
                <img src={props.icon} style={{...props.iconPosition, position: 'relative', margin: 'auto', filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,.3))'}}/>
            </div>
            <div className={styles['text_container']}>
                <p style={{fontSize: '18px'}}>{props.title}</p>
                <p style={{fontSize: '13px', opacity: .75}}>{props.subTitle}</p>
            </div>
        </div>
    )
}

const Chapter: React.FC<{children: React.ReactNode, props: {
    header?: string
    footer?: string
}}> = ({props, children}) => {
    return (
        <div>
            {(() => {if(props.header) return <p className={styles.header} style={{marginBottom: '8px'}}>{props.header}</p>})()}
                <div style={{display: 'flex', flexDirection: 'column', gap: '1px'}}>
                    {children}
                </div>
            {(() => {if(props.footer) return <p className={styles.header} style={{marginTop: '4px', fontSize: '12px', textAlign: 'right', opacity: .75, cursor: 'help'}}>{props.footer}</p>})()}
        </div>
    )
}

export default SubpageInstaller