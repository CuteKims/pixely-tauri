use crate::bridger::models;

pub mod dispatch;
pub mod get;

impl models::RawRequest<'_> {
    pub fn parse(&self) -> Result<models::Request, String> {
        let request_body: models::RequestBody;
        match self.request_type {
            "Get" => {
                match self.request_action {
                    "JavasInstalled" => request_body = models::RequestBody::Get(models::ActionGet::JavasInstalled),
                    "InstancesInstalled" => request_body = models::RequestBody::Get(models::ActionGet::InstancesInstalled),
                    _ => return Err("Invalid request: Unknown Get action.".into()),
                }
            },
            "Dispatch" => {
                match self.request_action {
                    "InstallJava" => request_body = models::RequestBody::Dispatch(models::ActionDispatch::InstallJava),
                    "InstallInstance" => request_body = models::RequestBody::Dispatch(models::ActionDispatch::InstallInstance),
                    _ => return Err("Invalid request: Unknown Dispatch action.".into()),
                }
            },
            _ => return Err("Invalid request: Unknown request type.".into())
        }
        let request = models::Request {
            request_body
        };
        Ok(request)
    }
}

impl models::Request {
    pub fn execute(&self) -> Result<models::Return, String> {
        match &self.request_body {
            models::RequestBody::Get(action) => {
                action.execute()
            },
            models::RequestBody::Dispatch(action) => {
                action.execute()
            }
        }
    }
}

pub trait ExecuteAction {
    fn execute(&self) -> Result<models::Return, String>;
}