import { CSSProperties, useContext } from 'react'
import styles from './Page.module.css'
import { ScrollBox } from '../utils/scrollBox/ScrollBox'
import { rootContext } from '../../routes/_root/rootContext'
import { AnimatePresence, motion } from 'framer-motion'
import { RouteObject, useLocation } from 'react-router'
import { Sidebar } from '../inputs/sidebar/Sidebar'

export const Page: React.FC<{routes?: RouteObject, children?: React.ReactNode, fullScreen?: boolean, style?: CSSProperties}> = (props) => {
    let rootState = useContext(rootContext)?.rootState!
    let location = useLocation()
    return (
        <div id={styles['page-container']} style={{transform: rootState.isActionCenterShow ? 'scale(.95)' : 'none'}}>
            {props.fullScreen ? (
                <>
                    {props.children}
                </>
            ) : (
                <>
                    <div id={styles['page-background']} />
                    <div id={styles['page-foreground']}>
                        {props.routes ? (
                            <div style={{display: 'flex', width: '100%', height: '100%'}}>
                                <Sidebar routes={props.routes}/>
                                <div id='animate-presence-container' style={Object.assign({height: '100%', width: '100%'}, props.style)}>
                                    <AnimatePresence mode='popLayout'>
                                        <motion.div key={location.pathname} layout style={{height: '100%', width: '100%'}} initial={{y: 40}} animate={{y: 0, transition: {duration: .5, ease: [0,.8,.2,1]}}} exit={{opacity: 0, filter: 'blur(10px)', transition: {duration: .2, ease: 'linear'}}}>
                                            {props.children}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        ) : (
                            <div style={Object.assign({height: '100%', width: '100%'}, props.style)}>
                                <AnimatePresence mode='popLayout'>
                                    {props.children}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export const SubpageBase: React.FC<{children?: React.ReactNode, style?: React.CSSProperties}> = ({children, style}) => {
    return (
        <div id={styles['subpage']} style={style}>
            {children}
        </div>
    )
}

export const Subpage: React.FC<{header?: React.ReactNode, children?: React.ReactNode, gap?: string}> = (props) => {
    return (
        <ScrollBox contentContainerStyle={{padding: '36px'}}>
            {props.header ? (
                <p className='white-text--header' style={{paddingBottom: '18px', width: 'min(100%, 800px)', margin: 'auto'}}>
                    {props.header}
                </p>
            ) : null}
            <SubpageBase>
                {props.children}
            </SubpageBase>
        </ScrollBox>
    )
}