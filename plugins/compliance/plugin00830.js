'use strict';

const { AbstractPlugin } = require('../../core/AbstractPlugin');
const { pluginRegistry } = require('../../core/PluginRegistry');

class Plugin00830Handler extends AbstractPlugin {
  constructor() {
    super('compliance-plugin-00830', 830, 'compliance');
    this.tier = 5;
    this.checksum = this._computeChecksum();
  }

  _computeChecksum() {
    let sum = 830;
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
      generation: 830,
      tier: this.tier,
      category: 'compliance',
    };
  }
}

pluginRegistry.register(new Plugin00830Handler());

module.exports = Plugin00830Handler;
