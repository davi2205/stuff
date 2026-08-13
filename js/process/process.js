
function createProcessManager() {
  var manager;
  var types = [];
  var processes = [];
  var sentEntries = [];
  var messageHandler = null;
  var currentSender = null;

  // Types
  // ----------------------------
  function getTypeByName(name) {
    var i, len;
    for (i = 0, len = types.length; i < len; i++) {
      if (types[i].name === name) {
        return types[i];
      }
    }
    return null;
  }

  function createType(name, config) {
    var type = getTypeByName(name);
    if (type) {
      throw new Error('Process type already exists: ' + name);
    }
    var messages = {};
    var prop;
    for (prop in config.messages) {
      if (config.messages.hasOwnProperty(prop) && typeof config.messages[prop] === 'function') {
        messages[prop] = config.messages[prop];
      }
    }
    types.push({ name: name, messages: messages });
  }

  // Processes
  // ----------------------------
  function getProcessByName(name) {
    var i, len;
    for (i = 0, len = processes.length; i < len; i++) {
      if (processes[i].name === name) {
        return processes[i];
      }
    }
    return null;
  }

  function spawn(typeName, name) {
    var type = getTypeByName(typeName);
    if (!type) {
      throw new Error('Process type not found: ' + typeName);
    }
    if (typeof name === 'undefined') {
      var i = 0;
      do {
        name = typeName + i;
        i++;
      } while (getProcessByName(name));
    }
    var thisProcess;
    processes.push(thisProcess = {
      name: name,
      type: type,
      instance: {
        getManager: function () {
          return manager;
        },
        getName: function () {
          return thisProcess.name;
        },
        send: function (receiverName, message) {
          var receiver = getProcessByName(receiverName);
          if (!receiver) {
            throw new Error('Receiver process not found: ' + receiverName);
          }
          var args = [];
          var i, len;
          for (i = 2, len = arguments.length; i < len; i++) {
            args.push(arguments[i]);
          }
          sentEntries.push({ sender: thisProcess, receiver: receiver, message: message, args: args });
          requestMessageHandler();
        },
        broadcast: function (message) {
          var args = [];
          var i, len;
          for (i = 1, len = arguments.length; i < len; i++) {
            args.push(arguments[i]);
          }
          sentEntries.push({ sender: thisProcess, receiver: null, message: message, args: args });
          requestMessageHandler();
        }
      }    
    });
  }

  // Messages
  // ----------------------------
  function requestMessageHandler() {
    if (messageHandler !== null) {
      return;
    }
    messageHandler = setTimeout(function () { 
      handleMessages();
      messageHandler = null;
    }, 0);
  }

  function handleMessages() {
    while (sentEntries.length > 0) {
      var entry = sentEntries.shift();
      currentSender = entry.sender;
      var message = entry.message;
      if (entry.receiver === null) {
        var i, len;
        for (i = 0, len = processes.length; i < len; i++) {
          var receiver = processes[i];
          var handler = receiver.type.messages[message];
          if (handler) {
            handler.apply(receiver.instance, entry.args || []);
          }
        }
        continue;
      }
      var receiver = entry.receiver; 
      var handler = receiver.type.messages[message];
      if (handler) {
        handler.apply(receiver.instance, entry.args || []);
      }
    }
    currentSender = null;
  }

  function send(receiverName, message) {
    var receiver = getProcessByName(receiverName);
    if (!receiver) {
      throw new Error('Receiver process not found: ' + receiverName);
    }
    var args = [];
    var i, len;
    for (i = 2, len = arguments.length; i < len; i++) {
      args.push(arguments[i]);
    }
    sentEntries.push({ sender: null, receiver: receiver, message: message, args: args });
    requestMessageHandler();
  }

  function broadcast(message) {
    var args = [];
    var i, len;
    for (i = 1, len = arguments.length; i < len; i++) {
      args.push(arguments[i]);
    }
    sentEntries.push({ sender: null, receiver: null, message: message, args: args });
    requestMessageHandler();
  }
  
  function getCurrentSenderName() {
    return currentSender ? currentSender.name : null;
  }

  return manager = {
    createType: createType,
    spawn: spawn,
    send: send,
    broadcast: broadcast,
    getCurrentSenderName: getCurrentSenderName
  };
}

var mgr = createProcessManager();
mgr.createType('example', {
  messages: {
    say: function (something) {
      console.log(this.getName(), something);
    },
  },
});
mgr.spawn('example', 'process1');
mgr.spawn('example', 'process2');
mgr.send('process1', 'say', 'Hello from process1');
mgr.send('process2', 'say', 'Hello from process2');