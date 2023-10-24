const { ipcRenderer, dialog } = require("electron");
const { shell } = require("electron");
const { exec } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
// const dialog = require("../modules/dialog.js");
const helper = require("../modules/helper.js");

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

function createAction(text, optionalClass, section, action, caArgs) {
  actionIndexer++;
  const div = document.createElement("div");
  div.id = `action${actionIndexer}`;
  // div.classList.add("toggleable", "singleaction");
  if (optionalClass.length > 0) {
    div.classList.add(optionalClass);
  }
  // "animated-background"

  if (!caArgs?.useImg) {
    div.textContent = text;
  } else {
    const img = document.createElement("img");
    img.src = caArgs.imgSrc;
    img.alt = caArgs.imgAlt || "";
    img.classList.add("nav-img");
    div.appendChild(img);
  }

  if (caArgs?.showTitle) {
    div.appendChild(document.createTextNode(text));
  }

  if (caArgs?.highlight) {
    div.addEventListener("click", function () {
      current_selected_menu_item = div;
      current_selected_menu_item.style.background = "purple";
      // reset others
      document.querySelectorAll(".perm-btn").forEach((element) => {
        if (element != current_selected_menu_item) {
          element.style.background = "linear-gradient(45deg, #82b8ff, #b6e1ff)";
        }
      });
    });
  }

  if (caArgs?.group) {
    if (caArgs.group.length > 0) {
      var groupDiv;
      if (document.getElementById(caArgs.group)) {
        // group already exists, add child
        groupDiv = document.getElementById(caArgs.group);
        groupDiv.appendChild(div);
      } else {
        // create group, attach child
        groupDiv = document.createElement("div");
        groupDiv.id = caArgs.group;
        groupDiv.style.borderColor = "red";
        groupDiv.style.border = "2px solid white";
        groupDiv.style.borderRadius = "16px";
        groupDiv.style.fontWeight = "bold";
        groupDiv.style.textAlign = "center";
        groupDiv.appendChild(document.createTextNode(caArgs.group));
        groupDiv.appendChild(div);
        document.getElementById(section).appendChild(groupDiv);
      }
    }
  }

  div.onclick = action;
  if (!caArgs?.group) {
    // not using group, so append default
    document.getElementById(section).appendChild(div);
  }

  // log("Appended", `action${actionIndexer}`, text);

  // Enable flash feedback
  div.addEventListener("click", function () {
    console.log("fade feedback");
    if (checkBoolean("fading")) {
      return;
    }
    saveBoolean("fading", true);
    const main = document.getElementById("main");
    main.style.backgroundColor = "skyblue";
    const transitionEndHandler = () => {
      main.removeEventListener("transitionend", transitionEndHandler);
      main.style.backgroundColor = "transparent";
      saveBoolean("fading", false);
    };
    main.addEventListener("transitionend", transitionEndHandler);
  });

  caArgs = {};
  return div;
}

var currentSection = "";

function hideAllExceptCurrent(caArgs) {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    if (section.tagName === "SECTION") {
      if (caArgs?.hide_all) {
        section.classList.add("hidden");
      } else {
        // default
        document.getElementById(currentSection).classList.remove("hidden");
        if (section.id === currentSection) {
          section.style.display = "block";
        } else {
          section.style.display = "none";
        }
      }
    }
  });
  caArgs = {};
}

function changeSection(newSection, caArgs) {
  document
    .querySelectorAll(".square-button, #xscale img, #screensaver img")
    .forEach((element) => {
      element.remove();
    });
  currentSection = newSection;
  hideAllExceptCurrent();
  if (!caArgs?.hide_nav) {
    // build_nav();
  }
}

