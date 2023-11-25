use serde;

#[derive(serde::Deserialize)]
pub enum Task {
    Instant(InstantTask),
    Async(AsyncTask)
}

#[derive(serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct InstantTask {
    pub task_header: InstantTaskHeaders,
    pub task_body: String
}

#[derive(serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AsyncTask {
    pub task_header: AsyncTaskHeaders,
    pub task_body: String
}

#[derive(serde::Deserialize)]
pub enum InstantTaskHeaders {
    InstancesInstalled,
    JavasInstalled,
    VersionManifest,
}

#[derive(serde::Deserialize)]
pub enum AsyncTaskHeaders {
    InstallInstance,
    InstallJava,
}

#[derive(serde::Serialize)]
pub enum Return {
    InstantResponse(String),
    AsyncTaskId(usize)
}