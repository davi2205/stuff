
import { generateUniqueId, htmlElement, associateObject } from "../shared/htmlHelpers.js";

export class Card {
    #id;

    constructor() {
        this.#id = generateUniqueId('card-');
    }

    buildAt(targetElement) {
        if (this.element) {
            throw new Error('Card already built');
        }

        targetElement.appendChild(htmlElement(/*html*/`
            <div class="card" id="${this.#id}">
                <div class="card-header">
                    <h3 class="card-title"></h3>
                    <div class="card-tools">
                        <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                            <i class="fas fa-minus"></i>
                        </button>
                        <button type="button" class="btn btn-tool" data-card-widget="remove" title="Remove">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
                <div class="card-body">
                </div>
                <div class="card-footer d-none">
                </div>
            </div>
        `));

        associateObject(this.element, this);
    }

    set title(title) {
        document.querySelector(`#${this.#id} .card-title`).textContent = title;
    }

    get element() {
        return document.querySelector(`#${this.#id}`);
    }

    get bodyElement() {
        return document.querySelector(`#${this.#id} .card-body`);
    }

    get footerElement() {
        return document.querySelector(`#${this.#id} .card-footer`);
    }

    set enableFooter(enable) {
        this.footerElement.classList.toggle('d-none', !enable);
    }
}