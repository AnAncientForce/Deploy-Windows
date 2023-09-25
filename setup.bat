@echo off
setlocal
pip install -r requirements.txt

rem Get the directory of the batch script
set "SCRIPT_DIR=%~dp0"

rem Set the working directory to the script's directory
set "WORKING_DIRECTORY=%SCRIPT_DIR%"

rem Navigate to the working directory
cd /d "%WORKING_DIRECTORY%"

rem Clone or update the GitHub repository
git clone https://github.com/AnAncientForce/Deploy-Windows.git 2>nul || (
    echo Repository already exists, updating...
    cd "Deploy-Windows"
    git pull
)

echo Done!

endlocal