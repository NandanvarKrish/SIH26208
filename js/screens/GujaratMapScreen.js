// js/screens/GujaratMapScreen.js - Screen controller for the Gujarat Regional Map, Exploration Progress Hub & State Mastery

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

    const progress = playerState.getGujaratExplorationProgress();
    const stats = playerState.getGujaratCompletionStats();

    this.screenEl.innerHTML = `
      <div class="gujarat-map-screen-layout">
        
        <!-- Interactive Map Container -->
        <div class="gujarat-map-canvas-container">
          
          <!-- Header Bar with Integrated Exploration Progress Tracker -->
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

            <!-- Gujarat Exploration Progress Tracker Widget -->
            <div class="gujarat-exploration-tracker" id="gujarat-exploration-tracker">
              <div class="tracker-header">
                <span class="tracker-title">GUJARAT EXPLORATION</span>
                <span class="tracker-count" id="exploration-count-label">${progress.exploredCount} / ${progress.totalLocations} Places Explored</span>
              </div>
              <div class="tracker-bar-wrap">
                <div class="tracker-bar-fill" id="exploration-bar-fill" style="width: ${progress.percentage}%;"></div>
                <span class="tracker-percent" id="exploration-percent-label">${progress.percentage}%</span>
              </div>
            </div>

            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="badge-playable" id="gujarat-header-mastery-badge">Mastery: ${stats.overallPercentage}%</span>
              <button id="gujarat-map-to-museum-btn" class="btn btn-outline" style="padding: 0.25rem 0.75rem; font-size: 0.75rem; border-color: var(--gold-400); color: var(--gold-300);">
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
    const progress = playerState.getGujaratExplorationProgress();
    const stats = playerState.getGujaratCompletionStats();

    // Update exploration progress tracker
    const countEl = this.screenEl ? this.screenEl.querySelector('#exploration-count-label') : null;
    const fillEl = this.screenEl ? this.screenEl.querySelector('#exploration-bar-fill') : null;
    const percentEl = this.screenEl ? this.screenEl.querySelector('#exploration-percent-label') : null;

    if (countEl) countEl.textContent = `${progress.exploredCount} / ${progress.totalLocations} Places Explored`;
    if (fillEl) fillEl.style.width = `${progress.percentage}%`;
    if (percentEl) percentEl.textContent = `${progress.percentage}%`;

    const badgeEl = this.screenEl ? this.screenEl.querySelector('#gujarat-header-mastery-badge') : null;
    if (badgeEl) {
      badgeEl.textContent = `Mastery: ${stats.overallPercentage}% (${stats.masteryRank})`;
    }

    if (this.gujaratMap) {
      this.gujaratMap.render();
      this.gujaratMap.bindEvents();
      this.gujaratMap.selectLocation(playerState.getState().selectedGujaratLocationId || 'kutch', false);
      this.gujaratMap.checkAndTriggerRajasthanUnlock();
    }
  }

  onLeave() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const gujaratMapScreen = new GujaratMapScreen();
