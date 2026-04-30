

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

  function log() {
    console.log(this);
    console.log(tables);
    console.log(cursors);
  }

  var tables, cursors, selectedCursor;
  tables = new Object();
  cursors = new Object();
  
  return {
    create: create,
    open: open,
    select: select,
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
  select('user');

  console.log(user);

  log();
}