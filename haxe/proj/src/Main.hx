
import ui.Window;
import ui.Widget;

class MyWindow extends Window {
  var wl: Widget;

  public function new() {
    super();

    wl = new Window();
    add(wl);
  }

  override function boundsChanged(): Void {
    wl.setBounds(5, 5, getWidth() - 10, getHeight() - 10);
  }
}

class Main {
  public static function main(): Void {
    var w = new MyWindow();
    w.setBounds(10, 20, 300, 200);
  }
}

