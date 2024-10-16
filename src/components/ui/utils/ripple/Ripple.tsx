import { createRef, MouseEventHandler, RefObject, useRef, useState } from "react"
import styles from './Ripple.module.css'
import { CSSTransition, Transition, TransitionGroup } from "react-transition-group"

function calcRadius(size: [number, number]) {
    return Math.sqrt(size[0] ** 2 + size[1] ** 2);
}

const Ripple: React.FC<{
    children: React.ReactNode,
    onClick?: MouseEventHandler<HTMLDivElement>,
    onMouseDown?: MouseEventHandler<HTMLDivElement>,
    onMouseUp?: MouseEventHandler<HTMLDivElement>,
    onMouseEnter?: MouseEventHandler<HTMLDivElement>,
    onMouseLeave?: MouseEventHandler<HTMLDivElement>
}> = ({ children, onClick, onMouseDown, onMouseUp, onMouseEnter, onMouseLeave }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [rippleEffect, setRippleEffect] = useState<{key: string, timestamp: number, scrapping: boolean, radius: number, position: [number, number], nodeRef: RefObject<HTMLDivElement>}[]>([]);

    const createRipple: MouseEventHandler<HTMLDivElement> = (event) => {
        let key = crypto.randomUUID()
        let DOMRect = containerRef.current!.getBoundingClientRect();
        let x = event.clientX - DOMRect.left;
        let y = event.clientY - DOMRect.top;
        let date = new Date()
        setRippleEffect((rippleEffect) => [
            ...rippleEffect,
            {
                key,
                timestamp: date.getSeconds() * 1000 + date.getMilliseconds(),
                scrapping: false,
                radius: calcRadius([
                    containerRef.current!.clientHeight,
                    containerRef.current!.clientWidth,
                ]),
                position: [x, y],
                nodeRef: createRef()
            },
        ]);
    };

    const destroyRipple = () => {
        setTimeout(() => setRippleEffect(rippleEffect => {return rippleEffect.slice(1)}), 25)
        
    }

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
        <div className={styles['ripple__container']} ref={containerRef} onClick={_onClick} onMouseDown={_onMouseDown} onMouseUp={_onMouseUp} onMouseLeave={_onMouseLeave} onMouseEnter={_onMouseEnter}>
            <TransitionGroup className={styles['ripple-effect__container']} enter exit>
                {rippleEffect.map(({key, radius, position, nodeRef}) => (
                    <CSSTransition key={key} nodeRef={nodeRef} timeout={1000} classNames={{enter: styles['ripple-effect--enter'], exit: styles['ripple-effect--exit'], enterActive: styles['ripple-effect--enter-active'], exitActive: styles['ripple-effect--exit-active']}}>
                        <div ref={nodeRef} className={styles['ripple-effect']} style={{
                            top: `${position[1] - radius}px`,
                            left: `${position[0] - radius}px`,
                            height: `${radius * 2}px`,
                            width: `${radius * 2}px`,
                            borderRadius: `${radius}px`,
                            transition: `${radius * 0.002}s cubic-bezier(0, .5, .5, 1)`
                        }}/>
                    </CSSTransition>
                ))}
            </TransitionGroup>
            {children}
        </div>
    )
}

export default Ripple