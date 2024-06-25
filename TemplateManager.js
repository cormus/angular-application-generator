import FormCamps from "./FormCamps.js";

export default class TemplateManager {

    static componentHtml(form, componenteNome) {
        return `import { Component } from '@angular/core';

            @Component({
            selector: 'app-${form.componente}',
            standalone: true,
            imports: [],
            templateUrl: './${form.componente}.component.html',
            styleUrl: './${form.componente}.component.scss'
            })
            export class ${componenteNome}Component {

        }`;
    }

    static specHtml(form, componenteNome) {
        return `import { ComponentFixture, TestBed } from '@angular/core/testing';

            import { ${componenteNome}Component } from './${form.componente}.component';

            describe('${componenteNome}Component', () => {
                let component: ${componenteNome}Component;
                let fixture: ComponentFixture<${componenteNome}Component>;

                beforeEach(async () => {
                    await TestBed.configureTestingModule({
                    imports: [${componenteNome}Component]
                    })
                    .compileComponents();
                    
                    fixture = TestBed.createComponent(${componenteNome}Component);
                    component = fixture.componentInstance;
                    fixture.detectChanges();
                });

                it('should create', () => {
                    expect(component).toBeTruthy();
                });
            });`;
    }

    static modelHtml(form, componenteNome) {

        let models  = form.campos.map(campo => {
            let model = FormCamps.campsModule(campo);
            return model ? model.model : null;
        }).filter(model => model);

        let imports  = form.campos.map(campo => {
            let model = FormCamps.campsModule(campo);
            return model ? model.import : null;
        }).filter(model => model);

        models = [...new Set(models)];
        imports = [...new Set(imports)];
        console.log(models);

        return `import { CommonModule } from '@angular/common';
            import { NgModule } from '@angular/core';
            import { ${componenteNome}Component } from './${form.componente}.component';
            ${imports.join(';\n')}

            @NgModule({
                declarations: [${componenteNome}Component],
                imports: [
                    CommonModule${models.length > 0 ? ',' : ''}
                    ${models.join(',\n')}
                ]
            })
            export class ${componenteNome}Module {

            }`;  
    }

    static routerTs(routerModuleName, routers) {
        return `import { NgModule } from '@angular/core';
                import { RouterModule } from '@angular/router';

                @NgModule({
                    imports: [
                        RouterModule.forChild([
                            ${routers.map(router => `{ path: '${router.path}', data: { breadcrumb: '${router.breadcrumb}' }, loadChildren: () => import('${router.import}').then(m => m.${router.module}) },`)}
                            { path: '**', redirectTo: '/notfound' }
                        ])
                    ],
                    exports: [RouterModule]
                })
                export class ${routerModuleName}RoutingModule { }
                `;
    }  

}
