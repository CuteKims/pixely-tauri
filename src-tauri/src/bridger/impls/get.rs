use crate::bridger::{models, impls};

use async_trait::async_trait;

#[async_trait]
impl impls::ExecuteTask for models::InstantTask {
    async fn execute(&self) -> Result<models::Return, String> {
        let result = match self.request_header {
            models::InstantTaskHeaders::InstancesInstalled => todo!(),
            models::InstantTaskHeaders::JavasInstalled => todo!(),
            models::InstantTaskHeaders::VersionManifest => handle_get_response(&self.request_body),
        }.await?;
        Ok(models::Return::Value(result))
    }
}

async fn handle_get_response(target: &str) -> Result<String, String> {
    let to_string = |error: reqwest::Error| error.to_string();
    Ok(reqwest::get(target).await.map_err(to_string)?.text().await.map_err(to_string)?)
}