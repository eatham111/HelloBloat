'use strict';

class EventBus {
  constructor() {
    this._listeners = new Map();
  }

  on(eventName, handler) {
    if (!this._listeners.has(eventName)) {
      this._listeners.set(eventName, new Set());
    }
    this._listeners.get(eventName).add(handler);
    return () => this.off(eventName, handler);
  }

  off(eventName, handler) {
    if (this._listeners.has(eventName)) {
      this._listeners.get(eventName).delete(handler);
    }
  }

  emit(eventName, payload) {
    const handlers = this._listeners.get(eventName);
    if (!handlers) {
      return 0;
    }
    for (const handler of handlers) {
      handler(payload);
    }
    return handlers.size;
  }
}

const eventBus = new EventBus();

module.exports = { EventBus, eventBus };
