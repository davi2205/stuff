
(function (lib) {
  
  // -------------------------------------

  // Example

  // lib.createGrid(
  //   /*id*/ null,
  //   /*grid*/ [
  //     [3, 3, 6],
  //     [6, 6]
  //   ]
  // );
  
  lib.createGrid = function (id, grid) {
    var el, html, count, i, iLen, j, jLen;
    if (!id) {
      id = lib.generateId();
    }
    el = document.createElement('div');
    el.id = id;
    html = [];
    count = 0;
    for (i = 0, iLen = grid.length; i < iLen; i++) {
      html.push('<div class="row">');
      for (j = 0, jLen = grid[i].length; j < jLen; j++) {
        html.push('<div class="col-md-' + grid[i][j] + '" data-place="' + count + '"></div>');
        count++;
      }
      html.push('</div>');
    }
    el.innerHTML = html.join('');
    document.body.appendChild(el);
    return id;
  };

  // -------------------------------------

  // Example

  // lib.createInput(
  //   /*id*/ null,
  //   /*label*/ 'My input'
  // );

  lib.createInput = function (id, label) {
    var el, labelEl;
    if (!id) {
      id = lib.generateId();
    }
    el = document.createElement('div');
    el.id = id;
    el.className = 'form-group';
    el.innerHTML =
      '<label for="' + id + '-input">' + label + '</label>' +
      '<input type="text" class="form-control" id="' + id + '-input">';
    document.body.appendChild(el);
    return id;
  };

  // -------------------------------------

  // Example

  // lib.createButton(
  //   /*id*/ null,
  //   /*label*/ 'Click me'
  // );

  lib.createButton = function (id, label) {
    var el;
    if (!id) {
      id = lib.generateId();
    }
    el = document.createElement('button');
    el.id = id;
    el.textContent = label;
    el.className = 'btn btn-primary';
    document.body.appendChild(el);
    return id;
  };

  // -------------------------------------

  // Example

  // lib.putChild(
  //   /*parentId*/ 'my-grid',
  //   /*childId*/ 'my-child',
  //   /*place*/ 2
  // );
  // 
  // lib.putChild(
  //   /*parentId*/ 'my-grid',
  //   /*childId*/ 'my-child'
  // );
  
  lib.putChild = function (parentId, childId, place) {
    var parentEl, childEl, placeEl, emptyCandidates, i, len;
    if (!place) {
      emptyCandidates = document.querySelectorAll('[data-place]');
      if (emptyCandidates.length == 0) {
        console.warn('No empty place found in parent ' + parentId);
        return;
      }
      for (i = 0, len = emptyCandidates.length; i < len; i++) {
        if (emptyCandidates[i].childNodes.length == 0) {
          place = emptyCandidates[i].getAttribute('data-place');
          break;
        }
      }
    }
    parentEl = document.getElementById(parentId);
    childEl = document.getElementById(childId);
    placeEl = parentEl.querySelector('[data-place="' + place + '"]');
    if (placeEl && childEl) {
      placeEl.appendChild(childEl);
    }
  };

})(window.lib = window.lib || {});