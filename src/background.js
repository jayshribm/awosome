'use strict'

import { app, protocol, BrowserWindow, nativeImage ,Notification, Tray} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import { isServeMode } from "./utils"
const isDevelopment = process.env.NODE_ENV !== 'production'

let tray

createTray = () => {
  const iconPath = isServeMode() 
    ? path.join(__dirname, "/public/tray/logo.png")
    : path.join(__dirname, "/public/tray/logo.png")

  tray = new Tray(iconPath)
}

async function createWindow() {
  // Create the browser window.
  
  const win = new BrowserWindow({
    width: 1400,
    height: 800,
    autoHideMenuBar: true,
    resizable:false,
    
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })
  // win.setMenu(null)
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.webContents.on('new-window', function(e, url) {
    // make sure local urls stay in electron perimeter
    if('file://' === url.substr(0, 'file://'.length)) {
      return;
    }
  
    // and open every other protocols on the browser      
    e.preventDefault();
    //shell.openExternal(url)
    let win2 = new BrowserWindow({
      width: 1366, 
      height: 768,
      autoHideMenuBar: true,
      parent: win
    })
    
    win2.loadURL(url);
  })
}



// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }
  
 
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
  new Notification({
    
    title: 'Headline',
    body: 'Here write your message'
  }).show();
})


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
