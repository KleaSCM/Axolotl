use tauri::Builder;

fn main() {
    // Initialize Tauri application
    Builder::default()
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
