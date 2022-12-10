const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
    salvaDados(curso, tempoEstudado) {
        const arquivo = __dirname + '/data/' + curso + '.json';
        if (fs.existsSync(arquivo)) {
            this.adicionaTempoCurso(arquivo, tempoEstudado);
        } else {
            this.criarArquivoCurso(arquivo, {})
                .then(() => {
                    this.adicionaTempoCurso(arquivo, tempoEstudado);
                })
        }
    },
    adicionaTempoCurso(arquivo, tempoEstudado) {
        let dados = {
            ultimoEstudo: new Date().toString(),
            tempo: tempoEstudado
        }
        jsonfile.writeFile(arquivo, dados, {spaces: 2})
            .then(() => console.log('Tempo salvo com sucesso'))
            .catch((err) => console.log(err));
    },
    criarArquivoCurso(nomeArquivo, conteudo) {
        jsonfile.writeFile(nomeArquivo, conteudo, {spaces: 2})
            .then(() => console.log('Arquivo criado com sucesso'))
            .catch((err) => console.log(err));
    },
    buscarDadosCurso(curso) {
        const arquivo = __dirname + '/data/' + curso + '.json';
        return jsonfile.readFile(arquivo);
    }
}
