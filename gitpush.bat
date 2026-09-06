@echo off

cd /d "C:\Users\hp\OneDrive\Desktop\hotel"
echo Starting Auto-Push script for hotel E-Commerce website
echo It will check and push your code to GitHub every 20 minutes.
echo Keep this window open while you are coding.
echo Press Ctrl+C to stop.
echo.

:loop
echo [%time%] Checking for changes...
git add .
git commit -m "Ecommerce_Hotel_Project" >nul 2>&1
git push origin main >nul 2>&1

timeout /t 1200 /nobreak >nul
goto loop