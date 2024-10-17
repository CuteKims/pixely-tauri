import styles from './Launching.module.css'
import avatar from '../../../../assets/avatar.jpg'

import IconAuto from '../../../../assets/icons/ui/auto.svg?react'
import IconInstall from '../../../../assets/icons/ui/install.svg?react'
import IconRefresh from '../../../../assets/icons/ui/refresh.svg?react'
import IconWrench from '../../../../assets/icons/ui/wrench.svg?react'

import { Avatar } from "../../../ui/dataDisplay/avatar/Avatar"
import { GridList, StackList } from "../../../ui/dataDisplay/list/List"
import { ListItem } from "../../../ui/dataDisplay/list/ListItem"
import { Subpage } from "../../../ui/page/Page"
import { useTranslation } from 'react-i18next'
import { getAnimationTiming, getCssAnimation, UiAnimationProperty } from '../../../ui/animation'

export const Launching: React.FC = () => {
    let {t} = useTranslation()
    return (
        <Subpage>
            <h1>{t('ui.settings.launching')}</h1>
            <StackList header={t('ui.settings.launching.jre')} animation={{delay: getAnimationTiming.fromFrames(10)}}>
                <ListItem
                    text={{primary: 'Java(TM) Platform SE binary 8.0.4010.10 (x64)', secondary: 'C:/Program Files/Java/jre-1.8/bin/javaw.exe'}}
                />
                <ListItem
                    text={{primary: t('ui.settings.launching.jre.refresh')}}
                    onClick={() => {}}
                    icon={<IconRefresh />}
                />
                <ListItem
                    text={{primary: t('ui.settings.launching.jre.install')}}
                    onClick={() => {}}
                    icon={<IconInstall />}
                />
                <ListItem
                    text={{primary: t('ui.settings.launching.jre.auto')}}
                    icon={<IconAuto />}
                />
            </StackList>
            <StackList header={t('ui.settings.launching.memory')} animation={{delay: getAnimationTiming.fromFrames(16)}}>
                <MemoryMeter />
                <ListItem
                    text={{primary: t('ui.settings.launching.memory.auto')}}
                    icon={<IconAuto />}
                />
                <ListItem
                    text={{primary: t('ui.settings.launching.memory.manual')}}
                    icon={<IconWrench />}
                />
            </StackList>
        </Subpage>
    )
}

const MemoryMeter: React.FC<{animation?: UiAnimationProperty}> = (props) => {
    let {t} = useTranslation()
    return (
        <div className={styles['ram-meter-container']} style={getCssAnimation(props.animation)}>
            <div id='header' style={{display: 'flex'}}>
                <p style={{fontSize: '14px'}}>{t('ui.settings.launching.memory.memory_meter')}</p>
                <p style={{fontSize: '14px', alignSelf: 'end', marginLeft: 'auto'}}>{t('ui.settings.launching.memory.memory_meter.installed', {size: '7.84 GB'})}</p>
            </div>
            <div>
                <div id='ram-meter' className={styles['ram-meter']}>
                    <div style={{backgroundColor: '#808080', boxShadow: '0px 3px 6px rgba(0,0,0,.16)', height: '100%', width: '60%', transition: '.5s cubic-bezier(0,.8,.2,1)'}} />
                    <div style={{backgroundColor: 'white', boxShadow: '0px 3px 6px rgba(0,0,0,.16)', height: '100%', width: '25%', transition: '.5s cubic-bezier(0,.8,.2,1)'}} />
                </div>
                <div id='ram-meter-indicator-container' style={{display: 'flex', width: '100%'}}>
                    <div id='ram-meter-indicator-used' className={styles['ram-meter-indicator']} style={{width: '60%'}}>
                        <div style={{float: 'right', textAlign: 'right', margin: '6px 8px 0px 0px', width: '120px'}}>
                            <p>5.34 GB</p>
                            <p style={{fontSize: '12px', opacity: .5}}>{t('ui.settings.launching.memory.memory_meter.used')}</p>
                        </div>
                    </div>
                    <div id='ram-meter-indicator-allowcated' className={styles['ram-meter-indicator']} style={{width: '25%'}}>
                        <div style={{float: 'right', textAlign: 'right', margin: '6px 8px 0px 0px', width: '120px'}}>
                            <p>1.78 GB</p>
                            <p style={{fontSize: '12px', opacity: .5}}>{t('ui.settings.launching.memory.memory_meter.allowcated')}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id='ram-warning'className={styles['ram-warning']} style={{display: 'flex', backgroundColor: '#EEE', marginBottom: '4px', padding: '4px 0px', border: '1px solid black'}}>
                <p style={{margin: 'auto 12px', flexShrink: '0'}}>{t('ui.settings.launching.memory.memory_meter.warning.header')}</p>
                <p style={{marginRight: '12px'}}>
                    {t('ui.settings.launching.memory.memory_meter.warning')}
                </p>
                <p style={{alignSelf: 'right', margin: 'auto 12px auto auto'}}>⚠</p>
            </div>
        </div>
    )
}