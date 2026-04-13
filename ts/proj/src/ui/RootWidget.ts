import { ContainerWidget } from "./ContainerWidget.js";
import { HTMLBacked, isHTMLBacked } from "./HTMLBacked.js";
import { Widget } from "./Widget.js";

export class RootWidget extends ContainerWidget implements HTMLBacked {
  element: HTMLElement;

  static getInstance(): RootWidget {
    return instance;
  }
    
  constructor() {
    super();

    this.element = document.createElement("div");
  }

  getHtmlElement(): HTMLElement {
    return this.element;
  }

  add(widget: Widget): void {
    super.add(widget);

    if (isHTMLBacked(widget)) {
      this.element.appendChild(widget.getHtmlElement());
    }
  }

  remove(widget: Widget): void {
    super.remove(widget);

    if (isHTMLBacked(widget)) {
      this.element.removeChild(widget.getHtmlElement());
    }
  }
}

var instance: RootWidget = new RootWidget();