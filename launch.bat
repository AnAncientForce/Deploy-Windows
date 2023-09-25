@echo off
echo Running as administrator...
>nul 2>&1 "%SYSTEMROOT%\System32\cacls.exe" "%SYSTEMROOT%\System32\config\system" || (
    echo Requesting administrative privileges...
    goto UACPrompt
)
python "%~dp0main.py"
goto :EOF

:UACPrompt
powershell.exe -Command "Start-Process -FilePath '%0' -ArgumentList '%~dp0main.py' -Verb RunAs"
exit /B
