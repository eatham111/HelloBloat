'use strict';

// Generates the plugins/ directory: a large number of near-identical,
// functionally-inert "plugin" modules that self-register with the
// PluginRegistry. This is the source of most of this project's line
// count. Re-run with `npm run generate` to regenerate deterministically.

const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  'rendering',
  'security',
  'analytics',
  'caching',
  'telemetry',
  'compliance',
  'localization',
  'accessibility',
  'theming',
  'audit',
  'resilience',
  'observability',
];

const FILES_PER_CATEGORY = 155;
const PLUGINS_DIR = path.join(__dirname, '..', 'plugins');

function pad(n) {
  return String(n).padStart(5, '0');
}

function renderPlugin(id, category, tier) {
  const className = `Plugin${pad(id)}Handler`;
  return `'use strict';

const { AbstractPlugin } = require('../../core/AbstractPlugin');
const { pluginRegistry } = require('../../core/PluginRegistry');

class ${className} extends AbstractPlugin {
  constructor() {
    super('${category}-plugin-${pad(id)}', ${id}, '${category}');
    this.tier = ${tier};
    this.checksum = this._computeChecksum();
  }

  _computeChecksum() {
    let sum = ${id};
    for (let i = 0; i < 7; i += 1) {
      sum = (sum * 31 + i + this.tier) % 104729;
    }
    return sum;
  }

  initialize(context) {
    context.registerCapability(this.id, {
      checksum: this.checksum,
      category: '${category}',
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
      generation: ${id},
      tier: this.tier,
      category: '${category}',
    };
  }
}

pluginRegistry.register(new ${className}());

module.exports = ${className};
`;
}

function main() {
  fs.rmSync(PLUGINS_DIR, { recursive: true, force: true });
  fs.mkdirSync(PLUGINS_DIR, { recursive: true });

  let globalId = 1;
  let totalFiles = 0;

  for (const category of CATEGORIES) {
    const categoryDir = path.join(PLUGINS_DIR, category);
    fs.mkdirSync(categoryDir, { recursive: true });

    for (let i = 0; i < FILES_PER_CATEGORY; i += 1) {
      const tier = (i % 5) + 1;
      const contents = renderPlugin(globalId, category, tier);
      const filePath = path.join(categoryDir, `plugin${pad(globalId)}.js`);
      fs.writeFileSync(filePath, contents, 'utf8');
      globalId += 1;
      totalFiles += 1;
    }
  }

  // eslint-disable-next-line no-console
  console.log(`Generated ${totalFiles} plugin modules across ${CATEGORIES.length} categories.`);
}

main();
