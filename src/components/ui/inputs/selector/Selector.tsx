import { createRef, CSSProperties, useState } from 'react'
import { RipplePool, useRippleEffect } from '../../utils/ripple/Ripple'
import styles from './Selector.module.css'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

type SelectorItem = {value: any, node: React.ReactNode}

const Selector: React.FC<{items: SelectorItem[], value: '' | any, onChange?: (value: string | number) => void}> = ({items, value, onChange}) => {
    let selectorRef = createRef<HTMLDivElement>()
    let dropdownRef = createRef<HTMLDivElement>()
    const [dropdown, setDropdown] = useState<CSSProperties | undefined>(undefined)
    const clickHandler = () => {
        setDropdown(dropdown => {
            if(dropdown == null) {
                let result: CSSProperties = {}
                let DOMRect = selectorRef.current!.getBoundingClientRect()
                let verticalDirection = DOMRect.top + DOMRect.height / 2 > document.documentElement.clientHeight / 2 ? 'top' : 'bottom'
                let horizontalDirection = DOMRect.left + DOMRect.width / 2 > document.documentElement.clientWidth / 2 ? 'left' : 'right'

                if(verticalDirection === 'top') result.bottom = `${document.documentElement.clientHeight - DOMRect.top}px`
                else result.top = `${DOMRect.bottom}px`

                if(horizontalDirection === 'left') result.right = `${document.documentElement.clientWidth - DOMRect.right}px`
                else result.left = `${DOMRect.left}px`

                result.width = `${DOMRect.width}px`
                
                return result
            }
            else return undefined
        })
    }
    let ripplePoolRef = createRef<HTMLDivElement>()
    const {rippleEffect, createRipple, destroyRipple} = useRippleEffect(ripplePoolRef)
    return (
        <>
            <div ref={selectorRef} className={styles['selector']} onMouseDown={createRipple} onMouseUp={destroyRipple} onMouseLeave={destroyRipple} onClick={clickHandler}>
                <RipplePool ref={ripplePoolRef} rippleEffect={rippleEffect} rippleColor='var(--reverse-color-10)'/>
                {value === '' ? null : <p>{items.find(item => item.value === value)?.node}</p>}
                <div className={styles['selector__arrow']}>
                    <Arrow />
                </div>
            </div>
            {createPortal((
                <CSSTransition in={dropdown !== undefined} nodeRef={dropdownRef} timeout={500} classNames={{enter: ''}} unmountOnExit>
                    <div className={styles['dropdown']} ref={dropdownRef} style={dropdown}>
                        {items.map(item => <p key={item.value}>{item.node}</p>)}
                    </div>
                </CSSTransition>
            ), document.getElementById('modal-container')!)}
        </>
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