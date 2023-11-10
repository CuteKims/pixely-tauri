use crate::bridger::{models, impls};


impl impls::ExecuteAction for models::ActionGet {
    fn execute(&self) -> Result<models::Return, String> {
        match self {
            models::ActionGet::InstancesInstalled => Ok(models::Return::Ok(())),
            models::ActionGet::JavasInstalled => Ok(models::Return::Ok(())),
            models::ActionGet::VersionManifest => Ok(models::Return::Ok(())),
        }        
    }
}