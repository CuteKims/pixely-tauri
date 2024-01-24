export const IconSearch: React.FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" style={{color: 'var(--default-font-color)'}}>
            <path d="M16,14.937l-4.024-4.076A6.773,6.773,0,0,0,8.138.159,6.661,6.661,0,0,0,.634,3.88,6.8,6.8,0,0,0,2.593,12.1a6.625,6.625,0,0,0,8.357-.146l4,4.046ZM6.682,12.009a5.255,5.255,0,1,1,5.2-5.255,5.226,5.226,0,0,1-5.2,5.255Z" transform="translate(0.001 0.005)" fill="currentColor"/>
        </svg>
    )
}

export const IconArrow: React.FC<{direction?: 'up' | 'down' | 'left' | 'right'}> = ({direction}) => {
    let transform: string;
    switch (direction) {
        case 'up':
            transform = 'rotate(90deg)'; break
        case 'down':
            transform = 'rotate(270deg)'; break
        case 'left':
            transform = 'rotate(0deg)'; break
        case 'right':
            transform = 'rotate(180deg)'; break
        default: transform = 'rotate(0deg)'; break
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14.71" height="10.704" viewBox="0 0 14.71 10.704" style={{color: 'var(--default-font-color)', transform}}>
            <g id="组_42" data-name="组 42" transform="translate(-16.29 -13.149)">
                <rect id="矩形_3" data-name="矩形 3" width="7.067" height="1" transform="translate(16.646 18.146) rotate(-45)" fill="currentColor"/>
                <rect id="矩形_4" data-name="矩形 4" width="14" height="1" transform="translate(17 18)" fill="currentColor"/>
                <rect id="矩形_5" data-name="矩形 5" width="7.575" height="1" transform="translate(16.997 17.79) rotate(45)" fill="currentColor"/>
            </g>
        </svg>
    )
}

export const IconDownload: React.FC = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="22.042" height="24" viewBox="0 0 22.042 24" style={{color: 'var(--default-font-color)'}}>
            <g transform="translate(-698.646 -80)">
                <rect width="2" height="21" transform="translate(708.667 80)" fill="currentColor"/>
                <rect width="2" height="21.333" transform="translate(720.333 102) rotate(90)" fill="currentColor"/>
                <rect width="2" height="15" transform="translate(698.646 92.393) rotate(-45)" fill="currentColor"/>
                <rect width="2" height="15" transform="translate(719.273 90.979) rotate(45)" fill="currentColor"/>
            </g>
        </svg>
    )
}