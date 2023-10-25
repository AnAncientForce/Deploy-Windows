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
  readJSONValue: readJSONValue,
  getSettings: getSettings,
  writeSettings: writeSettings,
  isUsingLinux: isUsingLinux,
  shuffleArray: shuffleArray,
  executeCommand: executeCommand,
  createCheckbox: createCheckbox,
};
