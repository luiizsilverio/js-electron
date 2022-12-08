const { ipcRenderer } = require("electron");

let fechar = document.querySelector('#link-fechar');

fechar.addEventListener('click', () => {
    ipcRenderer.send('fechar-sobre');
})
