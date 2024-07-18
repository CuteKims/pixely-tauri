export enum TaskTypes {
    Instant,
    Async,
}

export enum InstantTaskHeaders {
    GetInstancesInstalled = 'GetInstancesInstalled',
    GetJavasInstalled = 'GetJavasInstalled',
    GetVersionManifest = 'GetVersionManifest',
    TestCaller = 'TestCaller'
}

export enum AsyncTaskHeaders {
    InstallJava = 'InstallJava',
    InstallInstance = 'InstallInstance',
}

export enum WindowStateActions {
    SetIsFocus,
    SetIsMaximized,
    SetSize,
    PushNotif,
    DelNotif,
    SetMenu,
}