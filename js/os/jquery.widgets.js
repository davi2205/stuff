
(function ($) {
  var types = [];

  function typeByName(name) {
    var i, len;
    for (i = 0, len = types.length; i < len; i++) {
      if (types[i].name === name) {
        return types[i];
      }
    }
    return null;
  }

  $.createWidgetType = function (options) {
    var type;
    if (!options.name) {
      throw new Error('Widget type name is required.');
    }
    if (typeByName(options.name)) {
      throw new Error('Widget type "' + options.name + '" already exists.');
    }
    type = { methods: {} };
    $.extend(type, options);
    types.push(type);
    return this;
  };

  $.fn.createWidget = function (typeName) {
    var i, len, type, args;
    type = typeByName(typeName);
    if (!type) {
      throw new Error('Widget type "' + typeName + '" does not exist.');
    }
    args = [];
    for (i = 1, len = arguments.length; i < len; i++) {
      args.push(arguments[i]);
    }
    return this.each(function () {
      var widget;
      widget = { element: this, type: type };
      $(this).data('__widget', widget);
      if (typeof type.methods.init === 'function') {
        type.methods.init.apply(widget, args);
      }
    });
  };

  $.fn.widget = function (methodName) {
    var i, len, args, methodRes, actualRes;
    args = [];
    for (i = 1, len = arguments.length; i < len; i++) {
      args.push(arguments[i]);
    }
    actualRes = this.each(function () {
      var widget, method;
      widget = $(this).data('__widget');
      if (!widget) {
        throw new Error('No widget instance found for this element.');
      }
      method = widget.type.methods[methodName];
      if (typeof method !== 'function') {
        throw new Error('Method "' + methodName + '" does not exist on widget type "' + widget.type.name + '".');
      }
      methodRes = method.apply(widget, args);
    });
    if (methodRes !== undefined) {
      return methodRes;
    }
    return actualRes;
  };

  // ----------------

  // Window
  $.createWidgetType({
    name: 'window',
    methods: {
      init: function () {
        var $element, title, $content, $children;
        $element = $(this.element);
        title = $element.data('title') || 'Window';
        $children = $element.contents().detach();
        $element
          .removeAttr('data-title')
          .addClass('window')
          .append(
            '<div class="title">' + title + '</div>' + 
            '<div class="content"></div>' +
            '<div class="sensor top-left"></div>' +
            '<div class="sensor top"></div>' +
            '<div class="sensor top-right"></div>' +
            '<div class="sensor right"></div>' +
            '<div class="sensor bottom-right"></div>' +
            '<div class="sensor bottom"></div>' +
            '<div class="sensor bottom-left"></div>' +
            '<div class="sensor left"></div>'
          );
        $content = $element.find('> .content');
        $content.append($children);
      },

      bounds: function (x, y, width, height) {
        var $element;
        $element = $(this.element);
        if (x !== undefined) {
          $element
            .css({
              left: x,
              top: y,
              width: width,
              height: height
            })
            .trigger('widget:boundsChanged');
        } else {
          return {
            x: parseInt($element.css('left'), 10),
            y: parseInt($element.css('top'), 10),
            width: parseInt($element.css('width'), 10),
            height: parseInt($element.css('height'), 10)
          };
        }
      }
    }
  });

  // Button
  $.createWidgetType({
    name: 'button',
    methods: {
      init: function () {
        var $element, label;
        $element = $(this.element);
        label = $element.text() || 'Button';
        $element
          .text('')
          .addClass('button')
          .append('<span class="label">' + label + '</span>');
      },

      bounds: function (x, y, width, height) {
        var $element;
        $element = $(this.element);
        if (x !== undefined) {
          $element
            .css({
              left: x,
              top: y,
              width: width,
              height: height
            })
            .trigger('widget:boundsChanged');
        } else {
          return {
            x: parseInt($element.css('left'), 10),
            y: parseInt($element.css('top'), 10),
            width: parseInt($element.css('width'), 10),
            height: parseInt($element.css('height'), 10)
          };
        }
      }
    }
  });

})(jQuery);