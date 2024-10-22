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
            {(() => {
                if(props.customPrefix) {
                    return (
                        <div className={styles['custom-prefix-container']}>
                            {props.customPrefix}
                        </div>
                    )
                }
            })()}
            {(() => {
                if(props.icon) {
                    return (
                        <div className={styles['icon-container']}>
                            {props.icon}
                        </div>
                    )
                }
            })()}
            {(() => {
                if(props.text) {
                    if(props.text.secondary) {
                        return (
                            <div className={styles['list-item__text-container']}>
                                <p className='plain-text--main'>{props.text.primary}</p>
                                <p className='plain-text--small' style={{opacity: .8}}>{props.text.secondary}</p>
                            </div>
                        )
                    } else {
                        return (
                            <div className={styles['list-item__text-container']}>
                                <p className='plain-text--main'>{props.text.primary}</p>
                            </div>
                        )
                    }
                }
            })()}
            {(() => {
                if(props.customSuffix) {
                    return (
                        <div className={styles['custom-suffix-container']}>
                            {props.customSuffix}
                        </div>
                    )
                }
            })()}
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