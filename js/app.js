// js/app.js - Application bootstrap & entry point

import { modal } from './components/Modal.js';
import { topHUD } from './components/TopHUD.js';
import { loginScreen } from './screens/LoginScreen.js';
import { mapScreen } from './screens/MapScreen.js';
import { splashScreen } from './screens/SplashScreen.js';
import { playerState } from './state/playerState.js';
import { soundFx } from './utils/audio.js';
import { router } from './utils/router.js';

class App {
  init() {
    console.log('🚀 Initializing BharatVerse Foundation Shell...');

    // 1. Initialize Reusable Components
    modal.init();
    topHUD.init();

    // 2. Register Screens in Router
    router.register('splash', splashScreen);
    router.register('login', loginScreen);
    router.register('map', mapScreen);

    // 3. Initialize Individual Screen Event Listeners
    splashScreen.init();
    loginScreen.init();
    mapScreen.init();

    // 4. Determine Initial Route
    const state = playerState.getState();
    if (state.isLoggedIn) {
      router.navigateTo('map');
    } else {
      router.navigateTo('splash');
    }

    // 5. Global User Gesture to Warm Audio Context
    window.addEventListener('click', () => soundFx.init(), { once: true });
    window.addEventListener('keydown', () => soundFx.init(), { once: true });

    console.log('✨ BharatVerse Foundation Ready! Player:', state.name, 'Level:', state.level);
  }
}

// Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
