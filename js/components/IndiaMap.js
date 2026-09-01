// js/components/IndiaMap.js - Interactive SVG India Map with state paths, pins, and dynamic unlock progressions

import { STATES_DATA } from '../data/statesData.js';
import { playerState } from '../state/playerState.js';
import { soundFx } from '../utils/audio.js';
import { router } from '../utils/router.js';
import { modal } from './Modal.js';

export class IndiaMap {
  constructor() {
    this.container = null;
    this.infoPanel = null;
    this.selectedStateId = 'gujarat';
  }

  init(containerEl, infoPanelEl) {
    this.container = containerEl;
    this.infoPanel = infoPanelEl;
    this.onEnter();
  }

  onEnter() {
    if (!this.container) return;

    this.render();
    this.bindEvents();

    const isRajasthanUnlocked = playerState.isStateUnlocked('rajasthan');
    const isAnimationPending = playerState.isRajasthanUnlockAnimationPending();

    // Prioritize selecting Rajasthan if newly unlocked so user sees it right away
    const state = playerState.getState();
    const stateToSelect = (isRajasthanUnlocked && isAnimationPending) 
      ? 'rajasthan' 
      : (state.selectedStateId || 'gujarat');

    this.selectState(stateToSelect, false);

    // Trigger state-specific zoom-out animation if pending
    if (isAnimationPending) {
      setTimeout(() => {
        this.triggerRajasthanUnlockAnimation();
      }, 150);
    }
  }

