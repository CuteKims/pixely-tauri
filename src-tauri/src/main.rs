// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod rasterizer;
mod bridger;
mod statics;

use tauri::{Manager, Window};
use window_shadows;
use serde_json;
use std::{self, thread, sync::mpsc};

#[tauri::command]
async fn rasterizer_bridger(task: String, window: Window) -> Result<bridger::models::Return, String> {
    println!("{:#?}", task);
    let task: bridger::models::Task = serde_json::from_str(&task)
        .map_err(|err| err.to_string())?;
    let result = task.dispatch(window).await.map_err(|error: Box<dyn std::error::Error>| error.to_string())?;
    println!("{:#?}", result);
    Ok(result)
}

pub struct Notification {
    
}


#[tokio::main]
async fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            window_shadows::set_shadow(&window, true).unwrap();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![rasterizer_bridger])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}