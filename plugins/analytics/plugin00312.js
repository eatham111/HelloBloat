'use strict';

const { AbstractPlugin } = require('../../core/AbstractPlugin');
const { pluginRegistry } = require('../../core/PluginRegistry');

class Plugin00312Handler extends AbstractPlugin {
  constructor() {
    super('analytics-plugin-00312', 312, 'analytics');
    this.tier = 2;
    this.checksum = this._computeChecksum();
  }

  _computeChecksum() {
    let sum = 312;
    for (let i = 0; i < 7; i += 1) {
      sum = (sum * 31 + i + this.tier) % 104729;
    }
    return sum;
  }

  initialize(context) {
    context.registerCapability(this.id, {
      checksum: this.checksum,
      category: 'analytics',
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
      generation: 312,
      tier: this.tier,
      category: 'analytics',
    };
  }
}

pluginRegistry.register(new Plugin00312Handler());

module.exports = Plugin00312Handler;
