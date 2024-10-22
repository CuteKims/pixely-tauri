import { CSSProperties, RefObject, useRef, useState } from 'react'
import RippleWrapper from '../../utils/ripple/Ripple'

import styles from './ImagePresenter.module.css'
import { createPortal } from "react-dom"
import { Transition, TransitionStatus } from 'react-transition-group'

const ImagePresenter: React.FC<{
    src?: string,
    height?: string | number,
    width?: string | number,
}> = ({src, height, width}) => {
    let imageRef = useRef<HTMLImageElement>(null)
    const [inProp, setInProp] = useState<boolean>(false)
    function handleClick() {
        setInProp(inProp => !inProp)
    }
    function handleBlur() {
        setInProp(false)
    }
    return (
        <>
            <RippleWrapper rippleColor='rgba(255, 255, 255, .2)' onClick={handleClick}>
                <img className={styles['image-presenter__image']} style={{height, width}} src={src} ref={imageRef}/>
            </RippleWrapper>
            {createPortal((
                <FullScreenImagePresenter in={inProp} src={src} imageRef={imageRef} onBlur={handleBlur}/>
            ), document.getElementById('modal-container')!)}
        </>
    )
}

function fullScreenImageTransitionStyles(imageRef: RefObject<HTMLImageElement>, state: TransitionStatus): CSSProperties {
    if(state == 'exiting' || state == 'exited') {
        let transform = ''
        let rect = imageRef.current!.getBoundingClientRect()
        let naturalWidthHeightRatio = imageRef.current!.naturalWidth / imageRef.current!.naturalHeight
        let clipedWidthHeightRatio = imageRef.current!.width / imageRef.current!.height
        if(Math.abs(clipedWidthHeightRatio - naturalWidthHeightRatio) < 0.01) transform += `
            translateX(${rect.left - (document.documentElement.clientWidth - rect.width) / 2}px)
            translateY(${rect.top - 36 - Math.max(0, (document.documentElement.clientHeight - 36 - document.documentElement.clientWidth / naturalWidthHeightRatio) / 2, (document.documentElement.clientHeight - 36 - imageRef.current!.naturalHeight) / 2)}px)
            scale(${rect.height / Math.min(document.documentElement.clientHeight - 36, document.documentElement.clientWidth / naturalWidthHeightRatio, imageRef.current!.naturalHeight)})
        `
        else if(clipedWidthHeightRatio > naturalWidthHeightRatio) transform += `
            translateX(${rect.left - (document.documentElement.clientWidth - rect.width) / 2}px)
            translateY(${rect.top - 36 - (rect.width / naturalWidthHeightRatio - rect.height) / 2 - Math.max(0, (document.documentElement.clientHeight - 36 - document.documentElement.clientWidth / naturalWidthHeightRatio) / 2)}px)
            scale(${rect.width / Math.min(document.documentElement.clientWidth, (document.documentElement.clientHeight - 36) * naturalWidthHeightRatio)})
        `
        else transform += `
            translateX(${rect.left - (document.documentElement.clientWidth - rect.width) / 2}px)
            translateY(${rect.top - 36 - Math.max(0, (document.documentElement.clientHeight - 36 - document.documentElement.clientWidth / naturalWidthHeightRatio) / 2)}px)
            scale(${rect.height / Math.min(document.documentElement.clientHeight - 36, document.documentElement.clientWidth / naturalWidthHeightRatio)})
        `
        return {transform}
    }
    else return {
        transform: 'none'
    }
}

const fullScreenImageContainerTransitionStyles: {[key in TransitionStatus]?: CSSProperties} = {
    'entering': {opacity: 1},
    'entered': {opacity: 1},
    'exiting': {opacity: 0, pointerEvents: 'none'},
    'exited': {opacity: 0, pointerEvents: 'none'}
}

const FullScreenImagePresenter: React.FC<{
    imageRef: RefObject<HTMLImageElement>,
    src?: string,
    in: boolean,
    onBlur: () => void
}> = ({imageRef, src, in: inProp, onBlur: blur}) => {
    let imageContainerRef = useRef<HTMLDivElement>(null)
    function handleClick() {
        blur()
    }
    return (
        <Transition
            in={inProp}
            timeout={500}
            nodeRef={imageContainerRef}
            unmountOnExit
        >
            {state =>  (
                <div
                    ref={imageContainerRef}
                    style={{transition: '.2s', ...fullScreenImageContainerTransitionStyles[state]}}
                    className={styles['image-presenter__full-screen-image-container']}
                    onClick={handleClick}
                >
                    <img
                        className={styles['image-presenter__full-screen-image-container__drag-container__image']}
                        style={{maxHeight: `min(100%, ${imageRef.current!.naturalHeight}px)`, maxWidth: `min(100%, ${imageRef.current!.naturalWidth}px)`, ...fullScreenImageTransitionStyles(imageRef, state)}}
                        src={src}
                    />
                </div>
            )}
        </Transition>
    )
}

export default ImagePresenter