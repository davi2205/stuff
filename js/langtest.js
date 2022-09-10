
function newStack() {
    var stack = [];
    var listStack = [];

    return {
        stack: function () {
            return [].concat(stack);
        },
        num: function (val) {
            stack.push(val);
            return this;
        },
        blist: function () {
            listStack.push(stack.length);
            return this;
        },
        elist: function () {
            var a = listStack.pop();
            var len = Math.max(0, stack.length - a);
            console.log(len);
            return this;
        },
        dup: function () {
            var a = stack[stack.length - 1];
            stack.push(a);
            return this;
        },
        pop: function () {
            stack.pop();
            return this;
        },
        add: function () {
            var b = stack.pop();
            var a = stack.pop();
            stack.push(a + b);
            return this;
        }
    };
}

var a = newStack();

a.num(10).blist().num(10).num(10).elist();

console.log(a.stack());