const { ipcMain } = require('electron');
const data = require('./data');

module.exports = {
    templateInicial: null,

    geraTrayTemplate(win) {
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
                type: 'radio',
                click: () => {
                    win.send('curso-trocado', curso);
                }
            })
        })

        this.templateInicial = template;
        return template;
    },

    adicionaCursoNoTray(curso, win) {
        this.templateInicial.push({
            label: curso,
            type: 'radio',
            checked: true,
            click: () => {
                win.send('curso-trocado', curso);
            }
        });

        return this.templateInicial;
    },

    geraMenuPrincipal(app) {
        let templateMenu = [
            {
                label: 'Menu',
                submenu: [
                    {
                        label: 'Sobre a aplicação',
                        accelerator: 'Ctrl+S',
                        click: () => {
                            ipcMain.emit('abrir-sobre');
                        }
                    },
                    {
                        label: 'Fechar',
                        role: 'close',
                    }
                ]
            },
            {
              label: 'Janela',
              submenu: [
                {
                    label: 'Recarregar',
                    role: 'reload'
                },
                {
                    label: 'Painel do Desenvolvedor',
                    role: 'toggleDevTools',
                },
                {
                    label: 'Zoom +',
                    role: 'zoomIn',
                },
                {
                    label: 'Zoom -',
                    role: 'zoomOut',
                }
              ]
            }
        ]

        if (process.platform === 'darwin') {
            templateMenu.unshift({
                label: app.getName(),
                submenu: [
                    {
                        label: 'Mac exige isso'
                    },
                ]
            })
        }

        return templateMenu;
    }
}
