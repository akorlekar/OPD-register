const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('desktopStore', {
  read: () => ipcRenderer.sendSync('store-read'),
  write: (text) => {
    if (!ipcRenderer.sendSync('store-write', text)) throw new Error('write failed');
  }
});
