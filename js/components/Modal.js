// js/components/Modal.js - Reusable glassmorphic modal dialog component

import { soundFx } from '../utils/audio.js';

class ModalManager {
  constructor() {
    this.overlay = null;
    this.container = null;
    this.onPrimaryCallback = null;
    this.onSecondaryCallback = null;
  }

  init() {
    this.overlay = document.getElementById('global-modal-overlay');
    this.container = document.getElementById('global-modal-container');

    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        soundFx.playClick();
        this.hide();
      });
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          soundFx.playClick();
          this.hide();
        }
      });
    }

    // ESC key listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.overlay && this.overlay.classList.contains('active')) {
        this.hide();
      }
    });
  }

  show({
    title = '',
    subtitle = '',
    badgeHtml = '',
    contentHtml = '',
    primaryBtnText = 'Confirm',
    secondaryBtnText = '',
    onPrimary = null,
    onSecondary = null
  }) {
    if (!this.overlay || !this.container) this.init();

    this.onPrimaryCallback = onPrimary;
    this.onSecondaryCallback = onSecondary;

    const titleEl = document.getElementById('modal-title');
    const subtitleEl = document.getElementById('modal-subtitle');
    const badgeEl = document.getElementById('modal-badge-slot');
    const bodyEl = document.getElementById('modal-body');
    const primaryBtn = document.getElementById('modal-primary-btn');
    const secondaryBtn = document.getElementById('modal-secondary-btn');

    if (titleEl) titleEl.textContent = title;
    if (subtitleEl) subtitleEl.textContent = subtitle;
    if (badgeEl) badgeEl.innerHTML = badgeHtml;
    if (bodyEl) bodyEl.innerHTML = contentHtml;

    if (primaryBtn) {
      primaryBtn.textContent = primaryBtnText;
      primaryBtn.style.display = primaryBtnText ? 'inline-flex' : 'none';
      primaryBtn.onclick = () => {
        soundFx.playClick();
        if (this.onPrimaryCallback) this.onPrimaryCallback();
        this.hide();
      };
    }

    if (secondaryBtn) {
      secondaryBtn.textContent = secondaryBtnText;
      secondaryBtn.style.display = secondaryBtnText ? 'inline-flex' : 'none';
      secondaryBtn.onclick = () => {
        soundFx.playClick();
        if (this.onSecondaryCallback) this.onSecondaryCallback();
        this.hide();
      };
    }

    this.overlay.classList.add('active');
  }

  hide() {
    if (this.overlay) {
      this.overlay.classList.remove('active');
    }
  }
}

export const modal = new ModalManager();
