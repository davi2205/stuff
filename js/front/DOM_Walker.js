
function DOM_Walker() {
  this._walking = false;
  this._should_walk_children = true;
  this._propagated_data = null;
  this._pending = [];
}

DOM_Walker.prototype = {

  /* --- element traversal --- */
  walk: function (element, callback, data) {
    this._propagated_data = data;
    this._pending.push([element, this._propagated_data]);
    this._walking = true;
    while (this._pending.length > 0) {
      var current = this._pending.pop();
      var element = current[0];
      var data = current[1];
      this._propagated_data = data;
      this._should_walk_children = true;
      callback(this, element);
      if (this._should_walk_children && element.children) {
        var i;
        for (i = element.children.length - 1; i >= 0; i--) {
          this._pending.push([element.children[i], this._propagated_data]);
        }
      }
      if (!this._walking) {
        break;
      }
    }
  },

  stop: function () {
    this._walking = false;
  },

  /* --- data propagation --- */
  propagate_data: function (data) {
    this._propagated_data = data;
  },

  get_propagated_data: function () {
    return this._propagated_data;
  }
  
};

