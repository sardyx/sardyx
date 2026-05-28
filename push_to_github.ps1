$git = "C:\Program Files\Git\cmd\git.exe"
$repo = "https://github.com/sardyx/sardyx.git"
$dir  = "C:\Users\SarDar\Desktop\SARDYX"

Set-Location $dir

Write-Host "=== Git version ===" -ForegroundColor Cyan
& $git --version

Write-Host "`n=== Initializing repo ===" -ForegroundColor Cyan
& $git init

Write-Host "`n=== Setting remote ===" -ForegroundColor Cyan
$remotes = & $git remote
if ($remotes -contains "origin") {
    & $git remote set-url origin $repo
    Write-Host "Remote 'origin' updated."
} else {
    & $git remote add origin $repo
    Write-Host "Remote 'origin' added."
}

Write-Host "`n=== Staging all files ===" -ForegroundColor Cyan
& $git add .

Write-Host "`n=== Committing ===" -ForegroundColor Cyan
& $git commit -m "Initial commit: SARDYX AI Agency website"

Write-Host "`n=== Pushing to GitHub ===" -ForegroundColor Cyan
& $git branch -M main
& $git push -u origin main --force

Write-Host "`n=== DONE! Check https://github.com/sardyx/sardyx ===" -ForegroundColor Green
