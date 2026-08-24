
function createResource() {
  var items = [];

  function decodeOp(obj) {
    var op, args;
    for (op in obj) {
      if (obj.hasOwnProperty(op) && obj[op] instanceof Array) {
        args = obj[op];
        break;
      }
    }
    return { op: op, args: args };
  }

  function compileToJs(cond) {
    var stack = [cond];
    while (stack.length > 0) {
      var top = stack.pop();
      
    }
  }

  function insert(data) {
    if (typeof data !== 'object' || data === null) {
      throw new Error('data must be a non-null object');
    }
    items.push(data);
  }

  function update(cond, data) {
    if (typeof data !== 'object' || data === null) {
      throw new Error('data must be a non-null object');
    }
  }

  function get(cond) {
    if (typeof cond !== 'object' || cond === null) {
      throw new Error('cond must be a non-null object');
    }
  }

  return {
    compileToJs: compileToJs,
    insert: insert,
    update: update,
    get: get
  };
}

var res = createResource();
var x = res.get({'>': ['id', 43]});

res.update({'=': [12, 32]}, {name: 'Teste'});