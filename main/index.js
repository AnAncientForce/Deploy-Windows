const { ipcRenderer } = require("electron");
const { shell } = require("electron");
const { exec } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const helper = require("../modules/helper.js");
const zRegistry = require("../modules/registry.js");

var actionIndexer = 0;
var booleanStorage = {};

var addons;
var exes;
var utils;
var packages;
var portable_exes;

var current_selected_menu_item;
var powershell;
var checkboxContainer1;
var checkboxContainer2;

var initializing_values = false;

function saveBoolean(key, value) {
  booleanStorage[key] = value;
}
function checkBoolean(key) {
  return booleanStorage[key];
}

function log(txt) {
  const textarea = document.getElementById("logger");
  textarea.value += "\n" + txt;
  textarea.scrollTop = textarea.scrollHeight;
}

var currentSection = "";

function changeSection(caArgs) {
  if (!caArgs?.section) {
    console.error("no section passed");
    return;
  }
  if (caArgs?.hideLogger) {
    document.getElementById("logger").style.display = "none";
  } else {
    document.getElementById("logger").style.display = "block";
  }

  // re-animate elements upon section change
  document
    .querySelectorAll(".square-button, .header, h1, textarea")
    .forEach((element) => {
      // element.remove();
      // better resource usage since we aren't dynamically rebuilding elements everytime section is changed
      element.classList.remove("animate-dropInAnimation");
      element.classList.add("animate-dropInAnimation");
    });

  if (caArgs?.section) {
    currentSection = caArgs?.section;
    // hide all sections expect the current section
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      if (section.tagName === "SECTION") {
        document.getElementById(currentSection).classList.remove("hidden");
        if (section.id === currentSection) {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      }
    });
  }
}

function page_home() {
  helper.createAction(
    "God Mode",
    "square-button",
    "section-home-btns",
    function () {
      cmd_god_mode();
    },
    {
      showTitle: true,
      useImg: true,
      imgSrc: "../images/terminal.png",
      imgAlt: "Help",
    }
  );
  helper.createAction(
    "Activate Windows",
    "square-button",
    "section-home-btns",
    function () {
      cmd_activate_windows();
    },
    {
      showTitle: true,
      useImg: true,
      imgSrc: "../images/terminal.png",
      imgAlt: "Help",
    }
  );
  helper.createAction(
    "Set Lockscreen Wallpaper",
    "square-button",
    "section-home-btns",
    function () {
      cmd_set_lock_bg();
    },
    {
      showTitle: true,
      useImg: true,
      imgSrc: "../images/colour.png",
      imgAlt: "Help",
    }
  );
  helper.createAction(
    "CTT",
    "square-button",
    "section-home-btns",
    function () {
      cmd_ctt();
    },
    {
      showTitle: true,
      useImg: true,
      imgSrc: "../images/terminal.png",
      imgAlt: "Help",
    }
  );
  helper.createAction(
    "Restart Explorer",
    "square-button",
    "section-home-btns",
    function () {
      cmd_res_exp();
    },
    {
      showTitle: true,
      useImg: true,
      imgSrc: "../images/restart.png",
      imgAlt: "Help",
    }
  );
  helper.createAction(
    "Install Packages",
    "square-button",
    "section-home-btns",
    function () {
      cmd_winget();
    },
    {
      showTitle: true,
      useImg: true,
      imgSrc: "../images/install.png",
      imgAlt: "Help",
    }
  );
  helper.createAction(
    "Open Addon URLs",
    "square-button",
    "section-home-btns",
    function () {
      cmd_open_urls();
    },
    {
      showTitle: true,
      useImg: true,
      imgSrc: "../images/firefox.png",
      imgAlt: "Help",
    }
  );
}

function cmd_open_urls() {
  addons.forEach((url) => {
    log(`> ${url}`);
    shell.openExternal(url);
  });
}

