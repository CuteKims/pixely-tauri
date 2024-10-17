import { getAnimationTiming, getCssAnimation, AnimationProperties, UiAnimationProperty } from '../../animation'
import styles from './list.module.css'
import React, { useRef } from 'react'

const defaultAnimationProps: AnimationProperties = {
    transition: ['fade-in', 'bottom-slide-in'],
}

export const StackList: React.FC<{children: React.ReactNode, gap?: string, header?: string, animation?: UiAnimationProperty}> = (props) => {
    let childrenLength = useRef(React.Children.count(props.children)).current
    return (
        <div className={styles['stack-list']} style={getCssAnimation(props.animation, defaultAnimationProps, ['fade-in'])}>
            {(() => {
                if (props.header !== undefined) {
                    return (
                        <p className={styles['stack-list__header']} style={getCssAnimation(props.animation, defaultAnimationProps, ['top-slide-in', 'bottom-slide-in', 'left-slide-in', 'right-slide-in', 'scale-up-in', 'scale-down-in'])}>{props.header}</p>
                    )
                }
            })()}
            <div className={styles['stack-list__container']} style={{gap: props.gap}}>
                {(() => {
                    if (props.animation) {
                        let delay = 0
                        if (typeof props.animation === 'object') {
                            delay = props.animation.delay ?? 0
                        }
                        return React.Children.map(props.children, (item, index) => {
                            let animation: UiAnimationProperty = {
                                transition: ['fade-in', 'bottom-slide-in'],
                                duration: getAnimationTiming.fromFrames(30),
                                easing: 'pixely-default',
                                delay: index + 1 > childrenLength ? 0 : (delay + getAnimationTiming.fromFrames(index * 2))
                            }
                            //@ts-ignore
                            return React.cloneElement(item, {animation, key: index})
                        })
                    }
                    else {
                        return props.children
                    }
                })()}
            </div>
        </div>
    )
}

export const GridList: React.FC<{children?: React.ReactNode, gap?: string, animation?: UiAnimationProperty}> = (props) => {
    let childrenLength = useRef(React.Children.count(props.children)).current
    return (
        <div className={styles['grid-list__container']} style={{gap: props.gap, ...getCssAnimation(props.animation, defaultAnimationProps, ['fade-in'])}}>
            {(() => {
                    if (props.animation) {
                        let delay = 0
                        if (typeof props.animation === 'object') {
                            delay = props.animation.delay ?? 0
                        }
                        return React.Children.map(props.children, (item, index) => {
                            let animation: UiAnimationProperty = {
                                transition: ['fade-in', 'scale-up-in'],
                                duration: getAnimationTiming.fromFrames(30),
                                easing: 'pixely-default',
                                delay: index + 1 > childrenLength ? 0 : (delay + getAnimationTiming.fromFrames(index * 2))
                            }
                            //@ts-ignore
                            return React.cloneElement(item, {animation})
                        })       
                    }
                    else {
                        return props.children
                    }
                })()}
        </div>
    )
}