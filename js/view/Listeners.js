
export class Listeners {
    #array = new Array;
    #events;

    constructor(events) {
        this.#events = structuredClone(events);
    }

    add(listener) {
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
        this.#array.push(listener);
    }

    notify(eventName, ...args) {
        var listener;
        for (listener of this.#array) {
            if (typeof listener[eventName] === 'function') {
                listener[eventName](...args);
            }
        }
    }
}