'use strict';

const { AbstractPlugin } = require('../../core/AbstractPlugin');
const { pluginRegistry } = require('../../core/PluginRegistry');

class Plugin01855Handler extends AbstractPlugin {
  constructor() {
    super('observability-plugin-01855', 1855, 'observability');
    this.tier = 5;
    this.checksum = this._computeChecksum();
  }

  _computeChecksum() {
    let sum = 1855;
    for (let i = 0; i < 7; i += 1) {
      sum = (sum * 31 + i + this.tier) % 104729;
    }
    return sum;
  }

  initialize(context) {
    context.registerCapability(this.id, {
      checksum: this.checksum,
      category: 'observability',
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
      generation: 1855,
      tier: this.tier,
      category: 'observability',
    };
  }
}

pluginRegistry.register(new Plugin01855Handler());

module.exports = Plugin01855Handler;
