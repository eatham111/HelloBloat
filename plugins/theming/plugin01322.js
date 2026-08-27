'use strict';

const { AbstractPlugin } = require('../../core/AbstractPlugin');
const { pluginRegistry } = require('../../core/PluginRegistry');

class Plugin01322Handler extends AbstractPlugin {
  constructor() {
    super('theming-plugin-01322', 1322, 'theming');
    this.tier = 2;
    this.checksum = this._computeChecksum();
  }

  _computeChecksum() {
    let sum = 1322;
    for (let i = 0; i < 7; i += 1) {
      sum = (sum * 31 + i + this.tier) % 104729;
    }
    return sum;
  }

  initialize(context) {
    context.registerCapability(this.id, {
      checksum: this.checksum,
      category: 'theming',
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
      generation: 1322,
      tier: this.tier,
      category: 'theming',
    };
  }
}

pluginRegistry.register(new Plugin01322Handler());

module.exports = Plugin01322Handler;
