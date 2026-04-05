package ui;

abstract class Widget {
  var x: Float = 0;
  var y: Float = 0;
  var width: Float = 0;
  var height: Float = 0;

  public function new() {
    //
  }

  public function getX(): Float {
    return x;
  }

  public function getY(): Float {
    return y;
  }

  public function getWidth(): Float {
    return width;
  }

  public function getHeight(): Float {
    return height;
  }

  public function setPosition(x: Float, y: Float): Void {
    this.x = x;
    this.y = y;
    boundsChanged();
  }

  public function setSize(width: Float, height: Float): Void {
    this.width = width;
    this.height = height;
    boundsChanged();
  }

  public function setBounds(x: Float, y: Float, width: Float, height: Float): Void {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    boundsChanged();
  }

  function boundsChanged(): Void {
    //
  }
}