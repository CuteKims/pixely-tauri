import { AnimatePresence, motion } from "framer-motion"
import { useMemo, useRef, useState } from "react"

const ControlsToggler: React.FC<{target: string}> = ({target}) => {
    const [isOn, setIsOn] = useState(false)
    const [pos, setPos] = useState(0)
    const [isHover, setIsHover] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const getAnimate = () => {
        let x = 0
        if(pos < 0) x = 0
        else if(pos > 16) x = 16
        else x = pos
        let boxShadow = '0px 0px 6px rgba(0,0,0,.16), 0 0 0 0px rgba(255,255,255,.2)'
        if(isClicked) boxShadow = '0px 0px 6px rgba(0,0,0,.16), 0 0 0 6px rgba(255,255,255,.4)'
        else if(isHover) boxShadow = '0px 0px 6px rgba(0,0,0,.16), 0 0 0 6px rgba(255,255,255,.2)'
        return {x: x, boxShadow: boxShadow}
    }
    return (
        <>
            <motion.div
            style={{height: '16px', width: '32px', justifyContent: 'flex-end', marginLeft: 'auto', marginRight: '24px'}}
            animate={{backgroundColor: 'rgba(0,0,0,.2)'}}
            onHoverStart={() => setIsHover(true)}
            onHoverEnd={() => setIsHover(false)}
            onTapStart={() => setIsClicked(true)}
            onTapCancel={() => setIsClicked(false)}
            onClick={() => {
                setIsClicked(false)
                if(isOn) {setIsOn(false);setPos(0)}
                else {setIsOn(true);setPos(16)}
            }}
            onPan={(event, info) => {
                let offset = info.offset.x
                if(isOn) setPos(16 + offset)
                else setPos(offset)
            }}
            onPanEnd={() => {
                if(pos <= 8) {setIsOn(false);setPos(0)}
                else {setIsOn(true);setPos(16)}
            }}
            transition={{ease: [0,0,0,1], duration: .3}}>
                <div style={{height: '16px', width: '32px', boxShadow: 'inset 0px 3px 6px rgba(0,0,0,.16)'}}/>
                <motion.div
                style={{backgroundColor: 'rgba(255,255,255,.75)', height: '16px', boxShadow: '0px 0px 6px rgba(0,0,0,.16)', position: 'relative', top: '-16px'}}
                animate={{width: getAnimate().x}}
                transition={{ease: [0,0,0,1], duration: .15}}/>
                <motion.div
                style={{width: '16px', height: '16px', backgroundColor: 'white', position: 'relative', top: '-32px'}}
                
                animate={getAnimate()}
                transition={{ease: [0,0,0,1], duration: .15}}
                />
            </motion.div>
        </>
    )
}
const ControlsSlider: React.FC<{target: string, range: number[]}> = ({target, range}) => {
    const [value, setValue] = useState([0, range[0]])
    const [isClicked, setIsClicked] = useState(false)

    const [isHover, setIsHover] = useState(false)

    const sliderRef = useRef<HTMLDivElement>(null)
    const sliderPos = sliderRef.current?.getBoundingClientRect().left
    const k = (range[1] - range[0]) / 240
    const handleSlide = (event: MouseEvent | PointerEvent) => {
        let targetPos = event.clientX - sliderPos - 8
        let targetValue = Math.round(k * targetPos + range[0])
        let fixedTargetPos = (targetValue - range[0]) / k
        if(targetPos > 0 && targetPos < 240) setValue([fixedTargetPos, targetValue])
        else if(targetPos >= 240) setValue([240, range[1]])
        else if(targetPos <= 0) setValue([0, range[0]])
    }
    return (
        <>
            <motion.div
            ref={sliderRef}
            style={{height: '16px', width: '256px', backgroundColor: 'rgba(0,0,0,.2)', marginLeft: 'auto', justifyContent: 'flex-end', marginRight: '24px'}}
            onClick={() => {
                setIsClicked(false)
                setValue(value => [Math.round((value[1] - range[0]) / k), value[1]])
            }}
            onTapStart={(event, info) => {
                setIsClicked(true)
                handleSlide(event)
            }}
            onPan={(event, info) => handleSlide(event)}
            onPanEnd={() => setIsClicked(false)}>
                <div style={{height: '16px', width: '256px', boxShadow: 'inset 0px 3px 6px rgba(0,0,0,.16)'}}>
                <motion.div
                style={{backgroundColor: 'rgba(255,255,255,.75)', height: '16px', boxShadow: '0px 0px 6px rgba(0,0,0,.16)'}}
                initial={{width: value[0]}}
                animate={{width: value[0]}}
                transition={{ease: [0,.8,.2,1], duration: .15}} />
                    <motion.div
                    style={{position: 'relative', top: '-16px', height: '16px', width: '16px', backgroundColor: 'white'}}
                    animate={{x: value[0], scale: 1, boxShadow: isClicked ? '0px 0px 6px rgba(0,0,0,.16), 0 0 0 10px rgba(255,255,255,.4)' : isHover ? '0px 0px 6px rgba(0,0,0,.16), 0 0 0 6px rgba(255,255,255,.4)' : '0px 0px 6px rgba(0,0,0,.16), 0 0 0 0px rgba(255,255,255,.4)'}}
                    onHoverStart={() => setIsHover(true)}
                    onHoverEnd={() => setIsHover(false)}
                    transition={{ease: [0,.8,.2,1], duration: .15}} />
                </div>
                <AnimatePresence>
                    {isClicked || isHover ? 
                    <>
                        <motion.p
                        style={{position: 'relative', top: '-64px', backgroundColor: 'white', pointerEvents: 'none', transformOrigin: 'bottom left', boxShadow: '0px 0px 6px rgba(0,0,0,.16)', fontSize: '13px', padding: '2px 6px 2px 6px', margin: 'none', display: 'inline-block'}}
                        initial={{x: value[0] + 20, y: 4, opacity: 0, scale: .5}}
                        animate={{x: isClicked ? value[0] + 30 : value[0] + 26, y: isClicked ? -4 : 0, opacity: 1, scale: isClicked ? 1.1 : 1}}
                        exit={{x: value[0] + 20, y: 4, opacity: 0, scale: .5}}
                        transition={{ease: [0,0,0,1], duration: .3}}>
                            {value[1]}
                        </motion.p>
                    </>
                    : null}
                </AnimatePresence>
            </motion.div>
        </>
    )
}
const ControlsSelector: React.FC<{target: string, options: string[]}> = ({target, options}) => {
    const [isOpen, setOpen] = useState(false)
    const [selection, setSelection] = useState(0)
    const [cursorPos, setCursorPos] = useState(0)
    const [isTop, setTop] = useState(false)
    return (
        <>
            <motion.div
            tabIndex={0}
            style={{width: '160px', overflow: 'hidden', position: 'absolute', top: 16, right: 16, zIndex: isTop ? 100 : 0}}
            initial={{height: '32px'}}
            animate={{height: isOpen ? options.length * 32 + 8 : 32, y: isOpen ? selection * -32 - 4 : 0, backgroundColor: isOpen ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,.5)', boxShadow: isOpen ? '0px 3px 6px rgba(0,0,0,.16)' : '0px 0px 0px rgba(0,0,0,0)'}}
            whileHover={{backgroundColor: isOpen ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,.8)'}}
            onClick={() => {if(!isOpen) {setOpen(true); setTop(true)}}}
            onBlur={() => setOpen(false)}
            onAnimationComplete={() => {if(!isOpen) setTop(false)}}
            transition={{ease: [0,.8,.2,1], duration: .3}}>
                <motion.div
                animate={{y: isOpen ? 4 : selection * -32}}
                transition={{ease: [0,.8,.2,1], duration: .3}}>
                    <motion.div
                    style={{height: '32px', width: '160px', pointerEvents: 'none'}}
                    animate={{backgroundColor: isOpen ? 'rgba(240,240,240,1)' : 'rgba(240,240,240,0)', y: isOpen ? cursorPos * 32 : selection * 32}}
                    transition={{ease: [0,.85,.15,1], duration: .16}}/>
                    {options.map((option, index) => {
                        return (
                            <motion.div
                            style={{height: '32px', width: '160px', margin: '0px', position: 'relative', top: '-32px'}}
                            onClick={isOpen ? () => {setSelection(index); setOpen(false)} : () => {null}}
                            animate={{backgroundColor: isOpen ? index === selection ? 'rgba(225,225,225,1)' : 'rgba(225,225,225,0)' : 'rgba(225,225,225,0)'}}
                            onHoverStart={() => {
                                setCursorPos(index)
                            }}
                            transition={{ease: [0,0,0,1], duration: .3}}>
                                <motion.p
                                style={{padding: '5px 0px 0px 8px', margin: '0px', fontSize: '14px', color: '#323232'}}>
                                    {option}
                                </motion.p>
                            </motion.div>
                        )
                    })}
                    
                    <motion.svg xmlns="http://www.w3.org/2000/svg" width="8" height="4" viewBox="0 0 8 4"
                    style={{position: 'relative', top: (options.length + 1) * -32 + 14 + 'px', right: '10px', float: 'right', transformOrigin: 'center'}}
                    animate={{rotate: isOpen ? 90 : 0, y: isOpen ? cursorPos * 32 : selection * 32}}
                    transition={{ease: [0,.85,.15,1], duration: .16}}>
                        <path d="M4,0,8,4H0Z" transform="translate(8 4) rotate(180)" fill='#323232'/>
                    </motion.svg>

                </motion.div>
            </motion.div>
        </>
    )
}
const ControlsExtras: React.FC = (props: any) => {
    switch(props.type) {
        default: return <></>
        case 'toggler': return <ControlsToggler target={props.target}/>
        case 'slider': return <ControlsSlider target={props.target} range={props.range}/>
        case 'selector': return <ControlsSelector target={props.target} options={props.options} />
        case 'information': return <p style={{margin: '0px 24px 0px 0px', fontSize: '15px', color: 'rgba(50,50,50,.6)', marginLeft: 'auto', justifyContent: 'flex-end'}}>{props.info}</p>
        case 'forward': 
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="7.5" height="12" viewBox="0 0 7.5 12" style={{justifyContent: 'flex-end', marginLeft: 'auto', marginRight: '24px'}}>
                    <path d="M0,10.5,4.5,6,0,1.5,1.5,0l6,6L6,7.5,1.5,12Z" fill="#323232"/>
                </svg>
            )
    }
}

export const Controls: React.FC<types.ControlsPropsWithRequired> = ({ type, description, target, range, options, info }) => {
    const componentRef = useRef<HTMLDivElement>(null)
    const pos = useMemo(() => {
        return componentRef.current?.getBoundingClientRect().top
    }, [1])
    return (
        <>
            <motion.div
            ref={componentRef}
            style={{position: 'relative', width: '100%', marginBottom: '10px', display: 'flex', alignItems: 'center'}}
            animate={{backgroundColor: 'rgba(255,255,255,.5)'}}
            transition={{ease: [0,0,0,1], duration: .2}}
            whileHover={type === 'forward' ? {backgroundColor: 'rgba(255,255,255,.8)'} : {}}>
                <div id="text-box">
                    <p style={{color: 'rgba(32,32,32,1)', margin: '0px', padding: description.sub ? '13px 16px 0px 14px' : '22px 16px 21px 14px', fontSize: '15px'}}>{description.main}</p>
                    {description.sub ? (
                        <p style={{color: 'rgba(32,32,32,.6)', margin: '0px', padding: '0px 16px 11px 14px', fontSize: '13px'}}>{description.sub}</p>
                    ) : null}
                </div>
                <ControlsExtras type={type} target={target} range={range} options={options} info={info}/> {/*WE HAVE A BUG ON PROPERTY TYPES - TO BE FIXED*/}
            </motion.div>
        </>
    )
}