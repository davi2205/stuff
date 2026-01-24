import { generateUniqueId, htmlElement, associateObject } from "../shared/htmlHelpers.js";

export class Input {
    #id;

    constructor() {
        this.#id = generateUniqueId('input-');
    }

    buildAt(targetElement) {
        if (this.element) {
            throw new Error('Input already built');
        }

        targetElement.appendChild(htmlElement(/*html*/`
            <div class="form-group" id="${this.#id}">
                <label for="${this.#id}-input"></label>
                <input type="text" class="form-control" id="${this.#id}-input" placeholder="">
            </div>
        `));

        associateObject(this.element, this);
    }

    set title(title) {
        document.querySelector(`#${this.#id} label`).textContent = title;
    }

    set value(value) {
        document.querySelector(`#${this.#id}-input`).value = value;
    }

    get value() {
        return document.querySelector(`#${this.#id}-input`).value;
    }

    set placeholder(placeholder) {
        document.querySelector(`#${this.#id}-input`).placeholder = placeholder;
    }

    get placeholder() {
        return document.querySelector(`#${this.#id}-input`).placeholder;
    }

    get element() { 
        return document.querySelector(`#${this.#id}`);
    }
}