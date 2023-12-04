use std::path::Path;

#[derive(serde::Serialize, serde::Deserialize)]
pub struct MinecraftInstance<'a, InstanceModificationTypes> {
    pub name: &'a str,
    pub version: &'a InstanceVersion<'a>,
    pub modification: Vec<&'a InstanceModificationTypes>,
    pub instance_path: &'a str,
    pub icon_path: &'a str,
}

#[derive(serde::Serialize, serde::Deserialize)]
pub struct InstanceVersion<'a> {
    pub id: &'a str,
    pub minecraft_arguments: &'a str,
    pub release_time: &'a str,
    pub r#type: VersionType,
    pub client_version: &'a str,
}