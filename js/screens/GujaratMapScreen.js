// js/screens/GujaratMapScreen.js - Screen controller for the Gujarat Regional Map & Location Hub

import { GujaratMap } from '../components/GujaratMap.js';
import { topHUD } from '../components/TopHUD.js';
import { playerState } from '../state/playerState.js';
import { soundFx } from '../utils/audio.js';
import { router } from '../utils/router.js';

export class GujaratMapScreen {
  constructor() {
    this.screenEl = null;
    this.gujaratMap = null;
  }

  init() {
    this.screenEl = document.getElementById('screen-gujarat-map');
    this.render();
  }

  render() {
    if (!this.screenEl) return;

    this.screenEl.innerHTML = `
      <div class="gujarat-map-screen-layout">
        
        <!-- Interactive Map Container -->
        <div class="gujarat-map-canvas-container">
          
          <!-- Header & Breadcrumb Bar -->
          <div class="gujarat-map-header-bar">
            <nav class="breadcrumb-nav" aria-label="Breadcrumb">
              <button id="gujarat-map-back-btn" class="breadcrumb-btn" aria-label="Back to Gujarat Intro">
                <span>←</span> Overview
              </button>
              <span>/</span>
              <button id="gujarat-map-to-india-btn" class="breadcrumb-btn" aria-label="Back to India Map">
                India Map
              </button>
              <span>/</span>
              <span style="color: #F8FAFC; font-weight: 700;">Gujarat Hub</span>
            </nav>

            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="badge-playable" id="gujarat-header-mastery-badge">State Mastery: 0%</span>
              <button id="gujarat-map-to-museum-btn" class="btn btn-outline" style="padding: 0.25rem 0.75rem; font-size: 0.75rem; border-color: var(--color-royal-gold); color: var(--color-royal-gold);">
                🏛️ Museum
              </button>
            </div>
          </div>

          <!-- SVG Regional Map Viewport -->
          <div id="gujarat-map-viewport-target" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
            <!-- GujaratMap component mounts here -->
          </div>

        </div>

        <!-- Location Inspection & Quest Deck Panel -->
        <aside id="gujarat-deck-panel" class="location-deck-panel glass-panel" aria-label="Location Information Deck">
          <!-- Dynamically populated by GujaratMap.js -->
        </aside>

      </div>
    `;

    this.bindEvents();

    const mapTarget = this.screenEl.querySelector('#gujarat-map-viewport-target');
    const deckTarget = this.screenEl.querySelector('#gujarat-deck-panel');
    if (mapTarget && deckTarget) {
      this.gujaratMap = new GujaratMap();
      this.gujaratMap.init(mapTarget, deckTarget);
    }
  }

  bindEvents() {
    const backBtn = this.screenEl.querySelector('#gujarat-map-back-btn');
    const toIndiaBtn = this.screenEl.querySelector('#gujarat-map-to-india-btn');

    if (backBtn) {
      backBtn.addEventListener('click', () => {
        soundFx.playClick();
        router.navigateTo('gujarat-intro');
      });
    }

    if (toIndiaBtn) {
      toIndiaBtn.addEventListener('click', () => {
        soundFx.playClick();
        router.navigateTo('map');
      });
    }

    const toMuseumBtn = this.screenEl.querySelector('#gujarat-map-to-museum-btn');
    if (toMuseumBtn) {
      toMuseumBtn.addEventListener('click', () => {
        soundFx.playChime();
        router.navigateTo('museum');
      });
    }
  }

  onEnter() {
    topHUD.show();
    const state = playerState.getState();
    const stats = playerState.getGujaratCompletionStats();

    const badgeEl = this.screenEl ? this.screenEl.querySelector('#gujarat-header-mastery-badge') : null;
    if (badgeEl) {
      badgeEl.textContent = `State Mastery: ${stats.overallPercentage}% (${stats.masteryRank})`;
    }

    if (this.gujaratMap) {
      this.gujaratMap.selectLocation(state.selectedGujaratLocationId || 'kutch', false);
    }
  }

  onLeave() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const gujaratMapScreen = new GujaratMapScreen();
