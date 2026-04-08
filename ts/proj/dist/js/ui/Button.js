import { Widget } from "./Widget.js";
export class Button extends Widget {
    label;
    element;
    constructor() {
        super();
        this.label = "Button";
        this.element = document.createElement("button");
        this.element.className = 'button';
        this.element.textContent = this.label;
        this.useSuggestedSize();
    }
    getLabel() {
        return this.label;
    }
    setLabel(label) {
        if (this.label === label) {
            return;
        }
        this.label = label;
        this.element.textContent = this.label;
    }
    getHtmlElement() {
        return this.element;
    }
    setBounds(x, y, width, height) {
        super.setBounds(x, y, width, height);
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
    }
    useSuggestedSize() {
        this.setBounds(this.getX(), this.getY(), this.getSuggestedWidth(), this.getSuggestedHeight());
    }
    getSuggestClientRect() {
        var element;
        var rect;
        element = document.createElement("button");
        element.className = 'button';
        element.textContent = this.label;
        document.body.appendChild(element);
        rect = element.getBoundingClientRect();
        document.body.removeChild(element);
        return rect;
    }
    getSuggestedWidth() {
        return this.getSuggestClientRect().width;
    }
    getSuggestedHeight() {
        return this.getSuggestClientRect().height;
    }
}
//# sourceMappingURL=Button.js.map