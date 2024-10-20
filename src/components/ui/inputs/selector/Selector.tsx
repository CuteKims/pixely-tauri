import { CSSProperties, RefObject, useEffect, useRef, useState } from 'react'
import { RipplePool, useRippleEffect } from '../../utils/ripple/Ripple'
import styles from './Selector.module.css'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import Button from '../button/Button'

type SelectorSelection = {value: any, node: React.ReactNode}

const Selector: React.FC<{
    selections: SelectorSelection[],
    selectValue: '' | any,
    onChange?: (newValue: any) => void
}> = ({selections, selectValue, onChange}) => {
    let selectorRef = useRef<HTMLDivElement>(null)
    const [dropdown, setDropdown] = useState<{style: CSSProperties, in: boolean, direction: 'upward' | 'downward'}>({style: {}, in: false, direction: 'downward'})
    const clickHandler = () => {
        setDropdown(dropdown => {
            if(!dropdown.in) {
                let result: CSSProperties = {}
                let DOMRect = selectorRef.current!.getBoundingClientRect()
                let verticalDirection = DOMRect.top + DOMRect.height / 2 > document.documentElement.clientHeight / 2 ? 'top' : 'bottom'
                let horizontalDirection = DOMRect.left + DOMRect.width / 2 > document.documentElement.clientWidth / 2 ? 'left' : 'right'

                if(verticalDirection === 'top') result.bottom = `${document.documentElement.clientHeight - DOMRect.top + 8}px`
                else result.top = `${DOMRect.bottom + 8}px`

                if(horizontalDirection === 'left') result.right = `${document.documentElement.clientWidth - DOMRect.right}px`
                else result.left = `${DOMRect.left}px`

                result.minWidth = `${DOMRect.width}px`
                
                return {style: result, in: true, direction: verticalDirection === 'top' ? 'upward' : 'downward'}
            }
            else return {...dropdown, in: false}
        })
    }

    const blurHandler = () => {
        setDropdown(dropdown => ({...dropdown, in: false}))
    }
    let ripplePoolRef = useRef<HTMLDivElement>(null)
    const {rippleEffect, createRipple, destroyRipple} = useRippleEffect(ripplePoolRef)
    return (
        <>
            <div ref={selectorRef} className={styles['selector']} onMouseDown={createRipple} onMouseUp={destroyRipple} onMouseLeave={destroyRipple} onClick={clickHandler}>
                <RipplePool ref={ripplePoolRef} rippleEffect={rippleEffect} rippleColor='var(--reverse-color-10)'/>
                {selectValue === '' ? null : <p>{selections.find(selection => selection.value === selectValue)?.node}</p>}
                <div className={`${styles['selector__arrow']} ${dropdown.in ? styles['selector__arrow--in'] : ''}`}>
                    <Arrow />
                </div>
            </div>
            {createPortal((
                <Dropdown selectorRef={selectorRef} dropdown={dropdown} selections={selections} selectValue={selectValue} onChange={onChange} onBlur={blurHandler}/>
            ), document.getElementById('modal-container')!)}
        </>
    )
}

const Dropdown: React.FC<{
    selectorRef: RefObject<HTMLDivElement>,
    dropdown: {style: CSSProperties, in: boolean, direction: 'upward' | 'downward'},
    selections: SelectorSelection[],
    selectValue: string,
    onChange?: (newValue: any) => void,
    onBlur: () => void
}> = ({selectorRef, dropdown, selections, selectValue, onChange: change, onBlur: blur}) => {
    let dropdownRef = useRef<HTMLDivElement>(null)
    const mouseDownHandler: (event: MouseEvent) => void = (event) => {
        try {
            let selectorDOMRect = selectorRef.current!.getBoundingClientRect()
            let dropdownDOMRect = dropdownRef.current!.getBoundingClientRect()
            if(
                (
                    event.clientX < selectorDOMRect.right &&
                    event.clientX > selectorDOMRect.left &&
                    event.clientY < selectorDOMRect.bottom &&
                    event.clientY > selectorDOMRect.top
                ) || (
                    event.clientX < dropdownDOMRect.right &&
                    event.clientX > dropdownDOMRect.left &&
                    event.clientY < dropdownDOMRect.bottom &&
                    event.clientY > dropdownDOMRect.top
                )
            ) {
                return
            }
            else {
                blur()
            }
        }
        catch {
            blur()
        }
    }
    useEffect(() => {
        if(dropdown.in) {
            document.addEventListener('wheel', blur)
            document.addEventListener('mousedown', mouseDownHandler, true)
            return () => {
                document.removeEventListener('wheel', blur)
                document.removeEventListener('mousedown', mouseDownHandler, true)
            }
        }
    }, [dropdown.in])
    return (
        <>
            <CSSTransition
                in={dropdown.in}
                nodeRef={dropdownRef}
                timeout={500}
                classNames={{
                    enter: dropdown.direction === 'upward' ? styles['dropdown--enter--upward'] : styles['dropdown--enter--downward'],
                    enterActive: styles['dropdown--enter-active'],
                    exit: styles['dropdown--exit'],
                    exitActive: dropdown.direction === 'upward' ? styles['dropdown--exit-active--upward'] : styles['dropdown--exit-active--downward']
                }}
                unmountOnExit
            >
                <div className={styles['dropdown']} ref={dropdownRef} style={dropdown.style}>
                    {selections.map(selection => (
                        <div className={styles['dropdown__button-container']}>
                            <Button
                                onClick={selection.value === selectValue ? blur : () => {
                                    if (change) change(selection.value)   
                                    blur()
                                }}
                                style={{backgroundColor: selection.value === selectValue ? 'var(--reverse-color-10)' : 'transparent', outline: 'none'}}
                            >
                                {selection.node}
                            </Button>
                        </div>
                    ))}
                </div>
            </CSSTransition>
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