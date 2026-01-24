import { associateObject, generateUniqueId, htmlElement } from "../shared/htmlHelpers.js";

export class Layout {
    #id;

    constructor() {
        this.#id = generateUniqueId('layout-');
    }

    buildAt(targetElement) {
        if (this.element) {
            throw new Error('Layout already built');
        }

        targetElement.appendChild(htmlElement(/*html*/`
            <div id="${this.#id}">
                <div class="row active-row">
                </div>
            </div>
        `));

        associateObject(this.element, this);
    }

    addCell(size = null) {
        this.activeCellElement?.classList.remove('active-cell');

        this.activeRowElement.appendChild(htmlElement(/*html*/`
            <div class="col${size ? `-${size}` : ''} active-cell" >
            </div>
        `));
    }

    get element() {
        return document.querySelector(`#${this.#id}`);
    }

    get activeRowElement() {
        return document.querySelector(`#${this.#id} div.active-row`);
    }

    get activeCellElement() {
        return document.querySelector(`#${this.#id} div.active-cell`);
    }
}