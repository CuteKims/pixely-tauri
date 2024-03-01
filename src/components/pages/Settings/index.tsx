//Context
import { pageStackContext } from '../../App/contextWrapper/page_stack'
//Shared components
import { PageContainer } from '../../shared/page'
import Sidemenu from '../../shared/sidemenu'
//Private objects
import SUBPAGES_MAP_SETTINGS from './consts'
import { Suspense, useContext } from 'react'

const Settings: React.FC = () => {
    const pageStackContextValue = useContext(pageStackContext)!
    let subpageKey = pageStackContextValue.getLastSubpage()?.pageKey ?? 'settings.user'
    let SubpageComponent = SUBPAGES_MAP_SETTINGS.map[subpageKey].component;
    return (
        <PageContainer>
            <Sidemenu subpagesMap={SUBPAGES_MAP_SETTINGS}/>
            <Suspense>
                <SubpageComponent />
            </Suspense>
        </PageContainer>
    )
}

export default Settings;