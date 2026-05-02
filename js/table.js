

var DB = (function () {
  function create(name, items) {
    var table, i, len, item;
    if (tables[name]) {
      throw new Error('Cannot create ' + name + ' because it already exists.');
    }
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
    tables[name] = table;
  }

  function open(name, alias) {
    var cursor;
    if (typeof alias === 'undefined') {
      alias = name;
    }
    if (!tables[name]) {
      throw new Error('Cannot open ' + name + ' because it does not exist.');
    }
    cursor = {
      alias: alias,
      table: tables[name],
      rowsType: 'table',
      rows: tables[name].rows,
      index: 0,
    };
    cursors[alias] = cursor;
    this[alias] = null;
  }

  function select(alias) {
    if (!cursors[alias]) {
      throw new Error('Cannot select ' + alias + ' because it is not open.');
    }
    selectedCursor = cursors[alias];
  }

  function append() {
    var row, i, len, column;
    if (!selectedCursor) {
      throw new Error('Cannot append because no cursor is selected.');
    }
    row = new Object();
    for (i = 0, len = selectedCursor.table.columns.length; i < len; i++) {
      column = selectedCursor.table.columns[i];
      row[column.name] = null;
    }
    if (selectedCursor.rowsType === 'table') {
      selectedCursor.table.rows.push(row);
      selectedCursor.index = selectedCursor.table.rows.length - 1;
      this[selectedCursor.alias] = row;
    } else {
      throw new Error(selectedCursor.alias + ' does not support appending.');
    }
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
  
  return {
    create: create,
    open: open,
    select: select,
    append: append,
    log: log,
  };
})();

with (DB) {
  create('user', [
    ['id', 'integer'],
    ['name', 'string'],
    ['email', 'string']
  ]);
  create('post', [
    ['id', 'integer'],
    ['user_id', 'integer'],
    ['title', 'string'],
    ['content', 'text']
  ]);

  open('user');
  open('post');

  /* create user */
  select('user');

  log();
  append();
  user.id = 1;
  user.name = 'John Doe';
  user.email = 'teste@teste.com';
  
  log();
  append();
  user.id = 2;
  user.name = 'Jane Doe';
  user.email = 'teste2@teste.com';

  log();
  append();
  user.id = 3;
  user.name = 'Bob Smith';
  user.email = 'teste3@teste.com';
  
  /* create post */
  select('post');
  
  log();
  append();
  post.id = 1;
  post.user_id = user.id;
  post.title = 'Hello World';
  post.content = 'This is my first post.';

  log();
  append();
  post.id = 1;
  post.user_id = user.id;
  post.title = 'Hello World';
  post.content = 'This is my first post.';

  log();
}