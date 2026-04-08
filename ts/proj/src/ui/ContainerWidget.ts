
import { Widget } from "./Widget.js";

export class ContainerWidget extends Widget {
  private items: Widget[] = [];

  constructor() {
    super();
  }

  add(widget: Widget): void {
    if (widget === this) {
      throw new Error("Cannot add widget to itself.");
    }
    if (this.items.includes(widget)) {
      throw new Error("Widget is already added.");
    }
    this.items.push(widget);
  }

  remove(widget: Widget): void {
    var index: number;

    index = this.items.indexOf(widget);
    if (index === -1) {
      throw new Error("Widget not found.");
    }
    
    this.items.splice(index, 1);
  }

  findByClass(_class: object): Widget[] {
    var result: Widget[] = [];
    var item: Widget;

    for (item of this.items) {
      if (item.constructor === _class) {
        result.push(item);
      }
      if (item instanceof ContainerWidget) {
        result.push(...item.findByClass(_class));
      }
    }

    return result;
  }
}