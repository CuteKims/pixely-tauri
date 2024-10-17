import { createRef } from 'react'
import styles from './Button.module.css'
import { RipplePool, useRippleEffect } from '../../utils/ripple/Ripple'

const Button: React.FC<{text: string}> = ({text}) => {
    let ripplePoolRef = createRef<HTMLDivElement>()
    const {rippleEffect, createRipple, destroyRipple} = useRippleEffect(ripplePoolRef)
    return (
        <div className={styles['button']} onMouseDown={createRipple} onMouseUp={destroyRipple} onMouseLeave={destroyRipple}>
            <RipplePool ref={ripplePoolRef} rippleEffect={rippleEffect} rippleColor='var(--reverse-color-10)' style={{borderRadius: '16px'}}/>
            <p>{text}</p>
        </div>
    )
}

export default Button