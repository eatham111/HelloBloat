'use strict';

const { pluginRegistry } = require('./PluginRegistry');

class ResponsePipeline {
  constructor(registry = pluginRegistry) {
    this._registry = registry;
  }

  render(rawPayload) {
    return this._registry.runRenderPipeline(rawPayload);
  }
}

module.exports = { ResponsePipeline };
