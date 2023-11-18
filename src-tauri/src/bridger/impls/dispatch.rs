use crate::bridger::{models, impls};

use async_trait::async_trait;

#[async_trait]
impl impls::ExecuteTask for models::AsyncTask {
    async fn execute(&self) -> Result<models::Return, String> {
        let result = match self.request_header {
            models::AsyncTaskHeaders::InstallInstance => todo!(),
            models::AsyncTaskHeaders::InstallJava => todo!(),
        };
    }
}