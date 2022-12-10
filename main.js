const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const data = require('./data');

app.disableHardwareAcceleration(); // desativa o hardware acceleration, evitando erros

function createWindow() {
	const win = new BrowserWindow({
        width: 700,
        height: 500,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
	});
  win.loadURL(path.join(__dirname, "app", "index.html"));
}

app.whenReady().then(() => {
	createWindow();
// 	app.on("active", () => {
// 		if (BrowserWindow.getAllWindows().length === 0) createWindow();
// 	})
})

app.on("window-all-closed", () => {
	if (process.plataform !== "darwin") app.quit();
})


let winSobre = null;

ipcMain.on("abrir-sobre", () => {
  if (!winSobre) {
    winSobre = new BrowserWindow({
      width: 330,
      height: 270,
      alwaysOnTop: true,
      frame: false,       /* retira o menu e botões do topo da janela */
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    winSobre.on('closed', () => {
      winSobre = null;
    })
  }

  winSobre.loadURL(path.join(__dirname, "app", "sobre.html"));
})

ipcMain.on("fechar-sobre", () => {
  winSobre.close();
})

ipcMain.on('curso-parado', (event, curso, tempoEstudado) => {
  data.salvaDados(curso, tempoEstudado);
})
