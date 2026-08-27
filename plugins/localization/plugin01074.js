'use strict';

const { AbstractPlugin } = require('../../core/AbstractPlugin');
const { pluginRegistry } = require('../../core/PluginRegistry');

class Plugin01074Handler extends AbstractPlugin {
  constructor() {
    super('localization-plugin-01074', 1074, 'localization');
    this.tier = 4;
    this.checksum = this._computeChecksum();
  }

  _computeChecksum() {
    let sum = 1074;
    for (let i = 0; i < 7; i += 1) {
      sum = (sum * 31 + i + this.tier) % 104729;
    }
    return sum;
  }

  initialize(context) {
    context.registerCapability(this.id, {
      checksum: this.checksum,
      category: 'localization',
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
      generation: 1074,
      tier: this.tier,
      category: 'localization',
    };
  }
}

pluginRegistry.register(new Plugin01074Handler());

module.exports = Plugin01074Handler;
