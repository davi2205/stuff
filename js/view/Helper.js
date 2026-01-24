
export class Helper {
    generateId() {
        return 'id-' + Math.random().toString(36).substr(2, 16);
    }

    generateNode(str) {
        var template;
        template = document.createElement('div');
        template.innerHTML = str.trim();
        return template.firstChild;
    }
}