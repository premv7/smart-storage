const listeners = {
  expire: []
};

function on(event, callback) {
  if (listeners[event]) {
    listeners[event].push(callback);
  }
}

function emit(event, data) {
  if (listeners[event]) {
    listeners[event].forEach(cb => cb(data));
  }
}

module.exports = { on, emit };