import { invoke } from "@tauri-apps/api/core";
import BackendResponseParser, { ParsedTaskResponse, RawTaskResponse } from "./parser";
import { InstantTaskHeaders, AsyncTaskHeaders } from "../types/task";

export default class BackendInvoker {
    task: Task;

    constructor(task: Task) {
        this.task = task;
    }

    async invoke(): Promise<void | ParsedTaskResponse<InstantTaskHeaders>> {
        let task = {
            [this.task.type]: {
                [this.task.header]: this.task.body
            }
        }
        let promise = invoke('rasterizer_bridger', { task: JSON.stringify(task) }) as Promise<RawTaskResponse>;
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

export type Task = InstantTask<InstantTaskHeaders> | AsyncTask<AsyncTaskHeaders>

type InstantTask<T extends InstantTaskHeaders> = {
    type: "instant",
    header: InstantTaskHeaders,
    body: InstantTaskBodies[T]
}

type AsyncTask<T extends AsyncTaskHeaders> = {
    type: "async",
    header: AsyncTaskHeaders,
    body: AsyncTaskBodies[T]
}



type InstantTaskBodies = {
    [InstantTaskHeaders.GetVersionManifest]: string,
    [InstantTaskHeaders.GetInstancesInstalled]: string,
    [InstantTaskHeaders.GetJavasInstalled]: null
    [InstantTaskHeaders.TestCaller]: null
}

type AsyncTaskBodies = {
    [AsyncTaskHeaders.InstallInstance]: InstallInstance,
    [AsyncTaskHeaders.InstallJava]: InstallJava,
}

type InstallInstance = {
    instanceName: string,
    instanceId: string,
    clientJsonUrl: string,
}

type InstallJava = {
    installerUrl: string,
}