

var table = (function () {
  var tables = new Array();

  function generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  function createTable(schema) {
    var id = generateId();

    tables.push({
      id: id,
      schema: schema,
      rows: new Array()
    });

    return id;
  }

  return {
    createTable: createTable
  };
})();

