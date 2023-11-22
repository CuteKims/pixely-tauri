use serde;

#[derive(serde::Deserialize)]
pub enum Task {
    Instant(InstantTask),
    Async(AsyncTask)
}

#[derive(serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct InstantTask {
    pub request_header: InstantTaskHeaders,
    pub request_body: String
}

#[derive(serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct AsyncTask {
    pub request_header: AsyncTaskHeaders,
    pub request_body: String
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