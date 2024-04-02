use crate::bridger::{impls, models};

use async_trait::async_trait;
use uuid::Uuid;

#[async_trait]
impl impls::ExecutableTask for models::AsyncTask {
    async fn execute(&self, window: tauri::Window) -> Result<String, Box<dyn std::error::Error>> {
        let uuid = match self {
            models::AsyncTask::InstallInstance(installer) => install(),
            models::AsyncTask::InstallJava => todo!(),
        }?;
        Ok(uuid.to_string())
    }
}

fn install() -> Result<Uuid, Box<dyn std::error::Error>> {
    let uuid = Uuid::new_v4();
    Ok(uuid)
}
