import { CSSProperties, useRef } from 'react'
import styles from './Button.module.css'
import { RipplePool, useRippleEffect } from '../../utils/ripple/Ripple'

const Button: React.FC<{
    text: React.ReactNode,
    icon?: React.ReactNode,
    style?: CSSProperties,
    isSelected?: boolean,
    onClick?: () => void
}> = ({text, icon, style, onClick}) => {
    let ripplePoolRef = useRef<HTMLDivElement>(null)
    const {rippleEffect, createRipple, destroyRipple} = useRippleEffect(ripplePoolRef)
    return (
        <div onClick={onClick} className={styles['button']} style={style} onMouseDown={createRipple} onMouseUp={destroyRipple} onMouseLeave={destroyRipple}>
            <RipplePool ref={ripplePoolRef} rippleEffect={rippleEffect} rippleColor='var(--reverse-color-10)'/>
            {icon ? (
                <div style={{margin: 'auto -6px auto 8px'}}>
                    {icon}
                </div>
            ) : null}
            <p className='plain-text--small' style={{margin: 'auto', padding: '8px 10px'}}>{text}</p>
        </div>
    )
}

export default Button