function cmd_set_lock_bg() {
  exec(
    `igcmdWin10.exe setlockimage "${path.join(
      __dirname,
      "images",
      "LockScreenWallpaper.jpg"
    )}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
      }
      log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  );
}

function cmd_god_mode() {
  quick_exec({
    command: `explorer.exe shell:::{ED7BA470-8E54-465E-825C-99712043E01C}`,
  });
}

function quick_exec(caArgs) {
  powershell = "";
  if (!caArgs?.command) {
    log("No command given.");
    return;
  }
  if (caArgs?.powershell) {
    powershell =
      "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe";
  }
  exec(`${powershell} ${caArgs.command}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
    }
    log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

function cmd_ctt() {
  quick_exec({
    command: `-ExecutionPolicy Bypass -Command "Start-Process powershell.exe -verb runas -ArgumentList 'irm https://christitus.com/win | iex'`,
    powershell: true,
  });
}
function cmd_activate_windows() {
  quick_exec({
    command: `-ExecutionPolicy Bypass -Command "Start-Process powershell.exe -verb runas -ArgumentList 'irm https://massgrave.dev/get | iex'`,
    powershell: true,
  });
}

function cmd_res_exp() {
  quick_exec({
    command: `Stop-Process -Name explorer -Force; Start-Process explorer`,
    powershell: true,
  });
}
var pending_stop = false;
async function cmd_winget() {
  for (const package of packages) {
    log(`Installing ${package}...`);
    try {
      const { stdout, stderr } = await new Promise((resolve, reject) => {
        document.getElementById("current-task").style.display = "block";
        if (pending_stop) {
          resetValues("stop");
          log("Stopped.");
          return;
        }
        exec(
          `winget install ${package}`,
          { shell: true },
          (error, stdout, stderr) => {
            if (error) {
              console.error(
                `Failed to install ${package}. Error: ${error.message}`
              );
              reject(error);
            } else if (stdout) {
              log(`${package} has been successfully installed.`);
              resolve({ stdout, stderr });
            } else {
              console.error(`Failed to install ${package}. Error: ${stderr}`);
              reject(stderr);
            }
          }
        );
      });
      log(stdout);
      log(stderr);
    } catch (error) {
      console.error(`Installation failed for ${package}. Error: ${error}`);
    }
  }
  resetValues("stop");
  log("All packages have been upgraded / installed");
}

function resetValues(value) {
  if (value === "stop") {
    document.getElementById("current-task").style.display = "none";
    pending_stop = false;
  }
}

function page_settings() {
  changeSection({
    section: "section-settings",
  });
  dynamicSettings();
  helper.createAction(
    "Change Theme",
    "square-button",
    "section-settings-btns",
    function () {
      ipcRenderer.send("chooseFile");
      ipcRenderer.on("chosenFile", (event, base64) => {
        const src = `data:image/jpg;base64,${base64}`;
        log(base64);
        const jsonObject = helper.getSettings();
        jsonObject["wallpaper"] = base64;
        helper.writeSettings(jsonObject);
      });
    },
    {
      showTitle: true,
      useImg: true,
      imgSrc: "../images/autostart.png",
      imgAlt: "Help",
    }
  );
}

function dynamicSettings() {
  if (checkBoolean("initial_launch")) {
    return;
  }
  saveBoolean("initial_launch", true);
  const settings_json = path.join(path.dirname(__dirname), "settings.json");
  const jsonData = require(settings_json);
  for (const key in jsonData) {
    if (jsonData.hasOwnProperty(key) && typeof jsonData[key] === "boolean") {
      const checkboxLabel = document.createElement("label");
      checkboxLabel.classList.add("checkbox-label");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = key;
      checkbox.checked = jsonData[key];

      const label = document.createTextNode(key);

      checkboxLabel.appendChild(checkbox);
      checkboxLabel.appendChild(label);

      checkboxContainer2.appendChild(checkboxLabel);

      checkbox.addEventListener(
        "change",
        (function (changedKey) {
          return function () {
            jsonData[changedKey] = this.checked;
            log(changedKey);
            if (changedKey === "developer_mode") {
              ipcRenderer.send("dev");
            }
            fs.writeFileSync(settings_json, JSON.stringify(jsonData, null, 2));
            if (changedKey === "custom_theme") {
              load_themes();
            }
          };
        })(key)
      );
    }
  }
}

function loadDoc(doc) {
  fs.readFile(
    path.join(__dirname, "../docs/" + doc + ".txt"),
    "utf8",
    (error, content) => {
      if (error) {
        console.error("Error reading file:", error);
        return;
      }
      document.getElementById("text-box").value = content;
    }
  );
}

function page_help() {
  const parent = "section-help-btns";
  console.log("reading path:", path.join(__dirname, "../docs/"));
  fs.readdir(path.join(__dirname, "../docs/"), (err, files) => {
    if (err) {
      console.error(`Error reading folder: ${err}`);
      return;
    }
    files.forEach((file) => {
      file = file.replace(".txt", "");
      console.log(file);
      helper.createAction(file, "square-button", parent, function () {
        loadDoc(file);
      });
    });
  });
}

function page_registry() {}

function init_pages() {
  page_help();
  page_home();
  page_registry();
  page_settings();
}

function loadJson() {
  const rawData = fs.readFileSync("data.json", "utf8");
  const data = JSON.parse(rawData);
  addons = data.addons;
  exes = data.exes;
  utils = data.utils;
  packages = data.packages;
  portable_exes = data.portable_exes;
}

function init_left_nav() {
  helper.createAction(
    "Help",
    "perm-btn",
    "left-nav",
    function () {
      changeSection({
        section: "section-help",
        hideLogger: true,
      });
    },
    {
      highlight: true,
    }
  );
  helper.createAction(
    "Operations",
    "perm-btn",
    "left-nav",
    function () {
      changeSection({
        section: "section-home",
      });
    },
    {
      highlight: true,
    }
  );
  helper.createAction(
    "Settings",
    "perm-btn",
    "left-nav",
    function () {
      changeSection({
        section: "section-settings",
      });
    },
    {
      highlight: true,
    }
  );
  helper.createAction(
    "Stop",
    "square-button",
    "current-task",
    function () {
      pending_stop = true;
    },
    {
      showTitle: true,
      useImg: true,
      imgSrc: "../images/stop.png",
      imgAlt: "Stop",
    }
  );
}
function load_themes() {
  const jsonObject = helper.getSettings();
  if (!jsonObject["custom_theme"]) {
    document.getElementById("image_shower").src =
      "../images/LockScreenWallpaper.jpg";
    return;
  }
  fs.access(jsonObject["wallpaper"], fs.constants.F_OK, (err) => {
    if (err) {
      log("Error reading theme");
    } else {
      document.getElementById("image_shower").src = jsonObject["wallpaper"];
    }
  });
}

function validateMissingKeys() {
  const keysToValidate = [
    { key: "developer_mode", type: "boolean" },
    { key: "custom_theme", type: "boolean" },
    { key: "wallpaper", type: "string" },
  ];
  const jsonObject = helper.getSettings();
  console.log("validating json keys");
  keysToValidate.forEach(({ key, type }) => {
    if (!(key in jsonObject)) {
      if (type === "boolean") {
        jsonObject[key] = false;
      } else if (type === "string") {
        jsonObject[key] = "none";
      }
      helper.writeSettings(jsonObject);
    }
  });
  log("json validation success");
}

document.addEventListener("DOMContentLoaded", () => {
  checkboxContainer1 = document.getElementById("checkboxContainer1");
  checkboxContainer2 = document.getElementById("checkboxContainer2");
  validateMissingKeys();
  resetValues("stop");
  load_themes();
  init_left_nav();
  init_pages();
  loadJson();

  /*
  ipcRenderer.on("initial-state", (event, initialState) => {
    log(`got initial-state ${initialState}`);
    checkbox.checked = initialState;
  });
  ipcRenderer.send("invoke-reg-values");
  */

  zRegistry.createCheckableReg({
    prompt: "Verbose Status",
    registryKey:
      "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System",
    registryValueName: "VerboseStatus",
    registryValueType: "REG_DWORD",
    registryValueData: "1",
    OriginalValue: "0",
  });

  zRegistry.createCheckableReg({
    prompt: "Jump Lists",
    registryKey:
      "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced",
    registryValueName: "Start_TrackDocs",
    registryValueType: "REG_DWORD",
    registryValueData: "1",
    OriginalValue: "0",
  });

  zRegistry.createCheckableReg({
    prompt: "Light Mode (User)",
    registryKey:
      "HKEY_CURRENT_USER\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize",
    registryValueName: "AppsUseLightTheme",
    registryValueType: "REG_DWORD",
    registryValueData: "1",
    OriginalValue: "0",
  });

  zRegistry.createCheckableReg({
    prompt: "Location Access",
    registryKey:
      "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\location",
    registryValueName: "Value",
    registryValueType: "REG_SZ",
    registryValueData: "Deny",
    OriginalValue: "Allow",
  });

  zRegistry.createCheckableReg({
    prompt: "Microphone Access",
    registryKey:
      "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\microphone",
    registryValueName: "Value",
    registryValueType: "REG_SZ",
    registryValueData: "Deny",
    OriginalValue: "Allow",
  });

  zRegistry.createCheckableReg({
    prompt: "Fast Startup",
    registryKey:
      "HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Power",
    registryValueName: "HiberbootEnabled",
    registryValueType: "REG_DWORD",
    registryValueData: "1",
    OriginalValue: "0",
  });

  changeSection({
    section: "section-home",
    hideLogger: false,
  });

  ipcRenderer.on("message-from-main", (event, message) => {
    log(message);
  });
});
