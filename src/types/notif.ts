export enum NotificationChannels {
    Downloader,
    UpdateChecker,
    ErrorNotifier,
    Test,
}

export type Notification<T extends NotificationChannels> = {
    timestamp: number,
    uuid: number,
    channel: T,
    payload: NotificationPayload[T],
}

export type NotificationPayload = {
    [NotificationChannels.Downloader]: DownloaderNotif,
    [NotificationChannels.UpdateChecker]: UpdateCheckerNotif,
    [NotificationChannels.ErrorNotifier]: ErrorNotifier,
    [NotificationChannels.Test]: Test
}

type DownloaderNotif = {
    status: string,
    percentage: string,
    speed: string,
}

type UpdateCheckerNotif = {
    newVersionId: string,
}

type ErrorNotifier = {
    errorId: string,
    sadness: 'true',
}

type Test = {
    string: string
}