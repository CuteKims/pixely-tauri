use serde;

use crate::rasterizer::models::installer::InstanceInstaller;

#[derive(serde::Deserialize)]
pub enum Task {
    Instant(InstantTask),
    Async(AsyncTask)
}

#[derive(serde::Deserialize)]
pub enum InstantTask {
    InstancesInstalled(String),
    JavasInstalled,
    VersionManifest(String),
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