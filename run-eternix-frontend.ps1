if (!(docker info 2>$null)) {
    Write-Host "Docker is not running. Please start Docker Desktop first." -ForegroundColor Yellow
    exit
}

Write-Host "Rebuilding and Starting Frontend..." -ForegroundColor Cyan

docker-compose up --build -d

if ($LASTEXITCODE -eq 0) {
    Write-Host "Frontend is updated and running!" -ForegroundColor Green
} else {
    Write-Host "Failed to build Frontend." -ForegroundColor Red
}