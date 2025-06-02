$categories = @(
    "office-furniture",
    "books",
    "teachers-supplies",
    "gifts-decoration",
    "school-supplies",
    "office-supplies",
    "kids",
    "courses",
    "uniforms",
    "kits"
)

$basePath = "C:\Users\win\Downloads\capp1\public\images\store\cate"

# Create the directory if it doesn't exist
if (-not (Test-Path $basePath)) {
    New-Item -Path $basePath -ItemType Directory -Force
}

# Create placeholder PNG files for each category
foreach ($category in $categories) {
    $filePath = Join-Path -Path $basePath -ChildPath "$category.png"
    
    # Create an empty file if it doesn't exist
    if (-not (Test-Path $filePath)) {
        New-Item -Path $filePath -ItemType File -Force
        Write-Host "Created placeholder image: $filePath"
    } else {
        Write-Host "Placeholder image already exists: $filePath"
    }
}

Write-Host "All placeholder images have been created."
