
// -----------------------------
function ProcessRuntime() { 
  this._processEntries = new Array;
  this._pending = new Array;
  this._dispatchRequest = null;
  this._currentSender = null;
}

ProcessRuntime.prototype.spawn = function (processClass) {
  var process, name;
  process = new processClass;
  process.init(this);
  name = Math.random().toString(36).substring(2);
  this._processEntries.push({ name: name, process: process });
  return name;
};

ProcessRuntime.prototype.whoIs = function (process) {
  var i;
  for (i = 0; i < this._processEntries.length; i++) {
    if (this._processEntries[i].process === process) {
      return this._processEntries[i].name;
    }
  }
  return null;
};

ProcessRuntime.prototype.processByName = function (name) {
  var i;
  for (i = 0; i < this._processEntries.length; i++) {
    if (this._processEntries[i].name === name) {
      return this._processEntries[i].process;
    }
  }
  return null;
};

ProcessRuntime.prototype.send = function (receiver, message, payload) {
  this.post(null, receiver, message, payload);
};

ProcessRuntime.prototype.post = function (sender, receiver, message, payload) {
  this._pending.push({ sender: sender, receiver: receiver, message: message, payload: payload });
  this.requestDispatch();
};

ProcessRuntime.prototype.requestDispatch = function () {
  var self;
  if (this._dispatchRequest) {
    return;
  }
  self = this;
  this._dispatchRequest = setTimeout(function () {
    var i, entry, receiverProcess;
    for (i = 0; i < self._pending.length; i++) {
      entry = self._pending[i];
      receiverProcess = self.processByName(entry.receiver);
      if (receiverProcess) {
        self._currentSender = entry.sender;
        try {
          receiverProcess.receive(entry.message, entry.payload);
        } catch (e) {
          console.error(e);
        }
      }
    }
    self._currentSender = null;
    self._dispatchRequest = null;
  }, 0);
};

ProcessRuntime.defaultRuntime = new ProcessRuntime;

ProcessRuntime.spawn = function (processClass) {
  return ProcessRuntime.defaultRuntime.spawn(processClass);
};

ProcessRuntime.send = function (receiver, message, payload) {
  ProcessRuntime.defaultRuntime.send(receiver, message, payload);
};

// -----------------------------
function Process() {
  this._runtime = null;
}

Process.prototype.name = function () {
  if (!this._runtime) {
    throw new Error('Process runtime is not initialized');
  }
  return this._runtime.whoIs(this);
};

Process.prototype.init = function (runtime) {
  this._runtime = runtime;
};

Process.prototype.sender = function () {
  if (!this._runtime) {
    throw new Error('Process runtime is not initialized');
  }
  return this._runtime._currentSender;
};

Process.prototype.send = function (receiver, message, payload) {
  if (!this._runtime) {
    throw new Error('Process runtime is not initialized');
  }
  this._runtime.post(this, receiver, message, payload);
};

Process.prototype.reply = function (message, payload) {
  if (!this._runtime) {
    throw new Error('Process runtime is not initialized');
  }
  if (!this.sender()) {
    throw new Error('No sender to reply to');
  }
  this._runtime.post(this, this.sender(), message, payload);
};

Process.prototype.receive = function (message, payload) {
  //
};

// -----------------------------
function RemoteProcess() {
  Process.call(this);
}

RemoteProcess.prototype = new Process;
RemoteProcess.prototype.constructor = RemoteProcess;

RemoteProcess.prototype.receive = function (message, payload) {
  //
};