import { Layout } from "./ui/Layout.js";
import { Frame } from "./ui/Frame.js";
import { Button } from "./ui/Button.js";
import { YAlignment } from "./ui/YAlignment.js";
import { RootWidget } from "./ui/RootWidget.js";
class MyWindow extends Frame {
    layout;
    constructor() {
        var w;
        super();
        this.layout = new Layout();
        this.layout.setGapSize(5);
        this.layout.setPadding(5);
        w = new Button();
        w.setLabel("Ok");
        w.setSizeToSuggested();
        this.add(w);
        this.layout.setItemYAlignment(w, YAlignment.Bottom);
        w = new Button();
        w.setLabel("Cancel");
        w.setSizeToSuggested();
        this.add(w);
        this.layout.setItemYAlignment(w, YAlignment.Bottom);
        w = new Button();
        w.setLabel("Help");
        w.setSizeToSuggested();
        this.add(w);
        this.layout.setItemYAlignment(w, YAlignment.Bottom);
    }
    setBounds(x, y, width, height) {
        super.setBounds(x, y, width, height);
        this.layout.setBounds(0, 0, this.getWidth() - 2, this.getHeight() - 20 - 2);
        this.layout.doRowLayout();
    }
    add(widget) {
        super.add(widget);
        this.layout.add(widget);
    }
}
const myWindow = new MyWindow();
myWindow.setLabel("My Window");
myWindow.setBounds(100, 100, 1000, 600);
RootWidget.getInstance().add(myWindow);
document.body.appendChild(RootWidget.getInstance().getHtmlElement());
window.RootWidget = RootWidget;
window.MyWindow = MyWindow;
//# sourceMappingURL=index.js.map