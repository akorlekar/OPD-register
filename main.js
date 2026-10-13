const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const dataDir = app.getPath('userData');
const dataFile = path.join(dataDir, 'opd-data.json');
const backupDir = path.join(dataDir, 'auto-backups');

if (!app.requestSingleInstanceLock()) { app.quit(); }

function readData() {
  try { return fs.readFileSync(dataFile, 'utf8'); } catch (e) { return ''; }
}

function writeData(text) {
  fs.mkdirSync(dataDir, { recursive: true });
  const tmp = dataFile + '.tmp';
  fs.writeFileSync(tmp, text, 'utf8');
  fs.renameSync(tmp, dataFile);
  dailyBackup(text);
}

// One automatic backup copy per day, last 30 days kept.
function dailyBackup(text) {
  try {
    fs.mkdirSync(backupDir, { recursive: true });
    const day = new Date().toISOString().slice(0, 10);
    const f = path.join(backupDir, 'opd-' + day + '.json');
    fs.writeFileSync(f, text, 'utf8');
    const files = fs.readdirSync(backupDir).filter(n => /^opd-.*\.json$/.test(n)).sort();
    while (files.length > 30) fs.unlinkSync(path.join(backupDir, files.shift()));
  } catch (e) { /* backup is best-effort */ }
}

ipcMain.on('store-read', (e) => { e.returnValue = readData(); });
ipcMain.on('store-write', (e, text) => {
  try { writeData(String(text)); e.returnValue = true; }
  catch (err) { e.returnValue = false; }
});

let win;
function createWindow() {
  win = new BrowserWindow({
    width: 1280, height: 800, minWidth: 900, minHeight: 600,
    title: 'OPD Register',
    icon: path.join(__dirname, 'icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(createWindow);
app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
app.on('window-all-closed', () => app.quit());
