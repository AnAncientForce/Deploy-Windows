const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const { exec } = require("child_process");
const { spawn } = require("child_process");
const path = require("path");
const os = require("os");
const helper = require("../modules/helper.js");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1250,
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
  init_values();
  Menu.setApplicationMenu(null);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

ipcMain.on("close-application", () => {
  app.quit();
});

function init_values() {
  // Read the registry value and set the initial checkbox state
  const registryKey =
    "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System";
  const registryValueName = "VerboseStatus";

  exec(
    `reg query "${registryKey}" /v "${registryValueName}"`,
    (error, stdout, stderr) => {
      if (!error) {
        // Check if the registry value exists and its data
        if (stdout.includes("REG_DWORD") && stdout.includes("0x1")) {
          // Enable verbose logging
          mainWindow.webContents.send("initialize-checkbox", true);
        } else {
          // Disable verbose logging
          mainWindow.webContents.send("initialize-checkbox", false);
        }
      }
    }
  );
}

ipcMain.on("verbose-logging", (event, enableLogging) => {
  const registryKey =
    "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System";
  const registryValueName = "VerboseStatus";

  const enableCommand = `reg add "${registryKey}" /v "${registryValueName}" /t REG_DWORD /d 1 /f`;
  const disableCommand = `reg delete "${registryKey}" /v "${registryValueName}" /f`;

  const commandToExecute = enableLogging ? enableCommand : disableCommand;

  exec(commandToExecute, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
    console.log(`Command executed: ${commandToExecute}`);
  });
});
