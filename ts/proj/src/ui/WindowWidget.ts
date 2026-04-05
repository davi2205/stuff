
import { ContainerWidget } from "./ContainerWidget.js";
import { HtmlRelated, isHtmlRelated } from "./HtmlRelated.js";
import { Widget } from "./Widget.js";

export class WindowWidget extends ContainerWidget implements HtmlRelated {
  private title: string;
  private element: HTMLElement;
  
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

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): void {
    var titleElement: HTMLElement | null;

    this.title = title;
    titleElement = this.element.querySelector(".window-title");
    if (titleElement) {
      titleElement.textContent = this.title;
    }
  }

  getHtmlElement(): HTMLElement {
    return this.element;
  }

  setBounds(x: number, y: number, width: number, height: number): void {
    super.setBounds(x, y, width, height);
    
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
  }

  add(widget: Widget): void {
    var contentElement: HTMLElement | null;

    super.add(widget);

    if (isHtmlRelated(widget)) {
      contentElement = this.element.querySelector(".window-content");
      if (contentElement) {
        contentElement.appendChild(widget.getHtmlElement());
      }
    }
  }
}