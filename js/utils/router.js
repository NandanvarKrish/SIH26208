// js/utils/router.js - Lightweight client-side screen navigation & lifecycle manager

class Router {
  constructor() {
    this.screens = new Map();
    this.currentScreenId = null;
  }

  register(screenId, screenInstance) {
    this.screens.set(screenId, screenInstance);
  }

  navigateTo(screenId, params = {}) {
    if (this.currentScreenId === screenId) return;

    const currentScreen = this.screens.get(this.currentScreenId);
    const nextScreen = this.screens.get(screenId);

    if (!nextScreen) {
      console.error(`Router: Screen "${screenId}" not found!`);
      return;
    }

    // Leave current screen
    if (currentScreen) {
      if (typeof currentScreen.onLeave === 'function') {
        currentScreen.onLeave();
      }
      const currentEl = document.getElementById(`screen-${this.currentScreenId}`);
      if (currentEl) {
        currentEl.classList.remove('active');
      }
    }

    // Enter next screen
    const nextEl = document.getElementById(`screen-${screenId}`);
    if (nextEl) {
      nextEl.classList.add('active');
    }

    if (typeof nextScreen.onEnter === 'function') {
      nextScreen.onEnter(params);
    }

    this.currentScreenId = screenId;
  }

  getCurrentScreen() {
    return this.currentScreenId;
  }
}

export const router = new Router();
