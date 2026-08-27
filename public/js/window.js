(function bootstrapWindowKernel() {
  'use strict';

  class DragController {
    constructor(windowEl, handleEl) {
      this.windowEl = windowEl;
      this.handleEl = handleEl;
      this.dragging = false;
      this.offsetX = 0;
      this.offsetY = 0;

      this.handleEl.addEventListener('mousedown', this._onPointerDown.bind(this));
      document.addEventListener('mousemove', this._onPointerMove.bind(this));
      document.addEventListener('mouseup', this._onPointerUp.bind(this));
    }

    _onPointerDown(event) {
      this.dragging = true;
      const rect = this.windowEl.getBoundingClientRect();
      this.offsetX = event.clientX - rect.left;
      this.offsetY = event.clientY - rect.top;
    }

    _onPointerMove(event) {
      if (!this.dragging) {
        return;
      }
      this.windowEl.style.left = `${event.clientX - this.offsetX}px`;
      this.windowEl.style.top = `${event.clientY - this.offsetY}px`;
    }

    _onPointerUp() {
      this.dragging = false;
    }
  }

  const windowEl = document.getElementById('hello-window');
  const handleEl = document.getElementById('hello-window-titlebar');
  // eslint-disable-next-line no-unused-vars
  const dragController = new DragController(windowEl, handleEl);
})();
