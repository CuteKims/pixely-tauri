use std::path::PathBuf;

use crate::rasterizer::utils::crossplat::OsInfo;

pub trait InstanceResource {
    fn parse(
        &self,
        instance_id: String,
        source: DownloadSource,
        os_info: OsInfo,
    ) -> Result<Vec<DownloadIndex>, Box<dyn std::error::Error>>;
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
    pub size: Option<usize>,
    pub url: String,
}

#[derive(Clone, Debug)]
pub enum InstanceResourceType {
    AssetsMap,
    InstanceJar,
    Asset,
    LibraryJar,
}
