import { CSSProperties } from "react"

export type AvatarProps = {
    src: string | undefined,
    size: number,
    rounded?: boolean | number,
    outlined?: boolean | string,
    style?: CSSProperties
}

export const Avatar: React.FC<AvatarProps> = (props) => {
    let borderRadius: string

    if(props.rounded === true) borderRadius = props.size / 2 + 'px'
    else if(props.rounded) borderRadius = props.rounded + 'px'
    else borderRadius = '0px'

    let outline: string | undefined

    if(props.outlined === true) outline = '1px solid var(--reverse-color-10)'
    else if(props.outlined) outline = props.outlined
    else outline = undefined
    return (
        <img style={{
            height: props.size + 'px',
            width: props.size + 'px',
            borderRadius,
            objectFit: 'cover',
            outline,
            ...props.style
        }} src={props.src} />
    )
}