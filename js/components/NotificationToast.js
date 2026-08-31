// js/components/NotificationToast.js - Dynamic floating reward notifications and celebration banners

import { soundFx } from '../utils/audio.js';

class NotificationManager {
  constructor() {
    this.container = null;
  }

  init() {
    this.container = document.getElementById('reward-toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'reward-toast-container';
      this.container.className = 'reward-toast-container';
      document.body.appendChild(this.container);
    }
  }

  showReward({
    title = 'Quest Reward Earned!',
    subtitle = '',
    xp = 0,
    score = 0,
    icon = '✨',
    badge = 'REWARD',
    itemUnlocked = null
  }) {
    if (!this.container) this.init();

    soundFx.playChime();

    const toast = document.createElement('div');
    toast.className = 'reward-toast glass-panel';

    toast.innerHTML = `
      <div class="toast-avatar anim-float">${icon}</div>
      <div class="toast-content">
        <div class="toast-header-row">
          <span class="toast-badge">${badge}</span>
          ${xp > 0 ? `<span class="toast-xp-pill">+${xp} XP ⚡</span>` : ''}
          ${score > 0 ? `<span class="toast-score-pill">+${score} PTS</span>` : ''}
        </div>
        <div class="toast-title">${title}</div>
        ${subtitle ? `<div class="toast-sub">${subtitle}</div>` : ''}
        ${itemUnlocked ? `
          <div class="toast-item-unlocked">
            <span>🎁 Unlocked:</span> <strong>${itemUnlocked.name || itemUnlocked}</strong>
          </div>
        ` : ''}
      </div>
    `;

    this.container.appendChild(toast);

    // Auto dismiss after 4.2 seconds
    setTimeout(() => {
      toast.classList.add('toast-dismissing');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    }, 4200);
  }

  showLevelUp(newLevel, newTitle) {
    this.showReward({
      title: `LEVEL UP! LEVEL ${newLevel}`,
      subtitle: `Promoted to ${newTitle}! New Gujarat lore unlocked.`,
      icon: '👑',
      badge: 'LEVEL MILESTONE',
      xp: 0
    });
  }
}

export const notification = new NotificationManager();
