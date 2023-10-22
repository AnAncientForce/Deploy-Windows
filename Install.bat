@echo off
pushd "%~dp0"
git pull
npm i
npm start
popd