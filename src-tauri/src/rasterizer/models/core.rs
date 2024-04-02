use std::path::Path;

pub mod locator;
pub mod minecraft_instance;

pub struct CoreInitializer<'a> {
    pub client_token: &'a str,
    pub root_path: &'a Path,
}

pub struct LauncherCore<'a> {
    pub client_token: &'a str,
    pub root_path: &'a Path,
    pub locator: locator::InstanceLocator<'a>,
}
