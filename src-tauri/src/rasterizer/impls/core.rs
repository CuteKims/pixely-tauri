use crate::rasterizer::models::core::{ locator::InstanceLocator, CoreInitializer, LauncherCore };
pub mod locator;

impl<'a> CoreInitializer<'a> {
    pub fn init(&self) -> LauncherCore {
        let locator = InstanceLocator {
            root_path: self.root_path
        };
        let core = LauncherCore {
            root_path: self.root_path,
            client_token: self.client_token,
            locator
        };
        core
    }
}