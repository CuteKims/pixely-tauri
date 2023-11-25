import { InstantTaskHeaders, Task, isAsyncTask } from "./invoker";

export default class TaskResponseParser {
    task: Task;
    rawTaskResponse: RawTaskResponse;

    constructor(task: Task, rawTaskResponse: RawTaskResponse) {
        this.task = task,
        this.rawTaskResponse = rawTaskResponse;
    };

    parse(): ParsedTaskResponse<InstantTaskHeaders> | void {
        try {
            if (isAsyncTask(this.task)) {
                create_a_listener_or_sth_idk((<AsyncTaskId>this.rawTaskResponse).AsyncTaskId); //To be implemented. If invoker invoked an async task, an listener is required to track the task progress.
            } else {
                let parsedResponseBody: ResponseBodyTypes[InstantTaskHeaders];
                let deserializedResponse = JSON.parse((<InstantResponse>this.rawTaskResponse).InstantResponse)
                switch (this.task.Instant.taskHeader) {
                    case InstantTaskHeaders.VersionManifest: {
                        parsedResponseBody = deserializedResponse.versions as VersionManifest
                        break;
                    };
                    default: {
                        throw new Error('Unable to parse task response.')
                    }
                }
                return {                        
                    header: this.task.Instant.taskHeader,
                    body: parsedResponseBody,
                };
            }
        } catch (error: any) {
            throw new Error(error)
        }
    }
}

function create_a_listener_or_sth_idk(id: number) {
    console.log(id)
}

export type RawTaskResponse = InstantResponse | AsyncTaskId

type InstantResponse = {
    InstantResponse: string
}

type AsyncTaskId = {
    AsyncTaskId: number
}

export type ParsedTaskResponse<T extends InstantTaskHeaders> = {
    header: T,
    body: ResponseBodyTypes[T]
}

type ResponseBodyTypes = {
    [InstantTaskHeaders.VersionManifest]: VersionManifest,
    [InstantTaskHeaders.InstancesInstalled]: InstancesInstalled,
    [InstantTaskHeaders.JavasInstalled]: string,
}

type InstancesInstalled = {
    instances: MinecraftInstance[],
}

export type VersionManifest = ManifestVersion[]

type MinecraftInstance = {
    name: string,
    version: InstanceVersion,
    modification: InstanceModificationType[],
    path: string,
}

type InstanceVersion = {
    id: String,
    type: VersionType,
    releaseTime: String,
}

export type ManifestVersion = {
    id: string,
    type: VersionType,
    url: string,
    time: string,
    releaseTime: string,
    sha1: string,
    complianceLevel: number,
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

export enum VersionType {
    release = "release",
    snapshot = "snapshot",
    oldBeta = "old_beta",
    oldAlpha = "old_alpha",
}