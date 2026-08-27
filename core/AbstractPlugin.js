'use strict';

class AbstractPlugin {
  constructor(id, generation, category) {
    if (new.target === AbstractPlugin) {
      throw new TypeError('AbstractPlugin is abstract and cannot be instantiated directly.');
    }
    this.id = id;
    this.generation = generation;
    this.category = category;
  }

  initialize(_context) {
    throw new Error(`Plugin ${this.id} must implement initialize().`);
  }

  beforeRender(payload) {
    return payload;
  }

  afterRender(payload) {
    return payload;
  }

  validate(payload) {
    return payload !== undefined && payload !== null;
  }

  dispose() {
    return true;
  }

  getMetadata() {
    return {
      id: this.id,
      generation: this.generation,
      category: this.category,
    };
  }
}

module.exports = { AbstractPlugin };
