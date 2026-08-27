'use strict';

const LEVELS = ['debug', 'info', 'warn', 'error'];

class Logger {
  constructor(scope) {
    this.scope = scope;
    this._history = [];
  }

  _write(level, message) {
    const line = `[${new Date().toISOString()}] [${level.toUpperCase()}] [${this.scope}] ${message}`;
    this._history.push(line);
    if (this._history.length > 500) {
      this._history.shift();
    }
    // eslint-disable-next-line no-console
    console.log(line);
    return line;
  }

  history() {
    return this._history.slice();
  }
}

for (const level of LEVELS) {
  Logger.prototype[level] = function writeAtLevel(message) {
    return this._write(level, message);
  };
}

module.exports = { Logger };
