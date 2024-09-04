# Define the directory path
$directoryPath = "C:\Users\Kliea\Documents\Development\Axolotl\Axolotl\front\axolotl\public\utils\paths"

# Get all .lnk files
$shortcuts = Get-ChildItem -Path $directoryPath -Filter *.lnk

# Create an empty array to hold app paths
$appPaths = @()

foreach ($shortcut in $shortcuts) {
    # Extract application name (including .exe if present)
    $appName = [System.IO.Path]::GetFileNameWithoutExtension($shortcut.Name)
    if ($appName -match "\.exe$") {
        $appName = [System.IO.Path]::GetFileName($shortcut.Name) -replace ".lnk$", ""
    }

    # Construct the path to the icon
    $iconFileName = $appName + ".jpg"
    if (-not (Test-Path -Path (Join-Path $directoryPath $iconFileName))) {
        $iconFileName = $appName + ".png"
    }
    
    # Construct the relative icon path
    $iconPath = "/utils/paths/" + $iconFileName

    # Add the application to the array
    $appPaths += [PSCustomObject]@{
        name = [System.IO.Path]::GetFileNameWithoutExtension($shortcut.Name) # Adjusted to match name field as needed
        path = $shortcut.FullName
        icon = $iconPath
    }
}

# Define the path for the JSON file
$jsonFilePath = Join-Path -Path $directoryPath -ChildPath "AppPaths.json"

# Convert the array to JSON and write it to a file
$appPaths | ConvertTo-Json -Depth 10 | Set-Content -Path $jsonFilePath -Force

Write-Output "AppPaths.json has been created and saved to $jsonFilePath"
