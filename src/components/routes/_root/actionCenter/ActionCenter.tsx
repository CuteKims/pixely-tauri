import { useState } from 'react';
import styles from './ActionCenter.module.css'
import { motion, AnimatePresence } from 'framer-motion';
import { Transition } from '../../../ui/utils/transition/Transition';
// import { NotificationChannels } from '../../../../types/task';
import { RadioButton } from '../../../ui/menubutton';

import { Notification } from '../../../../types/notif';
import { useNavigate } from 'react-router';

export type ActionCenterProps = {
    isDisplay: boolean,
    close: () => void
}

const ActionCenter: React.FC<{props: ActionCenterProps}> = ({props}) => {
    // const notif = useState<Notification<NotificationChannels>[]>([])
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
                    entered: {opacity: 1, transform: 'scale(1)', filter: 'blur(0px)', pointerEvents: 'all'},
                    exited: {opacity: 0, transform: 'scale(1.1)', filter: 'blur(10px)', pointerEvents: 'none'}
                },
                timeout: {
                    enter: 33,
                    exit: 500
                },
                unmountAfterExit: true,
                onClick: props.close
            }}>
                <p id={styles.title}>操作中心</p>
                <p id={styles.subtitle}>没有通知</p>
                <SidebarButtons />
            </Transition>
        </div>
    )
}

const SidebarButtons: React.FC = () => {
    let navigate = useNavigate()
    return (
        <>
            <div id={styles['sidebar-button-container']}>

                <RadioButton
                props={{
                    displayName: '启动台',
                    isDisplay: true,
                    isSelected: false,
                    callback: () => navigate('launcher')
                }} />
                <RadioButton
                props={{
                    displayName: '广场',
                    isDisplay: true,
                    isSelected: false,
                    callback: () => navigate('plaza')
                }} />
                <RadioButton
                props={{
                    displayName: '设置',
                    isDisplay: true,
                    isSelected: false,
                    callback: () => navigate('settings')
                }} />
                <RadioButton
                props={{
                    displayName: 'Playground',
                    isDisplay: true,
                    isSelected: false,
                    callback: () => navigate('playground')
                }} />
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