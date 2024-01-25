import { useContext, useEffect, useRef, useState } from 'react'
import styles from './notification.module.css'
import { globalStateContext } from '../hocs/context'
import { Notification, NotificationChannels } from '../../bridger/notif'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollBox } from '../hocs/scrollbox'

const NotificationBanner: React.FC = () => {

    const {state, dispatch} = useContext(globalStateContext)

    const localArray = useRef<Notification<NotificationChannels>[]>(state.notifArray)
    const [displayArray, setDisplayArray] = useState<Notification<NotificationChannels>[]>([])

    const removeDisplay = (uuid: number) => {
        setDisplayArray(displayArray => {
            let newArray = [...displayArray]
            return newArray.filter(element => element.uuid !== uuid)
        });
    }

    useEffect(() => {
        // if(state.modals.menu) {
        //     localArray.current = state.notifArray;    
        //     return setDisplayArray([])
        // }
        let newArray = [...displayArray];
        state.notifArray.forEach((newNotif) => {
            let result = localArray.current.find((oldNotif) => oldNotif.uuid == newNotif.uuid)
            if (result == undefined) {
                newArray.unshift(newNotif)
                setTimeout(() => {
                    removeDisplay(newNotif.uuid)
                }, 6000)
            }
        });
        setDisplayArray(newArray);
        localArray.current = state.notifArray;
    }, [state.notifArray.length, state.modals.menu])
    return (
        <div id='notifbanner-scrollbox-container' style={{height: '100%', width: '340px', position: 'absolute', right: '0px', top: '0px'}}>
            <ScrollBox>
                <div id='notifbanner-container' style={{padding: '36px', paddingTop: state.modals.menu ? '37px' : '0px', marginTop: '-1px'}}>
                    {state.modals.menu ? (
                        <>
                            <AnimatePresence mode='popLayout'>
                                {state.notifArray.map((value, key) => (
                                    <motion.div
                                    layout
                                    key={value.uuid}
                                    className={styles['banner-actioncenter']}
                                    initial={{opacity: 0, scale: .9, translateY: (key * 30)}}
                                    animate={{opacity: 1, scale: 1, translateY: 0}}
                                    exit={{opacity: 0, scale: .9}}
                                    transition={{ease: [0,.8,.2,1], duration: .5}}>
                                        <div style={{margin: '0px', flexGrow: 1, border: 'solid 1px rgba(255, 255, 255, 0)', display: 'flex'}}>
                                            <div style={{margin: '24px'}}>
                                                <SVG2/>
                                            </div>
                                            <p style={{marginLeft: '0px'}}>NotifUuid: {value.uuid}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </>
                    ) : (
                        <AnimatePresence mode='popLayout'>
                            {displayArray.map((value, key) => (
                                <motion.div
                                layout
                                key={value.uuid}
                                className={styles.banner}
                                initial={{translateY: -144}}
                                animate={{translateY: 0}}
                                exit={key == 0 ? {translateY: -144} : {opacity: 0, scale: .8}}
                                transition={{ease: [0,.8,.2,1], duration: .5}}>
                                    <div style={{margin: '0px', flexGrow: 1, border: 'solid 1px rgba(255, 255, 255, .2)', display: 'flex'}}>
                                        <div style={{margin: '24px'}}>
                                            <SVG2/>
                                        </div>
                                        <p style={{marginLeft: '0px'}}>NotifUuid: {value.uuid}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </ScrollBox>
        </div>
    )
}

const SVG2: React.FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <defs>
                <clipPath id="clip-path">
                    <rect id="矩形_56" data-name="矩形 56" width="24" height="24" fill="none"/>
                </clipPath>
            </defs>
            <g id="组_42" data-name="组 42" clip-path="url(#clip-path)">
                <path id="路径_6" data-name="路径 6" d="M22,1V5.391A11.99,11.99,0,0,0,0,12H2A9.995,9.995,0,0,1,20.652,7H16V9h8V1Z" fill="#fff"/>
                <path id="路径_7" data-name="路径 7" d="M13.433,21.886A9.874,9.874,0,0,1,3.348,17H8V15H0v8H2V18.609a11.985,11.985,0,0,0,13.539,4.859,6.015,6.015,0,0,1-2.106-1.582" fill="#fff"/>
                <path id="路径_8" data-name="路径 8" d="M22,12a10.1,10.1,0,0,1-.114,1.433,6.015,6.015,0,0,1,1.582,2.106A11.992,11.992,0,0,0,24,12Z" fill="#fff"/>
                <path id="路径_9" data-name="路径 9" d="M18,13a5,5,0,1,0,5,5,5,5,0,0,0-5-5m.5,8h-1V20h1Zm0-2h-1V15h1Z" fill="#fff"/>
            </g>
        </svg>
    )
}

export default NotificationBanner