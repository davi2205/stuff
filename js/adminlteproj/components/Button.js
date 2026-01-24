
import { generateUniqueId, htmlElement, associateObject } from "../shared/htmlHelpers.js";
import { Listeners } from "../shared/Listeners.js";

export class Button {
    #id;
    #listeners;

    constructor() {
        this.#id = generateUniqueId('button-');
        this.#listeners = new Listeners();
        this.#listeners.requiredMethods = ['onButtonClick'];
    }

    buildAt(targetElement) {
        if (this.element) {
            throw new Error('Button already built');
        }

        targetElement.appendChild(htmlElement(/*html*/`
            <button class="btn btn-primary mr-1 mb-1" id="${this.#id}"></button>
        `));
        
        associateObject(this.element, this);

        this.element.addEventListener('click', (event) => {
            this.#listeners.notify('onButtonClick', this);
        });
    }   

    set title(title) {
        document.querySelector(`#${this.#id}`).textContent = title;
    }

    get title() {
        return document.querySelector(`#${this.#id}`).textContent;
    }

    get element() {
        return document.querySelector(`#${this.#id}`);
    }

    notifyEventsTo(listener) {
        this.#listeners.add(listener);
    }
}