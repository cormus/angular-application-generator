export default class FormCamps {
    static textCamp(camp) {
        return `<div class="field">
                    <label htmlFor="${camp.name}">${camp.label}</label>
                    <input pInputText id="${camp.name}" placeholder="${camp.placeholder}" ${typeof camp.disabled !== 'undefined' ? `[disabled]="${camp.disabled}"` : ''} type="text"/>
                </div>`;
    }

    static passwordCamp(camp) {
        return ` <div class="field">
                    <label htmlFor="${camp.name}">${camp.label}</label>
                    <p-password id="${camp.name}" placeholder="${camp.placeholder}">
                        <ng-template pTemplate="header">
                            <h6>Escolha uma senha</h6>
                        </ng-template>
                        <ng-template pTemplate="footer">
                            <p-divider />
                            <p class="mt-2">Sugestões</p>
                            <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                <li>Pelo menos uma letra minúscula</li>
                                <li>Pelo menos uma letra maiúscula</li>
                                <li>Pelo menos um numérico</li>
                                <li>Mínimo 8 caracteres</li>
                            </ul>
                        </ng-template>
                    </p-password>
                </div>`;
    }

    static integerCamp(camp) {
        if(typeof camp.option != 'undefined' && typeof camp.option.mim !== 'undefined' && typeof camp.option.max !== 'undefined'){
            return `<div class="field">
                        <label htmlFor="${camp.name}">${camp.label}</label>
                        <p-inputNumber  
                            id="${camp.name}" 
                            placeholder="${camp.placeholder}" 
                            ${typeof camp.disabled !== 'undefined' ? `[disabled]="${camp.disabled}"` : ''}  
                            mode="decimal" 
                            inputId="minmax" 
                            [useGrouping]="false"
                            [min]="${camp.option.mim}" 
                            [max]="${camp.option.max}"
                        ></p-inputNumber>
                    </div>`;
        } else {
            return `<div class="field">
                        <label htmlFor="${camp.name}">${camp.label}</label>
                        <p-inputNumber  id="${camp.name}" placeholder="${camp.placeholder}" ${typeof camp.disabled !== 'undefined' ? `[disabled]="${camp.disabled}"` : ''}  mode="decimal" inputId="withoutgrouping" [useGrouping]="false"></p-inputNumber>
                    </div>`;
        }
    }

    static moneyCamp(camp) {
        return `<div class="field">
                    <label htmlFor="${camp.name}">${camp.label}</label>
                    <p-inputNumber id="${camp.name}" placeholder="${camp.placeholder}" ${typeof camp.disabled !== 'undefined' ? `[disabled]="${camp.disabled}"` : ''}  mode="currency" symbol=" R$" currency="BRL" ></p-inputNumber>
                </div>`;
    }

    static autocompleteCamp(camp) {
        return `<div class="field">
                    <label htmlFor="${camp.name}">${camp.label}</label>
                    <p-autoComplete 
                        id="${camp.name}" 
                        [(ngModel)]="selectedCountryAdvanced" 
                        [suggestions]="filteredCountries" 
                        (completeMethod)="filterCountry($event)" 
                        field="name" [dropdown]="true"
                    >
                    </p-autoComplete>
                </div> `;
    }

    static checkboxCamp(camp) {
        return `<div class="field">
                    <label htmlFor="${camp.name}">${camp.label}</label>
                    <div class="grid formgrid">
                        <div class="col-12 md:col-4">
                            <div class="field-checkbox">
                                <p-checkbox name="group1" value="New York" [(ngModel)]="valCheck" id="ny"></p-checkbox>
                                <label for="ny">New York</label>
                            </div>
                        </div>
                        <div class="col-12 md:col-4">
                            <div class="field-checkbox">
                                <p-checkbox name="group1" value="San Francisco" [(ngModel)]="valCheck" id="sf"></p-checkbox>
                                <label for="sf">San Francisco</label>
                            </div>
                        </div>
                        <div class="col-12 md:col-4">
                            <div class="field-checkbox">
                                <p-checkbox name="group1" value="Los Angeles" [(ngModel)]="valCheck" id="la"></p-checkbox>
                                <label for="la">Los Angeles</label>
                            </div>
                        </div>
                    </div>
                </div>`;
    }

    static radioCamp(camp) {
        return `<div class="field">
                    <label htmlFor="${camp.name}">${camp.label}</label>
                    <div class="grid formgrid">
                        <div class="col-12 md:col-4">
                            <div class="field-radiobutton">
                                <p-radioButton name="city" value="Chicago" [(ngModel)]="valRadio" id="city1"></p-radioButton>
                                <label for="city1">Chicago</label>
                            </div>
                        </div>
                        <div class="col-12 md:col-4">
                            <div class="field-radiobutton">
                                <p-radioButton name="city" value="Los Angeles" [(ngModel)]="valRadio"
                                            id="city2"></p-radioButton>
                                <label for="city2">Los Angeles</label>
                            </div>
                        </div>
                        <div class="col-12 md:col-4">
                            <div class="field-radiobutton">
                                <p-radioButton name="city" value="New York" [(ngModel)]="valRadio" id="city3"></p-radioButton>
                                <label for="city3">New York</label>
                            </div>
                        </div>
                    </div>
                </div>`;
    }

    static textareaCamp(camp) {
       return `<div class="field">
                    <label for="${camp.name}">${camp.label}</label>
                    <textarea rows="5" cols="30" id="${camp.name}" placeholder="${camp.placeholder}" ${typeof camp.disabled !== 'undefined' ? `[disabled]="${camp.disabled}"` : ''} pInputTextarea></textarea>
                </div>`;
    }

    static calendarCamp(camp) {
       return `<div class="field">
                    <label for="${camp.name}">${camp.label}</label>
                    <p-calendar id="${camp.name}" placeholder="${camp.placeholder}" ${typeof camp.disabled !== 'undefined' ? `[disabled]="${camp.disabled}"` : ''} [showIcon]="true" inputId="icon"></p-calendar>
                </div>`;
    }

    static titleCamp(camp) {
       return `<h5>${camp.label}</h5>`;
    }

    static convertToHtml = (campo) => {
        switch (campo.type) {
            case 'text':
                return FormCamps.textCamp(campo);
            case 'password':
                return FormCamps.passwordCamp(campo);
            case 'integer':
                return FormCamps.integerCamp(campo);
            case 'money':
                return FormCamps.moneyCamp(campo);
            case 'autocomplete':
                return FormCamps.autocompleteCamp(campo);
            case 'checkbox':
                return FormCamps.checkboxCamp(campo);
            case 'radio':
                return FormCamps.radioCamp(campo);
            case 'textarea':
                return FormCamps.textareaCamp(campo);
            case 'calendar':
                return FormCamps.calendarCamp(campo);
            case 'title':
                return FormCamps.titleCamp(campo);
            default:
                console.error('Tipo de campo não encontrado', campo.type);
                return '';
        }
    }

    static campsModule = (campo) => {
        let campoType = null;
        switch (campo.type) {
            case 'text':
                campoType ={
                    model: 'InputTextModule',
                    import: "import { InputTextModule } from 'primeng/inputtext'"
                };
                break;
            case 'password':
                campoType ={
                    model: 'PasswordModule',
                    import: "import { PasswordModule } from 'primeng/password'"
                };
                break;
            case 'integer':
            case 'money':
                campoType ={
                    model: 'InputNumberModule',
                    import: "import { InputNumberModule } from 'primeng/inputnumber'"
                };
                break;
            case 'autocomplete':
                campoType ={
                    model: 'AutoCompleteModule',
                    import: "import { AutoCompleteModule } from 'primeng/autocomplete'"
                };
                break;
            case 'checkbox':
                campoType ={
                    model: 'CheckboxModule',
                    import: "import { CheckboxModule } from 'primeng/checkbox'"
                };
                break;
            case 'radio':
                campoType ={
                    model: 'RadioButtonModule',
                    import: "import { RadioButtonModule } from 'primeng/radiobutton'"
                };
                break;
            case 'textarea':
                campoType ={
                    model: 'InputTextareaModule',
                    import: "import { InputTextareaModule } from 'primeng/inputtextarea'"
                };
                break;
            case 'calendar':
                campoType ={
                    model: 'CalendarModule',
                    import:"import { CalendarModule } from 'primeng/calendar'"
                };
                break;
            default:
                console.error('Tipo de campo não encontrado', campo.type);
        }
        return campoType;
    };
}