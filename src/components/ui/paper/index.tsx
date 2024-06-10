import styles from './paper.module.css'

const Paper: React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <div className={styles.paper}>
            {children}
        </div>
    )
}

export default Paper