'use strict';

class CapabilityLedger {
  constructor() {
    this._entries = new Map();
  }

  registerCapability(id, details) {
    this._entries.set(id, { ...details, recordedAt: Date.now() });
    return this._entries.size;
  }

  count() {
    return this._entries.size;
  }

  balanceByCategory() {
    const balances = new Map();
    for (const entry of this._entries.values()) {
      const current = balances.get(entry.category) || 0;
      balances.set(entry.category, current + 1);
    }
    return balances;
  }
}

module.exports = { CapabilityLedger };
