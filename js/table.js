

var DB = (function () {
  // Table ------------------------------
  function createTable(name, items) {
    var table, i, len, item;
    table = {
      name: name,
      columns: new Array(),
      rows: new Array(),
    };
    for (i = 0, len = items.length; i < len; i++) {
      item = items[i];
      table.columns.push({
        name: item[0],
        type: item[1],
      });
    }
    return table;
  }

  function appendToTable(table) {
    var row, i, len, column;
    row = new Object();
    for (i = 0, len = table.columns.length; i < len; i++) {
      column = table.columns[i];
      row[column.name] = null;
    }
    table.rows.push(row);
  }

  function removeFromTable(table, row) {
    var index = table.rows.indexOf(row);
    if (index !== -1) {
      table.rows.splice(index, 1);
    }
  }

  // Cursor ------------------------------
  function createCursor(table, alias) {
    return {
      alias: alias,
      table: table,
      index: 0,
      filter: null,
    };
  }

  function appendThroughCursor(cursor) {
    appendToTable(cursor.table);
    cursor.index = cursor.table.rows.length - 1;
  }

  function removeThroughCursor(cursor) {
    var row;
    row = cursor.table.rows[cursor.index];
    if (row) {
      removeFromTable(cursor.table, row);
      if (cursor.index >= cursor.table.rows.length) {
        cursor.index = cursor.table.rows.length - 1;
      }
      return true;
    }
    return false;
  }

  function moveCursor(cursor, amount) {
    var newIndex;
    newIndex = cursor.index + amount;
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= cursor.table.rows.length) {
      newIndex = cursor.table.rows.length - 1;
    }
    cursor.index = newIndex;
  }

  // API ------------------------------
  function create(name, items) {
    if (tables[name]) {
      throw new Error('Cannot create ' + name + ' because it already exists.');
    }
    tables[name] = createTable(name, items);
  }

  function open(name, alias) {
    if (typeof alias === 'undefined') {
      alias = name;
    }
    if (!tables[name]) {
      throw new Error('Cannot open ' + name + ' because it does not exist.');
    }
    cursors[alias] = createCursor(tables[name], alias);
    this[alias] = null;
  }

  function select(alias) {
    if (!cursors[alias]) {
      throw new Error('Cannot select ' + alias + ' because it is not open.');
    }
    selectedCursor = cursors[alias];
  }

  function append() {
    if (!selectedCursor) {
      throw new Error('Cannot append because no cursor is selected.');
    }
    appendThroughCursor(selectedCursor);
    this[selectedCursor.alias] = selectedCursor.table.rows[selectedCursor.index] || null;
  }

  function remove() {
    if (!selectedCursor) {
      throw new Error('Cannot remove because no cursor is selected.');
    }
    if (removeThroughCursor(selectedCursor)) {
      return;
    }
    this[selectedCursor.alias] = selectedCursor.table.rows[selectedCursor.index] || null;
  }

  function move(amount) {
    if (!selectedCursor) {
      throw new Error('Cannot move because no cursor is selected.');
    }
    moveCursor(selectedCursor, amount);
    this[selectedCursor.alias] = selectedCursor.table.rows[selectedCursor.index] || null;
  }

  function moveToNext() {
    move.call(this, 1);
  }

  function moveToPrevious() {
    move.call(this, -1);
  }

  function log() {
    var name, table;
    for (name in tables) {
      if (tables.hasOwnProperty(name)) {
        table = tables[name];
        console.log('Table: ' + name);
        console.table(table.rows);
      }
    }
  }

  var tables, cursors, selectedCursor;
  tables = new Object();
  cursors = new Object();
  selectedCursor = null;

  return {
    create: create,
    open: open,
    select: select,
    append: append,
    remove: remove,
    move: move,
    moveToNext: moveToNext,
    moveToPrevious: moveToPrevious,
    log: log,
  };
})();

with (DB) {
  create('user', [
    ['name', 'string'],
    ['email', 'string']
  ]);

  open('user');

  /* create user */
  select('user');

  append();
  user.name = 'John Doe';
  user.email = 'teste@teste.com';
  
  append();
  user.name = 'Jane Doe';
  user.email = 'teste2@teste.com';

  append();
  user.name = 'Bob Smith';
  user.email = 'teste3@teste.com';

  moveToPrevious();
  console.log(user);
}