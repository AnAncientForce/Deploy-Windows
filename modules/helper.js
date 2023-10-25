const os = require("os");
const fs = require("fs");
const path = require("path");

var booleanStorage = {};

function saveBoolean(key, value) {
  booleanStorage[key] = value;
}
function checkBoolean(key) {
  return booleanStorage[key];
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

var jSettings = null;
try {
  jSettings = path.join(path.dirname(__dirname), "settings.json");
} catch (error) {
  console.error("Error reading JSON file:", error.message);
  return null;
}

function isUsingLinux() {
  return process.platform === "linux";
}

function readJSONValue(valueKey) {
  try {
    const rawData = fs.readFileSync(jSettings);
    const jsonData = JSON.parse(rawData);

    if (jsonData && jsonData.hasOwnProperty(valueKey)) {
      return jsonData[valueKey] === true;
    } else {
      console.log(`Value "${valueKey}" not found in JSON file.`);
      return null;
    }
  } catch (error) {
    console.error("Error reading JSON file:", error.message);
    return null;
  }
}

function getSettings() {
  return JSON.parse(fs.readFileSync(jSettings, "utf8"));
}
function writeSettings(data) {
  // fs.writeFileSync(jSettings, JSON.stringify(data));
  fs.writeFileSync(jSettings, JSON.stringify(data, null, 2));
}

/*
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
*/
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function executeCommand(command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    console.log("Command executed successfully");
    console.log("stdout:", stdout);
    console.log("stderr:", stderr);
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

module.exports = {
  saveBoolean: saveBoolean,
  checkBoolean: checkBoolean,
  createAction: createAction,
  readJSONValue: readJSONValue,
  getSettings: getSettings,
  writeSettings: writeSettings,
  isUsingLinux: isUsingLinux,
  shuffleArray: shuffleArray,
  executeCommand: executeCommand,
  createCheckbox: createCheckbox,
};
