use serde;
use tauri::window;

use crate::rasterizer::models::installer::InstanceInstaller;

#[derive(serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub enum Task {
    Instant(InstantTask),
    Async(AsyncTask)
}

#[derive(serde::Deserialize)]
pub enum InstantTask {
    TestCaller,
    GetInstancesInstalled,
    GetJavasInstalled,
    GetVersionManifest(String),
}

#[derive(serde::Deserialize)]
pub enum AsyncTask {
    InstallInstance(InstanceInstaller),
    InstallJava,
}

#[derive(serde::Serialize)]
#[derive(Debug)]
pub enum Return {
    InstantResponse(String),
    AsyncTaskUuid(String)
}