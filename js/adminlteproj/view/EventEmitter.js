
export class EventEmitter {
    #listeners = new Array();
    #events;

    constructor({ events }) {
        this.#events = structuredClone(events);
    }

    emitTo(listener) {
        var hasAtLeastOne;
        hasAtLeastOne = false;
        for (var eventName of this.#events) {
            if (typeof listener[eventName] === 'function') {
                hasAtLeastOne = true;
                break;
            }
        }
        if (!hasAtLeastOne) {
            throw new Error('Listener does not implement any of the required events: ' + this.#events.join(', '));
        }
        this.#listeners.push(listener);
    }

    emit(eventName, ...args) {
        var listener;
        for (listener of this.#listeners) {
            if (typeof listener[eventName] === 'function') {
                listener[eventName](...args);
            }
        }
    }
}