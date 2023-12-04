use std::path::Path;

use crate::{bridger::{models, impls}, rasterizer, consts};

use async_trait::async_trait;

#[async_trait]
impl impls::ExecuteTask for models::InstantTask {
    async fn execute(&self) -> Result<models::Return, String> {
        let result = match self.task_header {
            models::InstantTaskHeaders::InstancesInstalled => get_installed_instances().await,
            models::InstantTaskHeaders::JavasInstalled => todo!(),
            models::InstantTaskHeaders::VersionManifest => rasterizer::utils::http_handler::get(&self.task_body).await,
        }?;
        Ok(models::Return::InstantResponse(result))
    }
}


async fn get_installed_instances() -> Result<String, String> {
    let core_initializer = rasterizer::models::core::CoreInitializer {
        client_token: consts::CLIENT_TOKEN,
        root_path: Path::new("E:/CodenamePixely/Playground/Minecraft"),
    };
    let core = core_initializer.init();
    Ok(serde_json::to_string(&core.locator.get_all_instances()).map_err(|error: serde_json::Error| error.to_string())?)
}