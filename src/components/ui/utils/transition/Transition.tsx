import { useEffect, useRef, useState } from "react"

export const Transition: React.FC<{children: React.ReactNode, props: {
    id?: string,
    in: boolean,
    styles: {
        [key: string]: React.CSSProperties | undefined
        'entered': React.CSSProperties | undefined,
        'exited': React.CSSProperties | undefined,
    },
    timeout: {
        enter: number,
        exit: number,
    },
    unmountAfterExit: boolean,
    onClick?: VoidFunction
}}> = ({children, props}) => {
    let [animationState, setState] = useState('exited');
    let [isRemoved, setRemoved] = useState(false);
    let timeoutRef = useRef<number>()
    useEffect(() => {
        if(props.in) {
            clearTimeout(timeoutRef.current)
            setRemoved(false);
            setState('exited');
            setTimeout(() => {
                setState('entered');
            }, props.timeout.enter)
        } else {
            setState('exited')
            if(props.unmountAfterExit) {
                timeoutRef.current = setTimeout(() => {
                    setRemoved(true)
                }, props.timeout.exit)
            }
        }
    }, [props.in]);
    return (
        <>
            {!isRemoved && (
                <div id={props.id} style={props.styles[animationState]} onClick={props.onClick}>
                    {children}
                </div>
            )}
        </>
    )
}