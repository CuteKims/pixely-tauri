import styles from './scrollbox.module.css'

import { BaseSyntheticEvent, SyntheticEvent, useEffect, useRef, useState } from "react"

export const ScrollBox: React.FC<{children: React.ReactNode}> = ({children}) => {
    let containerRef = useRef<HTMLDivElement>(null);
    let childrenRef = useRef<HTMLDivElement>(null);
    let [elementHeights, setElementHeights] = useState({scroll: -1, client: -1})
    let [scrollTop, setScrollTop] = useState(0)
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
                        <div id={styles['scrollbar-track']} style={{height: elementHeights.client - 36, opacity: elementHeights.client / elementHeights.scroll >= 1 ? '0' : '1'}} onMouseDown={(event) => onTrackMouseDown(event)}>
                            <div id={styles['scrollbar-slider']} style={{height: getSliderHeight(), transform: 'translateY(' + (scrollTop / elementHeights.scroll) * (elementHeights.client - 36) + 'px)'}}/>
                        </div>
                    )
                })()}
            </div>
        </>
    )
}