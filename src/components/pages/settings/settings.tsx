import styles from './settings.module.css'
import pagesMap, { SubpageMap } from '../pages'
import { SideButton } from '../../shared/button'
import { PageStackActions, globalStateContext } from '../../hocs/context'
import { useContext, useEffect, useState } from 'react'

const Settings: React.FC = () => {
    let {state, dispatch} = useContext(globalStateContext);

    let subpageKey = state.pageStack.slice(-1)[0].subpage?.pageKey;
    if(subpageKey == undefined) subpageKey = 'settings.user'

    let SubpageComponent = subpagesMap.map[subpageKey].component;

    const buttonCallback = (pageKey: string) => {
        dispatch({
            category: 'page_stack',
            type: PageStackActions.PushSubpage,
            value: {
                pageKey
            }
        });
    };

    return (
        <>
            <div id={styles.background}>
                <div id={styles.sidemenu}>
                    {Object.keys(subpagesMap.map).map((key) => (
                        <SideButton key={key} props={{
                            pageKey: key,
                            friendlyName: subpagesMap.map[key].friendlyName,
                            display: subpagesMap.map[key].display,
                            isSelected: subpageKey == key,
                            callback: buttonCallback,
                        }} />
                    ))}
                </div>
                <div id='subpage-container' key={subpageKey}>
                    <SubpageComponent />
                </div>
            </div>
        </>
    )
}

const SettingsPage: React.FC = () => {
    return (
        <div className={styles.page}>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
        </div>
    )
}

export const subpagesMap: SubpageMap = {
    default: 'settings.user',
    map: {
        'settings.user': {
            component: SettingsPage,
            friendlyName: '用户',
            display: true,
        },
        'settings.launch': {
            component: SettingsPage,
            friendlyName: '启动',
            display: true,
        },
        'settings.network': {
            component: SettingsPage,
            friendlyName: '网络',
            display: true,
        },
        'settings.personalization': {
            component: SettingsPage,
            friendlyName: '外观',
            display: true,
        },
        'settings.notification': {
            component: SettingsPage,
            friendlyName: '通知',
            display: true,
        },
        'settings.advanced': {
            component: SettingsPage,
            friendlyName: '高级',
            display: true,
        },
        'settings.about': {
            component: SettingsPage,
            friendlyName: '关于',
            display: true,
        },
    }
}

export default Settings;