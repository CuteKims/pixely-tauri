import styles from './scrollbox.module.css'

import { useEffect, useRef, useState } from "react"
import { motion } from 'framer-motion';

export const ScrollBox: React.FC<{children: React.ReactNode}> = ({children}) => {
    let containerRef = useRef<HTMLDivElement>(null);
    let childrenRef = useRef<HTMLDivElement>(null);
    let [elementHeights, setElementHeights] = useState({scroll: -1, client: -1})
    let [scrollTop, setScrollTop] = useState(0)
    let [mouseState, setMouseState] = useState({pan: false, hover: false})
    useEffect(() => {
        if (childrenRef.current == undefined || containerRef.current == undefined) return;
        const element = childrenRef.current;
        const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
            let height = {scroll: entry.contentRect.height + 36, client: (containerRef.current as HTMLDivElement).clientHeight};
            setElementHeights(height);
        }
        });
        observer.observe(element);
        return () => observer.unobserve(element);
    }, [])
    function updatePos() {
        if(containerRef.current) {
            setScrollTop(containerRef.current.scrollTop);
        }
    }
    function getSliderHeight() {
        if (elementHeights.client / elementHeights.scroll >= 1) return elementHeights.client - 36
        return (elementHeights.client / elementHeights.scroll) * (elementHeights.client - 36)
    }

    function onTrackMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        let sliderTop = (scrollTop / elementHeights.scroll) * (elementHeights.client - 36) + 36
        if(event.clientY < sliderTop) {
            containerRef.current?.scrollTo({
                top: containerRef.current.scrollTop - (elementHeights.client * 0.67),
                left: 0,
                behavior: 'smooth'
            })
        } else if(event.clientY > sliderTop + getSliderHeight()) {
            containerRef.current?.scrollTo({
                top: containerRef.current.scrollTop + (elementHeights.client * 0.67),
                left: 0,
                behavior: 'smooth'
            })
        }
        
    }

    return (
        <>
            <div style={{width: '100%', height: '100%', display: 'flex', overflowX: 'visible'}} onScrollCapture={updatePos}>
                <div id='scroll-box' ref={containerRef} style={{overflowY: 'scroll', flexGrow: 1, padding: '36px 0px 0px 0px'}}>
                    <div ref={childrenRef}>
                        {children}
                    </div>
                </div>
                {(() => {
                    return (
                        <motion.div id={styles['scrollbar-track']}
                        style={{height: elementHeights.client - 36, opacity: elementHeights.client / elementHeights.scroll >= 1 ? '0' : '1', padding: mouseState.hover || mouseState.pan ? '0px 2px' : '0px 4px'}}
                        onMouseDown={(event) => onTrackMouseDown(event)}
                        onHoverStart={() => setMouseState({pan: mouseState.pan, hover: true})}
                        onHoverEnd={() => setMouseState({pan: mouseState.pan, hover: false})}>
                            <motion.div
                            id={styles['scrollbar-slider']}
                            style={{
                                height: getSliderHeight(),
                                transform: 'translateY(' + (scrollTop / elementHeights.scroll) * (elementHeights.client - 36) + 'px)',
                                width: mouseState.hover || mouseState.pan ? '8px' : '2px',
                                backgroundColor: mouseState.hover || mouseState.pan ? 'rgba(255, 255, 255, .5)' : 'rgba(255, 255, 255, .75)'}}
                            onPanStart={() => setMouseState({pan: true, hover: mouseState.hover})}
                            onPanEnd={() => setMouseState({pan: false, hover: mouseState.hover})}
                            onPan={(event, panInfo) => {
                                containerRef.current?.scrollTo({
                                    top: (panInfo.delta.y * (elementHeights.scroll / elementHeights.client)) + containerRef.current.scrollTop,
                                    left: 0,
                                    behavior: 'instant'
                                })
                            }}/>
                        </motion.div>
                    )
                })()}
            </div>
        </>
    )
}