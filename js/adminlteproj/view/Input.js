import { Helper } from "./Helper.js";
import { EventEmitter } from "./EventEmitter.js";

export class Input {
    #id;
    #eventEmitter;
    #type = 'text';
    #select2Request = null;

    constructor() {
        this.#id = Helper.generateId();
        this.#eventEmitter = new EventEmitter({ events: ['onChange', 'onImmediateChange', 'onDataRequest'] });
    }

    get element() {
        return document.getElementById(this.#id);
    }

    get inputElement() {
        return this.element.querySelector('input');
    }

    get selectElement() {
        return this.element.querySelector('select');
    }

    get label() {
        return this.element.querySelector('label').innerText;
    }

    set label(value) {
        this.element.querySelector('label').innerText = value;
    }

    get value() {
        if (this.#type === 'select') {
            return $(this.selectElement).val();
        }
        return this.element.querySelector('input').value;
    }

    set value(value) {
        if (this.#type === 'select') {
            $(this.selectElement).val(value).trigger('change');
            return;
        }
        this.element.querySelector('input').value = value;
    }

    get placeholder() {
        return this.element.querySelector('input').placeholder;
    }

    set placeholder(value) {
        this.element.querySelector('input').placeholder = value;
    }

    get type() {
        return this.#type;
    }

    set type(type) {
        switch (type) {
            case 'text':
            case 'number':
            case 'date':
            case 'email':
            case 'password':
                this.#switchToInput();
                this.#type = type;
                this.inputElement.type = type;
                break;
            case 'select':
                this.#switchToSelect();
                this.#type = type;
                break;                
            default:
                throw new Error('Invalid input type: ' + type);
        }
    }

    get requestParams() {
        return this.#select2Request?.params?.data;
    }

    set requestData(data) {
        if (this.#select2Request) {
            this.#select2Request.data = structuredClone(data);
        }
    }

    set requestHasMoreData(hasMore) {
        if (this.#select2Request) {
            this.#select2Request.hasMore = hasMore;
        }
    }

    /** @param {HTMLElement} element */
    appendAt(element) {
        element.appendChild(Helper.generateNode(`
            <div id="${this.#id}" class="form-group">
                <label for="${this.#id}-input"></label>
            </div>
        `));
        
        Helper.associateObjectWith(this.element, this);

        this.#switchToInput();
    }

    dataSuccess(data) {
        if (this.#select2Request) {
            this.#select2Request.success(data);
        }
    }

    emitEventsTo(listener) {
        this.#eventEmitter.emitTo(listener);
    }

    #switchToInput() {
        if (this.inputElement) {
            return;
        }

        this.element.querySelector('.input-group')?.remove();
        this.element.appendChild(Helper.generateNode(`
            <div class="input-group">
                <input id="${this.#id}-input" type="${this.#type}" class="form-control"/>
            </div>
        `));

        this.inputElement.addEventListener('change', (e) => { this.#eventEmitter.emit('onChange', this); });
        this.inputElement.addEventListener('input', (e) => { this.#eventEmitter.emit('onImmediateChange', this); });
    }

    #switchToSelect() {
        if (this.selectElement) {
            return;
        }

        this.element.querySelector('.input-group')?.remove();
        this.element.appendChild(Helper.generateNode(`
            <div class="input-group">
                <select id="${this.#id}-input" class="form-control"></select>
            </div>
        `));

        $(this.selectElement).select2({
            ajax: {
                transport: (params, success, failure) => {
                    this.#select2Request = { params, success, failure, data: null, hasMore: false };
                    try {
                        this.#eventEmitter.emit('onDataRequest', this);
                        if (this.#select2Request.data) {
                            success({ results: this.#select2Request.data, pagination: { more: this.#select2Request.hasMore } });
                        } else {
                            failure({});
                        }
                    } catch (e) {
                        failure(e);
                    }
                    this.#select2Request = null;
                }
            }
        });
    }
}