import { RouteObject, useLocation, useNavigate } from 'react-router'
import styles from './Sidebar.module.css'
import { useTranslation } from 'react-i18next'

export const SidebarButton: React.FC<{text: string, selected?: boolean, callback: () => void}> = (props) => {
    return (
        <div className={props.selected ? styles['sidebar-button-selected'] : styles['sidebar-button']} onClick={props.callback}>
            <p>{props.text}</p>
        </div>
    )
}

export const SidebarBase: React.FC<{propsArray: {text: string, selected?: boolean, callback: () => void}[]}> = ({propsArray}) => {
    return (
        <div className={styles['sidebar']}>
            {propsArray.map(props => (
                <SidebarButton key={props.text} text={props.text} selected={props.selected} callback={props.callback}/>
            ))}
        </div>
    )
}

export const Sidebar: React.FC<{routes: RouteObject}> = ({routes}) => {
    let {t} = useTranslation()
    let location = useLocation()
    let navigate = useNavigate()
    return (
        <SidebarBase propsArray={(() => {
            if (routes.children == undefined) return []
            let propsArray: {text: string, selected?: boolean, callback: () => void}[] = []
            for (let route of routes.children) {
                propsArray.push({
                    text: t(`path.${route.id ?? 'undefined'}`),
                    selected: location.pathname == route.path,
                    callback: () => navigate(route.path as string) // I believe nothing will go wrong.
                })
            }
            return propsArray
        })()}/>
    )
}