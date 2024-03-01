use async_trait::async_trait;

use crate::bridger::models;

pub mod r#async;
pub mod instant;

impl models::Task {
    pub async fn dispatch(&self, window: tauri::Window) -> Result<models::Return, Box<dyn std::error::Error>> {
        match &self {
            models::Task::Instant(task) => {
                Ok(models::Return::InstantResponse(task.execute(window).await?))
            },
            models::Task::Async(task) => {
                Ok(models::Return::AsyncTaskProgressId(task.execute(window).await?))
            }
        }
    }
}

#[async_trait]
pub trait ExecutableTask {
    async fn execute(&self, window: tauri::Window) -> Result<String, Box<dyn std::error::Error>>;
}