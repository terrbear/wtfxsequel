// Modules to control application life and create native browser window
const { app, BrowserWindow } = require("electron");
const path = require("path");
const pgp = require("pg-promise")();
const { ipcMain } = require("electron");
const Store = require("electron-store");
const keytar = require("keytar");

const store = new Store();

pgp.pg.types.setTypeParser(1700, function(val) {
  return parseFloat(val);
});

pgp.pg.types.setTypeParser(1114, stringValue => {
  return new Date(Date.parse(stringValue + "+0000"));
});

if (process.env.CLEAR_STORAGE) {
  store.clear();
}

const DEFAULT_CONNECTION_OPTIONS = {
  max: 5,
  idleTimeoutMillis: 1000 // how long a client is allowed to remain idle before being closed
};

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const dbHandles = {};

ipcMain.handle("connections/list", async () => {
  return store.get("connections") || [];
});

console.log("connections: ", store.get("connections"));

ipcMain.handle("connections/save", async (event, payload) => {
  const connections = store.get("connections") || [];

  if (payload.password) {
    const { password } = payload;
    delete payload.password;
    keytar.setPassword("wtfx sequel", payload.id, password);
  }

  const connection = connections.find(c => c.id === payload.id);

  delete dbHandles[payload.id];

  if (connection) {
    Object.assign(connection, payload);
  } else {
    connections.push(payload);
  }

  store.set("connections", connections);
});

ipcMain.handle("query", async (event, { connectionId, query }) => {
  if (process.env.DEBUG_QUERY) {
    console.log("query: ", query);
  }

  if (dbHandles[connectionId]) {
    return dbHandles[connectionId].any(query);
  }

  const connection = store.get("connections").find(c => c.id === connectionId);

  return keytar.getPassword("wtfx sequel", connectionId).then(password => {
    dbHandles[connectionId] = pgp({
      ...DEFAULT_CONNECTION_OPTIONS,
      ...connection,
      password
    });

    return dbHandles[connectionId].any(query);
  });
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
          nodeIntegrationInSubFrames: true
        }
      });
      event.newGuest = new BrowserWindow(options);

      // https://github.com/electron/electron/issues/11128
      setTimeout(() => {
        event.sender.removeAllListeners("current-render-view-deleted");
      }, 0);

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

// need this bc of the electron issue above (11128)
process.on("uncaughtException", err => {
  console.log(err);
});

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
