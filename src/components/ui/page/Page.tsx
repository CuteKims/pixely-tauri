import { CSSProperties } from 'react'
import styles from './Page.module.css'
import { ScrollBox } from '../utils/scrollBox/ScrollBox'

export const Page: React.FC<{children?: React.ReactNode, fullScreen?: boolean, style?: CSSProperties}> = ({children, fullScreen, style}) => {
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
                        <div style={style}>
                            {children}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export const SubpageBase: React.FC<{children?: React.ReactNode, style?: React.CSSProperties}> = ({children, style}) => {
    return (
        <div id={styles['subpage']} style={style}>
            {children}
        </div>
    )
}

export const Subpage: React.FC<{children?: React.ReactNode, gap?: string}> = (props) => {
    return (
        <SubpageBase>
            <ScrollBox contentContainerStyle={{display: 'flex', flexDirection: 'column', gap: props.gap ?? '18px', padding: '40px'}}>
                {props.children}
            </ScrollBox>
        </SubpageBase>
    )
}