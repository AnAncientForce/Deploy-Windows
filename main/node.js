const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const { exec } = require("child_process");
const { spawn } = require("child_process");
const path = require("path");
const os = require("os");
const helper = require("../modules/helper.js");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 750,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  if (helper.isUsingLinux()) {
    if (helper.readJSONValue("developer_mode")) {
      mainWindow.webContents.openDevTools();
    }
  } else {
    mainWindow.webContents.openDevTools();
  }
  // mainWindow.maximize();
  mainWindow.loadFile("main/index.html");
  Menu.setApplicationMenu(null);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

ipcMain.on("close-application", () => {
  app.quit();
});
