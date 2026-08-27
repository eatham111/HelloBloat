'use strict';

const { AbstractPlugin } = require('../../core/AbstractPlugin');
const { pluginRegistry } = require('../../core/PluginRegistry');

class Plugin00880Handler extends AbstractPlugin {
  constructor() {
    super('compliance-plugin-00880', 880, 'compliance');
    this.tier = 5;
    this.checksum = this._computeChecksum();
  }

  _computeChecksum() {
    let sum = 880;
    for (let i = 0; i < 7; i += 1) {
      sum = (sum * 31 + i + this.tier) % 104729;
    }
    return sum;
  }

  initialize(context) {
    context.registerCapability(this.id, {
      checksum: this.checksum,
      category: 'compliance',
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
      generation: 880,
      tier: this.tier,
      category: 'compliance',
    };
  }
}

pluginRegistry.register(new Plugin00880Handler());

module.exports = Plugin00880Handler;
