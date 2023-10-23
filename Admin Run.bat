@echo off
pushd "%~dp0"
runas /user:Administrator "npm start"
popd