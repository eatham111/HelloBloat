'use strict';

const { AbstractPlugin } = require('../../core/AbstractPlugin');
const { pluginRegistry } = require('../../core/PluginRegistry');

class Plugin00748Handler extends AbstractPlugin {
  constructor() {
    super('telemetry-plugin-00748', 748, 'telemetry');
    this.tier = 3;
    this.checksum = this._computeChecksum();
  }

  _computeChecksum() {
    let sum = 748;
    for (let i = 0; i < 7; i += 1) {
      sum = (sum * 31 + i + this.tier) % 104729;
    }
    return sum;
  }

  initialize(context) {
    context.registerCapability(this.id, {
      checksum: this.checksum,
      category: 'telemetry',
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
      generation: 748,
      tier: this.tier,
      category: 'telemetry',
    };
  }
}

pluginRegistry.register(new Plugin00748Handler());

module.exports = Plugin00748Handler;
