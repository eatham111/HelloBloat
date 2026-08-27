'use strict';

const DEFAULTS = Object.freeze({
  port: 3000,
  windowTitle: 'Hello World Window Manager — Enterprise Edition™',
  windowText: 'hello world',
  windowWidth: 320,
  windowHeight: 180,
});

class ConfigManager {
  constructor(overrides = {}) {
    this._values = { ...DEFAULTS, ...overrides };
  }

  get(key) {
    return this._values[key];
  }

  all() {
    return { ...this._values };
  }
}

function loadConfig() {
  const overrides = {};
  if (process.env.HELLO_WORLD_PORT) {
    overrides.port = Number(process.env.HELLO_WORLD_PORT);
  }
  return new ConfigManager(overrides);
}

module.exports = { ConfigManager, loadConfig };
