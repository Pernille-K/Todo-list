const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const { globalShortcut } = require("electron");

// if (require("electron-is-dev")) {
// 	require("electron-reload")(__dirname);
// }

let win;

function createWindow() {
	win = new BrowserWindow({
		width: 550,
		height: 600,
		frame: false,
		icon: path.join(__dirname, "../assets/icon.ico"),
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, "preload.js"),
		},
		...(process.platform !== "darwin" ? { titleBarOverlay: true } : {}),
	});

	win.removeMenu();
	win.loadFile(path.join(__dirname, "index.html"));

	ipcMain.on("load-page", (event, page) => {
		win.loadFile(page);
	});
}

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") app.quit();
});

ipcMain.on("minimize", () => {
	win.minimize();
});
ipcMain.on("maximize", () => {
	if (win.isMaximized()) {
		win.unmaximize();
	} else {
		win.maximize();
	}
});
ipcMain.on("close", () => {
	win.close();
});

app.whenReady().then(() => {
	createWindow();
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});

	globalShortcut.register("CommandOrControl+Shift+I", () => {
		const wc = win.webContents;
		if (wc.isDevToolsOpened()) {
			wc.closeDevTools();
		} else {
			wc.openDevTools();
		}
	});
});