function page_home() {
  changeSection("section-home");
  createAction(
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
  createAction(
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
  createAction(
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
  createAction(
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
  createAction(
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
  createAction(
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
  createAction(
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
  caArgs = {
    command: `explorer.exe shell:::{ED7BA470-8E54-465E-825C-99712043E01C}`,
  };
  quick_exec(caArgs);
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

function cmd_ctt(caArgs) {
  caArgs = {
    command: `-ExecutionPolicy Bypass -Command "Start-Process powershell.exe -verb runas -ArgumentList 'irm https://christitus.com/win | iex'`,
    powershell: true,
  };
  quick_exec(caArgs);
}
function cmd_activate_windows() {
  caArgs = {
    command: `-ExecutionPolicy Bypass -Command "Start-Process powershell.exe -verb runas -ArgumentList 'irm https://massgrave.dev/get | iex'`,
    powershell: true,
  };
  quick_exec(caArgs);
}

function cmd_res_exp() {
  caArgs = {
    command: `Stop-Process -Name explorer -Force; Start-Process explorer`,
    powershell: true,
  };
  quick_exec(caArgs);
}

async function cmd_winget() {
  for (const package of packages) {
    log(`Installing ${package}...`);
    try {
      const { stdout, stderr } = await new Promise((resolve, reject) => {
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
  log("All packages have been upgraded / installed");
}

function page_settings() {
  changeSection("section-settings");
  dynamicSettings();
  createAction(
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
  changeSection("section-help");
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
      createAction(file, "square-button", parent, function () {
        loadDoc(file);
      });
    });
  });
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
  createAction(
    "Help",
    "perm-btn",
    "left-nav",
    function () {
      page_help();
    },
    {
      highlight: true,
    }
  );
  createAction(
    "Operations",
    "perm-btn",
    "left-nav",
    function () {
      page_home();
    },
    {
      highlight: true,
    }
  );
  createAction(
    "Settings",
    "perm-btn",
    "left-nav",
    function () {
      page_settings();
    },
    {
      highlight: true,
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
  load_themes();
  init_left_nav();
  loadJson();
  page_home();

  /*
  ipcRenderer.on("initial-state", (event, initialState) => {
    log(`got initial-state ${initialState}`);
    checkbox.checked = initialState;
  });
  ipcRenderer.send("invoke-reg-values");
  */

  createCheckableReg({
    registryKey:
      "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System",
    registryValueName: "VerboseStatus",
    registryValueType: "REG_DWORD",
    registryValueData: "1",
  });

  createCheckableReg({
    registryKey:
      "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced",
    registryValueName: "EnableXamlJumpView",
    registryValueType: "REG_DWORD",
    registryValueData: "1",
  });

  createCheckableReg({
    registryKey:
      "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Themes",
    registryValueName: "AppsUseLightTheme",
    registryValueType: "REG_DWORD",
    registryValueData: "0",
  });

  ipcRenderer.on("message-from-main", (event, message) => {
    log(message);
  });
});

function createCheckableReg(caArgs) {
  const checkbox = createCheckbox(
    caArgs?.registryValueName,
    caArgs?.registryValueName
  );

  getReg({
    registryKey: caArgs?.registryKey,
    registryValueName: caArgs?.registryValueName,
    registryValueType: caArgs?.registryValueType,
    registryValueData: caArgs?.registryValueData,
  })
    .then((result) => {
      checkbox.checked = result;
    })
    .catch((error) => {
      log(error);
      console.error(error);
    });

  checkbox.addEventListener("change", (event) => {
    setReg({
      registryKey: caArgs?.registryKey,
      registryValueName: caArgs?.registryValueName,
      registryValueType: caArgs?.registryValueType,
      registryValueData: caArgs?.registryValueData,
      state: event.target.checked,
    });
  });
}

function createCheckbox(name, label) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = name;
  checkbox.name = name;

  const labelElement = document.createElement("label");
  labelElement.setAttribute("for", name);
  labelElement.textContent = label;

  const container = document.createElement("div");

  container.appendChild(checkbox);
  container.appendChild(labelElement);
  container.classList.add("checkbox-label");
  checkboxContainer1.appendChild(container);
  return checkbox;
}
function getReg(caArgs) {
  return new Promise((resolve, reject) => {
    if (!caArgs?.registryKey && !caArgs?.registryValueName) {
      reject(new Error("Invalid parameters"));
      return;
    }

    const query_command = `reg query "${caArgs?.registryKey}" /v "${caArgs?.registryValueName}"`;

    exec(query_command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error when querying the registry: ${error}`);
        reject(error);
      } else {
        console.log("stdout:", stdout);
        console.log("stderr:", stderr);

        if (stdout.includes("REG_DWORD") && stdout.includes("0x1")) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
}

function setReg(caArgs) {
  if (!caArgs?.registryKey) {
    return;
  }
  if (!caArgs?.registryValueName) {
    return;
  }
  if (!caArgs?.registryValueType) {
    return;
  }
  if (!caArgs?.registryValueData) {
    return;
  }
  const enable_command = `reg add "${caArgs?.registryKey}" /v "${caArgs?.registryValueName}" /t ${caArgs?.registryValueType} /d ${caArgs?.registryValueData} /f`;
  const disable_command = `reg delete "${caArgs?.registryKey}" /v "${caArgs?.registryValueName}" /f`;
  const commandToExecute = caArgs?.state ? enable_command : disable_command;

  exec(commandToExecute, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
    console.log(`Command executed: ${commandToExecute}`);
  });
}
