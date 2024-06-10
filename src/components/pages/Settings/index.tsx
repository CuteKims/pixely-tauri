//Context
import { pageStackContext } from '../../App/contextWrapper/page_stack'
//Shared components
import { Page } from '../../ui/page'
//Private objects
import SUBPAGES_MAP_SETTINGS from './consts'
import { Suspense, useContext } from 'react'

const Settings: React.FC = () => {
    const pageStackContextValue = useContext(pageStackContext)!
    let subpageKey = pageStackContextValue.getLastSubpage()?.pageKey ?? 'settings.user'
    let SubpageComponent = SUBPAGES_MAP_SETTINGS.map[subpageKey].component;
    return (
        <Page sidemenuMap={SUBPAGES_MAP_SETTINGS}>
            <Suspense>
                <SubpageComponent />
            </Suspense>
        </Page>
    )
}

export default Settings;