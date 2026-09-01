// gir-guardian/app.js - Standalone bootstrap runner for The Gir Guardian Module

import { girGuardianScreen } from '../js/screens/GirGuardianScreen.js';
import { soundFx } from '../js/utils/audio.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('🦁 Launching The Gir Guardian Standalone Experience...');
  
  // Warm audio context on first interaction
  window.addEventListener('click', () => soundFx.init(), { once: true });
  window.addEventListener('keydown', () => soundFx.init(), { once: true });

  // Initialize and mount screen
  girGuardianScreen.init();
  girGuardianScreen.onEnter();
});
