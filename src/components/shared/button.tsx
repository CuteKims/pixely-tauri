import { GlobalState } from "../hocs/context"
import styles from './button.module.css'

export const SideButton: React.FC<{props: {
    pageKey: string,
    friendlyName: string,
    display: boolean,
    isSelected: boolean,
    dispatchPage: (args: string) => void}}> = ({props}) => {
    if(props.display) return (
        <div className={props.isSelected ? styles['side-button-selected'] : styles['side-button']} onClick={() => props.dispatchPage(props.pageKey)}>
            <p>{props.friendlyName}</p>
        </div>
    )
    else return (<></>)
}