  render() {
    if (!this.container) return;

    const isRajasthanUnlocked = playerState.isStateUnlocked('rajasthan');

    this.container.innerHTML = `
      <div class="map-svg-container">
        <!-- SVG Vector Map of India -->
        <svg class="india-svg-map" viewBox="0 0 600 700" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Interactive India Map">
          <defs>
            <radialGradient id="gujaratGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#10B981" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#064E3B" stop-opacity="0.95" />
            </radialGradient>
            <radialGradient id="rajasthanUnlockedGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FF7A00" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#8D4004" stop-opacity="0.95" />
            </radialGradient>
          </defs>

          <!-- North / Himalayan Crown -->
          <path class="state-path" d="M 230,50 L 260,35 L 290,45 L 310,75 L 305,110 L 275,130 L 245,125 L 225,95 Z" data-region="north-himalaya" />
          
          <!-- Punjab / Haryana / Delhi Corridor -->
          <path class="state-path" d="M 205,130 L 245,125 L 265,155 L 240,185 L 205,175 Z" data-region="punjab-haryana" />

          <!-- RAJASTHAN (Dynamic Locked / Unlocked State Node) -->
          <g id="rajasthan-vector-group" class="rajasthan-node-group">
            <path id="rajasthan-svg-path" class="state-path ${isRajasthanUnlocked ? 'playable unlocked-rajasthan' : 'locked-state'}" data-state-id="rajasthan" 
              d="M 140,195 L 205,175 L 240,185 L 235,260 L 195,290 L 155,280 L 125,230 Z" 
              title="${isRajasthanUnlocked ? 'Rajasthan (Unlocked!)' : 'Rajasthan (Locked - Complete Gujarat to Unlock)'}" />
            
            <!-- Sparkle & Ripple Pulse Elements for Rajasthan-Only Animation -->
            <circle id="rajasthan-pulse-ring" cx="182" cy="232" r="10" fill="none" stroke="#FFD700" stroke-width="2.5" opacity="0" pointer-events="none" />
            <circle id="rajasthan-sparkle-center" cx="182" cy="232" r="4" fill="#FFE259" opacity="0" pointer-events="none" />
          </g>

          <!-- GUJARAT (Playable Focus State) -->
          <path class="state-path playable" data-state-id="gujarat" 
            d="M 115,285 L 155,280 L 195,290 L 190,360 L 150,385 L 120,380 L 105,335 L 80,310 L 95,295 Z" 
            title="Gujarat (Playable State)" />

          <!-- Central India / Madhya Pradesh -->
          <path class="state-path" d="M 195,290 L 235,260 L 320,265 L 340,340 L 285,375 L 190,360 Z" data-region="central-mp" />

          <!-- Uttar Pradesh & Bihar Corridor -->
          <path class="state-path" d="M 240,185 L 335,195 L 390,230 L 375,275 L 320,265 L 235,260 Z" data-region="up-bihar" />

          <!-- WEST BENGAL (Locked State) -->
          <path class="state-path locked-state" data-state-id="west-bengal" 
            d="M 390,230 L 430,225 L 440,310 L 405,345 L 380,335 L 375,275 Z" 
            title="West Bengal (Locked)" />

          <!-- North East States -->
          <path class="state-path" d="M 440,225 L 520,210 L 545,265 L 485,300 L 440,270 Z" data-region="northeast" />

          <!-- Maharashtra & Deccan Hub -->
          <path class="state-path" d="M 150,385 L 190,360 L 285,375 L 275,465 L 210,480 L 165,455 Z" data-region="maharashtra" />

          <!-- Odisha & Coastal East -->
          <path class="state-path" d="M 340,340 L 380,335 L 405,345 L 380,440 L 325,430 L 285,375 Z" data-region="odisha-east" />

          <!-- Karnataka & Andhra / Telangana Basin -->
          <path class="state-path" d="M 185,475 L 275,465 L 325,430 L 310,545 L 245,570 L 185,530 Z" data-region="south-central" />

          <!-- TAMIL NADU (Locked State) -->
          <path class="state-path locked-state" data-state-id="tamil-nadu" 
            d="M 245,570 L 310,545 L 295,645 L 265,665 L 235,620 Z" 
            title="Tamil Nadu (Locked)" />

          <!-- Kerala & Southern Tip -->
          <path class="state-path" d="M 215,550 L 245,570 L 235,620 L 265,665 L 255,675 L 210,600 Z" data-region="kerala" />
        </svg>

        <!-- Interactive Pins Layer -->
        <div class="map-pins-layer">
          <!-- Gujarat Playable Pin -->
          <div class="map-pin pin-playable" style="left: 24%; top: 48%;" data-state-id="gujarat" role="button" aria-label="Gujarat - Playable State">
            <div class="pin-icon-wrap anim-glow-aura">
              <span class="text-xl">🌟</span>
              <div class="pin-radar-ring anim-radar"></div>
            </div>
            <div class="pin-label">Gujarat • Active</div>
          </div>

          <!-- Rajasthan Pin (Locked vs Unlocked State) -->
          ${isRajasthanUnlocked ? `
            <div id="rajasthan-map-pin" class="map-pin pin-playable pin-unlocked-state" style="left: 31%; top: 35%;" data-state-id="rajasthan" role="button" aria-label="Rajasthan - Unlocked State">
              <div class="pin-icon-wrap anim-glow-aura" style="background: linear-gradient(135deg, #D96B27, #FFD700); border-color: #FFFFFF; box-shadow: 0 0 20px rgba(255, 122, 0, 0.7);">
                <span class="text-xl">🏰</span>
                <div class="pin-radar-ring anim-radar" style="border-color: #FFD700;"></div>
              </div>
              <div class="pin-label" style="border-color: #FFD700; color: #FFD700;">Rajasthan • UNLOCKED! ✨</div>
            </div>
          ` : `
            <div id="rajasthan-map-pin" class="map-pin pin-locked" style="left: 31%; top: 35%;" data-state-id="rajasthan" role="button" aria-label="Rajasthan - Locked">
              <div class="pin-icon-wrap">
                <span>🔒</span>
              </div>
              <div class="pin-label">Rajasthan (Locked)</div>
            </div>
          `}

          <!-- West Bengal Locked Pin -->
          <div class="map-pin pin-locked" style="left: 68%; top: 42%;" data-state-id="west-bengal" role="button" aria-label="West Bengal - Locked">
            <div class="pin-icon-wrap">
              <span>🔒</span>
            </div>
            <div class="pin-label">West Bengal</div>
          </div>

          <!-- Tamil Nadu Locked Pin -->
          <div class="map-pin pin-locked" style="left: 46%; top: 86%;" data-state-id="tamil-nadu" role="button" aria-label="Tamil Nadu - Locked">
            <div class="pin-icon-wrap">
              <span>🔒</span>
            </div>
            <div class="pin-label">Tamil Nadu</div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const paths = this.container.querySelectorAll('.state-path[data-state-id]');
    paths.forEach(path => {
      path.addEventListener('click', (e) => {
        const stateId = e.currentTarget.getAttribute('data-state-id');
        this.handleStateClick(stateId);
      });
    });

    const pins = this.container.querySelectorAll('.map-pin');
    pins.forEach(pin => {
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        const stateId = e.currentTarget.getAttribute('data-state-id');
        this.handleStateClick(stateId);
      });
    });
  }

  handleStateClick(stateId) {
    if (!STATES_DATA[stateId]) return;

    this.selectState(stateId, true);

    const isUnlocked = playerState.isStateUnlocked(stateId);
    if (!isUnlocked) {
      soundFx.playLockedBuzz();
      this.showLockedStateModal(STATES_DATA[stateId]);
    } else {
      soundFx.playChime();
    }
  }

  selectState(stateId, playSound = false) {
    this.selectedStateId = stateId;
    playerState.setSelectedState(stateId);

    const allPaths = this.container.querySelectorAll('.state-path');
    allPaths.forEach(p => p.classList.remove('selected'));

    const activePath = this.container.querySelector(`.state-path[data-state-id="${stateId}"]`);
    if (activePath) {
      activePath.classList.add('selected');
    }

    this.renderInfoPanel(STATES_DATA[stateId]);
  }

  renderInfoPanel(state) {
    if (!this.infoPanel || !state) return;

    const isUnlocked = playerState.isStateUnlocked(state.id);

    this.infoPanel.innerHTML = `
      <div class="state-info-header">
        <div class="state-title-group">
          <h2>${state.name}</h2>
          <p class="state-tagline">${state.tagline}</p>
        </div>
        <div>
          ${isUnlocked 
            ? '<span class="badge-playable" style="background: rgba(16, 185, 129, 0.2); border-color: #10B981; color: #34D399;">🟢 Unlocked State</span>' 
            : '<span class="badge-locked">🔒 Prototype Locked</span>'}
        </div>
      </div>

      <p class="text-sm text-slate-300 leading-relaxed">${state.description}</p>

      <div class="state-stats-row">
        <div class="stat-box">
          <div class="val">${state.stats.zones}</div>
          <div class="lbl">Zones</div>
        </div>
        <div class="stat-box">
          <div class="val">${state.stats.collectibles}</div>
          <div class="lbl">Artifacts</div>
        </div>
        <div class="stat-box">
          <div class="val">${isUnlocked ? 'Unlocked' : state.stats.mastery}</div>
          <div class="lbl">Status</div>
        </div>
      </div>

      <div>
        <h4 class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Cultural Pillars</h4>
        <div class="pillars-list">
          ${state.pillars.map(p => `
            <div class="pillar-item">
              <span>${p.icon}</span>
              <span>${p.label}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="mt-auto pt-2">
        <button id="state-cta-btn" class="btn ${isUnlocked ? 'btn-primary btn-shimmer-effect' : 'btn-outline'} w-full" style="width: 100%;">
          ${isUnlocked ? (state.id === 'gujarat' ? 'Enter Gujarat Hub →' : '🏰 Enter Rajasthan Tour →') : '🔒 Complete Gujarat to Unlock'}
        </button>
      </div>
    `;

    const ctaBtn = this.infoPanel.querySelector('#state-cta-btn');
    if (ctaBtn) {
      ctaBtn.addEventListener('click', () => {
        if (state.id === 'gujarat') {
          soundFx.playChime();
          this.launchGujaratExpedition();
        } else if (isUnlocked) {
          soundFx.playChime();
          this.showRajasthanTourModal(state);
        } else {
          soundFx.playLockedBuzz();
          this.showLockedStateModal(state);
        }
      });
    }
  }

  showLockedStateModal(state) {
    const progress = playerState.getGujaratExplorationProgress();

    modal.show({
      title: `${state.name} — ${state.tagline}`,
      subtitle: 'National Tour Progression',
      badgeHtml: '<span class="badge-locked">🔒 Locked State</span>',
      contentHtml: `
        <div class="space-y-3">
          <p class="text-sm text-slate-300">${state.description}</p>
          
          <div class="bg-slate-800/80 p-3 rounded-lg border border-slate-700 space-y-2 text-xs">
            <h5 class="font-bold text-amber-400 uppercase tracking-wider">Unlock Requirement</h5>
            <p class="text-slate-300">
              Explore all <strong>4 locations of Gujarat</strong> to unlock Rajasthan!
            </p>
            <div class="space-y-1 pt-1">
              <div class="flex justify-between text-slate-400">
                <span>Gujarat Progress:</span>
                <strong class="text-amber-300">${progress.exploredCount} / ${progress.totalLocations} Locations (${progress.percentage}%)</strong>
              </div>
              <div class="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                <div class="bg-amber-400 h-full rounded-full" style="width: ${progress.percentage}%;"></div>
              </div>
            </div>
          </div>

          <p class="text-xs text-emerald-400 font-medium">
            💡 Complete Kutch, Patan, Ahmedabad, and Gir stories to open this state!
          </p>
        </div>
      `,
      primaryBtnText: 'Explore Gujarat Now →',
      secondaryBtnText: 'Close',
      onPrimary: () => {
        this.selectState('gujarat', true);
        this.launchGujaratExpedition();
      }
    });
  }

  showRajasthanTourModal(state) {
    modal.show({
      title: `🏰 Rajasthan Expedition Tour`,
      subtitle: `${state.tagline}`,
      badgeHtml: '<span class="badge-playable" style="background: #10B981; color: #000; font-weight: 800;">✨ UNLOCKED REWARD</span>',
      contentHtml: `
        <div class="space-y-3 text-center">
          <div class="text-4xl anim-float">🏰</div>
          <h3 class="text-lg font-bold text-amber-300">Welcome to Rajasthan!</h3>
          <p class="text-sm text-slate-200 leading-relaxed">
            You have unlocked Rajasthan by mastering all 4 Gujarat locations. Prepare to travel through Thar Desert dunes, Mehrangarh fortresses, and royal puppet guilds in the upcoming National Tour expansion!
          </p>
          <div class="bg-slate-800/80 p-3 rounded-lg border border-amber-500/40 text-left text-xs space-y-1">
            <div class="text-amber-300 font-bold mb-1">State Highlights Unlocked:</div>
            ${state.pillars.map(p => `<div class="text-slate-300 flex items-center gap-2"><span>${p.icon}</span> <span>${p.label}</span></div>`).join('')}
          </div>
        </div>
      `,
      primaryBtnText: 'Return to Gujarat Hub 🗺️',
      secondaryBtnText: 'Close',
      onPrimary: () => {
        this.selectState('gujarat', true);
        router.navigateTo('gujarat-map');
      }
    });
  }

  // --- Cinematic Rajasthan-Specific Zoom-Out Animation ---
  triggerRajasthanUnlockAnimation() {
    const isRajasthanUnlocked = playerState.isStateUnlocked('rajasthan');
    if (!isRajasthanUnlocked) return;

    const rajasthanPath = this.container.querySelector('#rajasthan-svg-path');
    const rajasthanPin = this.container.querySelector('#rajasthan-map-pin');
    const pulseRing = this.container.querySelector('#rajasthan-pulse-ring');
    const sparkleCenter = this.container.querySelector('#rajasthan-sparkle-center');

    if (!rajasthanPath) return;

    // Play fanfare audio
    soundFx.playLevelUpFanfare();

    // Trigger state-specific zoom animation exclusively on Rajasthan elements
    rajasthanPath.classList.add('anim-rajasthan-state-zoom');
    if (rajasthanPin) rajasthanPin.classList.add('anim-rajasthan-pin-zoom');
    if (pulseRing) pulseRing.classList.add('anim-unlock-pulse');
    if (sparkleCenter) sparkleCenter.classList.add('anim-unlock-sparkle');

    // Clean up animation classes and persist played status after animation completes
    setTimeout(() => {
      rajasthanPath.classList.remove('anim-rajasthan-state-zoom');
      if (rajasthanPin) rajasthanPin.classList.remove('anim-rajasthan-pin-zoom');
      if (pulseRing) pulseRing.classList.remove('anim-unlock-pulse');
      if (sparkleCenter) sparkleCenter.classList.remove('anim-unlock-sparkle');

      playerState.setRajasthanUnlockAnimationPlayed(true);
    }, 1200);
  }

  launchGujaratExpedition() {
    soundFx.playChime();
    router.navigateTo('gujarat-intro');
  }
}
