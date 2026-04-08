import { ContainerWidget } from "./ContainerWidget.js";
import { HtmlBacked, isHtmlBacked } from "./HtmlBacked.js";
import { Widget } from "./Widget.js";

export class RootWidget extends ContainerWidget implements HtmlBacked {
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

    if (isHtmlBacked(widget)) {
      this.element.appendChild(widget.getHtmlElement());
    }
  }

  remove(widget: Widget): void {
    super.remove(widget);

    if (isHtmlBacked(widget)) {
      this.element.removeChild(widget.getHtmlElement());
    }
  }
}

var instance: RootWidget = new RootWidget();