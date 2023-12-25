use crate::rasterizer::models::{completer::InstanceResourceCompleter, downloader::DownloadFileIndex};

impl InstanceResourceCompleter {
    pub fn get_resource_list(&self) -> Vec<Box<DownloadFileIndex>> {
        self.client_json
    }
}