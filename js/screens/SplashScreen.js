// js/screens/SplashScreen.js - Splash and intro experience

import { playerState } from '../state/playerState.js';
import { soundFx } from '../utils/audio.js';
import { router } from '../utils/router.js';

export class SplashScreen {
  constructor() {
    this.screenEl = null;
    this.enterBtn = null;
  }

  init() {
    this.screenEl = document.getElementById('screen-splash');
    this.enterBtn = document.getElementById('splash-enter-btn');

    if (this.enterBtn) {
      this.enterBtn.addEventListener('click', () => {
        soundFx.playClick();
        this.handleEnter();
      });
    }
  }

  onEnter() {
    // Screen entered hook
  }

  onLeave() {
    // Screen left hook
  }

  handleEnter() {
    const state = playerState.getState();
    if (state.isLoggedIn) {
      router.navigateTo('map');
    } else {
      router.navigateTo('login');
    }
  }
}

export const splashScreen = new SplashScreen();
