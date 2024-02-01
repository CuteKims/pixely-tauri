import { InstantTaskHeaders, ModLoaders, VersionType } from "../enums";
import { Task } from "./invoker";

export default class BackendResponseParser {
    task: Task;
    rawTaskResponse: RawTaskResponse;

    constructor(task: Task, rawTaskResponse: RawTaskResponse) {
        this.task = task,
        this.rawTaskResponse = rawTaskResponse;
    };

    parse(): ParsedTaskResponse<InstantTaskHeaders> | void {
        try {
            switch(this.task.type) {
                case 'async':
                    create_a_listener_or_sth_idk((<AsyncTaskId>this.rawTaskResponse).AsyncTaskId); //To be implemented. If invoker invoked an async task, an listener is required to track the task progress.
                    return
                case 'instant':
                    let deserializedResponse = JSON.parse((<InstantResponse>this.rawTaskResponse).InstantResponse);
                    return {
                        header: this.task.header,
                        body: deserializedResponse,
                    };
            }
        }
        catch (error: any) {
            throw "Error when parsing RawResponse: " + error
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
    [InstantTaskHeaders.GetVersionManifest]: VersionManifest,
    [InstantTaskHeaders.GetInstancesInstalled]: MinecraftInstance[],
    [InstantTaskHeaders.GetJavasInstalled]: string,
    [InstantTaskHeaders.TestCaller]: string,
}

export type VersionManifest = {
    latest: {
        release: string,
        snapshot: string,
    },
    versions: ManifestVersion[];
}

export type MinecraftInstance = {
    name: string,
    version: InstanceVersion,
    modification: ModLoaders[],
    instancePath: string,
    iconPath: string,
}

type InstanceVersion = {
    id: string,
    minecraftArguments: string,
    releaseTime: string,
    type: VersionType,
    clientVersion: string,
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