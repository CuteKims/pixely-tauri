use serde;

pub enum RequestBody {
    Get(ActionGet),
    Dispatch(ActionDispatch)
}
pub enum ActionGet {
    InstancesInstalled,
    JavasInstalled,
    VersionManifest,
}

pub enum ActionDispatch {
    InstallInstance,
    InstallJava,
}

pub struct Request {
    pub request_body: RequestBody
}

#[derive(serde::Deserialize)]
pub struct RawRequest<'a> {
    pub request_type: &'a str,
    pub request_action: &'a str,
}

pub enum Return {
    Value(String),
    Ok(())
}