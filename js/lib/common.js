
(function (lib) {

  lib.generateId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

})(window.lib = window.lib || {});