use std::fs;
use std::fs::File;
use std::io::Write;
use std::path::Path;
use tauri::Manager;

fn generate_app_paths_json(directory: &str) {
    let json_path = format!("{}/AppPaths.json", directory);

    // Check if AppPaths.json exists
    if Path::new(&json_path).exists() {
        // Delete the existing AppPaths.json
        fs::remove_file(&json_path).expect("Failed to delete existing AppPaths.json");
    }

    // Create a new AppPaths.json file
    let mut file = File::create(&json_path).expect("Failed to create AppPaths.json");

    // Get the list of .lnk files in the directory
    let paths = fs::read_dir(directory).unwrap();

    // Initialize the JSON content
    let mut json_content = String::from("[\n");

    for path in paths {
        let path = path.unwrap().path();
        let file_name = path.file_name().unwrap().to_string_lossy().to_string();

        if file_name.ends_with(".lnk") {
            // Extract the base name (without the extension)
            let base_name = file_name.replace(".exe.lnk", "").replace(".lnk", "");

            // Generate the icon file path
            let icon_file = format!("/utils/paths/{}.jpg", base_name);

            // Write the JSON object for this file
            json_content.push_str(&format!(
                "    {{\n        \"name\": \"{}\",\n        \"path\": \"{}\",\n        \"icon\": \"{}\"\n    }},\n",
                base_name,
                path.to_string_lossy().replace("\\", "\\\\"),
                icon_file
            ));
        }
    }

    // Remove the last comma and close the JSON array
    json_content.pop(); // Remove last '\n'
    json_content.pop(); // Remove last ','
    json_content.push_str("\n]");

    // Write the JSON content to the file
    file.write_all(json_content.as_bytes())
        .expect("Failed to write to AppPaths.json");
}

fn main() {
    // Generate the AppPaths.json file
    let directory =
        r"C:\Users\Kliea\Documents\Development\Axolotl\Axolotl\front\axolotl\public\utils\paths";
    generate_app_paths_json(directory);

    tauri::Builder::default()
        .setup(|app| {
            // Setup code here
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// use std::process::Command;
// use tauri::Manager;

// fn run_powerShell_script() {
//     let script_path = r"C:\Users\Kliea\Documents\Development\Axolotl\Axolotl\front\axolotl\public\utils\paths\Script.ps1";
//     let output = Command::new("powershell")
//         .arg("-ExecutionPolicy")
//         .arg("Bypass")
//         .arg("-File")
//         .arg(script_path)
//         .output()
//         .expect("Failed to execute PowerShell script");

//     if !output.status.success() {
//         eprintln!(
//             "PowerShell script failed with error: {:?}",
//             String::from_utf8_lossy(&output.stderr)
//         );
//     } else {
//         println!("PowerShell script executed successfully");
//     }
// }

// fn main() {
//     // Run the PowerShell script at application startup
//     run_powerShell_script();

//     tauri::Builder::default()
//         .setup(|app| {
//             // Setup code here
//             Ok(())
//         })
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }
