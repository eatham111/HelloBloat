'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const { loadConfig } = require('./ConfigManager');
const { Logger } = require('./Logger');
const { eventBus } = require('./EventBus');
const { dependencyContainer } = require('./DependencyContainer');
const { pluginRegistry } = require('./PluginRegistry');
const { loadAllPlugins } = require('./PluginLoader');
const { BootContext } = require('./BootContext');
const { MiddlewarePipeline } = require('./MiddlewarePipeline');
const { ResponsePipeline } = require('./ResponsePipeline');

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
};

class StartupOrchestrator {
  boot() {
    const config = loadConfig();
    const logger = new Logger('orchestrator');

    dependencyContainer.registerSingleton('config', () => config);
    dependencyContainer.registerSingleton('logger', () => logger);
    dependencyContainer.registerSingleton('eventBus', () => eventBus);
    dependencyContainer.registerSingleton('pluginRegistry', () => pluginRegistry);

    eventBus.on('plugins:loaded', (count) => {
      logger.info(`Startup event received: ${count} plugin modules on the classpath.`);
    });
    eventBus.on('plugins:initialized', (count) => {
      logger.info(`Startup event received: ${count} plugins initialized.`);
    });

    const pluginsDir = path.join(__dirname, '..', 'plugins');
    const loadedCount = loadAllPlugins(pluginsDir, logger);
    eventBus.emit('plugins:loaded', loadedCount);

    const bootContext = new BootContext(logger);
    const initializedCount = pluginRegistry.initializeAll(bootContext);
    eventBus.emit('plugins:initialized', initializedCount);
    logger.info(`Capability ledger now holds ${bootContext.ledger.count()} entries.`);

    const responsePipeline = new ResponsePipeline(pluginRegistry);
    const publicDir = path.join(__dirname, '..', 'public');
    const middleware = new MiddlewarePipeline();

    middleware.use((req, _res, next) => {
      logger.debug(`Incoming request: ${req.method} ${req.url}`);
      next();
    });

    const server = http.createServer((req, res) => {
      middleware.execute(req, res, () => {
        this._handleRequest(req, res, publicDir, responsePipeline);
      });
    });

    server.listen(config.get('port'), () => {
      logger.info(`Hello World Window Platform listening on port ${config.get('port')}.`);
      logger.info(`Serving ${pluginRegistry.size()} enterprise plugins in the render pipeline.`);
    });

    return server;
  }

  _handleRequest(req, res, publicDir, responsePipeline) {
    let requestPath = req.url === '/' ? '/index.html' : req.url;
    requestPath = requestPath.split('?')[0];

    const resolved = path.normalize(path.join(publicDir, requestPath));
    if (!resolved.startsWith(publicDir)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    fs.readFile(resolved, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
        return;
      }
      const ext = path.extname(resolved);
      const contentType = CONTENT_TYPES[ext] || 'application/octet-stream';
      const rendered = ext === '.html' ? responsePipeline.render(data.toString('utf8')) : data;
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(rendered);
    });
  }
}

module.exports = { StartupOrchestrator };
