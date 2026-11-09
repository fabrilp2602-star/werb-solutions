$pages = @(
    'https://werbsolutions.com/',
    'https://werbsolutions.com/about',
    'https://werbsolutions.com/electrical-services',
    'https://werbsolutions.com/solar-%26-eco-services',
    'https://werbsolutions.com/construction-services'
)

$allImages = @{}
$outDir = 'c:\Users\pablo\Documents\werbsolutions\extracted_images'
if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force
}

foreach ($url in $pages) {
    try {
        Write-Host "Fetching $url..."
        $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -UserAgent 'Mozilla/5.0'
        $html = $resp.Content
        $matches = [regex]::Matches($html, '(?://img1\.wsimg\.com/isteam/ip/[^\s"''\)<>]+|https?://img1\.wsimg\.com/isteam/ip/[^\s"''\)<>]+)')
        foreach ($m in $matches) {
            $val = $m.Value
            $clean = $val -replace '/:.*$', ''
            if ($clean.StartsWith('//')) {
                $clean = 'https:' + $clean
            }
            $allImages[$clean] = $url
        }
    } catch {
        Write-Host "Error fetching $url : $_"
    }
}

Write-Host "Total unique images found: $($allImages.Count)"
$inventory = @()
$idx = 1
foreach ($entry in $allImages.GetEnumerator()) {
    $imgUrl = $entry.Key
    $origin = $entry.Value
    $uri = [System.Uri]$imgUrl
    $rawName = [System.IO.Path]::GetFileName($uri.LocalPath)
    $cleanName = [System.Web.HttpUtility]::UrlDecode($rawName)
    $cleanName = $cleanName -replace '[\\/*?:"<>|]', '_'
    if (-not $cleanName.EndsWith('.jpg') -and -not $cleanName.EndsWith('.png') -and -not $cleanName.EndsWith('.webp') -and -not $cleanName.EndsWith('.svg')) {
        $cleanName += ".jpg"
    }
    $filename = "{0:D2}_{1}" -f $idx, $cleanName
    $targetPath = Join-Path $outDir $filename

    Write-Host "[$idx] Downloading $imgUrl -> $filename"
    try {
        Invoke-WebRequest -Uri $imgUrl -OutFile $targetPath -UseBasicParsing -UserAgent 'Mozilla/5.0'
        $inventory += "$filename | Page: $origin | Url: $imgUrl"
    } catch {
        Write-Host "Failed downloading $imgUrl : $_"
        $inventory += "FAILED: $filename | $imgUrl"
    }
    $idx++
}

$inventory | Out-File -FilePath (Join-Path $outDir 'inventory.txt') -Encoding utf8
Write-Host "Done!"
