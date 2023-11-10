// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod rasterizer;
mod bridger;
mod consts;

use tauri::Manager;
use window_shadows::set_shadow;
use serde_json;
use std;
use reqwest;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn handle_get_response(target: &str) -> Result<String, String> {
    let resp = reqwest::get(target).await;
    match resp {
        Ok(resp) => {
            let resp = resp.text().await;
            match resp {
                Ok(resp) => return Ok(resp),
                Err(err) => return Err(err.to_string()),
            }
        }
        Err(err) => return Err(err.to_string()),
    }
}

#[tauri::command]
async fn rasterizer_bridger(request: &str) -> Result<bridger::models::Return, String> {
    let request: bridger::models::RawRequest = serde_json::from_str(request)
        .map_err(|err| err.to_string())?;
    let request: bridger::models::Request = request.parse()?;
    request.execute()
}

#[tokio::main]
async fn main() {
    let core = rasterizer::models::core::CoreInitializer {
        client_token: consts::CLIENT_TOKEN,
        root_path: std::path::Path::new("D:/CodenamePixely/Minecraft"),
    };
    let core = core.init();
    
    println!("Hello, World!");
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            set_shadow(&window, true).unwrap();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, handle_get_response])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

async fn get_version_manifest() -> Result<String, reqwest::Error> {
    let resp = reqwest::get("https://piston-meta.mojang.com/mc/game/version_manifest.json")
        .await
        .unwrap()
        .text()
        .await;
    resp
}

async fn hello_world() {
    println!("Hello, World!")
}