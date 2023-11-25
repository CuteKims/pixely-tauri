import { invoke } from "@tauri-apps/api/tauri";
import TaskResponseParser, { ParsedTaskResponse, RawTaskResponse } from "./parser";

export default class BackendInvoker {
    task: Task;

    constructor(task: Task) {
        this.task = task;
    }

    async invoke(): Promise<void | ParsedTaskResponse<InstantTaskHeaders>> {
        let promise = invoke('rasterizer_bridger', { task: JSON.stringify(this.task) }) as Promise<RawTaskResponse>;
        return promise.then(result => {
                try {
                    let parser = new TaskResponseParser(this.task, result);
                    return parser.parse()
                } catch (error: any) {
                    throw new Error(error)
                }
            })
            .catch(error => {
                throw new Error(error)
            })
            //This will unwrap the Result<T, E> from Rust backend.
            //If the backend returns OK(), .then() will be executed.
            //If it is Err(), .catch() will catch it and throw an error.

            //Can we ask Microsoft to add ? and Result<T, E> into TypeScript?
    }
}

export enum InstantTaskHeaders {
    InstancesInstalled = 'InstancesInstalled',
    JavasInstalled = 'JavasInstalled',
    VersionManifest = 'VersionManifest',
}

export enum AsyncTaskHeaders {
    InstallJava,
    InstallInstance,
}

export type Task = InstantTask<InstantTaskHeaders> | AsyncTask<AsyncTaskHeaders>

type InstantTask<T extends InstantTaskHeaders> = {
    Instant: {
        taskHeader: T,
        taskBody: InstantTaskBodyTypes[T],
    }
}

type AsyncTask<T extends AsyncTaskHeaders> = {
    Async: {
        taskHeader: T,
        taskBody: AsyncTaskBodyTypes[T],
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
    instanceIcon: string,
    jsonUrl: string,
}

type InstallJava = {
    installerUrl: string,
}