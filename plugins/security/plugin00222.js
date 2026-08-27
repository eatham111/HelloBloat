'use strict';

const { AbstractPlugin } = require('../../core/AbstractPlugin');
const { pluginRegistry } = require('../../core/PluginRegistry');

class Plugin00222Handler extends AbstractPlugin {
  constructor() {
    super('security-plugin-00222', 222, 'security');
    this.tier = 2;
    this.checksum = this._computeChecksum();
  }

  _computeChecksum() {
    let sum = 222;
    for (let i = 0; i < 7; i += 1) {
      sum = (sum * 31 + i + this.tier) % 104729;
    }
    return sum;
  }

  initialize(context) {
    context.registerCapability(this.id, {
      checksum: this.checksum,
      category: 'security',
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
      generation: 222,
      tier: this.tier,
      category: 'security',
    };
  }
}

pluginRegistry.register(new Plugin00222Handler());

module.exports = Plugin00222Handler;
