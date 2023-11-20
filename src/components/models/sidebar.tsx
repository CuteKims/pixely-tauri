import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './sidebar.module.css'
import { GlobalStateActionTypes, GlobalStateContext } from '../hocs/state/context'

const Sidebar: React.FC = () => {
    let {state, dispatch} = useContext(GlobalStateContext);
    const closeMenu = () => {
        dispatch({
            type: GlobalStateActionTypes.SetMenuFlag,
            value: false,
        })
    };
    return (
        <AnimatePresence>
            {state.flags.menu ? 
            <div id={styles['sidebar-container']}>
                <motion.div
                id={styles['sidebar']}
                initial={{x: -160}}
                animate={{x: 0}}
                exit={{x: -160}}
                transition={{ease: [0,.8,.2,1], duration: .5}}>
                    <SidebarButtonContainer />
                </motion.div>
                <motion.div
                id={styles['sidebar-background']}
                initial={{backdropFilter: 'brightness(1)', x: 0, pointerEvents: 'all'}}
                animate={{backdropFilter: 'brightness(.75)', x: 160}}
                exit={{backdropFilter: 'brightness(1)', x: 0, pointerEvents: 'none'}}
                transition={{ease: [0,.8,.2,1], duration: .5}}
                onClick={closeMenu}>
                </motion.div>
            </div>
            : null}
        </AnimatePresence>
    )
}

const SidebarButtonContainer: React.FC = () => {
    return (
        <>
            <div id={styles['sidebar-button-container']}>
                <SidebarButton />
                <SidebarButton />
                <SidebarButton />
                <SidebarButton />
                <SidebarButton />
            </div>
        </>
    )
}

const SidebarButton: React.FC = () => {
    return (
        <>
            <div className={styles['sidebar-button']}>
                <p>主页</p>
            </div>
        </>
    )
}

export default Sidebar;