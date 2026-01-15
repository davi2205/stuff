
export const REQUIRE_AT_LEAST_ONE = 0;
export const REQUIRE_ALL = 1;

export class Listeners {
    #array = new Array();
    #requiredMethods = new Array();
    #requirementType = REQUIRE_AT_LEAST_ONE;

    constructor({ requiredMethods = [] } = {}) {
        this.#requiredMethods = requiredMethods;
    }

    set requirementType(type) {
        if (type !== REQUIRE_AT_LEAST_ONE && type !== REQUIRE_ALL) {
            throw new Error("Invalid requirement type");
        }
        this.#requirementType = type;
    }

    get requirementType() {
        return this.#requirementType;
    }

    add(listener) {
        var requiredMethod, foundRequiredMethodCount;
        foundRequiredMethodCount = 0;
        for (requiredMethod of this.#requiredMethods) {
            if (typeof listener[requiredMethod] !== "function") {
                foundRequiredMethodCount++;
            }
        }
        if (this.#requirementType == REQUIRE_ALL && foundRequiredMethodCount < this.#requiredMethods.length) {
            throw new Error("Listener does not implement all required methods");
        }
        if (this.#requirementType == REQUIRE_AT_LEAST_ONE && this.#requiredMethods.length > 0 && foundRequiredMethodCount == 0) {
            throw new Error("Listener does not implement any required methods");
        }
        this.#array.push(listener);
    }

    notify(methodName, ...args) {
        var listener;
        for (listener of this.#array) {
            if (typeof listener[methodName] === "function") {
                listener[methodName](...args);
            }
        }
    }

    awaitNotify(methodName, ...args) {
        var listener, promises;
        promises = new Array();
        for (listener of this.#array) {
            if (typeof listener[methodName] === "function") {
                promises.push(listener[methodName](...args));
            }
        }
        return Promise.all(promises);
    }
}