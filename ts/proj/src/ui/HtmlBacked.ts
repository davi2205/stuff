
export interface HtmlBacked {
  getHtmlElement(): HTMLElement;
}

export function isHtmlBacked(obj: any): obj is HtmlBacked {
  return typeof obj.getHtmlElement === "function";
}