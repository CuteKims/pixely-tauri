import styles from './list.module.css'

export const StackList: React.FC<{children?: React.ReactNode, gap?: number, header?: string}> = (props) => {
    return (
        <div className={styles['stack-list-container']}>
            {(() => {
                if (props.header !== undefined) {
                    return (
                        <p>{props.header}</p>
                    )
                }
            })()}
            <div className={styles['stack-list']} style={{gap: props.gap != undefined ? props.gap + 'px' : '4px'}}>
                {props.children}
            </div>
        </div>
    )
}

export const GridList: React.FC<{children?: React.ReactNode}> = (props) => {
    return (
        <div className={styles['grid-list']}>
            {props.children}
        </div>
    )
}