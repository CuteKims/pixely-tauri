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

export enum NotificationChannels {
    Downloader,
    UpdateChecker,
    ErrorNotifier,
    Test,
}

export enum PageStackActions {
    Push,
    Pop,
    Replace,
    SetInternalState,
    PushSubpage,
    SetSubpageInternalState,
}

export enum WindowStateActions {
    SetIsFocus,
    SetIsMaximized,
    SetSize,
    PushNotif,
    DelNotif,
    SetMenu, //This is TEMPORARY. To be moved to ModalState.
}

export enum ModalStateActions {
    AddModal,
    DelModel,
}

export enum VersionType {
    release = "release",
    snapshot = "snapshot",
    oldBeta = "old_beta",
    oldAlpha = "old_alpha",
}


export enum ModLoaders {
    Vanilla = "Vanilla",
    Forge = "Forge",
    Fabric = "Fabric",
    NeoForge = "Neoforge",
    LiteLoader = "Liteloader",
    Qulit = "Qulit",
}

export enum Addons {
    Optifine = 'Optifine',
    Fabricapi = 'Fabricapi',
    Optifabric = 'Optifabric',
    liteloaderapi = 'Liteloaderapi'
}