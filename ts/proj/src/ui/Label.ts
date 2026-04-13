import { HTMLBacked } from "./HTMLBacked";
import { HTMLHelper } from "./HTMLHelper";
import { Widget } from "./Widget";

export class Label extends Widget implements HTMLBacked {
  helper: HTMLHelper;
  element: HTMLElement;

  constructor() {
    super();

    this.helper = new HTMLHelper();
    this.element = this.helper.createTextElement("");
    this.element.dataset.role = "label";

  }

  getHtmlElement(): HTMLElement {
    return this.element;
  }
}