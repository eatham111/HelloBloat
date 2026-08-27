'use strict';

const { AbstractPlugin } = require('../../core/AbstractPlugin');
const { pluginRegistry } = require('../../core/PluginRegistry');

class Plugin01466Handler extends AbstractPlugin {
  constructor() {
    super('audit-plugin-01466', 1466, 'audit');
    this.tier = 1;
    this.checksum = this._computeChecksum();
  }

  _computeChecksum() {
    let sum = 1466;
    for (let i = 0; i < 7; i += 1) {
      sum = (sum * 31 + i + this.tier) % 104729;
    }
    return sum;
  }

  initialize(context) {
    context.registerCapability(this.id, {
      checksum: this.checksum,
      category: 'audit',
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
      generation: 1466,
      tier: this.tier,
      category: 'audit',
    };
  }
}

pluginRegistry.register(new Plugin01466Handler());

module.exports = Plugin01466Handler;
