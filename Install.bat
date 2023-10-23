@echo off
pushd "%~dp0"
git pull
npm i
call "Admin Run.bat"