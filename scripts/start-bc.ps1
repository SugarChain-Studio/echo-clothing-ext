function Find-BondageCollegeFolder {
    param (
        [string]$CurrentPath
    )
    if (Test-Path (Join-Path $CurrentPath "Bondage-College")) {
        return (Join-Path $CurrentPath "Bondage-College")
    }
    $ParentPath = (Get-Item $CurrentPath).Parent.FullName
    if ($ParentPath -eq $CurrentPath) {
        return $null
    }
    return Find-BondageCollegeFolder -CurrentPath $ParentPath
}

$cwd = Get-Location

$CurrentPath = Get-Location

$BondageCollegePath = Find-BondageCollegeFolder -CurrentPath $CurrentPath

if ($null -eq $BondageCollegePath) {
    Write-Host "未找到 Bondage-College 文件夹"
    exit
}

Set-Location $BondageCollegePath

if (-not (Test-Path "BondageClub")) {
    Write-Host "BondageClub 文件夹不存在"
}

Start-Process powershell -ArgumentList "-NoExit", "-Command", "http-server . -c-1 -p 3000"

Set-Location $cwd