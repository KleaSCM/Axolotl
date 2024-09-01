use std::process::Command;
use tauri::Manager;

#[tauri::command]
fn launch_application(path: String) {
    Command::new(path)
        .spawn()
        .expect("Failed to launch application");
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![launch_application])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
