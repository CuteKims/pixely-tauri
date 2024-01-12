use std::{sync::atomic::{AtomicUsize, Ordering}, fs::{create_dir_all, File}, io::Write};

use futures::{stream, StreamExt};

use crate::rasterizer::models::{downloader::ConcurrentDownloader, parser::resource_parser::DownloadIndex};

enum DownloaderError {
    Io(std::io::Error),
    Request(reqwest::Error, DownloadIndex),
}

impl ConcurrentDownloader {
    async fn download(self, counter: AtomicUsize) -> Result<(), Box<dyn std::error::Error>> {

        let map_io_err = |err: std::io::Error| {DownloaderError::Io(err)};
        fn map_request_err(err: reqwest::Error, download_index: DownloadIndex) -> DownloaderError {
            DownloaderError::Request(err, download_index)
        }

        let client = reqwest::Client::new();

        let bodies = stream::iter(self.download_index)
            .map(|download_index| {
                let client = &client;
                let counter = &counter;
                    async move {
                        create_dir_all(download_index.path.parent().unwrap()).map_err(map_io_err)?;
                        let mut file = File::create(download_index.path.clone()).map_err(map_io_err)?;
                        let resp = client.get(&download_index.url).send().await.map_err(|err| map_request_err(err, download_index.clone()))?.bytes().await.map_err(|err| map_request_err(err, download_index.clone()))?;
                        file.write_all(&resp).map_err(map_io_err)?;
                        counter.fetch_add(resp.len(), Ordering::Relaxed);
                        Ok::<(), DownloaderError>(())
                    }
            })
            .buffer_unordered(self.current_requests_number);

        bodies
            .for_each(|result| async move {
                match result {
                    Ok(_) => {},
                    Err(err) => {
                        match err {
                            DownloaderError::Io(_) => todo!(),
                            DownloaderError::Request(_err, _download_index) => {
                                todo!()
                            },
                        }
                    },
                }
            })
            .await;
        Ok(())
    }
}