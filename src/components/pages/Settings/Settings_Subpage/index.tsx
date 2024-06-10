import { ScrollBox } from '../../../hocs/ScrollBox'
import { Subpage } from '../../../ui/page'
import styles from './Settings_Subpage.module.css'

const SettingsPage: React.FC = () => {
    const array = [3,1,4,1,5,9,2,6,5,3,5]
    return (
        <ScrollBox>
            <Subpage>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1px'}}>
                    {array.map(() => (<div className={styles['setting-component']} />))}
                </div>
            </Subpage>
        </ScrollBox>
    )
}

export default SettingsPage