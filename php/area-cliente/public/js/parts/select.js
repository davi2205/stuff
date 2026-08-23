
function initSelect(selector, params) {
  var element = htmx.find(selector);

  if (params.mode == 1) {
    var searchInput = element.querySelector('.select-search');
    searchInput.focus();

    var dropdown = element.querySelector('.select-dropdown');
    dropdown.addEventListener('blur', function(event) {
      if (!htmx.isAncestor(dropdown, event.relatedTarget)) {
        htmx.trigger(dropdown, 'blurout');
      }
    }, true);
  }
}