import { IconProps, refillUndefinedProps } from "./props"

export const IconPixelyLogo: React.FC<IconProps> = (props) => {
    let {size, color} = refillUndefinedProps(props)
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} color={color} viewBox="0 0 24 24">
            <rect width="4" height="4" transform="translate(10 10)" fill="currentColor"/>
            <rect width="4" height="4" transform="translate(10 4)" fill="currentColor"/>
            <rect width="4" height="4" transform="translate(4 4)" fill="currentColor"/>
            <rect width="4" height="4" transform="translate(4 16)" fill="currentColor"/>
            <rect width="4" height="4" transform="translate(10 16)" fill="currentColor"/>
            <rect width="4" height="4" transform="translate(16 10)" fill="currentColor"/>
            <rect width="4" height="4" transform="translate(4 10)" fill="currentColor"/>
            <rect width="24" height="24" fill="none"/>
        </svg>
    )
}