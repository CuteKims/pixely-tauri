use std::path::Path;

use crate::rasterizer::models::core::{locator::InstanceLocator, minecraft_instance::MinecraftInstance};

impl InstanceLocator<'_> {
    pub fn get_all_instances(&self) -> Vec<MinecraftInstance> {
        let instance = MinecraftInstance {
            instance_name: "1.12.2",
            id: "1.12.2",
            icon_path: Path::new("E:/CodenamePixely/pixely-tauri/src/assets/icons/icon_anvil.png")
        };
        let vec: Vec<MinecraftInstance> = vec![instance];
        return vec
    }
}