# Vibe Commerce Cart - Development Server Starter
Write-Host "Starting Vibe Commerce Cart Application..." -ForegroundColor Green
Write-Host ""

# Start Backend Server
Write-Host "Starting Backend Server..." -ForegroundColor Yellow
Set-Location "backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal

# Wait a moment for backend to initialize
Start-Sleep -Seconds 3

# Start Frontend Server  
Write-Host "Starting Frontend Server..." -ForegroundColor Yellow
Set-Location "../frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm start" -WindowStyle Normal

Write-Host ""
Write-Host "🚀 Both servers are starting!" -ForegroundColor Green
Write-Host "📡 Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "🌐 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Tip: The frontend will automatically open in your browser!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to close this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")