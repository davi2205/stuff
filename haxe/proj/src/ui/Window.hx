package ui;

import js.html.HtmlElement;

class Window extends ContainerWidget implements HtmlRelated {
  var element: HtmlElement;

  public function new() {
    super();
  }

  public function getHtmlElement(): HtmlElement {
    return element;
  }
}