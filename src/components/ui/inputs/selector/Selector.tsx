import { createRef } from 'react'
import { RipplePool, useRippleEffect } from '../../utils/ripple/Ripple'
import styles from './Selector.module.css'
import { ListItem } from '../../dataDisplay/list/ListItem'

const Selector: React.FC<{text: string}> = ({text}) => {
    let ripplePoolRef = createRef<HTMLDivElement>()
    const {rippleEffect, createRipple, destroyRipple} = useRippleEffect(ripplePoolRef)
    return (
        <div className={styles['selector']} onMouseDown={createRipple} onMouseUp={destroyRipple} onMouseLeave={destroyRipple}>
            <RipplePool ref={ripplePoolRef} rippleEffect={rippleEffect} rippleColor='var(--reverse-color-10)' style={{borderRadius: '16px'}}/>
            <p>{text}</p>
            <div className={styles['selector__arrow']}>
                <Arrow />
            </div>
        </div>
    )
}

const Arrow: React.FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <g transform="translate(-245 -531)">
                <rect width="32" height="32" transform="translate(245 531)" fill="none" />
                <path d="M3.535,4.243,0,.707.707,0,4.243,3.535,7.778,0l.707.707L4.243,4.95Z" transform="translate(256.757 544.525)" fill="currentColor" />
            </g>
        </svg>
    )
}

export default Selector