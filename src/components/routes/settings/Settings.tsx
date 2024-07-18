import { Outlet } from 'react-router';
import { Page } from '../../ui/page/Page'
import { Sidebar } from '../../ui/inputs/sidebar/Sidebar';
import { settingsRoutes } from './routes';

const Settings: React.FC = () => {
    return (
        <Page style={{display: 'flex', height: '100%'}}>
            <Sidebar routes={settingsRoutes}/>
            <Outlet />
        </Page>
    )
}

export default Settings;