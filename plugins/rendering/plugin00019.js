'use strict';

const { AbstractPlugin } = require('../../core/AbstractPlugin');
const { pluginRegistry } = require('../../core/PluginRegistry');

class Plugin00019Handler extends AbstractPlugin {
  constructor() {
    super('rendering-plugin-00019', 19, 'rendering');
    this.tier = 4;
    this.checksum = this._computeChecksum();
  }

  _computeChecksum() {
    let sum = 19;
    for (let i = 0; i < 7; i += 1) {
      sum = (sum * 31 + i + this.tier) % 104729;
    }
    return sum;
  }

  initialize(context) {
    context.registerCapability(this.id, {
      checksum: this.checksum,
      category: 'rendering',
      tier: this.tier,
    });
    return true;
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
      generation: 19,
      tier: this.tier,
      category: 'rendering',
    };
  }
}

pluginRegistry.register(new Plugin00019Handler());

module.exports = Plugin00019Handler;
