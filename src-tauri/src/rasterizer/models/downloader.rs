use std::path::PathBuf;

use crate::rasterizer::utils::crossplat::OsInfo;

pub struct Downloader {
    files: Vec<Box<DownloadIndex>>,
    thread_number: i32,
}

pub trait InstanceResource {
    fn get_index(&self, instance_id: String, source: DownloadSource, os_info: OsInfo) -> Result<Vec<DownloadIndex>, Box<dyn std::error::Error>>;
}

pub enum DownloadSource {
    BMCLAPI,
    MCBBS,
    DEFAULT,
}

#[derive(Clone, Debug)]
pub struct DownloadIndex {
    pub resource_type: InstanceResourceType,
    pub path: PathBuf,
    pub sha1: Option<String>,
    pub size: Option<i32>,
    pub url: String
}

#[derive(Clone, Debug)]
pub enum InstanceResourceType {
    AssetsMap,
    InstanceJar,
    Asset,
    LibraryJar,
}