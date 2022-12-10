const { ipcRenderer } = require("electron");
const timer = require('./js/timer');

const sobre = document.querySelector('#link-sobre');
const btnPlay = document.querySelector('.botao-play');
const tempo = document.querySelector('.tempo');
const curso = document.querySelector('.curso');

sobre.addEventListener('click', () => {
    ipcRenderer.send('abrir-sobre');
})

const imgs = ['img/play-button.svg', 'img/stop-button.svg'];

btnPlay.addEventListener('click', () => {
    imgs.reverse();
    btnPlay.src = imgs[0];
    btnPlay.classList.toggle('play');
    if (btnPlay.classList.contains('play')) {
        timer.iniciar(tempo);
    } else {
        timer.parar(curso.textContent);
    }
})
