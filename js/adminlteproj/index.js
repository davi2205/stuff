import { Input } from "./view/Input.js";

new class {
    constructor() {
        var rootElement, input;

        rootElement = document.getElementById('app-root');

        input = new Input();
        input.appendAt(rootElement);
        input.label = "Nome";
        input.placeholder = "Digite seu nome";
        input.type = 'select';
        input.emitEventsTo(this);

    }

    onImmediateChange(input) {
        var oldValue, newValue;

        oldValue = input.value.replace(/[^0-9]/g, '');
        newValue = '';
        if (oldValue.length > 0) {
            newValue += '(' + oldValue.slice(0, 2);
        }
        if (oldValue.length > 2) {
            newValue += ') ' + oldValue.slice(2, 7);
        }
        if (oldValue.length > 7) {
            newValue += '-' + oldValue.slice(7, 11);
        }
        input.value = newValue;

    }

    onChange(input) {
        console.log("Valor alterado: " + input.value);
    }

    onDataRequest(input) {
        console.log(input.requestParams);
        input.requestData = [
            { id: '1', text: 'Opção 1' },
            { id: '2', text: 'Opção 2' },
            { id: '3', text: 'Opção 3' },
            { id: '4', text: 'Opção 4' },
            { id: '5', text: 'Opção 5' },
        ];
    }
}