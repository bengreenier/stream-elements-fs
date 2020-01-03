const { ipcRenderer, webFrame } = require("electron");
const rawConfig = ipcRenderer.sendSync("get-config");

const code = `window.config = JSON.parse('${rawConfig}')`;
webFrame.executeJavaScript(code);
