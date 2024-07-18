import styles from './Spinner.module.css'

export const CircularProgress: React.FC<{size?: number, color?: string, value?: number}> = (props) => {
    let size = props.size ?? 36

    let spinnerSize = size / 1.414
    let spinnerMargin = ((size / 36)) * 5.5
    let dotSize = (size / 36) * 3.6
    
    return (
        <div className={styles['container']} style={{height: size, width: size}}>
            {(() => {
                if (props.value === undefined) {
                    return (
                        <div className={styles['spinner']} style={{height: spinnerSize, width: spinnerSize, margin: spinnerMargin}}>
                            {[0,1,2,3,4].map(index => {
                                // let dotRef = useRef<HTMLDivElement>(null)
                                // let currentAngle = 0
                                // useEffect(() => {
                                //     if(props.value !== undefined && dotRef.current) {
                                //         let matrix = window.getComputedStyle(dotRef.current).transform
                                //         if (matrix !== 'none') {
                                //             const values = matrix.split('(')[1].split(')')[0].split(',') as unknown as number[];
                                //             const a = values[0];
                                //             const b = values[1];
                                //             currentAngle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
                                //         }
                                //         let targetAngle = (() => {
                                //             if (currentAngle < 45) return -315
                                //             else if (currentAngle > 405) return 405
                                //             else return 45
                                //         })()
                                //         let endAnimation = `
                                //             @keyframes endSpin-${index} {
                                //                 from {
                                //                     opacity: 1;
                                //                     transform: rotate(${currentAngle}deg);
                                //                 }
                                //                 to {
                                //                     opacity: 0;
                                //                     transform: rotate(${targetAngle}deg);
                                //                 }
                                //             }
                                //         `
                                //         document.styleSheets[0].insertRule(endAnimation, document.styleSheets[0].cssRules.length)
                                //         dotRef.current.style.animation = `endSpin-${index} 1s`
                                //         dotRef.current.style.animationDelay = '0ms'
                                //     } else if (dotRef.current) {
                                //         dotRef.current.style.animation = `orbit 5s infinite`
                                //         dotRef.current.style.animationDelay = `${index * 240}ms`
                                //     }
                                // }, [props.value ? true : false])
                                return (
                                    // <div className={styles['dot-container']} style={{height: spinnerSize, width: spinnerSize}} ref={dotRef}>
                                    <div className={styles['dot-container']} style={{height: spinnerSize, width: spinnerSize}} key={index}>
                                        <div className={styles['dot']} style={{height: dotSize, width: dotSize, borderRadius: dotSize, backgroundColor: props.color}}/>
                                    </div>
                                )
                            })}
                        </div>
                    )
                }
            })()}
            {(() => {
                if (props.value !== undefined) {
                    let circumference = Math.PI * (size - spinnerMargin)
                    let dashoffset = circumference - ((props.value / 100) * circumference);
                    return (
                        <div className={styles['progress']}>
                            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', color: props.color ?? 'var(--global-text-color)'}}>
                                <circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={size / 2 - (spinnerMargin / 2)}
                                    stroke='currentColor'
                                    opacity={.25}
                                    strokeWidth={dotSize}
                                    fill="none"
                                    style={{opacity: 0.2}}
                                />
                                <circle
                                    cx={size / 2}
                                    cy={size / 2}
                                    r={size / 2 - (spinnerMargin / 2)}
                                    stroke='currentColor'
                                    strokeWidth={dotSize}
                                    fill="none"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={dashoffset}
                                    style={{ transition: 'stroke-dashoffset 0.5s cubic-bezier(0,.8,.2,1)' }}
                                />
                            </svg>
                        </div>
                    )
                }
            })()}
        </div>
    )
}