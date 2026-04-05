import { ContainerWidget } from "./ContainerWidget.js";
import { isHtmlRelated } from "./HtmlRelated.js";
export class WindowWidget extends ContainerWidget {
    title;
    element;
    constructor() {
        super();
        this.title = "Window";
        this.element = document.createElement("div");
        this.element.className = 'window';
        this.element.innerHTML = `
      <div class="window-title">${this.title}</div>
      <div class="window-content"></div>
    `;
    }
    getTitle() {
        return this.title;
    }
    setTitle(title) {
        var titleElement;
        this.title = title;
        titleElement = this.element.querySelector(".window-title");
        if (titleElement) {
            titleElement.textContent = this.title;
        }
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
    add(widget) {
        var contentElement;
        super.add(widget);
        if (isHtmlRelated(widget)) {
            contentElement = this.element.querySelector(".window-content");
            if (contentElement) {
                contentElement.appendChild(widget.getHtmlElement());
            }
        }
    }
}
//# sourceMappingURL=WindowWidget.js.map