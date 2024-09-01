import styles from './ScrollBox.module.css'

import { CSSProperties, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { AnimatePresence, motion } from 'framer-motion';

type ScrollboxProps = {
    children: React.ReactNode,
    fullHeight?: boolean,
    float?: React.ReactNode,
    contentContainerStyle?: CSSProperties
}

export const ScrollBox = forwardRef<HTMLDivElement, ScrollboxProps>((props, ref) => {
    let containerRef = useRef<HTMLDivElement>(null);
    let childrenRef = useRef<HTMLDivElement>(null);
    let sliderRef = useRef<HTMLDivElement>(null);

    let [elementHeights, setElementHeights] = useState({scroll: -1, client: -1})
    let [scrollTop, setScrollTop] = useState(0)
    let [mouseState, setMouseState] = useState({pan: false, hover: false})

    // @ts-ignore
    useImperativeHandle(ref, () => containerRef.current) //FIXME: 不能将类型“HTMLDivElement | null”分配给类型“HTMLDivElement”。

    useEffect(() => {
        if (childrenRef.current == undefined || containerRef.current == undefined) return;
        const observer = new ResizeObserver(() => {
            try {
                let height = {scroll: childrenRef.current!.clientHeight + (props.fullHeight ? 0 : 36), client: containerRef.current!.clientHeight};
                setElementHeights(height);
            } catch {}
        });
        observer.observe(containerRef.current);
        observer.observe(childrenRef.current);
        return () => {
            if (childrenRef.current == undefined || containerRef.current == undefined) return;
            observer.unobserve(containerRef.current)
            observer.unobserve(childrenRef.current)
        };
    }, [])

    function getSliderHeight() {
        if (elementHeights.client / elementHeights.scroll >= 1) return elementHeights.client - (props.fullHeight ? 0 : 36)
        return (elementHeights.client / elementHeights.scroll) * (elementHeights.client - (props.fullHeight ? 0 : 36))
    }

    function onTrackMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        let sliderTop = sliderRef.current?.getBoundingClientRect().top ?? 0
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
            <div id='scroll-box-container' style={{position: 'relative', width: '100%', height: '100%', display: 'flex', overflowX: 'visible'}} onScrollCapture={() => setScrollTop(containerRef.current?.scrollTop ?? 0)}>
                <div id='scroll-box' ref={containerRef} style={{overflowY: 'scroll', padding: props.fullHeight ? '0px' : '36px 0px 0px 0px', width: '100%'}}>
                    <div id='scroll-content' style={props.contentContainerStyle} ref={childrenRef}>
                        {props.children}
                    </div>
                </div>
                <motion.div
                    id={styles['scrollbar-track']}
                    style={{
                        margin: props.fullHeight ? '0px' : '36px 0px 0px 0px',
                        height: elementHeights.client - (props.fullHeight ? 0 : 36),
                        opacity: elementHeights.client / elementHeights.scroll >= 1 ? '0' : '1',
                    }}
                    onMouseDown={(event) => onTrackMouseDown(event)}
                    onHoverStart={() => setMouseState({pan: mouseState.pan, hover: true})}
                    onHoverEnd={() => setMouseState({pan: mouseState.pan, hover: false})}
                >
                    <motion.div
                        ref={sliderRef}
                        id={styles['scrollbar-slider']}
                        style={{
                            height: getSliderHeight(),
                            transform: 'translateY(' + (scrollTop / elementHeights.scroll) * (elementHeights.client - (props.fullHeight ? 0 : 36)) + 'px)',
                            width: mouseState.hover || mouseState.pan ? '8px' : '2px',
                            backgroundColor: mouseState.hover || mouseState.pan ? 'rgba(255, 255, 255, .5)' : 'rgba(255, 255, 255, .75)'
                        }}
                        onPanStart={() => setMouseState({pan: true, hover: mouseState.hover})}
                        onPanEnd={() => setMouseState({pan: false, hover: mouseState.hover})}
                        onPan={(_event, panInfo) => {
                            containerRef.current?.scrollTo({
                                top: (panInfo.delta.y * (elementHeights.scroll / elementHeights.client)) + containerRef.current.scrollTop,
                                left: 0,
                                behavior: 'instant'
                            })
                        }}
                    />
                </motion.div>
                <div style={{width: '100%', height: '100%', position: 'absolute', pointerEvents: 'none'}}>
                    <AnimatePresence>
                        {scrollTop > 120 ? (
                            <motion.div
                                style={{margin: '0px 36px'}}
                                initial={{y: -56}}
                                animate={{y: props.fullHeight ? 0 : 35}}
                                exit={{y: -56}}
                                transition={{duration: .5, ease: [0,.8,.2,1]}}
                            >
                                {props.float}
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
            </div>
        </>
    )
})