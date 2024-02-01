export function dateToString(dateString: string) {
    let date: Date = new Date(dateString);
    return date.getFullYear()
        + '/'
        + date.getMonth().toString().padStart(2, '0')
        + '/'
        + date.getDay().toString().padStart(2, '0')
        + ' '
        + date.getHours()
        + ':'
        + date.getMinutes().toString().padStart(2, '0')
}