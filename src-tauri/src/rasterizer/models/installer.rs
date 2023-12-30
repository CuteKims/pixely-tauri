use std::path::PathBuf;

use super::core::minecraft_instance::InstanceModificationType;

pub struct InstanceInstaller {
    instance_name: String,
    instance_icon: PathBuf,
    version_id: String,
    modifications: Vec<InstanceModificationType>
}