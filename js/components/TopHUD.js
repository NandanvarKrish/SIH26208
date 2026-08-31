// js/components/TopHUD.js - Top game HUD controller & progression dashboard

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
    this.scoreEl = null;
    this.masteryEl = null;
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
    this.scoreEl = document.getElementById('hud-score-val');
    this.masteryEl = document.getElementById('hud-mastery-val');
    this.coinsEl = document.getElementById('hud-coins-val');
    this.soundBtn = document.getElementById('hud-sound-toggle-btn');
    const settingsBtn = document.getElementById('hud-settings-btn');

    if (this.soundBtn) {
      this.soundBtn.addEventListener('click', () => {
        const enabled = playerState.toggleSound();
        soundFx.playClick();
        this.updateSoundIcon(enabled);
      });
    }

    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        soundFx.playClick();
        this.showSettingsDashboard();
      });
    }

    // Subscribe to reactive state updates
    playerState.subscribe((state) => this.render(state));
  }

  showSettingsDashboard() {
    const stats = playerState.getGujaratCompletionStats();
    const state = playerState.getState();

    modal.show({
      title: 'Yatri Journal & Expedition Settings',
      subtitle: `Player: ${state.name} • ${stats.masteryRank}`,
      badgeHtml: `<span class="badge-playable">STATE MASTERY: ${stats.overallPercentage}%</span>`,
      contentHtml: `
        <div class="space-y-4 text-left">
          
          <!-- Gujarat Mastery Progress Bar -->
          <div class="bg-slate-800/80 p-3 rounded-lg border border-slate-700 space-y-2">
            <div class="flex justify-between items-center text-xs font-mono">
              <span class="text-amber-400 font-bold">GUJARAT EXPLORATION COMPLETION</span>
              <span class="text-white font-bold">${stats.overallPercentage}%</span>
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); height: 8px; border-radius: 999px; overflow: hidden;">
              <div style="background: linear-gradient(90deg, #FF7A00, #FFD700); height: 100%; width: ${stats.overallPercentage}%; transition: width 0.3s ease;"></div>
            </div>
            
            <div class="grid grid-cols-2 gap-2 text-xs pt-1 text-slate-300">
              <div>📍 Locations: <strong>${stats.locExplored}/${stats.totalLocations}</strong></div>
              <div>📖 Stories: <strong>${stats.storiesMastered}/${stats.totalStories}</strong></div>
              <div>🎮 Mini-Games: <strong>${stats.gamesWon}/${stats.totalGames}</strong></div>
              <div>🏆 Master Quiz: <strong>${stats.isQuizPassed ? 'Passed ✅' : 'Pending ⏳'}</strong></div>
            </div>
          </div>

          <!-- Player Stats -->
          <div class="grid grid-cols-3 gap-2 text-center text-xs">
            <div class="bg-slate-800/60 p-2 rounded border border-slate-700">
              <div class="text-slate-400">TOTAL SCORE</div>
              <div class="text-sm font-bold text-amber-300 font-mono">${state.score} PTS</div>
            </div>
            <div class="bg-slate-800/60 p-2 rounded border border-slate-700">
              <div class="text-slate-400">TOTAL XP</div>
              <div class="text-sm font-bold text-emerald-300 font-mono">${state.totalXP} XP</div>
            </div>
            <div class="bg-slate-800/60 p-2 rounded border border-slate-700">
              <div class="text-slate-400">ARTIFACTS</div>
              <div class="text-sm font-bold text-cyan-300 font-mono">${stats.unlockedItemsCount} 🏺</div>
            </div>
          </div>

          <!-- Unlocked Collectibles List -->
          ${state.unlockedItems.length > 0 ? `
            <div>
              <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Museum Vault</div>
              <div class="flex gap-2 flex-wrap">
                ${state.unlockedItems.map(item => `
                  <div style="background: rgba(255, 215, 0, 0.1); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: 6px; padding: 4px 8px; font-size: 0.75rem; display: flex; align-items: center; gap: 4px;">
                    <span>${item.icon || '🏺'}</span>
                    <span style="color: #FFFFFF; font-weight: 600;">${item.name}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Danger Zone: Reset Progress -->
          <div class="pt-2 border-t border-slate-800">
            <button id="modal-reset-progress-btn" class="btn btn-outline" style="width: 100%; border-color: rgba(239, 68, 68, 0.4); color: #F87171; font-size: 0.8rem; padding: 0.5rem;">
              ⚠️ Reset All Expedition Progress
            </button>
          </div>

        </div>
      `,
      primaryBtnText: '👤 Switch Profile / Logout',
      secondaryBtnText: 'Resume Expedition',
      onPrimary: () => {
        playerState.logout();
        router.navigateTo('login');
      },
      onSecondary: () => {}
    });

    // Bind Reset Button inside modal
    setTimeout(() => {
      const resetBtn = document.getElementById('modal-reset-progress-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          soundFx.playClick();
          modal.show({
            title: 'Confirm Expedition Reset?',
            subtitle: 'This will reset your score, XP, and completed quests to zero.',
            badgeHtml: '<span class="badge-locked">CAUTION</span>',
            contentHtml: '<p class="text-sm text-slate-300">Are you sure you want to start your Gujarat Yatra from the beginning? Your unlocked collectibles and scores will be cleared.</p>',
            primaryBtnText: 'Yes, Reset Everything',
            secondaryBtnText: 'Keep My Progress',
            onPrimary: () => {
              playerState.resetProgress();
            }
          });
        });
      }
    }, 50);
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

    // Score & Gujarat Mastery %
    if (this.scoreEl) this.scoreEl.textContent = `${state.score || 0}`;

    const stats = playerState.getGujaratCompletionStats();
    if (this.masteryEl) this.masteryEl.textContent = `${stats.overallPercentage}%`;

    // Coins
    if (this.coinsEl) this.coinsEl.textContent = state.coins || 100;

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
