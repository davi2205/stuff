
function _Window() {
  this._element = null;
}

_Window.prototype.element = function() {
  return this._element; 
};

_Window.prototype.init = function() {
  var panel, content;
  panel = document.createElement('div');
  with (panel.style) {
    position = 'absolute';
    left = '10px';
    top = '10px';
    width = '200px';
    height = '200px';
    backgroundColor = 'blue';
    border = '1px solid black';
  }
  content = document.createElement('div');
  with (content.style) {
    position = 'absolute';
    left = '5px';
    top = '20px';
    right = '5px';
    bottom = '5px';
    backgroundColor = 'white';
  }
  panel.appendChild(content);
  this._element = panel;
};


