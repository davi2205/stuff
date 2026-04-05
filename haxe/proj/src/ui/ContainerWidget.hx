package ui;

class ContainerWidget extends Widget {
  var widgets: Array<Widget>;

  public function new() {
    super();
    widgets = [];
  }

  public function add(widget: Widget): Void {
    widgets.push(widget);
  }

  public function remove(widget: Widget): Bool {
    var index = widgets.indexOf(widget);
    if (index != -1) {
      widgets.splice(index, 1);
      return true;
    }
    return false;
  }
}