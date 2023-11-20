import styles from './launcher.module.css'

const Launcher: React.FC = () => {
    return (
        <>
            <div id={styles.drawer} style={{}}>
                <div id={styles['tile-container']}>
                    <Tile />
                    <Tile />
                    <Tile />
                </div>
            </div>
        </>
    )
}

const Tile: React.FC<{}> = () => {
    return (
        <>
            <div className={styles['tile-wrapper']}>
                <div className={styles['tile-layer1']}>
                    
                </div>
                <div className={styles['tile-layer2']}>

                </div>
            </div>
        </>
    )
}

export default Launcher;