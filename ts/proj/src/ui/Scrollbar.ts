import { HTMLBacked } from "./HTMLBacked.js";
import { HTMLHelper } from "./HTMLHelper.js";
import { Orientation } from "./Orientation.js";
import { Widget } from "./Widget.js";

export class Scrollbar extends Widget implements HTMLBacked {
  min: number;
  max: number;
  value: number;
  extent: number;
  helper: HTMLHelper;
  element: HTMLElement;
  orientation: Orientation;

  constructor() {
    super();

    this.min = 0;
    this.max = 100;
    this.value = 0;
    this.extent = 10;
    this.helper = new HTMLHelper();
    this.orientation = Orientation.Vertical;
    this.element = this.helper.createElement();
    this.element.dataset.role = "scrollbar";
    this.helper.makeDebossed(this.element);
    this.buildHtml();
  }

  protected buildHtml(): void {
    var arrow, arrowText, track, thumb: HTMLElement;

    arrow = this.helper.createElement();
    arrow.dataset.role = "arrow-start";
    this.helper.makeSolid(arrow);
    this.element.appendChild(arrow);

    arrowText = this.helper.createElement();
    arrowText.dataset.role = "arrow-start-text";
    arrow.appendChild(arrowText);

    arrow = this.helper.createElement();
    arrow.dataset.role = "arrow-end";
    this.helper.makeSolid(arrow);
    this.element.appendChild(arrow);

    arrowText = this.helper.createElement();
    arrowText.dataset.role = "arrow-end-text";
    arrow.appendChild(arrowText);

    track = this.helper.createElement();
    track.dataset.role = "track";
    this.element.appendChild(track);

    thumb = this.helper.createElement();
    thumb.dataset.role = "thumb";
    this.helper.makeSolid(thumb);
    track.appendChild(thumb);
  }

  getHtmlElement(): HTMLElement {
    return this.element;
  }

  setBounds(x: number, y: number, width: number, height: number): void {
    var arrow: HTMLElement;
    var trackX, trackY, trackWidth, trackHeight: number;
    var thumbX, thumbY, thumbWidth, thumbHeight: number;

    super.setBounds(x, y, width, height);

    this.helper.setBounds(this.element, x, y, width, height);
    if (this.orientation === Orientation.Horizontal) {
      arrow = this.element.querySelector("[data-role=arrow-start]")!;
      arrow.innerText = "🠜";
      this.helper.setBounds(arrow, 0, 0, height, height);

      arrow = this.element.querySelector("[data-role=arrow-end]")!;
      arrow.innerText = "🠞";
      this.helper.setBounds(arrow, width - height, 0, height, height);

      trackX = height;
      trackY = 0;
      trackWidth = width - height * 2;
      trackHeight = height;
      this.helper.setBounds(this.element.querySelector("[data-role=track]")!, trackX, trackY, trackWidth, trackHeight);

      thumbX = (this.value - this.min) / (this.max - this.min) * (trackWidth - this.extent / (this.max - this.min) * trackWidth);
      thumbY = 0;
      thumbWidth = this.extent / (this.max - this.min) * trackWidth;
      thumbHeight = height;
      this.helper.setBounds(this.element.querySelector("[data-role=thumb]")!, thumbX, thumbY, thumbWidth, thumbHeight);
    } else {
      arrow = this.element.querySelector("[data-role=arrow-start]")!;
      arrow.innerText = "🠝";
      this.helper.setBounds(arrow, 0, 0, width, width);

      arrow = this.element.querySelector("[data-role=arrow-end]")!;
      arrow.innerText = "🠟";
      this.helper.setBounds(arrow, 0, height - width, width, width);
      
      trackX = 0;
      trackY = width;
      trackWidth = width;
      trackHeight = height - width * 2;
      this.helper.setBounds(this.element.querySelector("[data-role=track]")!, trackX, trackY, trackWidth, trackHeight);

      thumbX = 0;
      thumbY = (this.value - this.min) / (this.max - this.min) * (trackHeight - this.extent / (this.max - this.min) * trackHeight);
      thumbWidth = width;
      thumbHeight = this.extent / (this.max - this.min) * trackHeight;
      this.helper.setBounds(this.element.querySelector("[data-role=thumb]")!, thumbX, thumbY, thumbWidth, thumbHeight); 
    }
  }

  setOrientation(orientation: Orientation): void {
    if (this.orientation === orientation) {
      return;
    }

    this.orientation = orientation;
    this.setBounds(this.getX(), this.getY(), this.getWidth(), this.getHeight());
  }
}