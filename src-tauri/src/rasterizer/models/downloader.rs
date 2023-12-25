use std::path::Path;

use super::parser::json_parser::{JarIndex, AssetIndex};

pub struct Downloader {
    files: Vec<Box<DownloadIndex>>,
    thread_number: i32,
}


pub trait Downloadable {
    fn get_index(&self) -> DownloadIndex;
}

pub struct DownloadIndex {
    pub index_type: DownloadableFileType,
    pub path: Path,
    pub sha1: Option<String>,
    pub size: Option<i32>,
}

pub enum DownloadableFileType {
    Hashmap,
    GameJar,
}

impl Downloadable for DownloadIndex {
    fn get_index(&self) -> DownloadIndex {
        self
    }
}

impl Downloadable for JarIndex {
    fn get_index(&self) -> DownloadIndex {
        return DownloadIndex {
            index_type: DownloadableFileType::GameJar,
            path: Path::new("/versions/1.12.2/"),
            sha1: Option::Some(self.sha1),
            size: Option::Some(self.size),
        }
    }
}

impl Downloadable for AssetIndex {
    fn get_index(&self) -> DownloadIndex {
        
    }
}