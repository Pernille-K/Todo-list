// Runs before the renderer process is loaded, and has access to both renderer globals (window and doocument) and a Node.js environment

const {contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    loadPage: (page) => ipcRenderer.send("load-page", page),
  });