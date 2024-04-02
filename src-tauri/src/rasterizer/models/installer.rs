use std::path::PathBuf;

use super::core::minecraft_instance::InstanceModificationType;

#[derive(serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct InstanceInstaller {
    pub instance_name: String,
    pub instance_id: String,
    pub client_json_url: String,
}
