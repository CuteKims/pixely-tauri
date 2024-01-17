use crate::bridger::{models, impls};

use async_trait::async_trait;
use uuid::Uuid;

#[async_trait]
impl impls::ExecuteTask for models::AsyncTask {
    async fn execute(&self, window: tauri::Window) -> Result<models::Return, Box<dyn std::error::Error>> {
        let result = match self {
            models::AsyncTask::InstallInstance(installer) => install(),
            models::AsyncTask::InstallJava => todo!(),
        }?;
        Ok(models::Return::AsyncTaskUuid(result.to_string()))
    }
}

fn install() -> Result<Uuid, Box<dyn std::error::Error>> {
    let uuid = Uuid::new_v4();
    Ok(uuid)
}