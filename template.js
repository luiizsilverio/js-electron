const data = require('./data');

module.exports = {
    geraTrayTemplate() {
        let template = [
            {
                label: 'Cursos'
            },
            {
                type: 'separator'
            }
        ]

        let cursos = data.getCursos();

        cursos.forEach(curso => {
            template.push({
                label: curso,
                type: 'radio'
            })
        })

        return template;
    }
}
