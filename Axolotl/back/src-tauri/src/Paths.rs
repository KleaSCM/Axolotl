use serde_json::json;
use std::fs;
use std::path::{Path, PathBuf};

pub fn generate_app_paths_json() -> Result<(), Box<dyn std::error::Error>> {
    // Updated path to match the provided directory
    let dir_path = Path::new(
        "C:\\Users\\Kliea\\Documents\\Development\\Axolotl\\Axolotl\\front\\axolotl\\public\\utils\\paths",
    );

    // Create the directory if it doesn't exist
    if !dir_path.exists() {
        fs::create_dir_all(dir_path)?;
    }

    let mut app_paths = serde_json::Map::new();

    for entry in fs::read_dir(dir_path)? {
        let entry = entry?;
        let path = entry.path();
        if path.extension().unwrap_or_default() == "lnk" {
            let file_name = path
                .file_stem()
                .unwrap_or_default()
                .to_str()
                .unwrap_or_default()
                .replace(".lnk", ""); // Remove .lnk extension
            let target_path = path.to_str().unwrap_or_default();
            app_paths.insert(file_name.to_string(), json!({ "path": target_path }));
        }
    }

    let json_content = json!(app_paths);
    let json_path = Path::new(
        "C:\\Users\\Kliea\\Documents\\Development\\Axolotl\\Axolotl\\front\\axolotl\\public\\utils\\paths\\AppPaths.json",
    );

    // Create parent directory if it doesn't exist
    if let Some(parent) = json_path.parent() {
        if !parent.exists() {
            fs::create_dir_all(parent)?;
        }
    }

    fs::write(json_path, json_content.to_string())?;
    Ok(())
}
