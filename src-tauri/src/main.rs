// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod bridger;
mod rasterizer;
mod statics;

use tokio::{fs::File, runtime, spawn, sync::{broadcast, mpsc}};
use std::{path::PathBuf, thread};
use tauri::{Manager, State};

fn rasterizer(
    mut receiver: mpsc::Receiver<TaskRequest>,
    broadcaster: broadcast::Sender<TaskResponse>
) {
    let (tx, rx) = mpsc::channel::<Vec<DownloadRequest>>(32);

    let task_thread = thread::spawn(|| {
        let rt = runtime::Runtime::new().unwrap();
    });

    let download_thread = thread::spawn(|| {
        let rt = runtime::Builder::new_multi_thread()
            .worker_threads(4)
            .enable_all()
            .build()
            .unwrap();
    });

    let dispatcher_thread = thread::spawn(move || {
        println!("Task thread up and running");
        while let Some(req) = receiver.blocking_recv() {
            match req {
                TaskRequest::New(_) => todo!(),
                TaskRequest::Cancel(_) => todo!(),
            }
        }
    });

    dispatcher_thread.join();

}

#[tauri::command]
async fn rasterizer_bridger(
    id: String,
    keyword: String,
    custom: String,
    window: tauri::Window,
    bridger: State<'_, BridgerChannel>
) -> Result<(), String> {
    let task_id = id.clone();
    let task = TaskRequest::New(NewTask {id, keyword, custom});
    println!("{:#?}", task);
    bridger.sender.send(task).await.unwrap();
    let mut listener = bridger.listener.resubscribe();
    tauri::async_runtime::spawn(async move {
        while let Ok(result) = listener.recv().await {
            if result.id == task_id {
                window.emit("rasterizer_bridger", serde_json::to_string(&result).unwrap()).unwrap();
                break;
            }
        }
    });
    Ok(())
}

struct DownloadRequest {
    path: PathBuf,
    sha1: Option<String>,
    size: Option<usize>,
    url: String,
}

struct BridgerChannel {
    sender: mpsc::Sender<TaskRequest>,
    listener: broadcast::Receiver<TaskResponse>
}

#[derive(Clone, Debug)]
#[derive(serde::Serialize, serde::Deserialize)]
enum TaskRequest {
    New(NewTask),
    Cancel(CancelTask),
}

#[derive(Clone, Debug)]
#[derive(serde::Serialize, serde::Deserialize)]
struct NewTask {
    id: String,
    keyword: String,
    custom: String,
}

#[derive(Clone, Debug)]
#[derive(serde::Serialize, serde::Deserialize)]
struct CancelTask {
    id: String,
}

#[derive(Clone, Debug)]
#[derive(serde::Serialize, serde::Deserialize)]
struct TaskResponse {
    id: String,
    state: TaskState,
    custom: String,
}

#[derive(Clone, Debug)]
#[derive(serde::Serialize, serde::Deserialize)]
enum TaskState {
    Pending,
    Executing(Option<i8>),
    Finished,
    Cancelled,
}

fn main() {
    let (sender, receiver) = mpsc::channel::<TaskRequest>(32);
    let (broadcaster, listener) = broadcast::channel::<TaskResponse>(32);

    let rasterizer_thread = thread::spawn(move || rasterizer(receiver, broadcaster));

    tauri::Builder::default()
        .manage(BridgerChannel {sender: sender.clone(), listener})
        .setup(move |app| {
            let sender = sender.clone();
            app.listen("rasterizer_bridger", move |event| {
                sender.blocking_send(TaskRequest::Cancel(CancelTask {id: event.payload().to_string()})).unwrap();
            });
            let window = app.get_webview_window("main").unwrap();
            window.with_webview(|webview| {
                #[cfg(windows)]
                unsafe {
                    webview.controller().SetZoomFactor(1.0).unwrap();
                }
            }).unwrap();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![rasterizer_bridger])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}