$srcDir = 'C:\Users\pablo\Documents\werbsolutions\extracted_images'
$destDir = 'C:\Users\pablo\Documents\werbsolutions\public\media'
if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force }

$items = Get-ChildItem $srcDir

# Mapeo usando patrones (regex o wildcard) para evitar discrepancias de codificación en el carácter ellipsis (U+2026)
$patternMapping = @(
    # 1. Branding & Logo
    @{ Pattern = '^logo\.webp$'; Target = 'brand_logo_luxury.webp' },
    @{ Pattern = 'Modern_luxury_logo.*083ff618'; Target = 'brand_logo_gold_horizontal.webp' },
    @{ Pattern = 'WERB_SOLUTIONS_logo.*6ab5a322'; Target = 'brand_logo_shield_symbol.webp' },

    # 2. Hero Principal (Mobile 9:16 & Desktop 16:9)
    @{ Pattern = 'Electrician_holding_diagnostic.*eb32e369'; Target = 'hero_master_electrician_mobile.webp' },
    @{ Pattern = 'Electrician_holding_diagnostic.*34f2a61b'; Target = 'hero_diagnostics_tablet_mobile.webp' },
    @{ Pattern = 'Electrician_holding_diagnostic.*6475e4e7'; Target = 'hero_tech_manhattan_mobile.webp' },
    @{ Pattern = 'Electrician_reviewing_blueprints.*639aa133'; Target = 'hero_loft_blueprints_desktop.webp' },
    @{ Pattern = 'Luxury_penthouse_with_Manhattan.*4e9d7acf'; Target = 'hero_penthouse_skyline_desktop.webp' },

    # 3. Servicios Especializados (EV Chargers, Residential, Lighting, Solar, Commercial)
    @{ Pattern = 'Electrician_installing_EV_chargi.*8763f3a6'; Target = 'service_ev_charger_install_mobile.webp' },
    @{ Pattern = 'EV_charger_wall_mount_installation.*98492827'; Target = 'service_ev_wallbox_detail_mobile.webp' },
    @{ Pattern = 'Modern_penthouse_living_room.*1783a626'; Target = 'service_lighting_penthouse_mobile.webp' },
    @{ Pattern = 'Residential_exterior_lighting.*39659fb2'; Target = 'service_lighting_exterior_mobile.webp' },
    @{ Pattern = 'Solar_panels_on_Brooklyn_rooftop.*e28b91b5'; Target = 'service_solar_brooklyn_rooftop_mobile.webp' },
    @{ Pattern = 'Technician_testing_electrical.*34e86789'; Target = 'service_panel_testing_mobile.webp' },
    @{ Pattern = 'Technician_verifying_electrical.*2076533e'; Target = 'service_panel_verification_desktop.webp' },
    @{ Pattern = 'Workers_conducting_morning_safet.*24491489'; Target = 'service_safety_briefing_desktop.webp' },

    # 4. Archivos heredados / GoDaddy originales
    @{ Pattern = '01_pexels_joshsorenson.*fc277a10'; Target = 'legacy_electrical_wires.webp' },
    @{ Pattern = '02_pexels_solar_farm.*db3a8453'; Target = 'legacy_solar_farm.webp' },
    @{ Pattern = '03_pexels_lightbulb_idea.*31889f24'; Target = 'legacy_lightbulb_idea.webp' },
    @{ Pattern = '04_werb_logo_typeface.*05a2e7ad'; Target = 'legacy_logo_white.webp' },
    @{ Pattern = '05_hero_web_pg1.*b96b047b'; Target = 'legacy_hero_original.webp' },
    @{ Pattern = '06_construction_workers.*f9a24f7e'; Target = 'legacy_construction_workers.webp' },
    @{ Pattern = '07_pexels_construction_site.*6ef9fcae'; Target = 'legacy_construction_site.webp' },
    @{ Pattern = '08_solar_panels_design.*37f9f79e'; Target = 'legacy_solar_design.webp' },
    @{ Pattern = '09_pexels_solar_installers.*c85812dc'; Target = 'legacy_solar_installers.webp' }
)

Write-Host "Iniciando conversion ultra-optimizada a WebP (con patron regex)..."

foreach ($map in $patternMapping) {
    $match = $items | Where-Object { $_.Name -match $map.Pattern } | Select-Object -First 1
    if ($match) {
        $srcPath = $match.FullName
        $destPath = Join-Path $destDir $map.Target
        Write-Host "Convirtiendo $($match.Name) -> $($map.Target)"
        & ffmpeg -y -i $srcPath -c:v libwebp -q:v 82 $destPath 2>$null
        $sizeKb = [math]::Round((Get-Item $destPath).Length / 1KB, 1)
        Write-Host "  Listo: $($map.Target) ($sizeKb KB)"
    } else {
        Write-Host "  No encontrado para patron: $($map.Pattern)"
    }
}

# Copiar los dos videos MP4
$videoPatterns = @(
    @{ Pattern = 'Electrician_inspecting_electrica.*dcfbd4f0'; Target = 'Electrician_inspecting_electrica._dcfbd4f0.mp4' },
    @{ Pattern = 'Electrician_turns_on_house_lights.*97696683'; Target = 'Electrician_turns_on_house_lights_97696683.mp4' }
)

foreach ($vp in $videoPatterns) {
    $vMatch = $items | Where-Object { $_.Name -match $vp.Pattern } | Select-Object -First 1
    if ($vMatch) {
        $vidDest = Join-Path $destDir $vp.Target
        Copy-Item -Path $vMatch.FullName -Destination $vidDest -Force
        Write-Host "Copiado video: $($vp.Target)"
    } else {
        Write-Host "  Video no encontrado: $($vp.Pattern)"
    }
}

Write-Host "`nResumen de archivos en public/media:"
Get-ChildItem $destDir | Select-Object Name, Length
