// js/components/TopHUD.js - Top game HUD controller

import { playerState } from '../state/playerState.js';
import { soundFx } from '../utils/audio.js';
import { router } from '../utils/router.js';
import { modal } from './Modal.js';

class TopHUD {
  constructor() {
    this.hudEl = null;
    this.avatarIconEl = null;
    this.levelBadgeEl = null;
    this.nameEl = null;
    this.titleEl = null;
    this.xpFillEl = null;
    this.xpTextEl = null;
    this.coinsEl = null;
    this.soundBtn = null;
  }

  init() {
    this.hudEl = document.getElementById('top-hud');
    this.avatarIconEl = document.getElementById('hud-avatar-icon');
    this.levelBadgeEl = document.getElementById('hud-level-badge');
    this.nameEl = document.getElementById('hud-player-name');
    this.titleEl = document.getElementById('hud-player-title');
    this.xpFillEl = document.getElementById('hud-xp-fill');
    this.xpTextEl = document.getElementById('hud-xp-text');
    this.coinsEl = document.getElementById('hud-coins-val');
    this.soundBtn = document.getElementById('hud-sound-toggle-btn');
    const logoutBtn = document.getElementById('hud-logout-btn');

    if (this.soundBtn) {
      this.soundBtn.addEventListener('click', () => {
        const enabled = playerState.toggleSound();
        soundFx.playClick();
        this.updateSoundIcon(enabled);
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        soundFx.playClick();
        modal.show({
          title: 'Switch Explorer Profile?',
          subtitle: 'Return to login screen',
          contentHtml: '<p class="text-sm text-slate-300">Your current expedition score and progress are saved in your local yatra journal.</p>',
          primaryBtnText: 'Switch Profile',
          secondaryBtnText: 'Cancel',
          onPrimary: () => {
            playerState.logout();
            router.navigateTo('login');
          }
        });
      });
    }

    // Subscribe to reactive state updates
    playerState.subscribe((state) => this.render(state));
  }

  render(state) {
    if (!this.hudEl) return;

    if (!state.isLoggedIn) {
      this.hudEl.classList.add('hidden');
      return;
    }

    this.hudEl.classList.remove('hidden');

    if (this.avatarIconEl) this.avatarIconEl.textContent = state.avatarIcon || '🪖';
    if (this.levelBadgeEl) this.levelBadgeEl.textContent = `L${state.level}`;
    if (this.nameEl) this.nameEl.textContent = state.name;
    if (this.titleEl) this.titleEl.textContent = state.title;

    // XP Progress calculation
    const xpPercent = Math.min(100, Math.round((state.xp / state.xpToNextLevel) * 100));
    if (this.xpFillEl) this.xpFillEl.style.width = `${xpPercent}%`;
    if (this.xpTextEl) this.xpTextEl.textContent = `${state.xp} / ${state.xpToNextLevel} XP`;

    // Coins
    if (this.coinsEl) this.coinsEl.textContent = state.coins;

    this.updateSoundIcon(state.soundEnabled);
  }

  updateSoundIcon(enabled) {
    if (!this.soundBtn) return;
    this.soundBtn.innerHTML = enabled ? '🔊' : '🔇';
    this.soundBtn.title = enabled ? 'Mute Audio' : 'Unmute Audio';
  }

  show() {
    if (this.hudEl) this.hudEl.classList.remove('hidden');
  }

  hide() {
    if (this.hudEl) this.hudEl.classList.add('hidden');
  }
}

export const topHUD = new TopHUD();
