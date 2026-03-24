
function Form() {
  Grid.call(this);
}

Form.prototype = new Grid();
Form.prototype.constructor = Form;
