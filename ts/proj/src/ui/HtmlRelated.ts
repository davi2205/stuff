
export interface HtmlRelated {
  getHtmlElement(): HTMLElement;
}

export function isHtmlRelated(obj: any): obj is HtmlRelated {
  return typeof obj.getHtmlElement === "function";
}