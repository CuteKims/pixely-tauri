import { SubpageMap } from '../../../types/consts'
import Sidemenu from '../sidemenu'
import styles from './page.module.css'

export const Page: React.FC<{children?: React.ReactNode, fullScreen?: boolean, sidemenuMap?: SubpageMap}> = ({children, fullScreen, sidemenuMap}) => {
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
                        {sidemenuMap ? (
                            <Sidemenu subpagesMap={sidemenuMap}/>
                        ) : null}
                        <div style={{height: '100%', width: '100%'}}>
                            {children}
                        </div>
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