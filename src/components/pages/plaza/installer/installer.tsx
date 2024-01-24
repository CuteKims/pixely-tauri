import { useContext } from "react";
import { globalStateContext } from "../../../hocs/context";
import { ManifestVersion, VersionType } from "../../../../bridger/parser";
import { ScrollBox } from "../../../hocs/scrollbox";
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
    isCompatible: boolean,
    callback: () => {version: string, info: string}[]
}

export type InstallationSettingProps = {
    title: string,
}

const SubpageInstaller: React.FC = () => {
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
                <div id='subpage' style={{paddingBottom: '136px', display: 'flex', flexDirection: 'column', gap: '18px'}}>
                    <div>
                        <p className={styles.header} style={{opacity: .75}}>{version.id}</p>
                        <p className={styles.header} style={{fontSize: '24px'}}>创建新实例</p>
                    </div>
                    <Chapter props={{footer: '这些设置会影响什么？'}}>
                        <InstallationSettings props={{title: '实例名'}}/>
                        <InstallationSettings props={{title: '选择图标...'}}/>
                    </Chapter>
                    <Chapter props={{header: '模组加载器', footer: '这些都是什么？我该如何选择？'}}>
                        {loaderOptions.map(props => <InstallationOption props={props}/>)}
                    </Chapter>
                    <Chapter props={{header: '其他可安装项', footer: '这些都是什么？我该如何选择？'}}>
                        {addonOptions.map(props => <InstallationOption props={props}/>)}
                    </Chapter>
                    <Chapter props={{header: '高级安装选项', footer: '这些设置意味着什么？'}}>
                        <InstallationSettings props={{title: '实例ID'}}/>
                        <InstallationSettings props={{title: '禁用版本隔离（不推荐）'}}/>
                    </Chapter>
                </div>
            </ScrollBox>
            <InstallerPreviewer version={version}/>
        </div>
    )
}

const InstallerPreviewer: React.FC<{version: ManifestVersion}> = ({version}) => {
    return (
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
            {(() => {if(props.footer) return <p className={styles.header} style={{marginTop: '4px', fontSize: '12px', textAlign: 'right', opacity: .75}}>{props.footer}</p>})()}
        </div>
    )
}

export default SubpageInstaller