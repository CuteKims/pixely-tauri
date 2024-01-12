use super::parser::resource_parser::DownloadIndex;

pub struct ConcurrentDownloader {
    pub download_index: Vec<DownloadIndex>,
    pub total_size: Option<usize>,
    pub current_requests_number: usize,
}