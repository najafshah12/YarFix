@echo off
title Push YarFix to GitHub
echo ========================================================
echo   Pushing YarFix to https://github.com/najafshah12/YarFix
echo ========================================================
echo.

set "PATH=C:\Users\New Rohaan Computers\.local\git\cmd;%PATH%"
cd /d "%~dp0"

echo Current Git status:
git.exe status

echo.
echo Pushing branch 'main' to GitHub...
echo (If prompted, please sign in to GitHub in the browser window)
echo.

git.exe push -u origin main

echo.
echo ========================================================
if %ERRORLEVEL% equ 0 (
    echo   SUCCESS! YarFix has been pushed to GitHub.
) else (
    echo   Push encountered an error. Please see message above.
)
echo ========================================================
echo.
pause
