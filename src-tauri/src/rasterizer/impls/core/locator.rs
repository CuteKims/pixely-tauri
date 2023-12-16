use std::path::Path;

use crate::rasterizer::models::core::{locator::InstanceLocator, minecraft_instance::{MinecraftInstance, InstanceModificationType, InstanceVersion, VersionType}};

impl InstanceLocator<'_> {
    pub fn get_all_instances(&self) -> Vec<MinecraftInstance> {
        let instance_a = MinecraftInstance {
            name: "Hypixel Network",
            version: InstanceVersion {
                id: "1.12.2",
                release_time: "2023-06-07T11:49:20+00:00",
                r#type: VersionType::Release,
                client_version: "1.12.2",
            },
            modification: vec![InstanceModificationType::Forge, InstanceModificationType::Optifine],
            instance_path: "E:/CodenamePixely/Playground/Minecraft",
            icon_path: "E:/CodenamePixely/pixely-tauri/src/assets/icons/icon_anvil.png",
        };
        let instance_b = MinecraftInstance {
            name: "NebulaeCraft",
            version: InstanceVersion {
                id: "1.12.2",
                release_time: "2023-06-07T11:49:20+00:00",
                r#type: VersionType::Release,
                client_version: "1.12.2",
            },
            modification: vec![InstanceModificationType::Forge, InstanceModificationType::Optifine],
            instance_path: "E:/CodenamePixely/Playground/Minecraft",
            icon_path: "C:/Users/20475/Pictures/logo.png",
        };
        let instance_c = MinecraftInstance {
            name: "Hypixel Network",
            version: InstanceVersion {
                id: "1.12.2",
                release_time: "2023-06-07T11:49:20+00:00",
                r#type: VersionType::Release,
                client_version: "1.12.2",
            },
            modification: vec![InstanceModificationType::Forge, InstanceModificationType::Optifine],
            instance_path: "E:/CodenamePixely/Playground/Minecraft",
            icon_path: "E:/CodenamePixely/pixely-tauri/src/assets/icons/icon_anvil.png",
        };
        let instance_d = MinecraftInstance {
            name: "NebulaeCraft",
            version: InstanceVersion {
                id: "1.12.2",
                release_time: "2023-06-07T11:49:20+00:00",
                r#type: VersionType::Release,
                client_version: "1.12.2",
            },
            modification: vec![InstanceModificationType::Forge, InstanceModificationType::Optifine],
            instance_path: "E:/CodenamePixely/Playground/Minecraft",
            icon_path: "C:/Users/20475/Pictures/logo.png",
        };
        let vec: Vec<MinecraftInstance> = vec![instance_a, instance_b, instance_c, instance_d];
        return vec
    }
}