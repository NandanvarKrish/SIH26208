// js/screens/LoginScreen.js - Profile setup, avatar selection, and guest login

import { AVATARS } from '../data/statesData.js';
import { playerState } from '../state/playerState.js';
import { soundFx } from '../utils/audio.js';
import { router } from '../utils/router.js';

export class LoginScreen {
  constructor() {
    this.screenEl = null;
    this.nameInput = null;
    this.avatarGrid = null;
    this.submitBtn = null;
    this.guestBtn = null;
    this.selectedAvatarId = 'veer';
  }

  init() {
    this.screenEl = document.getElementById('screen-login');
    this.nameInput = document.getElementById('login-name-input');
    this.avatarGrid = document.getElementById('login-avatar-grid');
    this.submitBtn = document.getElementById('login-submit-btn');
    this.guestBtn = document.getElementById('login-guest-btn');

    this.renderAvatars();

    if (this.submitBtn) {
      this.submitBtn.addEventListener('click', () => this.handleCustomLogin());
    }

    if (this.guestBtn) {
      this.guestBtn.addEventListener('click', () => this.handleGuestLogin());
    }

    if (this.nameInput) {
      this.nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.handleCustomLogin();
        }
      });
    }
  }

  renderAvatars() {
    if (!this.avatarGrid) return;

    this.avatarGrid.innerHTML = AVATARS.map(avatar => `
      <div class="avatar-card ${avatar.id === this.selectedAvatarId ? 'selected' : ''}" 
           data-avatar-id="${avatar.id}" 
           role="button" 
           tabindex="0"
           aria-label="Avatar: ${avatar.name}">
        <div class="avatar-icon">${avatar.icon}</div>
        <div class="avatar-name">${avatar.name}</div>
        <div class="text-[10px] text-slate-400 text-center leading-tight">${avatar.title}</div>
      </div>
    `).join('');

    // Bind selection events
    const cards = this.avatarGrid.querySelectorAll('.avatar-card');
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        soundFx.playClick();
        const id = e.currentTarget.getAttribute('data-avatar-id');
        this.selectAvatar(id);
      });
    });
  }

  selectAvatar(avatarId) {
    this.selectedAvatarId = avatarId;
    const cards = this.avatarGrid.querySelectorAll('.avatar-card');
    cards.forEach(c => {
      if (c.getAttribute('data-avatar-id') === avatarId) {
        c.classList.add('selected');
      } else {
        c.classList.remove('selected');
      }
    });
  }

  handleCustomLogin() {
    const rawName = this.nameInput ? this.nameInput.value.trim() : '';
    const finalName = rawName || 'Yatri Vikram';

    soundFx.playChime();
    playerState.login(finalName, this.selectedAvatarId);
    router.navigateTo('map');
  }

  handleGuestLogin() {
    soundFx.playChime();
    playerState.loginAsGuest();
    router.navigateTo('map');
  }

  onEnter() {
    const state = playerState.getState();
    if (this.nameInput && state.name && state.name !== 'Yatri Explorer') {
      this.nameInput.value = state.name;
    }
    if (state.avatarId) {
      this.selectAvatar(state.avatarId);
    }
  }

  onLeave() {}
}

export const loginScreen = new LoginScreen();
