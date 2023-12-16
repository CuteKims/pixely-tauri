use std::path::Path;

pub struct Downloader {
    files: Vec<Box<DownloaderFileIndex>>,
    thread_number: i32,
}

pub struct DownloaderFileIndex {
    download_url: String,
    file_size: Option<i32>,
    hash: Option<String>,
    file_path: Path
}