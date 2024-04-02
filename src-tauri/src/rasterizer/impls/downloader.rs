use std::{
    fs::{create_dir_all, File},
    io::Write,
    sync::atomic::{AtomicUsize, Ordering},
    thread::{self, sleep},
    time::Duration,
};

use futures::{stream, StreamExt};

use crate::rasterizer::models::{
    downloader::{ConcurrentDownloader, DownloadManager},
    parser::resource_parser::DownloadIndex,
};

enum DownloaderError {
    Io(std::io::Error),
    Request(reqwest::Error, DownloadIndex),
}

impl ConcurrentDownloader {
    async fn download(
        self,
        counter: &AtomicUsize,
    ) -> Result<Vec<DownloadIndex>, Box<dyn std::error::Error>> {
        let map_io_err = |err: std::io::Error| DownloaderError::Io(err);
        fn map_request_err(err: reqwest::Error, download_index: DownloadIndex) -> DownloaderError {
            DownloaderError::Request(err, download_index)
        }

        let client = reqwest::Client::new();

        let mut stream = stream::iter(self.download_index)
            .map(|download_index| {
                let client = &client;
                async move {
                    create_dir_all(download_index.path.parent().unwrap()).map_err(map_io_err)?;
                    let mut file = File::create(download_index.path.clone()).map_err(map_io_err)?;
                    let resp = client
                        .get(&download_index.url)
                        .send()
                        .await
                        .map_err(|err| map_request_err(err, download_index.clone()))?
                        .bytes()
                        .await
                        .map_err(|err| map_request_err(err, download_index.clone()))?;
                    file.write_all(&resp).map_err(map_io_err)?;
                    counter.fetch_add(resp.len(), Ordering::Relaxed);
                    Ok::<(), DownloaderError>(())
                }
            })
            .buffer_unordered(self.concurrent_request_number);

        let mut retry_index: Vec<DownloadIndex> = Vec::new();
        while let Some(result) = stream.next().await {
            match result {
                Ok(_) => (),
                Err(err) => match err {
                    DownloaderError::Io(err) => break,
                    DownloaderError::Request(err, index) => retry_index.push(index),
                },
            }
        }

        Ok(retry_index)
    }
}

impl DownloadManager {
    async fn download(self) -> Result<(), Box<dyn std::error::Error>> {
        let total_bytes = self
            .download_index
            .clone()
            .into_iter()
            .map(|index| index.size.unwrap())
            .sum::<usize>();
        static BYTES_COUNTER: AtomicUsize = AtomicUsize::new(0);
        let downloader = ConcurrentDownloader {
            download_index: self.download_index.clone(),
            concurrent_request_number: self.concurrent_request_number,
        };
        thread::spawn(move || {
            let mut byte_counter_cache: Vec<usize> = vec![0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            loop {
                let current_count = *&BYTES_COUNTER.load(Ordering::Relaxed);
                byte_counter_cache.remove(0);
                byte_counter_cache.push(current_count);
                let percentage = (current_count as f32 / total_bytes as f32) * 100 as f32;
                let speed = (byte_counter_cache[9] - byte_counter_cache[0]) as f32 / 1048576 as f32;
                println!("{:#?}%, {:#?} MB/s", percentage as u32, speed);

                sleep(Duration::from_millis(100))
            }
        });
        let retry = downloader.download(&BYTES_COUNTER).await?;
        Ok(())
    }
}
