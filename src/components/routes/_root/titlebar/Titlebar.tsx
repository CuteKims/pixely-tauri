import { useMatches, useNavigate } from 'react-router'
import styles from './Titlebar.module.css'
import { IconPixelyLogo } from '../../../ui/icons/IconPixelyLogo'
import { useTranslation } from 'react-i18next'
import { CSSProperties, ReactNode, useRef } from 'react'
import { motion } from 'framer-motion'

export type TitlebarProps = {
    isMaximized: boolean,
    isFocused: boolean,
    menu: () => void,
    minimize: () => void,
    maximize: () => void,
    close: () => void,
}

const TitlebarButton:  React.FC<{children: React.ReactNode, props: {
    style: React.CSSProperties | undefined
    callback: () => void
}}> = ({children, props}) => {
    return (
        <div className={styles.button} style={props.style} onClick={props.callback}>
            {children}
        </div>
    )
}

//Dumb
const TitleBar: React.FC<{props: TitlebarProps}> = ({props}) => {

    let navigate = useNavigate()
    let {i18n} = useTranslation()

    let toggleLanguage = () => {
        if(i18n.language == 'zh-CN') i18n.changeLanguage('en-US')
        else i18n.changeLanguage('zh-CN')
    }

    return (
        <div id={styles['titlebar-container']} style={props.isFocused ? {opacity: 1} : {opacity: .5}}>
            <div id={styles['titlebar']}>
                <div className={`${styles.button} ${styles['button-home']}`} style={{justifyContent: 'flex-start'}} onClick={toggleLanguage}>
                    <IconPixelyLogo />
                </div>
                <TitlebarButton props={{style: {justifyContent: 'flex-start'}, callback: () => navigate(-1)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <line x1="12" transform="translate(6 12)" fill="none" stroke="currentColor" stroke-width="1"/>
                        <line x1="4" y2="4" transform="translate(6 8)" fill="none" stroke="currentColor" stroke-linecap="square" stroke-width="1"/>
                        <line x1="4" y1="4" transform="translate(6 12)" fill="none" stroke="currentColor" stroke-linecap="square" stroke-width="1"/>
                        <rect width="24" height="24" fill="none"/>
                    </svg>
                </TitlebarButton>
                {/* Menu button */}
                <TitlebarButton props={{style: {justifyContent: 'flex-start'}, callback: props.menu}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <line x1="12" transform="translate(6 12)" fill="none" stroke="currentColor" stroke-width="1"/>
                        <line x1="12" transform="translate(6 8)" fill="none" stroke="currentColor" stroke-width="1"/>
                        <line x1="12" transform="translate(6 16)" fill="none" stroke="currentColor" stroke-width="1"/>
                        <rect width="24" height="24" fill="none"/>
                    </svg>
                </TitlebarButton>
                <Title />
                {/* Minimize button */}
                <TitlebarButton props={{style: {justifyContent: 'flex-end'}, callback: props.minimize}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <line x2="10" transform="translate(7 16.5)" fill="none" stroke="currentColor" stroke-width="1"/>
                        <rect width="24" height="24" fill="none"/>
                    </svg>
                </TitlebarButton>
                {/* Maximize button */}
                <TitlebarButton props={{style: {justifyContent: 'flex-end'}, callback: props.maximize}}>
                    {props.isMaximized ? <>
                        <svg width="48.000000" height="36.000000" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <path d="M22 13L29 13L29 21L27 21L27 23L19 23L19 15L21 15L21 13L22 13ZM28 14L22 14L22 15L27 15L27 20L28 20L28 14ZM22 16L20 16L20 22L26 22L26 16L22 16Z" fillRule="evenodd" fill="currentColor"/>
                        </svg>
                    </> : <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g transform="translate(7 7)" fill="none" stroke="currentColor" stroke-width="1">
                                <rect width="10" height="10" stroke="none"/>
                                <rect x="0.5" y="0.5" width="9" height="9" fill="none"/>
                            </g>
                            <rect width="24" height="24" fill="none"/>
                        </svg>
                    </>}
                </TitlebarButton>
                {/* Close button */}
                <div className={`${styles.button} ${styles['button-close']}`} onClick={props.close}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <line x2="8" y2="8" transform="translate(8 8)" fill="none" stroke="currentColor" stroke-linecap="square" stroke-width="1"/>
                        <line x1="8" y2="8" transform="translate(8 8)" fill="none" stroke="currentColor" stroke-linecap="square" stroke-width="1"/>
                        <rect width="24" height="24" fill="none"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}

const Title: React.FC = () => {
    let matches = useMatches().slice(1)
    let { t, i18n } = useTranslation()
    let ref = useRef<HTMLDivElement>(null)
    return (
        <>
            <div className={styles.title} data-tauri-drag-region>
                {(() => {
                    let nodeArray: ReactNode[] = []
                    matches.forEach((match, index) => {
                        let style: CSSProperties = (index == matches.length - 1) ? {opacity: 1} : {opacity: .5}
                        nodeArray.push(
                            <motion.p layout style={style}>
                                {t(`path.${match.id}`)}
                            </motion.p>
                        )
                        nodeArray.push(
                            <motion.p layout key={match.id + '/'} style={style}>
                                /
                            </motion.p>
                        )
                    })
                    nodeArray.pop()
                    return nodeArray
                })()}
            </div>
        </>
    )
}

export default TitleBar;