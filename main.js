// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");
const pgp = require("pg-promise")();
const { ipcMain } = require("electron");

const config = {
  host: "localhost",
  port: 5432,
  database: "finance_funday",
  user: "tinle",
  password: "",
  max: 5, // max number of clients in the pool
  idleTimeoutMillis: 1000 // how long a client is allowed to remain idle before being closed
};

const db = pgp(config);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

ipcMain.handle("query", async (event, query) => {
  console.log("got a query: ", query);
  return db.any(query);
});

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  mainWindow.webContents.on(
    "new-window",
    (event, url, frameName, disposition, options) => {
      event.preventDefault();
      Object.assign(options, {
        width: 1200,
        height: 1000,
        webPreferences: {
          preload: path.join(__dirname, "preload.js"),
          nodeIntegrationInSubFrames: true,
        }
      });
      event.newGuest = new BrowserWindow(options);
      event.newGuest.loadURL(url);
    }
  );

  // and load the index.html of the app.
  //mainWindow.loadFile('index.html')
  mainWindow.loadURL("http://localhost:3000");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
