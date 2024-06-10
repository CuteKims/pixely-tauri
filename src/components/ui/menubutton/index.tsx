import styles from './menubutton.module.css'

export const RadioButton: React.FC<{props: {
    displayName: string,
    isDisplay: boolean,
    isSelected: boolean,
    callback: () => void
}}> = ({props}) => {
    if(props.isDisplay) return (
        <div className={props.isSelected ? styles['side-button-selected'] : styles['side-button']} onClick={props.callback}>
            <p>{props.displayName}</p>
        </div>
    )
}