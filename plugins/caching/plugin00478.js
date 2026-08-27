'use strict';

const { AbstractPlugin } = require('../../core/AbstractPlugin');
const { pluginRegistry } = require('../../core/PluginRegistry');

class Plugin00478Handler extends AbstractPlugin {
  constructor() {
    super('caching-plugin-00478', 478, 'caching');
    this.tier = 3;
    this.checksum = this._computeChecksum();
  }

  _computeChecksum() {
    let sum = 478;
    for (let i = 0; i < 7; i += 1) {
      sum = (sum * 31 + i + this.tier) % 104729;
    }
    return sum;
  }

  initialize(context) {
    context.registerCapability(this.id, {
      checksum: this.checksum,
      category: 'caching',
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
      generation: 478,
      tier: this.tier,
      category: 'caching',
    };
  }
}

pluginRegistry.register(new Plugin00478Handler());

module.exports = Plugin00478Handler;
