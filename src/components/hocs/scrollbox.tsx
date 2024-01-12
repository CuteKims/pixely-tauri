import styles from './scrollbox.module.css'

import { useEffect, useRef, useState } from "react"

export const ScrollBox: React.FC<{children: React.ReactNode}> = ({children}) => {
    let containerRef = useRef<HTMLDivElement>(null);
    let childrenRef = useRef<HTMLDivElement>(null);
    let [height, setHeight] = useState({scroll: -1, client: -1})
    let [currentPos, setCurrentPos] = useState(0)
    useEffect(() => {
        if (childrenRef.current == undefined || containerRef.current == undefined) return;
        const element = childrenRef.current;
        const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
            let height = {scroll: entry.contentRect.height + 36, client: (containerRef.current as HTMLDivElement).clientHeight};
            setHeight(height);
        }
        });
        observer.observe(element);
        return () => observer.unobserve(element);
    }, [])
    function updatePos() {
        if(containerRef.current) {
            setCurrentPos(containerRef.current.scrollTop);
        }
    }
    function getSliderHeight() {
        if (height.client / height.scroll >= 1) return height.client - 36
        return (height.client / height.scroll) * (height.client - 36)
    }
    return (
        <>
            <div style={{width: '100%', display: 'flex'}} onScrollCapture={updatePos}>
                <div id='scroll-box' ref={containerRef} style={{overflowY: 'scroll', flexGrow: 1, padding: '36px 0px 0px 0px'}}>
                    <div ref={childrenRef}>
                        {children}
                    </div>
                </div>
                {(() => {
                    return (
                        <div id={styles['scrollbar-track']} style={{height: height.client - 36, opacity: height.client / height.scroll >= 1 ? '0' : '1'}}>
                            <div id={styles['scrollbar-slider']} style={{height: getSliderHeight(), transform: 'translateY(' + (currentPos / height.scroll) * (height.client - 36) + 'px)'}}/>
                        </div>
                    )
                })()}
            </div>
        </>
    )
}