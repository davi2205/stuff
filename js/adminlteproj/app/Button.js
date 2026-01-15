
import { generateUniqueId, stringToHtml } from "./helpers.js";

export class Button {
    #id;

    constructor() {
        this.#id = generateUniqueId('button-');
    }

    buildAt(target) {
        target.appendChild(stringToHtml(/*html*/`
            <button class="btn btn-primary" id="${this.#id}"></button>
        `));
    }   

    set title(title) {
        document.querySelector(`#${this.#id}`).textContent = title;
    }
}