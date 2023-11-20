import styles from './settings.module.css'

const Settings: React.FC = () => {
    return (
        <>
            <div id={styles.background}>
                <div id={styles.sidemenu}>
                    <SidemenuButton />
                    <SidemenuButton />
                    <SidemenuButton />
                    <SidemenuButton />
                    <SidemenuButton />
                </div>
                <div id={styles['page-container']}>
                    <Page />
                </div>
            </div>
        </>
    )
}

const SidemenuButton: React.FC = () => {
    return (
        <>
            <div className={styles['sidemenu-button']}>
                <p>用户账户</p>
            </div>
        </>
    )
}

const Page: React.FC = () => {
    return (
        <div className={styles.page}>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
            <div className={styles['setting-component']}>
            </div>
        </div>
    )
}

export default Settings;