import { Page } from '../../ui/page/Page'
import React from 'react'
import { Outlet } from 'react-router'
import { Sidebar } from '../../ui/inputs/sidebar/Sidebar'
import { plazaRoutes } from './routes'

const Plaza: React.FC = () => {
    return (
        <Page style={{display: 'flex', height: '100%'}}>
            <Sidebar routes={plazaRoutes}/>
            <Outlet />
        </Page>
    )
}

export const FallbackComponent: React.FC = () => {
    return (
        <p style={{width: '100%', textAlign: 'center', fontSize: '16px', marginTop: 32}}>Loading</p>
    )
}

export default Plaza;