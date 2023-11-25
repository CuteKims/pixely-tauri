use std::path::Path;

pub struct MinecraftInstance<'a> {
    pub instance_name: &'a str,
    pub id: &'a str,
    pub icon_path: &'a Path
}