use std::path::Path;

use crate::{bridger::{models, impls}, rasterizer, statics};

use async_trait::async_trait;

#[async_trait]
impl impls::ExecuteTask for models::InstantTask {
    async fn execute(&self) -> Result<models::Return, Box<dyn std::error::Error>> {
        let result = match self {
            models::InstantTask::InstancesInstalled(_) => get_installed_instances().await,
            models::InstantTask::JavasInstalled => todo!(),
            models::InstantTask::VersionManifest(url) => rasterizer::utils::http_handler::get(url.to_string()).await,
        }?;
        Ok(models::Return::InstantResponse(result))
    }
}


async fn get_installed_instances() -> Result<String, Box<dyn std::error::Error>> {
    let core_initializer = rasterizer::models::core::CoreInitializer {
        client_token: statics::CLIENT_TOKEN,
        root_path: Path::new("E:/CodenamePixely/Playground/Minecraft"),
    };
    let core = core_initializer.init();
    Ok(serde_json::to_string(&core.locator.get_all_instances())?)
}