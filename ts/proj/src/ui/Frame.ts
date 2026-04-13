
import { ContainerWidget } from "./ContainerWidget.js";
import { HTMLBacked, isHTMLBacked } from "./HTMLBacked.js";
import { Widget } from "./Widget.js";

export class Frame extends ContainerWidget implements HTMLBacked {
  private label: string;
  private element: HTMLElement;
  
  constructor() {
    super();

    this.label = "Window";
    this.element = document.createElement("div");
    this.element.className = 'window';
    this.element.innerHTML = `
      <div class="window-label">${this.label}</div>
      <div class="window-content"></div>
      <div class="resizer-top"></div>
      <div class="resizer-right"></div>
      <div class="resizer-bottom"></div>
      <div class="resizer-left"></div>
      <div class="resizer-top-left"></div>
      <div class="resizer-top-right"></div>
      <div class="resizer-bottom-left"></div>
      <div class="resizer-bottom-right"></div>
    `;
  }

  getLabel(): string {
    return this.label;
  }

  setLabel(label: string): void {
    var labelElement: HTMLElement | null;

    this.label = label;
    labelElement = this.element.querySelector(".window-label");
    if (labelElement) {
      labelElement.textContent = this.label;
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

    if (isHTMLBacked(widget)) {
      contentElement = this.element.querySelector(".window-content");
      if (contentElement) {
        contentElement.appendChild(widget.getHtmlElement());
      }
    }
  }

  remove(widget: Widget): void {
    var contentElement: HTMLElement | null;

    super.remove(widget);
    
    if (isHTMLBacked(widget)) {
      contentElement = this.element.querySelector(".window-content");
      if (contentElement) {
        contentElement.removeChild(widget.getHtmlElement());
      }
    }
  }
}