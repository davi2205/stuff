
function createProcessManager() {
  var manager;
  var types = [];
  var processes = [];
  var sentEntries = [];
  var messageHandler = null;
  var currentSender = null;

  // Types
  // ----------------------------
  function createType(name, config) {
    var messages = {}, messageName;
    for (messageName in config.messages) {
      if (config.messages.hasOwnProperty(messageName) && typeof config.messages[messageName] === 'function') {
        messages[messageName] = config.messages[messageName];
      }
    }
    return {
      name: name,
      messages: messages
    };
  }

  function addType(name, config) {
    if (getItemByProp(types, 'name', name)) {
      throw new Error('Process type already exists: ' + name);
    }
    types.push(createType(name, config));
  }

  // Processes
  // ----------------------------
  function createProcess(type, name) {
    var thisProcess;

    function getName() {
      return name;
    }

    function getType() {
      return type.name;
    }

    function getManager() {
      return manager;
    }

    function getCurrentSenderName() {
      return currentSender ? currentSender.name : null;
    }

    function send(receiverName, message) {
      var receiver = getItemByProp(processes, 'name', receiverName);
      if (!receiver) {
        throw new Error('Receiver process not found: ' + receiverName);
      }
      var args = getItemsFromIndex(arguments, 2);
      sentEntries.push({ sender: thisProcess, receiver: receiver, message: message, args: args });
      requestMessageHandler();
    }

    function broadcast(message) {
      var args = getItemsFromIndex(arguments, 1);
      sentEntries.push({ sender: thisProcess, receiver: null, message: message, args: args });
      requestMessageHandler();
    }
    
    return thisProcess = {
      name: name,
      type: type,
      public: {
        getName: getName,
        getType: getType,
        getManager: getManager,
        getCurrentSenderName: getCurrentSenderName,
        send: send,
        broadcast: broadcast
      }
    };
  }

  function spawn(typeName, name) {
    var type = getItemByProp(types, 'name', typeName);
    if (!type) {
      throw new Error('Process type not found: ' + typeName);
    }
    if (typeof name === 'undefined') {
      var i = 0;
      do {
        name = typeName + i;
        i++;
      } while (getItemByProp(processes, 'name', name));
    }
    var process = createProcess(type, name);
    processes.push(process);
    send(process.name, 'boot');
    return process.name;
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
      var receivers = entry.receiver === null ? processes : [entry.receiver];
      var i, len;
      for (i = 0, len = receivers.length; i < len; i++) {
        var receiver = receivers[i];
        var messageHandler = receiver.type.messages[message];
        if (typeof messageHandler === 'function') {
          messageHandler.apply(receiver.public, entry.args);
        }
      }
    }
    currentSender = null;
  }

  function send(receiverName, message) {
    var receiver = getItemByProp(processes, 'name', receiverName);
    if (!receiver) {
      throw new Error('Receiver process not found: ' + receiverName);
    }
    var args = getItemsFromIndex(arguments, 2);
    sentEntries.push({ sender: null, receiver: receiver, message: message, args: args });
    requestMessageHandler();
  }

  function broadcast(message) {
    var args = getItemsFromIndex(arguments, 1);
    sentEntries.push({ sender: null, receiver: null, message: message, args: args });
    requestMessageHandler();
  }
  
  function getCurrentSenderName() {
    return currentSender ? currentSender.name : null;
  }

  // Utils
  // ----------------------------
  function getItemByProp(list, prop, value) {
    var i, len;
    for (i = 0, len = list.length; i < len; i++) {
      if (list[i][prop] === value) {
        return list[i];
      }
    }
    return null;
  }

  function getItemsFromIndex(list, index) {
    var result = [];
    var i, len;
    for (i = index, len = list.length; i < len; i++) {
      result.push(list[i]);
    }
    return result;
  }

  return manager = {
    addType: addType,
    spawn: spawn,
    send: send,
    broadcast: broadcast
  };
}

var mgr = createProcessManager();
mgr.addType('example', {
  messages: {
    say: function (something) {
      console.log(this.getName(), something);
    },
  },
});
mgr.addType('example2', {
  messages: {
    boot: function (something) {
      var self = this;
      setInterval(function () {
        self.broadcast('say', 'Tick from ' + self.getName());
      }, 2000);
    }
  },
});

mgr.spawn('example');
mgr.spawn('example');
mgr.spawn('example');
mgr.spawn('example');
mgr.spawn('example');
mgr.spawn('example');
mgr.spawn('example');
mgr.spawn('example');
mgr.spawn('example2');