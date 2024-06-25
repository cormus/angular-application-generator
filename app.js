import fs from 'fs/promises';
import FormCamps from "./FormCamps.js";
import UtilFunctions from "./UtilFunctions.js";
import TemplateManager from "./TemplateManager.js";


async function saveFile(dir, componentName, content) {
    try {
        await fs.mkdir(`${dir}`, { recursive: true }); // Cria o diretório se não existir
        await fs.writeFile(`${dir}/${componentName}`, content);
    } catch (err) {
        console.error(err);
    }
}

async function readJsonFile(path) {
    try {
        let json = await fs.readFile(path, 'utf8');
        return JSON.parse(json);
    } catch (err) {
        console.error(err);
    }
}

//método para ler arquivo texto
async function criarApp() {

    //transforma o arquivo em objeto
    let forms = await readJsonFile('telas.json');

    let html = '';

    //percorer formularios
    for (const form of forms) {
        //percorrer campos
        form.campos.forEach(campo => {
            html += FormCamps.convertToHtml(campo);
        });

        const componenteNome = UtilFunctions.capitalize(form.componente);

        const template = `<div class="grid p-fluid">
                            <div class="col-12 md:col-12">
                                <div class="card">
                                    ${html}
                                </div>  
                            </div>
                        </div>`;

        let dir = "D:/develop/htdocs/gerador/sakai-ng/src/app/usuario";

        let routers = [
            {
                "path": "usuario",
                "breadcrumb": "usuario",
                "module": `${componenteNome}Module`,
                "import": `./${form.componente}.module`
            }
        ]; 

        await saveFile(`${dir}/${form.componente}`, `${form.componente}.component.html`, template);
        await saveFile(`${dir}/${form.componente}`, `${form.componente}-routing.module.ts`, TemplateManager.routerTs(componenteNome, routers));

        fs.writeFile(`${dir}/${form.componente}/${form.componente}.component.scss`, "", (err) => {
            if (err) {
                console.error(err)
                return
            }
            console.log('Arquivo salvo com sucesso');
        });

        fs.writeFile(`${dir}/${form.componente}/${form.componente}.component.spec.ts`, TemplateManager.specHtml(form, componenteNome), (err) => {
            if (err) {
                console.error(err)
                return
            }
            console.log('Arquivo salvo com sucesso');
        });

        fs.writeFile(`${dir}/${form.componente}/${form.componente}.component.ts`, TemplateManager.componentHtml(form, componenteNome), (err) => {
            if (err) {
                console.error(err)
                return
            }
            console.log('Arquivo salvo com sucesso');
        });

        fs.writeFile(`${dir}/${form.componente}/${form.componente}.module.ts`, TemplateManager.modelHtml(form, componenteNome), (err) => {
            if (err) {
                console.error(err)
                return
            }
            console.log('Arquivo salvo com sucesso');
        });
    };
}


criarApp();
