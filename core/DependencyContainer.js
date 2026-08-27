'use strict';

class DependencyContainer {
  constructor() {
    this._factories = new Map();
    this._singletons = new Map();
  }

  registerSingleton(key, factory) {
    this._factories.set(key, factory);
    return this;
  }

  resolve(key) {
    if (this._singletons.has(key)) {
      return this._singletons.get(key);
    }
    const factory = this._factories.get(key);
    if (!factory) {
      throw new Error(`No dependency registered for key "${key}".`);
    }
    const instance = factory(this);
    this._singletons.set(key, instance);
    return instance;
  }
}

const dependencyContainer = new DependencyContainer();

module.exports = { DependencyContainer, dependencyContainer };
