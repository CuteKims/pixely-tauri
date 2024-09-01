import { Outlet, useLocation, useOutlet } from 'react-router';
import { Page } from '../../ui/page/Page'
import { Sidebar } from '../../ui/inputs/sidebar/Sidebar';
import { settingsRoutes } from './routes';
import { TransitionGroup } from 'react-transition-group';
import React, { useState } from 'react';
import AnimatedOutlet from '../../utils/AnimatedOutlet';



const Settings: React.FC = () => {
    let outlet = useOutlet()
    let location = useLocation()
    return (
        <Page routes={settingsRoutes}>
            <AnimatedOutlet />
        </Page>
    )
}

export default Settings;