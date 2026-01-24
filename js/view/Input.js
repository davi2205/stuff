import { Helper } from "./Helper";
import { Listeners } from "./Listeners";

export class Input {
    #listeners;
    #helper;
    #id;

    constructor() {
        this.#listeners = new Listeners(['onChange']);
        this.#helper = new Helper();
        this.#id = this.#helper.generateId();
    }

    get element() {
        return document.getElementById(this.#id);
    }

    get inputElement() {
        return this.element.querySelector('input');
    }

    get label() {
        return this.element.querySelector('label').innerText;
    }

    set label(value) {
        this.element.querySelector('label').innerText = value;
    }

    get value() {
        return this.element.querySelector('input').value;
    }

    set value(value) {
        this.element.querySelector('input').value = value;
    }

    get placeholder() {
        return this.element.querySelector('input').placeholder;
    }

    set placeholder(value) {
        this.element.querySelector('input').placeholder = value;
    }

    /** @param {HTMLElement} element */
    appendAt(element) {
        element.appendChild(this.#helper.generateNode(`
            <div class="form-group" id="${this.#id}">
                <label></label>
                <div class="input-group">
                    <input type="text" class="form-control"/>
                </div>
            </div>
        `));

        this.inputElement.addEventListener('change', (e) => {
            this.#listeners.notify('onChange', this);
        });
    }
}