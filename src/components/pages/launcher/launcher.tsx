import styles from './launcher.module.css'

const Launcher: React.FC = () => {
    return (
        <>
            <div id={styles.drawer}>
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
            <div className={styles.tile}>
            </div>
        </>
    )
}

export default Launcher;