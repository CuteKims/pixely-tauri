import { useState } from 'react';
import styles from './ActionCenter.module.css'
import { PAGES_MAP } from '../../../consts/pages';
import { motion, AnimatePresence } from 'framer-motion';
import { Transition } from '../../hocs/transition';
import { NotificationChannels } from '../../../enums';
import { RadioButton } from '../../shared/menubutton';
import { Page } from '../contextWrappers/page_stack';

import { Notification } from '../../../types/notif';

export type ActionCenterProps = {
    isDisplay: boolean,
    notif: {
        notifications: number,
        tasks: number
    }
    currentPageKey: string,
    pushPage: (page: Page) => void,
    close: () => void
}

const ActionCenter: React.FC<{props: ActionCenterProps}> = ({props}) => {
    const notif = useState<Notification<NotificationChannels>[]>([])
    return (
        <div id={styles['actioncenter-container']}>
            {/* use components from framer-motion to avoid visual artifacts. */}
            <AnimatePresence>
                {props.isDisplay && (
                    <motion.div
                    id={styles['actioncenter-background']}
                    style={{pointerEvents: props.isDisplay ? 'all' : 'none'}}
                    initial={{backdropFilter: 'blur(0px) brightness(100%)'}}
                    animate={{backdropFilter: 'blur(20px) brightness(80%)'}}
                    exit={{backdropFilter: 'blur(0px)'}}
                    transition={{ease: [0,.8,.2,1], duration: .5}}/>
                )}
            </AnimatePresence>
            {/* Homebrew Transition HOC can do the same job as CSSTransition from react-transition-group. */}
            <Transition
            props={{
                id: styles.container,
                in: props.isDisplay,
                styles: {
                    entered: {opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)', pointerEvents: 'all'},
                    exited: {opacity: 0, transform: 'translateY(72px)', filter: 'blur(10px)', pointerEvents: 'none'}
                },
                timeout: {
                    enter: 10,
                    exit: 500
                },
                unmountAfterExit: true,
                onClick: props.close
            }}>
                <p id={styles.title}>操作中心</p>
                <p id={styles.subtitle}>{(() => {
                    if(props.notif.notifications == 0) return '没有通知'
                    else return props.notif.notifications + '个通知'
                })()}</p>
                <SidebarButtons props={{currentPageKey: props.currentPageKey, pushPage: props.pushPage}}/>
            </Transition>
        </div>
        
    )
}

const SidebarButtons: React.FC<{props: {
    currentPageKey: string,
    pushPage: (page: Page) => void
}}> = ({props}) => {
    return (
        <>
            <div id={styles['sidebar-button-container']}>
                {Object.keys(PAGES_MAP).map((key) => (
                    <RadioButton key={key} props={{
                        displayName: PAGES_MAP[key].friendlyName,
                        isDisplay: PAGES_MAP[key].display,
                        isSelected: props.currentPageKey == key,
                        callback: () => props.pushPage({
                            pageKey: key,
                            subpage: PAGES_MAP[key].subpages ? {
                                pageKey: PAGES_MAP[key].subpages!.default,
                                internalState: PAGES_MAP[key].subpages!.map[PAGES_MAP[key].subpages!.default].initialState
                            } : undefined
                        }),
                    }} />
                ))}
            </div>
        </>
    )
}

const IconLauncher: React.FC = () => {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.78 24">
                <path d="m10.39,0L0,6v12l10.39,6,10.39-6V6L10.39,0Zm8.39,16.85l-8.39,4.85-8.39-4.85V7.15L10.39,2.31l8.39,4.85v9.69Z" fill="currentColor"/>
            </svg>
        </>
    )
}

export default ActionCenter;