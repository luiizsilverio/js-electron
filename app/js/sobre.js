const { ipcRenderer, shell } = require("electron");
const process = require('process');

const fechar = document.querySelector('#link-fechar');
const github = document.querySelector('#link-github');
const versao = document.querySelector('#versao');

fechar.addEventListener('click', () => {
    ipcRenderer.send('fechar-sobre');
})

github.addEventListener('click', () => {
    // o link normal abre o endereço na própria janela do Electron
    // por isso, usamos o comando abaixo para abrir no navegador.
    shell.openExternal('https://github.com/luiizsilverio');
})

window.onload = () => {
    versao.textContent = process.versions.electron;
}
