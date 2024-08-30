use tauri::api::process::Command;
use tauri::Manager;

#[tauri::command]
fn launch_app(path: String) -> Result<String, String> {
    Command::new(&path)
        .spawn()
        .map(|_| "Application launched successfully".to_string())
        .map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![launch_app])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
