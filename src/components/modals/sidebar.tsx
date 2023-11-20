import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './sidebar.module.css'
import { GlobalState, GlobalStateActionTypes, globalStateContext, GlobalStateContext, Page } from '../hocs/state/context'
import pagesMap from '../pages/pages';

const Sidebar: React.FC = () => {
    let context = useContext(globalStateContext);
    const closeMenu = () => {
        context.dispatch({
            type: GlobalStateActionTypes.SetMenuFlag,
            value: false,
        })
    };
    return (
        <AnimatePresence>
            {context.state.flags.menu ? 
            <div id={styles['sidebar-container']}>
                <motion.div
                id={styles['sidebar']}
                initial={{x: -160}}
                animate={{x: 0}}
                exit={{x: -160}}
                transition={{ease: [0,.8,.2,1], duration: .5}}>
                    <SidebarButtonContainer props={{context}} />
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

const SidebarButtonContainer: React.FC<{props: {context: GlobalStateContext}}> = ({props}) => {
    const dispatchPage = (value: Page) => {
        props.context.dispatch({
            type: GlobalStateActionTypes.PushPageStack,
            value,
        })
    }
    return (
        <>
            <div id={styles['sidebar-button-container']}>
                {Object.keys(pagesMap).map((page) => (
                    <SidebarButton props={{
                        page,
                        friendlyName: pagesMap[page].friendlyName,
                        state: props.context.state,
                        dispatchPage,
                    }} />
                ))}
            </div>
        </>
    )
}

const SidebarButton: React.FC<{props: {
    page: string,
    friendlyName: string,
    state: GlobalState,
    dispatchPage: (args: Page) => void}}> = ({props}) => {
    return (
        <>
            <div className={styles['sidebar-button']} onClick={() => props.dispatchPage({page: props.page})}>
                <p>{props.friendlyName}</p>
            </div>
        </>
    )
}

export default Sidebar;