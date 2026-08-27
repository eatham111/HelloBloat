'use strict';

class PluginRegistry {
  constructor() {
    this._plugins = new Map();
  }

  register(plugin) {
    if (this._plugins.has(plugin.id)) {
      throw new Error(`Duplicate plugin registration for id "${plugin.id}".`);
    }
    this._plugins.set(plugin.id, plugin);
    return this;
  }

  get(id) {
    return this._plugins.get(id);
  }

  size() {
    return this._plugins.size;
  }

  all() {
    return Array.from(this._plugins.values());
  }

  byCategory(category) {
    return this.all().filter((plugin) => plugin.category === category);
  }

  initializeAll(bootContext) {
    let initialized = 0;
    for (const plugin of this._plugins.values()) {
      if (plugin.initialize(bootContext)) {
        initialized += 1;
      }
    }
    return initialized;
  }

  runRenderPipeline(payload) {
    let next = payload;
    for (const plugin of this._plugins.values()) {
      next = plugin.beforeRender(next);
    }
    for (const plugin of this._plugins.values()) {
      next = plugin.afterRender(next);
    }
    return next;
  }

  disposeAll() {
    let disposed = 0;
    for (const plugin of this._plugins.values()) {
      if (plugin.dispose()) {
        disposed += 1;
      }
    }
    return disposed;
  }
}

const pluginRegistry = new PluginRegistry();

module.exports = { PluginRegistry, pluginRegistry };
