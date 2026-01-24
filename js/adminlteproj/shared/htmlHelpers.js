
export function generateUniqueId(prefix = '') {
    return prefix + Math.random().toString(36).substr(2, 9);
}

export function htmlElement(str) {
    var template;
    template = document.createElement('template');
    template.innerHTML = str.trim();
    return template.content.firstChild;
}

var objectByElement = new WeakMap();

export function associateObject(element, obj) {
    if (!(element instanceof HTMLElement)) {
        throw new Error("Element must be an instance of HTMLElement");
    }
    objectByElement.set(element, obj);
}

export function associatedObject(element) {
    if (!(element instanceof HTMLElement)) {
        throw new Error("Element must be an instance of HTMLElement");
    }
    return objectByElement.get(element);
}