use std::path::Path;

use crate::rasterizer::models::core::{locator::InstanceLocator, minecraft_instance::{MinecraftInstance, InstanceModificationType}};

impl InstanceLocator<'_> {
    pub fn get_all_instances(&self) -> Vec<MinecraftInstance<InstanceModificationType>> {
        let instance: MinecraftInstance<'_, InstanceModificationType> = {
            instance_name: "1.12.2",
            id: "1.12.2",
            icon_path: Path::new("E:/CodenamePixely/pixely-tauri/src/assets/icons/icon_anvil.png")
        };
        let vec: Vec<MinecraftInstance<InstanceModificationType>> = vec![instance];
        return vec
    }
}