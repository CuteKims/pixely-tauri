import { invoke } from "@tauri-apps/api/tauri";
import BackendResponseParser, { ParsedTaskResponse, RawTaskResponse } from "./parser";

export default class BackendInvoker {
    task: Task;

    constructor(task: Task) {
        this.task = task;
    }

    async invoke(): Promise<void | ParsedTaskResponse<InstantTaskHeaders>> {
        let promise = invoke('rasterizer_bridger', { task: JSON.stringify(this.task) }) as Promise<RawTaskResponse>;
        return promise.then(result => {
            console.log(result);    
            try {
                let parser = new BackendResponseParser(this.task, result);
                return parser.parse()
            } catch (error) {
                throw error
            }
        })
        .catch(error => {
            throw 'Error from BackendInvoker: ' + error
        })
    }
}

export enum InstantTaskHeaders {
    InstancesInstalled = 'InstancesInstalled',
    JavasInstalled = 'JavasInstalled',
    VersionManifest = 'VersionManifest',
}

export enum AsyncTaskHeaders {
    InstallJava = 'InstallJava',
    InstallInstance = 'InstallInstance',
}

export type Task = InstantTask<InstantTaskHeaders> | AsyncTask<AsyncTaskHeaders>

type InstantTask<T extends InstantTaskHeaders> = {
    Instant: {
        [key: string]: InstantTaskBodyTypes[T],
    }
}

type AsyncTask<T extends AsyncTaskHeaders> = {
    Async: {
        [key: string]: AsyncTaskBodyTypes[T],
    }
}

type InstantTaskBodyTypes = {
    [InstantTaskHeaders.VersionManifest]: string,
    [InstantTaskHeaders.InstancesInstalled]: string,
    [InstantTaskHeaders.JavasInstalled]: null
}

type AsyncTaskBodyTypes = {
    [AsyncTaskHeaders.InstallInstance]: InstallInstance,
    [AsyncTaskHeaders.InstallJava]: InstallJava,
}

export function isAsyncTask(task: Task): task is AsyncTask<AsyncTaskHeaders> {
    return (<AsyncTask<AsyncTaskHeaders>>task).Async !== undefined
}

type InstallInstance = {
    instanceName: string,
    instanceId: string,
    clientJsonUrl: string,
}

type InstallJava = {
    installerUrl: string,
}