const { ipcRenderer } = require("electron");

let sobre = document.querySelector('#link-sobre');

sobre.addEventListener('click', () => {
    ipcRenderer.send('abrir-sobre');
})
