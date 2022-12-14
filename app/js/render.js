const { ipcRenderer } = require("electron");
const timer = require('./js/timer');
const data = require('../data');

const sobre = document.querySelector('#link-sobre');
const btnPlay = document.querySelector('.botao-play');
const tempo = document.querySelector('.tempo');
const cursoEl = document.querySelector('.curso');
const btnAdd = document.querySelector('.botao-adicionar');
const inputAdd = document.querySelector('.campo-adicionar');

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
        timer.parar(cursoEl.textContent);
    }
})


ipcRenderer.on("curso-trocado", (event, curso) => {
    cursoEl.textContent = curso;
    data.buscarDadosCurso(curso)
       .then((dados) => {
         tempo.textContent = dados.tempo;
       })
})


window.onload = () => {
    data.buscarDadosCurso(cursoEl.textContent)
        .then((dados) => {
            tempo.textContent = dados.tempo;
        })
}

btnAdd.addEventListener('click', () => {
    let newCurso = inputAdd.value;
    cursoEl.textContent = newCurso;
    tempo.textContent = '00:00:00';
    inputAdd.value = '';

    ipcRenderer.send('curso-adicionado', newCurso);
})
