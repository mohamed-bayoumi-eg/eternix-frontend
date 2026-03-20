# 1. ضبط مكان العمل ليكون نفس مجلد السكريبت
Set-Location $PSScriptRoot

# 2. البيانات الأساسية
$DOCKER_USER = "mbayoumieg"
$IMAGE_NAME  = "eternix-frontend"
$DATE_TAG    = Get-Date -Format "yyyyMMdd-HHmm"

Write-Host "--- Starting Frontend Cloud Push ---" -ForegroundColor White

try {
    # التأكد من وجود ملف الـ Dockerfile في نفس المكان
    if (!(Test-Path "Dockerfile")) {
        throw "Error: Dockerfile not found in $(Get-Location). Make sure the script is in the frontend folder."
    }

    # الخطوة 1: التأكد من تسجيل الدخول
    Write-Host "[1/3] Checking Docker Login..." -ForegroundColor Cyan
    docker login

    # الخطوة 2: بناء الصورة (Build)
    Write-Host "[2/3] Building Image: ${DOCKER_USER}/${IMAGE_NAME}..." -ForegroundColor Yellow
    docker build -t ${DOCKER_USER}/${IMAGE_NAME}:latest -t ${DOCKER_USER}/${IMAGE_NAME}:${DATE_TAG} .

    if ($LASTEXITCODE -ne 0) { throw "Build Failed! Check the console for errors." }

    # الخطوة 3: الرفع (Push)
    Write-Host "[3/3] Pushing to Docker Hub..." -ForegroundColor Blue
    docker push ${DOCKER_USER}/${IMAGE_NAME}:latest
    docker push ${DOCKER_USER}/${IMAGE_NAME}:${DATE_TAG}

    if ($LASTEXITCODE -ne 0) { throw "Push Failed! Check your internet or Docker Hub permissions." }

    Write-Host "SUCCESS: Frontend is now live on Docker Hub!" -ForegroundColor Green
}
catch {
    Write-Host "`n❌ ERROR: $($_.Exception.Message)" -ForegroundColor Red
}

# تنظيف الصور غير المستخدمة (Dangling Images)
Write-Host "Cleaning up local cache..." -ForegroundColor Gray
docker image prune -f

Write-Host "`n[COMPLETED] Press any key to exit..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")