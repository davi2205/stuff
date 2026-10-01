
function DOM_Helper() {
  this._walker = new DOM_Walker();
}

DOM_Helper.prototype = {

  /* --- element creation --- */
  create_element: function (html) {
    var element = document.createElement('div');
    element.innerHTML = html;
    return element.children[0];
  },

  /* --- element selection --- */
  find_element: function (element, callback) {
    if (typeof callback === 'undefined') {
      callback = element;
      element = document.body;
    }
    var found;
    this._walker.walk(element, function(walker, el) {
      if (el === element) {
        return;
      }
      if (callback(el)) {
        found = el;
        walker.stop();
      }
    });
    return found;
  },

  find_elements: function (element, callback) {
    if (typeof callback === 'undefined') {
      callback = element;
      element = document.body;
    }
    var found = [];
    this._walker.walk(element, function(walker, el) {
      if (el === element) {
        return;
      }
      if (callback(el)) {
        found.push(el);
      }
    });
    return found;
  },

  find_ancestor: function (element, callback) {
    var found = null;
    var current = element.parentElement;
    while (current) {
      if (callback(current)) {
        found = current;
        break;
      }
      current = current.parentElement;
    }
    return found;
  },

  find_ancestors: function (element, callback) {
    var found = [];
    var current = element.parentElement;
    while (current) {
      if (callback(current)) {
        found.push(current);
      }
      current = current.parentElement;
    }
    return found;
  },

};
