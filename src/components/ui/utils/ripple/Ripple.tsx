import { createRef, CSSProperties, forwardRef, MouseEventHandler, RefObject, useImperativeHandle, useRef, useState } from "react"
import styles from './Ripple.module.css'
import { CSSTransition, Transition, TransitionGroup } from "react-transition-group"

type RippleEffect = {key: string, timestamp: number, scrapping: boolean, radius: number, position: [number, number], nodeRef: RefObject<HTMLDivElement>}

function calcRadius(size: [number, number]) {
    return Math.sqrt(size[0] ** 2 + size[1] ** 2);
}

export function useRippleEffect(ripplePoolRef: RefObject<HTMLDivElement>): {rippleEffect: RippleEffect[], createRipple: MouseEventHandler, destroyRipple: () => void} {
    const [rippleEffect, setRippleEffect] = useState<RippleEffect[]>([]);

    const createRipple: MouseEventHandler = (event) => {
        let key = crypto.randomUUID()
        let DOMRect = ripplePoolRef.current!.getBoundingClientRect();
        let x = event.clientX - DOMRect.left;
        let y = event.clientY - DOMRect.top;
        let date = new Date()
        setRippleEffect(rippleEffect => [...rippleEffect, {
            key,
            timestamp: date.getSeconds() * 1000 + date.getMilliseconds(),
            scrapping: false,
            radius: calcRadius([
                ripplePoolRef.current!.clientHeight,
                ripplePoolRef.current!.clientWidth,
            ]),
            position: [x, y],
            nodeRef: createRef()
        }]);
    };

    const destroyRipple = () => {
        setTimeout(() => setRippleEffect(rippleEffect => rippleEffect.slice(1)), 100)
        
    }
    return {
        rippleEffect,
        createRipple,
        destroyRipple
    }
}

const RippleWrapper: React.FC<{
    children: React.ReactNode,
    rippleColor?: string,
    onClick?: MouseEventHandler<HTMLDivElement>,
    onMouseDown?: MouseEventHandler<HTMLDivElement>,
    onMouseUp?: MouseEventHandler<HTMLDivElement>,
    onMouseEnter?: MouseEventHandler<HTMLDivElement>,
    onMouseLeave?: MouseEventHandler<HTMLDivElement>
}> = ({ children, rippleColor, onClick, onMouseDown, onMouseUp, onMouseEnter, onMouseLeave }) => {
    const ripplePoolRef = useRef<HTMLDivElement>(null)
    const {rippleEffect, createRipple, destroyRipple} = useRippleEffect(ripplePoolRef)

    const _onClick: MouseEventHandler<HTMLDivElement> = (event) => {
        if(onClick) onClick(event)
    }

    const _onMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
        createRipple(event)
        if(onMouseDown) onMouseDown(event)
    }

    const _onMouseUp: MouseEventHandler<HTMLDivElement> = (event) => {
        destroyRipple()
        if(onMouseUp) onMouseUp(event)
    }

    const _onMouseEnter: MouseEventHandler<HTMLDivElement> = (event) => {
        if(onMouseEnter) onMouseEnter(event)
    }

    const _onMouseLeave: MouseEventHandler<HTMLDivElement> = (event) => {
        destroyRipple()
        if(onMouseLeave) onMouseLeave(event)
    }

    return (
        <div className={styles['ripple__container']} onClick={_onClick} onMouseDown={_onMouseDown} onMouseUp={_onMouseUp} onMouseLeave={_onMouseLeave} onMouseEnter={_onMouseEnter}>
            <RipplePool ref={ripplePoolRef} rippleEffect={rippleEffect} rippleColor={rippleColor} style={{top: '0px'}}/>
            {children}
        </div>
    )
}

export const RipplePool = forwardRef<HTMLDivElement, {rippleEffect: RippleEffect[], style?: CSSProperties, rippleColor?: string}>(({rippleEffect, style, rippleColor}, ref) => {
    return (
        <div className={styles['ripple-pool']} style={style} ref={ref}>
            <TransitionGroup component={null} enter exit>
                {rippleEffect.map(({key, radius, position, nodeRef}) => (
                    <CSSTransition key={key} nodeRef={nodeRef} timeout={Math.max(radius * 2.5, 500)} classNames={{enter: styles['ripple-effect--enter'], exit: styles['ripple-effect--exit'], enterActive: styles['ripple-effect--enter-active'], exitActive: styles['ripple-effect--exit-active']}}>
                        <div ref={nodeRef} className={styles['ripple-effect']} style={{
                            backgroundColor: rippleColor,
                            top: `${position[1] - radius}px`,
                            left: `${position[0] - radius}px`,
                            height: `${radius * 2}px`,
                            width: `${radius * 2}px`,
                            filter: `blur(${Math.max(radius * 0.05, 8)}px)`,
                            borderRadius: `${radius}px`,
                            transition: `${Math.max(radius * 0.0025, .5)}s cubic-bezier(0, .5, .5, 1)`
                        }}/>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
        
    )
})

export default RippleWrapper