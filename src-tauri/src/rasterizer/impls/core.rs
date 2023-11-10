use crate::rasterizer::models::core::{ locator::VersionLocator, CoreInitializer, LauncherCore };
mod locator;

impl<'a> CoreInitializer<'a> {
    pub fn init(&self) -> LauncherCore {
        let locator = VersionLocator {
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