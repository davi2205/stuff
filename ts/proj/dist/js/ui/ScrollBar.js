import { Orientation } from "./Orientation.js";
import { Widget } from "./Widget.js";
export class Scrollbar extends Widget {
    element;
    orientation;
    constructor() {
        super();
        this.orientation = Orientation.Vertical;
        this.element = document.createElement("div");
        this.element.className = 'scrollbar scrollbar-vertical';
        this.element.innerHTML = `
      <button class="scrollbar-arrow scrollbar-arrow-start"></button>
      <div class="scrollbar-track">
        <div class="scrollbar-thumb"></div>
      </div>
      <button class="scrollbar-arrow scrollbar-arrow-end"></button>
    `;
    }
    getHtmlElement() {
        return this.element;
    }
    setBounds(x, y, width, height) {
        super.setBounds(x, y, width, height);
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
    }
    setOrientation(orientation) {
        if (this.orientation === orientation) {
            return;
        }
        this.orientation = orientation;
        if (this.orientation === Orientation.Horizontal) {
            this.element.classList.add("scrollbar-horizontal");
            this.element.classList.remove("scrollbar-vertical");
        }
        else {
            this.element.classList.add("scrollbar-vertical");
            this.element.classList.remove("scrollbar-horizontal");
        }
    }
}
//# sourceMappingURL=Scrollbar.js.map