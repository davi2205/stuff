<?php
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle the incoming data
    $data = json_decode(file_get_contents('php://input'), true);
    // Process the data as needed
    // For example, you can save it to a database or log it
    file_put_contents('data.log', print_r($data, true), FILE_APPEND);
    // Send a response back to the client
    echo json_encode(['status' => 'success']);
    die;
  }
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <script>

    function Papo() {
    }

    Papo.prototype.createClass = function (name, prototype) {
      var superClass = prototype.superClass || PapoObject;

      if (typeof superClass.prototype.name !== 'string') {
        throw new Error("Super class must have a name");
      }

      var superInstance;
      if (superClass.prototype && typeof superClass.prototype.initialize === 'function') {
        var oldInitialize = superClass.prototype.initialize;
        superClass.prototype.initialize = function () {};
        superInstance = new superClass();
        superClass.prototype.initialize = oldInitialize;
      } else {
        superInstance = new superClass();
      }

      function PapoObjectSubclass() {
        if (typeof this.initialize === 'function') {
          this.initialize.apply(this, arguments);
        }
      }
      PapoObjectSubclass.prototype = superInstance;
      PapoObjectSubclass.prototype.name = name;
      PapoObjectSubclass.prototype.constructor = PapoObjectSubclass;
      PapoObjectSubclass.prototype[superClass.prototype.name] = superClass;
      for (var key in prototype) {
        if (key == 'superClass') {
          continue;
        }
        if (prototype.hasOwnProperty(key)) {
          PapoObjectSubclass.prototype[key] = prototype[key];
        }
      }
      return PapoObjectSubclass;
    };
    
    function PapoObject() {
    }

    PapoObject.prototype.name = "PapoObject";

    PapoObject.prototype.say = function (message) {
      console.log(message);
    };

    var papo = new Papo();



    // function Serializer() {
    //   this.originals = new Array();
    //   this.serialized = new Array();
    // }

    // Serializer.prototype.serialize = function (obj) {
    //   function genId() {
    //     return '_' + Math.random().toString(36).substr(2, 9);
    //   }

    //   function serializeValue(value) {
    //     if (value === null) {
    //       return null;
    //     } else if (value instanceof Array) {
    //       var array = new Array();
    //       for (var i = 0; i < value.length; i++) {
    //         array.push(serializeValue.call(this, value[i]));
    //       }
    //       return array;
    //     } else if (typeof value === 'function' || typeof value === 'object') {
    //       return { id: this.serialize(value) };
    //     } else {
    //       return value;
    //     }
    //   }

    //   if (obj === null || obj instanceof Array || (typeof obj !== 'object' && typeof obj !== 'function')) {
    //     throw new Error("Only objects and functions can be serialized");
    //   }
    //   if (obj === this) {
    //     throw new Error("Cannot serialize the serializer itself");
    //   }

    //   console.log("Serializing object:", obj);  

    //   for (var i = 0; i < this.originals.length; i++) {
    //     if (this.originals[i] === obj) {
    //       return this.serialized[i].id;
    //     }
    //   }

    //   var entry = {
    //     id: genId(),
    //     type: typeof obj,
    //     serialized: new Object()
    //   };
    //   this.originals.push(obj);
    //   this.serialized.push(entry);

    //   if (typeof obj === 'function') {
    //     entry.serialized.name = obj.name;
    //     entry.serialized.code = obj.toString();
    //     if (typeof obj.prototype === 'object' && obj.prototype !== null) {
    //       entry.serialized.prototype = { id: this.serialize(obj.prototype) };
    //     }
    //   } else if (typeof obj === 'object') {
    //     if (typeof obj.sleep === 'function') {
    //       obj.sleep();
    //     }
    //     if (typeof obj.constructor === 'function') {
    //       entry.serialized.constructor = { id: this.serialize(obj.constructor) };
    //     }
    //     for (var key in obj) {
    //       if (obj.hasOwnProperty(key)) {
    //         entry.serialized[key] = serializeValue.call(this, obj[key]);
    //       }
    //     }
    //   } else {
    //     throw new Error("Unsupported type: " + typeof obj);
    //   }

    //   return entry.id;
    // };
    
    // function Test() {
    // }

    // Test.prototype.lol = function () {
    // };

    // Test.prototype.test = function () {
    // };

    // var s = new Serializer();
    // s.serialize({ Test });
    // console.log(s.serialized);
  </script>
</body>

</html>