import { useRef } from 'react'
import styles from './ListItem.module.css'
import { getCssAnimation, UiAnimationProperty } from '../../animation'
import { RipplePool, useRippleEffect } from '../../utils/ripple/Ripple'

export type ListItemProps = {
    animation?: UiAnimationProperty
    text?: {
        primary: React.ReactNode,
        secondary?: React.ReactNode,
    },
    icon?: React.ReactNode,
    customPrefix?: React.ReactNode,
    customSuffix?: React.ReactNode,
    onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

export const ListItem: React.FC<ListItemProps> = (props) => {
    let listItem = (
        <div className={styles['list-item']}>
            {props.customPrefix ? (
                <div className={styles['list-item__custom-prefix-container']}>
                    {props.customPrefix}
                </div>
            ) : null}

            {props.icon ? (
                <div className={styles['list-item__icon-container']}>
                    {props.icon}
                </div>
            ) : null}

            {props.text ? (
                <div className={styles['list-item__text-container']}>
                    <p className='plain-text--main'>{props.text.primary}</p>
                    {props.text.secondary ? <p className='plain-text--small opacity-75'>{props.text.secondary}</p> : null}
                </div>
            ) : null}

            {props.customSuffix ? (
                <div className={styles['list-item__custom-suffix-container']}>
                    {props.customSuffix}
                </div>
            ) : null}
        </div>
    )

    if(props.onClick) {
        let ripplePoolRef = useRef<HTMLDivElement>(null)
        const {rippleEffect, createRipple, destroyRipple} = useRippleEffect(ripplePoolRef)
        return (
            <div className={`${styles['list-item-container']} ${styles['list-item-container--clickable']}`} style={getCssAnimation(props.animation)} onMouseDown={createRipple} onMouseUp={destroyRipple} onMouseLeave={destroyRipple} onClick={props.onClick}>
                <RipplePool ref={ripplePoolRef} rippleEffect={rippleEffect}/>
                {listItem}
            </div>
        )
    }
    
    else return (
        <div className={styles['list-item-container']} style={getCssAnimation(props.animation)}>
            {listItem}
        </div>
    )
}