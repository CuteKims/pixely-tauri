import styles from './page.module.css'

export const PageContainer: React.FC<{children?: React.ReactNode, fullScreen?: boolean}> = ({children, fullScreen}) => {
    return (
        <div id={styles['page-container']}>
            {fullScreen ? (
                <>
                    {children}
                </>
            ) : (
                <>
                    <div id={styles['page-background']} />
                    <div id={styles['page-foreground']}>
                        {children}
                    </div>
                </>
            )}
        </div>
    )
}

export const Subpage: React.FC<{children?: React.ReactNode, style?: React.CSSProperties}> = ({children, style}) => {
    return (
        <div id={styles['subpage']} style={style}>
            {children}
        </div>
    )
}