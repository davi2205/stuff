
var objectByElement = new WeakMap();

export class Helper {
    static generateId() {
        return 'id-' + Math.random().toString(36).substr(2, 16);
    }

    static generateNode(str) {
        var template;
        template = document.createElement('div');
        template.innerHTML = str.trim();
        return template.firstChild;
    }

    /** @param {HTMLElement} element */
    static associateObjectWith(element, object) {
        objectByElement.set(element, object);
    }

    static associatedObjectWith(element) {
        return objectByElement.get(element);
    }
}