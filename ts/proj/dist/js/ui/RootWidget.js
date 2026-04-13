import { ContainerWidget } from "./ContainerWidget.js";
import { isHTMLBacked } from "./HTMLBacked.js";
export class RootWidget extends ContainerWidget {
    element;
    static getInstance() {
        return instance;
    }
    constructor() {
        super();
        this.element = document.createElement("div");
    }
    getHtmlElement() {
        return this.element;
    }
    add(widget) {
        super.add(widget);
        if (isHTMLBacked(widget)) {
            this.element.appendChild(widget.getHtmlElement());
        }
    }
    remove(widget) {
        super.remove(widget);
        if (isHTMLBacked(widget)) {
            this.element.removeChild(widget.getHtmlElement());
        }
    }
}
var instance = new RootWidget();
//# sourceMappingURL=RootWidget.js.map