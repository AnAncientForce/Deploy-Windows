/*
A module
*/
const helper = require("./helper.js");

var checkboxContainer1;
var checkboxContainer2;
var initializing_values = false;

function init() {
  checkboxContainer1 = document.getElementById("checkboxContainer1");
  checkboxContainer2 = document.getElementById("checkboxContainer2");
}
init();

function createCheckableReg(caArgs) {
  const checkbox = helper.createCheckbox(caArgs?.prompt, caArgs?.prompt);

  getReg({
    registryKey: caArgs?.registryKey,
    registryValueName: caArgs?.registryValueName,
    registryValueType: caArgs?.registryValueType,
    registryValueData: caArgs?.registryValueData,
    OriginalValue: caArgs?.OriginalValue,
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
      OriginalValue: caArgs?.OriginalValue,
      state: event.target.checked,
    });
  });
}

function getReg(caArgs) {
  return new Promise((resolve, reject) => {
    if (!caArgs?.registryKey || !caArgs?.registryValueName) {
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

        console.log("LOG:", stdout);

        if (stdout.includes("REG_DWORD") && stdout.includes("0x1")) {
          // 0x1 = true, 0x0 = false
          resolve(true);
        }
        if (stdout.includes("REG_SZ") && stdout.includes("Allow")) {
          resolve(true);
        }
        // non matched, so resolve false
        resolve(false);
      }
    });
  });
}

function setReg(caArgs) {
  if (
    !caArgs?.registryKey ||
    !caArgs?.registryValueName ||
    !caArgs?.registryValueType ||
    !caArgs?.registryValueData ||
    !caArgs?.OriginalValue
  ) {
    log("Incomplete arguments for modifying the registry.");
    console.error("Incomplete arguments for modifying the registry.");
    return;
  }
  if (initializing_values) {
    log("Main Interface is busy. Try again later.");
    return;
  } else {
    initializing_values = true;
  }
  /*
  const commandToExecute = caArgs.state
    ? `reg add "${caArgs.registryKey}" /v "${caArgs.registryValueName}" /t ${caArgs.registryValueType} /d ${caArgs.registryValueData} /f`
    : `reg delete "${caArgs.registryKey}" /v "${caArgs.registryValueName}" /f`;
  */

  exec(`reg query "${caArgs.registryKey}"`, (error, stdout, stderr) => {
    if (error) {
      // Registry key doesn't exist, throw an error
      console.error(`Error: The specified registry key doesn't exist.`);
      initializing_values = false;
      return;
    }

    if (caArgs.registryValueType == "REG_SZ") {
      if (caArgs.state) {
        caArgs.registryValueData = caArgs.OriginalValue;
      }
    }
    if (caArgs.registryValueType == "REG_DWORD") {
      if (!caArgs.state) {
        // ~~if state is false, set value to 0 = 0x0 = false~~
        // if state if false, set to original value
        caArgs.registryValueData = caArgs.OriginalValue;
      }
    }

    const commandToExecute = caArgs.state
      ? `reg add "${caArgs.registryKey}" /v "${caArgs.registryValueName}" /t ${caArgs.registryValueType} /d ${caArgs.registryValueData} /f`
      : `reg add "${caArgs.registryKey}" /v "${caArgs.registryValueName}" /t ${caArgs.registryValueType} /d ${caArgs.registryValueData} /f`;

    exec(commandToExecute, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        initializing_values = false;
        return;
      }
      initializing_values = false;
      console.log(`Command executed: ${commandToExecute}`);
    });
  });
}

module.exports = {
  createCheckableReg: createCheckableReg,
  getReg: getReg,
  setReg: setReg,
};
