import { Layout } from "./ui/Layout.js";
import { Widget } from "./ui/Widget.js";
import { WindowWidget } from "./ui/WindowWidget.js";

class MyWindow extends WindowWidget {
  layout: Layout;

  constructor() {
    var w: WindowWidget;

    super();

    this.layout = new Layout();
    this.layout.setGapSize(5);
    this.layout.setPadding(0);

    w = new WindowWidget();
    w.setTitle("Child Window");
    w.setBounds(0, 0, 200, 100);
    this.add(w);

    w = new WindowWidget();
    w.setTitle("Child Window");
    w.setBounds(0, 0, 100, 450);
    this.add(w);
    this.layout.setItemXFillFactor(w, 1);

    w = new WindowWidget();
    w.setTitle("Child Window");
    w.setBounds(0, 0, 100, 350);
    this.add(w);
    this.layout.setItemXFillFactor(w, 1);

    w = new WindowWidget();
    w.setTitle("Child Window");
    w.setBounds(0, 0, 200, 100);
    this.add(w);

    w = new WindowWidget();
    w.setTitle("Child Window");
    w.setBounds(0, 0, 200, 100);
    this.add(w);
  }

  setBounds(x: number, y: number, width: number, height: number): void {
    super.setBounds(x, y, width, height);

    this.layout.setBounds(0, 0, this.getWidth() - 2, this.getHeight() - 20 - 2);
    this.layout.doRowLayout();
  }

  add(widget: Widget): void {
    super.add(widget);

    this.layout.add(widget);
  }
}

const myWindow = new MyWindow();
myWindow.setTitle("My Window");
myWindow.setBounds(100, 100, 1000, 600);
document.body.appendChild(myWindow.getHtmlElement());
