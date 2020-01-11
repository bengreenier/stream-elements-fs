const {
  app,
  screen,
  BrowserWindow,
  ipcMain,
  Tray,
  Menu,
  nativeImage
} = require("electron");

const src = process.argv[2];

if (!src) {
  console.log("Must pass URL as argument");
  app.exit(1);
}

const allowUnsafeIframes = src.includes("?unsafe-frames=true");

if (allowUnsafeIframes) {
  console.log("Using unsafe frames!");
}

app.on("ready", () => {
  const { workArea } = screen.getPrimaryDisplay();
  // without this, i seem to have a 2px border top/left
  const offset = {
    x: workArea.x - 2,
    y: workArea.y - 2
  };

  const win = new BrowserWindow({
    ...workArea,
    ...offset,
    alwaysOnTop: true,
    focusable: false,
    frame: false,
    skipTaskbar: true,
    transparent: true,
    webPreferences: {
      contextIsolation: true,
      preload: `${__dirname}/browser/preload.js`
    }
  });

  ipcMain.on("get-config", e => {
    e.returnValue = JSON.stringify({
      allowUnsafeIframes
    });
  });

  win.setIgnoreMouseEvents(true);
  win.loadURL(src);

  const img = nativeImage.createFromPath(`${__dirname}/assets/logo.png`);
  const tray = new Tray(img);
  const menu = Menu.buildFromTemplate([
    {
      label: "Close",
      type: "normal",
      click: () => {
        app.exit(0);
      }
    }
  ]);
  tray.setContextMenu(menu);
  tray.setToolTip("Stream Elements FS");
  tray.setTitle("Stream Elements FS");
  tray.on("click", () => {
    tray.popUpContextMenu();
  });
});
