'use strict';

const fs = require('fs');
const path = require('path');

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.name.endsWith('.js')) {
      files.push(fullPath);
    }
  }
  return files;
}

function loadAllPlugins(pluginsDir, logger) {
  const files = walk(pluginsDir).sort();
  for (const file of files) {
    // Requiring each module triggers its self-registration side effect
    // against the shared pluginRegistry singleton.
    require(file);
  }
  if (logger) {
    logger.info(`Loaded ${files.length} plugin modules from ${pluginsDir}.`);
  }
  return files.length;
}

module.exports = { loadAllPlugins, walk };
