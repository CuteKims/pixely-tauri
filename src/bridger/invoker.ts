import { invoke } from "@tauri-apps/api/tauri";

class BackendInvoker {
    task: Task;

    constructor(task: Task) {
        this.task = task;
    }

    async invoke(): Promise<ParsedTaskResponse> {
        let promise = invoke('rasterizer_bridger', { request: JSON.stringify(this.task) }) as Promise<string>;
        return promise.then(result => {
                try { 
                    let parser = new TaskResponseParser(result);
                    return parser.parse(); }
                catch (error: any) { throw new Error(error) }
            })
            .catch(error => {
                throw new Error(error)
            })
    }
}

enum TaskType {
    Get = "Get",
    Dispatch = "Dispatch",
}

enum InstantTaskHeaders {
    InstancesInstalled,
    JavasInstalled,
    VersionManifest,
}

enum AsyncTaskHeaders {
    InstallJava,
    InstallInstance,
}

type Task = {
    type: 
    InstantTask | AsyncTask

}

type InstantTask = {
    requestHeader: InstantTaskHeaders,
    requestBody: String,
}

type AsyncTask = {
    requestHeader: AsyncTaskHeaders,
    requestBody: String,
}

type Result = {

}