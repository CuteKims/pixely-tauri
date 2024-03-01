use super::parser::resource_parser::DownloadIndex;

pub struct ConcurrentDownloader {
    pub download_index: Vec<DownloadIndex>,
    pub concurrent_request_number: usize,
}

pub struct DownloadManager {
    pub download_index: Vec<DownloadIndex>,
    pub concurrent_request_number: usize,
    pub progress_id: String,
}