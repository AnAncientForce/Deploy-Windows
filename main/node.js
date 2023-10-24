const { app, BrowserWindow, ipcMain, Menu, dialog } = require("electron");
const { exec } = require("child_process");
const { spawn } = require("child_process");
const path = require("path");
const os = require("os");
const helper = require("../modules/helper.js");
const fs = require("fs");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1250,
    height: 750,
    icon: "images/icon.ico",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  if (helper.readJSONValue("developer_mode")) {
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

ipcMain.on("invoke-reg-values", (event) => {
  // mainWindow.webContents.send("message-from-main", `Logged to secondary process`);
  const registryKey =
    "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System";
  const registryValueName = "VerboseStatus";

  exec(
    `reg query "${registryKey}" /v "${registryValueName}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error when querying the registry: ${error}`);
        mainWindow.webContents.send(
          "message-from-main",
          `Error when querying the registry: ${error}`
        );
        ipcMain.emit(
          "message-from-main",
          `Error when querying the registry: ${error}`
        );
        // Send an error state (false) in case of an error
        event.reply("initial-state", false);
      } else {
        console.log("stdout:", stdout);
        console.log("stderr:", stderr);

        if (stdout.includes("REG_DWORD") && stdout.includes("0x1")) {
          event.reply("initial-state", true);
          console.log("Verbose logging is enabled in the registry.");
        } else {
          event.reply("initial-state", false);
          console.log("Verbose logging is disabled in the registry.");
        }
      }
    }
  );
});

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

ipcMain.on("chooseFile", (event, arg) => {
  const result = dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Images", extensions: ["png", "jpg", "jpeg"] }],
  });

  result.then(({ canceled, filePaths, bookmarks }) => {
    const base64 = fs.readFileSync(filePaths[0]).toString("base64");
    event.reply("chosenFile", filePaths[0]);
  });
});

ipcMain.on("dev", () => {
  mainWindow.webContents.openDevTools();
});
