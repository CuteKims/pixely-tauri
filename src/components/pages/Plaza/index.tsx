//Context
import { Suspense, useContext } from 'react'
import { pageStackContext } from '../../App/contextWrapper/page_stack'
//Shared components
import { Page } from '../../ui/page'
import Sidemenu from '../../ui/sidemenu'
//Private objects
import SUBPAGES_MAP_PLAZA from './consts'
import React from 'react'

const Plaza: React.FC = () => {
    let pageStackContextValue = useContext(pageStackContext)!
    let subpageKey = pageStackContextValue.getLastSubpage()?.pageKey ?? 'plaza.version_manifest'
    let SubpageComponent = SUBPAGES_MAP_PLAZA.map[subpageKey].component;
    return (
        <Page sidemenuMap={SUBPAGES_MAP_PLAZA}>
            <Suspense>
                <SubpageComponent />
            </Suspense>
        </Page>
    )
}

export const FallbackComponent: React.FC = () => {
    return (
        <p style={{width: '100%', textAlign: 'center', fontSize: '16px', marginTop: 32}}>Loading</p>
    )
}

export default Plaza;