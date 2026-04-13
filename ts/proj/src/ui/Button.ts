import { HTMLBacked } from "./HTMLBacked.js";
import { Widget } from "./Widget.js";

export class Button extends Widget implements HTMLBacked {
  private label: string;
  private element: HTMLElement;
  
  constructor() {
    super();

    this.label = "Button";
    this.element = document.createElement("button");
    this.element.className = 'button';
    this.element.textContent = this.label;

    this.useSuggestedSize();
  }

  getLabel(): string {
    return this.label;
  }

  setLabel(label: string): void {
    if (this.label === label) {
      return;
    }
    this.label = label;
    this.element.textContent = this.label;
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

  useSuggestedSize(): void {
    this.setBounds(this.getX(), this.getY(), this.getSuggestedWidth(), this.getSuggestedHeight());
  }

  private getSuggestClientRect(): DOMRect {
    var element: HTMLElement | null;
    var rect : DOMRect;

    element = document.createElement("button");
    element.className = 'button';
    element.textContent = this.label;
    document.body.appendChild(element);
    rect = element.getBoundingClientRect();
    document.body.removeChild(element);

    return rect;
  }

  getSuggestedWidth(): number {
    return this.getSuggestClientRect().width;
  }

  getSuggestedHeight(): number {
    return this.getSuggestClientRect().height;
  }
}