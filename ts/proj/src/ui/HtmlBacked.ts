
export interface HTMLBacked {
  getHtmlElement(): HTMLElement;
}

export function isHTMLBacked(obj: any): obj is HTMLBacked {
  return typeof obj.getHtmlElement === "function";
}