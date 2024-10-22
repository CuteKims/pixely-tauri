import { CSSProperties, useRef } from 'react'
import styles from './Button.module.css'
import { RipplePool, useRippleEffect } from '../../utils/ripple/Ripple'

const Button: React.FC<{
    children: React.ReactNode,
    icon?: React.ReactNode,
    style?: CSSProperties,
    ripplePoolStyle?: CSSProperties,
    onClick?: () => void
}> = ({children, icon, style, ripplePoolStyle, onClick}) => {
    let ripplePoolRef = useRef<HTMLDivElement>(null)
    const {rippleEffect, createRipple, destroyRipple} = useRippleEffect(ripplePoolRef)
    return (
        <div onClick={onClick} className={styles['button']} style={style} onMouseDown={createRipple} onMouseUp={destroyRipple} onMouseLeave={destroyRipple}>
            <RipplePool ref={ripplePoolRef} rippleEffect={rippleEffect} rippleColor='var(--reverse-color-10)' style={ripplePoolStyle}/>
            {icon ? (
                <div style={{fontSize: '0px', margin: 'auto 4px auto 8px'}}>
                    {icon}
                </div>
            ) : null}
            <div className={styles['text']} style={{marginLeft: icon ? '0px' : undefined}}>{children}</div>
        </div>
    )
}

export default Button