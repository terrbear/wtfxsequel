window.ipc = require('electron').ipcRenderer;

window.newWindow = () => {
  const remote = require('electron').remote;
  const BrowserWindow = remote.BrowserWindow;
  const win = new BrowserWindow({
    width: 1200,
    height: 1000,
  });

  win.loadURL("http://localhost:3000");
};
