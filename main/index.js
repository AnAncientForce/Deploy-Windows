const { ipcRenderer } = require("electron");
const { shell } = require("electron");
const { exec } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const dialog = require("../modules/dialog.js");
const helper = require("../modules/helper.js");

var actionIndexer = 0;
var booleanStorage = {};

var addons;
var exes;
var utils;
var packages;
var portable_exes;

var current_selected_menu_item;
var powershell =
  "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe";

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
      imgSrc: "../images/autostart.png",
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
      imgSrc: "../images/control.png",
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
  exec(
    "explorer.exe shell:::{ED7BA470-8E54-465E-825C-99712043E01C}",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return;
      }
      log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  );
}

function cmd_ctt() {
  exec(
    `${powershell} -ExecutionPolicy Bypass -Command "Start-Process powershell.exe -verb runas -ArgumentList 'irm https://christitus.com/win | iex'`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
      }
      log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    }
  );
}

function cmd_res_exp() {
  const cmd = "Stop-Process -Name explorer -Force; Start-Process explorer";
  exec(`powershell -Command "${cmd}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
    }
    log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

function cmd_winget() {
  for (const package of packages) {
    log(`Installing ${package}...`);
    exec(
      `winget install ${package}`,
      { shell: true },
      (error, stdout, stderr) => {
        if (error) {
          console.error(
            `Failed to install ${package}. Error: ${error.message}`
          );
        } else {
          if (stdout) {
            log(`${package} has been successfully installed.`);
          } else {
            console.error(`Failed to install ${package}. Error: ${stderr}`);
          }
        }
      }
    );
  }
  log("All packages have been upgraded / installed");
}

function page_settings() {
  changeSection("section-settings");
  createAction(
    "defaukt",
    "square-button",
    "section-settings-btns",
    function () {},
    {
      showTitle: true,
      useImg: true,
      imgSrc: "../images/autostart.png",
      imgAlt: "Help",
    }
  );
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
    "Operations",
    "perm-btn",
    "left-nav",
    function () {
      // changeSection("section-home")
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

document.addEventListener("DOMContentLoaded", () => {
  init_left_nav();
  loadJson();
  page_home();
  const checkbox = document.getElementById("verboseLoggingCheckbox");
  ipcRenderer.on("initial-state", (initialState) => {
    checkbox.checked = initialState;
  });
  checkbox.addEventListener("change", (event) => {
    ipcRenderer.send("verbose-logging", event.target.checked);
  });
  ipcRenderer.send("invoke-reg-values");
});
