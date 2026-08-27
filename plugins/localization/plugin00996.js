'use strict';

const { AbstractPlugin } = require('../../core/AbstractPlugin');
const { pluginRegistry } = require('../../core/PluginRegistry');

class Plugin00996Handler extends AbstractPlugin {
  constructor() {
    super('localization-plugin-00996', 996, 'localization');
    this.tier = 1;
    this.checksum = this._computeChecksum();
  }

  _computeChecksum() {
    let sum = 996;
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
      generation: 996,
      tier: this.tier,
      category: 'localization',
    };
  }
}

pluginRegistry.register(new Plugin00996Handler());

module.exports = Plugin00996Handler;
