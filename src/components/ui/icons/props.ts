export type IconProps = {
    size?: number,
    color?: string,
}

export const refillUndefinedProps = (props: IconProps): IconProps => {
    return {
        size: props.size != undefined ? props.size : 24,
        color: props.color != undefined ? props.color : 'var(--default-font-color)'
    }
}