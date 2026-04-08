import { Layout } from "./ui/Layout.js";
import { Widget } from "./ui/Widget.js";
import { Frame } from "./ui/Frame.js";
import { Button } from "./ui/Button.js";
import { YAlignment } from "./ui/YAlignment.js";
import { RootWidget } from "./ui/RootWidget.js";
import { Scrollbar } from "./ui/Scrollbar.js";

class MyWindow extends Frame {
  layout: Layout;

  constructor() {
    var w: Frame | Button | Scrollbar;

    super();

    this.layout = new Layout();
    this.layout.setGapSize(5);
    this.layout.setPadding(5);

    w = new Button();
    w.setLabel("Ok");
    w.useSuggestedSize();
    this.add(w);
    this.layout.setItemYAlignment(w, YAlignment.Bottom);

    w = new Button();
    w.setLabel("Cancel");
    w.useSuggestedSize();
    this.add(w);
    this.layout.setItemYAlignment(w, YAlignment.Bottom);

    w = new Scrollbar();
    w.setBounds(0, 0, 32, 200);
    this.add(w);
    this.layout.setItemYAlignment(w, YAlignment.Bottom);
    this.layout.setItemYFillFactor(w, 1);
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
myWindow.setLabel("My Window");
myWindow.setBounds(100, 100, 1000, 600);
RootWidget.getInstance().add(myWindow);

document.body.appendChild(RootWidget.getInstance().getHtmlElement());

(window as any).RootWidget = RootWidget;
(window as any).MyWindow = MyWindow;