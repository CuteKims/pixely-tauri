import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './sidebar.module.css'
import { GlobalState, GlobalStateActionTypes, globalStateContext, GlobalStateContext, Page } from '../hocs/context'
import pagesMap from '../pages/pages';
import { SideButton } from '../shared/button';

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
    const buttonCallback = (pageKey: string) => {
        props.context.dispatch({
            type: GlobalStateActionTypes.PushPageStack,
            value: {
                page: pageKey,
                subpage: [],
            }
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



export default Sidebar;