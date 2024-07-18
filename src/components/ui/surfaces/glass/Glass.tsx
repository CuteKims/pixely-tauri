import styles from './Glass.module.css'

export type GlassProps = {
    children?: React.ReactNode,
    sx?: React.CSSProperties,
}

const Glass: React.FC<GlassProps> = (props) => {
    return (
        <div className={styles.glass} style={props.sx}>
            {props.children}
        </div>
    )
}

export default Glass