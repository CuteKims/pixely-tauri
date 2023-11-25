import styles from './settings.module.css'
import pagesMap, { SubpageMap } from '../pages'
import { SideButton } from '../../shared/button'
import { globalStateContext, GlobalStateActionTypes } from '../../hocs/context'
import { useContext } from 'react'

const Settings: React.FC = () => {
    let {state, dispatch} = useContext(globalStateContext);

    //fallback
    if(state.pageStack.slice(-1)[0].subpage.length == 0) state = {
        ...state,
        pageStack: [...state.pageStack.slice(0,-1), {
            ...state.pageStack.slice(-1)[0],
            subpage: [{
                page: 'settings.user',
                subpage: [],
            }]
        }]
    }

    const buttonCallback = (pageKey: string) => {
        dispatch({
            type: GlobalStateActionTypes.PushPageStack,
            value: {
                ...state.pageStack.slice(-1)[0],
                subpage: [{page: pageKey, subpage: []}]
            }
        })
    }

    return (
        <>
            <div id={styles.background}>
                <div id={styles.sidemenu}>
                    {Object.keys(pagesMap['settings'].subpages).map((key) => (
                        <SideButton key={key} props={{
                            pageKey: key,
                            friendlyName: pagesMap.settings.subpages[key].friendlyName,
                            display: pagesMap.settings.subpages[key].display,
                            isSelected: state.pageStack.slice(-1)[0].subpage[0].page == key,
                            callback: buttonCallback,
                        }} />
                    ))}
                </div>
                <div id='subpage-container' key={state.pageStack.slice(-1)[0].subpage.slice(-1)[0].page}>
                    <SettingsPage />
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

export default Settings;