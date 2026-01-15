
export function generateUniqueId(prefix = '') {
    return prefix + Math.random().toString(36).substr(2, 9);
}

export function stringToHtml(str) {
    const template = document.createElement('template');
    template.innerHTML = str.trim();
    return template.content.firstChild;
}