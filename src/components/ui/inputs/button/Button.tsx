import { createRef, CSSProperties } from 'react'
import styles from './Button.module.css'
import { RipplePool, useRippleEffect } from '../../utils/ripple/Ripple'

const Button: React.FC<{children: React.ReactNode, style?: CSSProperties, ripplePoolStyle?: CSSProperties}> = ({children, style, ripplePoolStyle}) => {
    let ripplePoolRef = createRef<HTMLDivElement>()
    const {rippleEffect, createRipple, destroyRipple} = useRippleEffect(ripplePoolRef)
    return (
        <div className={styles['button']} style={style} onMouseDown={createRipple} onMouseUp={destroyRipple} onMouseLeave={destroyRipple}>
            <RipplePool ref={ripplePoolRef} rippleEffect={rippleEffect} rippleColor='var(--reverse-color-10)' style={ripplePoolStyle}/>
            <div className={styles['text']}>{children}</div>
        </div>
    )
}

export default Button