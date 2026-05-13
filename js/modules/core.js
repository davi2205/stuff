var tbl;

tbl = (function () {
  function isMetaEnabled(table) {
    return table.length > 0 && table[0]._meta;
  }

  function enableMeta(table) {
    if (!isMetaEnabled(table)) {
      table.unshift({ _meta: true });
    }
  }

  function insert(table, data) {
    table.push(data);
  }

  function update(table, index) {
    if (!isMetaEnabled(table)) {
      return;
    }
  }

  function getColumns(table) {
    var columns, i, len, row, column;
    columns = new Array();
    for (i = 0, len = table.length; i < len; i++) {
      row = table[i];
      for (column in row) {
        if (columns.indexOf(column) === -1) {
          columns.push(column);
        }
      }
    }
    return columns;
  }

  return {
    isMetaEnabled: isMetaEnabled,
    enableMeta: enableMeta,
    insert: insert,
    getColumns: getColumns
  };
})();

var x = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', city: 'New York' }
];
tbl.insert(x, { name: 'Charlie', age: 25, city: 'Los Angeles' });

console.table(tbl.getColumns(x));