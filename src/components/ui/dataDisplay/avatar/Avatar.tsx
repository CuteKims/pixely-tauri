import { CSSProperties } from "react"

export type AvatarProps = {
    src: string | undefined,
    size: number,
    rounded?: boolean | number,
    bordered?: boolean,
    style?: CSSProperties
}

export const Avatar: React.FC<AvatarProps> = (props) => {
    let borderRadius = (() => {
        if(props.rounded === true) return props.size / 2 + 'px'
        else if(props.rounded) return props.rounded + 'px'
        else return '0px'
    })()
    return (
        <img style={{
            height: props.size + 'px',
            width: props.size + 'px',
            borderRadius,
            objectFit: 'cover',
            boxSizing: props.bordered ? 'border-box' : undefined,
            border: props.bordered ? '1px solid var(--reverse-color-10)' : undefined,
            ...props.style
        }} src={props.src} />
    )
}