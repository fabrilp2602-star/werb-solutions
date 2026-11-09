Add-Type -AssemblyName System.Drawing

$dir = 'C:\Users\pablo\Documents\werbsolutions\extracted_images'
$files = Get-ChildItem -Path $dir | Where-Object { $_.Extension -match '\.(jpg|png|webp|mp4)$' }

foreach ($item in $files) {
    if ($item.Extension -eq '.mp4') {
        $mb = [math]::Round($item.Length / 1MB, 2)
        Write-Host "$($item.Name) | MP4 VIDEO | ${mb} MB"
    } else {
        try {
            $stream = [System.IO.File]::OpenRead($item.FullName)
            $img = [System.Drawing.Image]::FromStream($stream)
            $w = $img.Width
            $h = $img.Height
            $ratio = [math]::Round($w / $h, 2)
            $img.Dispose()
            $stream.Dispose()
            $kb = [math]::Round($item.Length / 1KB, 1)
            Write-Host "$($item.Name) | ${w}x${h} (Ratio $ratio) | ${kb} KB"
        } catch {
            Write-Host "$($item.Name) | ERROR: $_"
        }
    }
}
