
function Grid() {
  this._element = $('<div></div>')[0];
  this._items = new Array();
}

(function() {
  Grid.prototype.element = function () {
    return this._element;
  };

  Grid.prototype.items = function () {
    return this._items;
  };

  Grid.prototype.addItem = function (item, size) {
    size = size || 6;
    if (size < 1 || size > 12) {
      throw new Error('size must be between 1 and 12');
    }
    if (item == null || typeof item.element != 'function') {
      throw new Error('item must have an element() method');
    }
    var $element = $(this.element());
    var $row = $element.children().last();
    if ($row.length == 0 || rowSize($row) + size > 12) {
      $row = $element.append($('<div class="row"></div>')).children().last();
    }
    $row.append($('<div></div>').addClass('col-md-' + size).append(item.element()));
    this.items().push(item);
  };

  Grid.prototype.removeItem = function (index) {
    var items = this.items();
    if (items.length == 0) {
      throw new Error('there are no items to remove');
    }
    if (index < 0 || index > items.length - 1) {
      throw new Error('index must be between 0 and ' + (items.length - 1)); 
    }
    var $element = $(this.element());
    var $cols = $element.children().children();
    $cols.eq(index).remove();
    for (var i = index + 1, len = $cols.length; i < len; i++) {
      var $col = $cols.eq(i);
      if ($col.index() != 0) {
        continue;
      }
      var $row = $col.parent();
      var $rowPrev = $row.prev();
      if ($rowPrev.length == 0) {
        continue;
      }
      var rowPrevSize = rowSize($rowPrev);
      var colSizeValue = colSize($col);
      if (rowPrevSize + colSizeValue <= 12) {
        $rowPrev.append($col);
      }
      if ($row.children().length == 0) {
        $row.remove();
      }
    }
    return items.splice(index, 1)[0];
  };

  function colSize($col) {
    return parseInt($col.attr('class').match(/col-md-(\d+)/)[1]);
  }

  function rowSize($row) {
    var rowSize = 0;
    $row.children().each(function () {
      rowSize += colSize($(this));
    });
    return rowSize;
  }
})();


