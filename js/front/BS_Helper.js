
function BS_Helper(dom_helper) {
  this._dom_helper = dom_helper || new DOM_Helper();
}

BS_Helper.prototype = {
  
  create_input_html: function (options) {
    return (
      '<div class="form-group">'+
        '<label>'+(options && options.label ? options.label : '')+'</label>'+
        '<input type="text" class="form-control" placeholder="'+(options && options.placeholder ? options.placeholder : '')+'">'+
      '</div>'
    );
  },

  create_input: function (options) {
    return this._dom_helper.create_element(this.create_input_html(options));
  }

};