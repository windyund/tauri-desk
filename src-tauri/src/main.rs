// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn handle_excel_upload(file: Vec<u8>) -> Result<(), String> {
    // 在这里处理接收到的 Excel 文件数据
    // 例如：保存到本地、解析数据、存储到数据库等操作
    // 这里的示例仅是简单的打印和返回确认
    println!("Received Excel file with {} bytes", file.len());
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet,handle_excel_upload])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
