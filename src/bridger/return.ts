interface IBackendResultParser {
    rawResult: string,
    parse(): BackendResult,
}

enum BackendResult {
    InstancesInstalled,
    JavasInstalled,
}

type InstancesInstalled = {
    instances: MinecraftInstance[],
}

type MinecraftInstance = {
    name: string,
    version: InstanceVersion,
    modification: InstanceModificationType[],
    path: string,
}

type InstanceVersion = {
    id: String,
    type: InstanceVersionType,
    releaseTime: String,
    complianceLevel: boolean
}

enum InstanceModificationType {
    Forge = "Forge",
    Fabric = "Fabric",
    NeoForge = "NeoForge",
    LiteLoader = "LiteLoader",
    Qulit = "Qulit",
    Rift = "Rift",
    Optifine = "Optifine",
}

enum InstanceVersionType {
    release = "release",
    snapshot = "snapshot",
    oldBeta = "old_beta",
    oldAlpha = "old_alpha",
}