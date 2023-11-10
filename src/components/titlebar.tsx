import { appWindow } from '@tauri-apps/api/window'

import styles from './titlebar.module.css'

import iconBack from '../assets/icons/back.svg'
import iconMenu from '../assets/icons/menu.svg'
import iconMaximize from '../assets/icons/maximize.svg'
import iconMinimize from '../assets/icons/minimize.svg'

function Titlebar() {
    return (
        <div id={styles.titlebar} data-tauri-drag-region>
            <div className={styles.button}>
                <img src={iconBack} className='default-svg'/>
            </div>
            <div className={styles.button}>
                <img src={iconMenu} className='default-svg'/>
            </div>
            <p style={{marginLeft: '10px'}} data-tauri-drag-region>启动台</p>
            <div
            className={styles.button}
            style={{justifyContent: 'flex-end'}}
            onClick={() => appWindow.minimize()}>
                <img src={iconMinimize} className='default-svg'/>
            </div>
            <div
            className={styles.button}
            onClick={() => appWindow.toggleMaximize()}>
                <img src={iconMaximize} className='default-svg'/>
            </div>
            <ButtonClose />
        </div>
    )
}

function ButtonClose() {
    return (
        <div
        className={styles['button-close']}
        onClick={() => appWindow.close()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="36" viewBox="0 0 48 36">
                <path d="M-1925.7-1176.989l-4.6,4.6-.706-.707,4.6-4.6-4.6-4.6.707-.707,4.6,4.6,4.6-4.6.707.707-4.6,4.6,4.6,4.6-.707.707Z" transform="translate(1949.697 1195.697)" fill="currentColor"/>
            </svg>
        </div>
    )
}

export default Titlebar;