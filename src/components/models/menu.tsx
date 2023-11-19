import { useContext } from 'react';
import { AnimatePresence } from 'framer-motion';
import styles from './menu.module.css'
import { GlobalStateActionTypes, GlobalStateContext } from '../hocs/state/context'

const Menu: React.FC = () => {
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
            <div id={styles['menu-background']} onClick={closeMenu}>
                <div id={styles.menu}>

                </div>
            </div>
            : null}
        </AnimatePresence>
    )
}

export default Menu;