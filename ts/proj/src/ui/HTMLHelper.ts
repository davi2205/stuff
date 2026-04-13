
export class HTMLHelper {
  createElement(): HTMLElement {
    var element: HTMLElement;

    element = document.createElement("div");
    element.style.position = "absolute";
    element.style.boxSizing = "border-box";
    element.style.userSelect = "none";
    element.style.webkitUserSelect = "none";
    (element.style as any).msUserSelect = "none";
    (element.style as any).MozUserSelect = "none";

    return element;
  }

  createTextElement(text: string): HTMLElement {
    var element: HTMLElement;

    element = document.createElement("div");
    element.style.position = "absolute";
    element.style.boxSizing = "border-box";
    element.style.userSelect = "none";
    element.style.webkitUserSelect = "none";
    (element.style as any).msUserSelect = "none";
    (element.style as any).MozUserSelect = "none";
    element.textContent = text;

    return element;
  }

  setBounds(element: HTMLElement, x: number, y: number, width: number, height: number): void {
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;
  }

  makeSolid(element: HTMLElement): void {
    element.style.border = "1px solid #7c8aa6";
    element.style.borderRadius = "8px";
    element.style.background = "linear-gradient(180deg, #fdfefe 0%, #eef4ff 100%)";
    element.style.boxShadow = "2px 2px 1px rgba(53, 77, 117, 0.24), 0 6px 14px rgba(53, 77, 117, 0.18)";
    element.style.padding = "10px";
    element.style.paddingTop = "8px";
    element.style.paddingBottom = "8px";
  }

  makeDebossed(element: HTMLElement): void {
    element.style.border = "1px solid #7c8aa6";
    element.style.borderRadius = "8px";
    element.style.background = "linear-gradient(180deg, #eef4ff 0%, #fdfefe 100%)";
    element.style.boxShadow = "inset 2px 2px 1px rgba(53, 77, 117, 0.24), inset 0 6px 14px rgba(53, 77, 117, 0.18)";
    element.style.padding = "10px";
    element.style.paddingTop = "8px";
    element.style.paddingBottom = "8px";
  }
}