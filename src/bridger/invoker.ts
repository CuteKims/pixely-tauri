import { invoke } from "@tauri-apps/api/tauri";
import TaskResponseParser, { ParsedTaskResponse, RawTaskResponse } from "./parser";

export default class BackendInvoker {
    task: Task;

    constructor(task: Task) {
        this.task = task;
    }

    async invoke(): Promise<void | ParsedTaskResponse<InstantTaskHeaders>> {
        let promise = invoke('rasterizer_bridger', { request: JSON.stringify(this.task) }) as Promise<RawTaskResponse>;
        return promise.then(result => {
                try {
                    let parser = new TaskResponseParser(this.task, result);
                    return parser.parse(); }
                catch (error: any) { throw new Error(error) }
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
    Undefined = 'Undefined',
}

export enum AsyncTaskHeaders {
    InstallJava,
    InstallInstance,
}

export type Task = InstantTask | AsyncTask

export function isAsyncTask(task: Task): task is AsyncTask {
    return (<AsyncTask>task).Async !== undefined
}

type InstantTask = {
    Instant: {
        requestHeader: InstantTaskHeaders,
        requestBody: String,
    }
}

type AsyncTask = {
    Async: {
        requestHeader: AsyncTaskHeaders,
        requestBody: String,
    }
}