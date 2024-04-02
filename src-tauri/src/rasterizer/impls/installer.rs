use std::path::PathBuf;

use crate::{rasterizer::models::installer::InstanceInstaller, statics};

impl InstanceInstaller {
    pub fn create_instance(&self) -> Result<(), Box<dyn std::error::Error>> {
        let mut path: PathBuf = PathBuf::new();
        path.push(format!(
            "{}/verions/{}/{}.json",
            statics::FOLDER_PATH,
            self.instance_id,
            self.instance_id
        ));
        Ok(())
    }
}
