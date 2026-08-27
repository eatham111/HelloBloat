'use strict';

const { CapabilityLedger } = require('./CapabilityLedger');

class BootContext {
  constructor(logger) {
    this.logger = logger;
    this.ledger = new CapabilityLedger();
  }

  registerCapability(id, details) {
    return this.ledger.registerCapability(id, details);
  }
}

module.exports = { BootContext };
