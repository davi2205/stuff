import { Widget } from "./Widget.js";
export class ContainerWidget extends Widget {
    items = [];
    constructor() {
        super();
    }
    add(widget) {
        if (widget === this) {
            throw new Error("Cannot add widget to itself.");
        }
        if (this.items.includes(widget)) {
            throw new Error("Widget is already added.");
        }
        this.items.push(widget);
    }
    remove(widget) {
        var index;
        index = this.items.indexOf(widget);
        if (index === -1) {
            throw new Error("Widget not found.");
        }
        this.items.splice(index, 1);
    }
}
//# sourceMappingURL=ContainerWidget.js.map