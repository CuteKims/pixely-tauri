use async_trait::async_trait;

use crate::bridger::models;

pub mod r#async;
pub mod instant;

impl models::Task {
    pub async fn dispatch(&self) -> Result<models::Return, String> {
        match &self {
            models::Task::Instant(task) => {
                task.execute().await
            },
            models::Task::Async(task) => {
                task.execute().await
            }
        }
    }
}

#[async_trait]
pub trait ExecuteTask {
    async fn execute(&self) -> Result<models::Return, String>;
}