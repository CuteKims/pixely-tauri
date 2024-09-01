import { CSSProperties } from "react"
import { XOR } from "ts-xor"

type SlideInTransitions = 'top-slide-in' | 'bottom-slide-in' | 'left-slide-in' | 'right-slide-in'
type ScaleInTransitions = 'scale-up-in' | 'scale-down-in'

type AnimationTransition = 
    'fade-in' |
    SlideInTransitions |
    ScaleInTransitions |
    ['fade-in'] |
    [SlideInTransitions] |
    [ScaleInTransitions] |
    ['fade-in', SlideInTransitions] |
    ['fade-in', ScaleInTransitions] |
    [SlideInTransitions, ScaleInTransitions] |
    ['fade-in', SlideInTransitions, ScaleInTransitions]

type AnimationEasing = [number, number, number, number] | 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'pixely-default'

export type AnimationProperties = { transition?: AnimationTransition, duration?: number, easing?: AnimationEasing, delay?: number }
export type UiAnimationProperty = AnimationProperties | boolean | undefined


export const getAnimationTiming = {
    fromFrames: (frames: number) => {
        return Math.round(frames * 16.67)
    },
    fromSeconds: (seconds: number) => {
        return seconds * 1000
    },
    fromMilliseconds: (milliseconds: number) => {
        return milliseconds
    }
}

export function getCssAnimation(animationProps: UiAnimationProperty, defaultAnimationProps?: AnimationProperties, blockedTransition?: ('fade-in' | SlideInTransitions | ScaleInTransitions)[]): CSSProperties | undefined {
    let serialize: (animationProps: UiAnimationProperty) => CSSProperties = (animationProps) => {
        let _animationProps = animationProps as { transition?: AnimationTransition, duration?: number, easing?: AnimationEasing, delay?: number }
        let getTimingFunction: (easing: AnimationEasing | undefined) => string | undefined = (easing) => {
            if (easing === undefined) return undefined
            if (typeof easing !== 'string') {
                let array = easing as number[]
                return `cubic-bezier(${array[0]}, ${array[1]}, ${array[2]}, ${array[3]})`
            }
            else if (easing === 'pixely-default') return 'cubic-bezier(0, 0.8, 0.2, 1)'
            else return easing
        }
        let getName: (transition: AnimationTransition | undefined) => string | undefined = (transition) => {
            if (transition === undefined) return undefined
            if (typeof transition === 'string') return transition
            else {
                let result = ''
                transition.forEach(transition => {
                    if(!blockedTransition?.includes(transition)) result += (transition + ', ')
                })
                return result.substring(0, result.length - 2)
            }
        }
        let getInitialState: (transition: AnimationTransition | undefined) => CSSProperties | undefined = (transition) => {
            let matchTransition: (transition: "fade-in" | SlideInTransitions | ScaleInTransitions, css: CSSProperties) => void = (transition, css) => {
                switch (transition) {
                    case 'fade-in':
                        if(!blockedTransition?.includes('fade-in')) css.opacity = 0
                        break
                    case 'top-slide-in':
                        if(!blockedTransition?.includes('top-slide-in')) css.transform += 'translateY(-12px) '
                        break
                    case 'bottom-slide-in':
                        if(!blockedTransition?.includes('bottom-slide-in')) css.transform = 'translateY(12px) '
                        break
                    case 'left-slide-in':
                        if(!blockedTransition?.includes('left-slide-in')) css.transform = 'translateX(-12px) '
                        break
                    case 'right-slide-in':
                        if(!blockedTransition?.includes('right-slide-in')) css.transform = 'translateX(12px) '
                        break
                    case 'scale-up-in':
                        if(!blockedTransition?.includes('scale-up-in')) css.transform = 'scale(.95) '
                        break
                    case 'scale-down-in':
                        if(!blockedTransition?.includes('scale-down-in')) css.transform = 'scale(1.05) '
                        break
                }
            }
            if (transition === undefined) return undefined
            let result: CSSProperties = {}
            if (typeof transition === 'string') {
                matchTransition(transition, result)
                return result
            }
            else {
                transition.forEach(transition => {
                    matchTransition(transition, result)
                })
                return result
            }
        }
        return {
            animationName: getName(_animationProps.transition) ?? 'fade-in',
            animationDuration: `${_animationProps.duration ?? 500}ms`,
            animationDelay: `${_animationProps.delay ?? 0}ms`,
            animationTimingFunction: getTimingFunction(_animationProps.easing) ?? 'cubic-bezier(0, 0.8, 0.2, 1)',
            animationFillMode: 'forwards',
            ...getInitialState(_animationProps.transition)
        }
    }

    if(animationProps === false || animationProps === undefined) return undefined
    else if(animationProps === true) {
        if (defaultAnimationProps) return serialize(defaultAnimationProps)
        else return {animation: '.5s cubic-bezier(0,.8,.2,1) 0s fade-in'}
    }
    else return serialize(Object.assign({...defaultAnimationProps}, animationProps))
}