class TaskResponseParser {
    rawTaskResponse: string;

    constructor(rawTaskResponse: string) {
        this.rawTaskResponse = rawTaskResponse;
    }

    parse(): ParsedTaskResponse {
        try {
            return JSON.parse(this.rawTaskResponse);
        } catch (error: any) {
            throw new Error(error)
        }
    }
}

type ParsedTaskResponse = {
    header: TaskResponseHeader,
    body: InstancesInstalled
}

enum TaskResponseHeader {
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