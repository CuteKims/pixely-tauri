use crate::bridger;


impl bridger::impls::ExecuteAction for bridger::models::ActionDispatch {
    fn execute(&self) -> Result<bridger::models::Return, String> {
        match self {
            Self::InstallJava => {
                Ok(bridger::models::Return::Ok(()))
            },
            Self::InstallInstance => {
                Ok(bridger::models::Return::Ok(()))
            }
        }        
    }
}

