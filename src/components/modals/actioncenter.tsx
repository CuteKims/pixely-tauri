import { useContext } from 'react';
import styles from './actioncenter.module.css'
import { GlobalStateActionTypes, globalStateContext, GlobalStateContext } from '../hocs/context'
import pagesMap from '../pages/pages';
import { SideButton } from '../shared/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Transition } from '../hocs/transition';

const ActionCenter: React.FC = () => {
    let context = useContext(globalStateContext);
    const closeMenu = () => {
        context.dispatch({
            type: GlobalStateActionTypes.SetMenuFlag,
            value: false,
        })
    };
    return (
        <>
            {/* use components from framer-motion to avoid visual artifacts. */}
            <AnimatePresence>
                {context.state.flags.menu && (
                    <motion.div
                    id={styles['actioncenter-background']}
                    style={{pointerEvents: context.state.flags.menu ? 'all' : 'none'}}
                    initial={{backdropFilter: 'blur(0px)'}}
                    animate={{backdropFilter: 'blur(20px)'}}
                    exit={{backdropFilter: 'blur(0px)'}}
                    transition={{ease: [0,.8,.2,1], duration: .5}}/>
                )}
            </AnimatePresence>
            {/* Homebrew Transition HOC can do the same job as CSSTransition from react-transition-group. */}
            <Transition
            props={{
                id: styles.container,
                in: context.state.flags.menu,
                styles: {
                    entered: {opacity: 1, transform: 'scale(1) translateY(0px)', filter: 'blur(0px)'},
                    exited: {opacity: 0, transform: 'scale(1.1) translateY(36px)', filter: 'blur(10px)'}
                },
                timeout: {
                    enter: 100,
                    exit: 500
                },
                unmountAfterExit: true,
                onClick: closeMenu
            }}>
                <p id={styles.title}>操作中心</p>
                <p id={styles.subtitle}>没有通知也没有进行中的任务，因为功能还没实现</p>
                <SidebarButtonContainer props={{context}}/>
            </Transition>
            
        </>
        
    )
}

const SidebarButtonContainer: React.FC<{props: {context: GlobalStateContext}}> = ({props}) => {
    const buttonCallback = (pageKey: string) => {
        props.context.dispatch({
            type: GlobalStateActionTypes.PushPageStack,
            value: {
                page: pageKey,
                subpage: [],
            }
        })
        props.context.dispatch({
            type: GlobalStateActionTypes.SetMenuFlag,
            value: false
        })
    }
    return (
        <>
            <div id={styles['sidebar-button-container']}>
                {Object.keys(pagesMap).map((key) => (
                    <SideButton key={key} props={{
                        pageKey: key,
                        friendlyName: pagesMap[key].friendlyName,
                        display: pagesMap[key].display,
                        isSelected: props.context.state.pageStack.slice(-1)[0].page == key,
                        callback: buttonCallback,
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