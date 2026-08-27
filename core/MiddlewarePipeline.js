'use strict';

class MiddlewarePipeline {
  constructor() {
    this._stack = [];
  }

  use(fn) {
    this._stack.push(fn);
    return this;
  }

  execute(req, res, finalHandler) {
    let index = -1;

    const dispatch = (i) => {
      if (i <= index) {
        throw new Error('next() called multiple times in middleware pipeline.');
      }
      index = i;
      const fn = i < this._stack.length ? this._stack[i] : finalHandler;
      if (!fn) {
        return;
      }
      fn(req, res, () => dispatch(i + 1));
    };

    dispatch(0);
  }
}

module.exports = { MiddlewarePipeline };
