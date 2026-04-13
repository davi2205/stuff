import { HTMLHelper } from "./HTMLHelper";
import { Widget } from "./Widget";
export class Label extends Widget {
    helper;
    element;
    constructor() {
        super();
        this.helper = new HTMLHelper();
        this.element = this.helper.createTextElement("");
        this.element.dataset.role = "label";
    }
    getHtmlElement() {
        return this.element;
    }
}
//# sourceMappingURL=Label.js.map