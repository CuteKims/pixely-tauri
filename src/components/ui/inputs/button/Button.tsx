import { CSSProperties, useRef } from 'react'
import styles from './Button.module.css'
import { RipplePool, useRippleEffect } from '../../utils/ripple/Ripple'

const Button: React.FC<{
    children: React.ReactNode,
    style?: CSSProperties,
    ripplePoolStyle?: CSSProperties,
    onClick?: () => void
}> = ({children, style, ripplePoolStyle, onClick}) => {
    let ripplePoolRef = useRef<HTMLDivElement>(null)
    const {rippleEffect, createRipple, destroyRipple} = useRippleEffect(ripplePoolRef)
    return (
        <div onClick={onClick} className={styles['button']} style={style} onMouseDown={createRipple} onMouseUp={destroyRipple} onMouseLeave={destroyRipple}>
            <RipplePool ref={ripplePoolRef} rippleEffect={rippleEffect} rippleColor='var(--reverse-color-10)' style={ripplePoolStyle}/>
            <div className={styles['text']}>{children}</div>
        </div>
    )
}

export default Button