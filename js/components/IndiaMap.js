// js/components/IndiaMap.js - Interactive SVG India Map with state paths, pins, and info panel

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
    this.render();
    this.bindEvents();
    this.selectState(this.selectedStateId, false);
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="map-svg-container">
        <!-- SVG Vector Map of India -->
        <svg class="india-svg-map" viewBox="0 0 600 700" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Interactive India Map">
          <defs>
            <radialGradient id="gujaratGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#10B981" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#064E3B" stop-opacity="0.95" />
            </radialGradient>
            <radialGradient id="lockedGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#1E293B" />
              <stop offset="100%" stop-color="#0F172A" />
            </radialGradient>
          </defs>

          <!-- North / Himalayan Crown -->
          <path class="state-path" d="M 230,50 L 260,35 L 290,45 L 310,75 L 305,110 L 275,130 L 245,125 L 225,95 Z" data-region="north-himalaya" />
          
          <!-- Punjab / Haryana / Delhi Corridor -->
          <path class="state-path" d="M 205,130 L 245,125 L 265,155 L 240,185 L 205,175 Z" data-region="punjab-haryana" />

          <!-- RAJASTHAN (Locked Prototype State) -->
          <path class="state-path locked-state" data-state-id="rajasthan" 
            d="M 140,195 L 205,175 L 240,185 L 235,260 L 195,290 L 155,280 L 125,230 Z" 
            title="Rajasthan (Locked)" />

          <!-- GUJARAT (Playable Focus State) -->
          <path class="state-path playable" data-state-id="gujarat" 
            d="M 115,285 L 155,280 L 195,290 L 190,360 L 150,385 L 120,380 L 105,335 L 80,310 L 95,295 Z" 
            title="Gujarat (Playable Prototype)" />

          <!-- Central India / Madhya Pradesh -->
          <path class="state-path" d="M 195,290 L 235,260 L 320,265 L 340,340 L 285,375 L 190,360 Z" data-region="central-mp" />

          <!-- Uttar Pradesh & Bihar Corridor -->
          <path class="state-path" d="M 240,185 L 335,195 L 390,230 L 375,275 L 320,265 L 235,260 Z" data-region="up-bihar" />

          <!-- WEST BENGAL (Locked Prototype State) -->
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

          <!-- TAMIL NADU (Locked Prototype State) -->
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
            <div class="pin-label">Gujarat • Playable</div>
          </div>

          <!-- Rajasthan Locked Pin -->
          <div class="map-pin pin-locked" style="left: 31%; top: 35%;" data-state-id="rajasthan" role="button" aria-label="Rajasthan - Locked">
            <div class="pin-icon-wrap">
              <span>🔒</span>
            </div>
            <div class="pin-label">Rajasthan</div>
          </div>

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
    // Click on vector state paths
    const paths = this.container.querySelectorAll('.state-path[data-state-id]');
    paths.forEach(path => {
      path.addEventListener('click', (e) => {
        const stateId = e.currentTarget.getAttribute('data-state-id');
        this.handleStateClick(stateId);
      });
    });

    // Click on map pins
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

    const state = STATES_DATA[stateId];
    if (state.status === 'locked') {
      soundFx.playLockedBuzz();
      this.showLockedStateModal(state);
    } else {
      soundFx.playChime();
    }
  }

  selectState(stateId, playSound = false) {
    this.selectedStateId = stateId;
    playerState.setSelectedState(stateId);

    // Update active path class
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

    const isPlayable = state.status === 'playable';

    this.infoPanel.innerHTML = `
      <div class="state-info-header">
        <div class="state-title-group">
          <h2>${state.name}</h2>
          <p class="state-tagline">${state.tagline}</p>
        </div>
        <div>
          ${isPlayable 
            ? '<span class="badge-playable">🟢 Playable</span>' 
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
          <div class="val">${state.stats.mastery}</div>
          <div class="lbl">Mastery</div>
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
        <button id="state-cta-btn" class="btn ${isPlayable ? 'btn-primary btn-shimmer-effect' : 'btn-outline'} w-full" style="width: 100%;">
          ${state.ctaText}
        </button>
      </div>
    `;

    const ctaBtn = this.infoPanel.querySelector('#state-cta-btn');
    if (ctaBtn) {
      ctaBtn.addEventListener('click', () => {
        if (isPlayable) {
          soundFx.playChime();
          this.launchGujaratExpedition();
        } else {
          soundFx.playLockedBuzz();
          this.showLockedStateModal(state);
        }
      });
    }
  }

  showLockedStateModal(state) {
    modal.show({
      title: `${state.name} — ${state.tagline}`,
      subtitle: 'National Tour Preview',
      badgeHtml: '<span class="badge-locked">🔒 Locked in Prototype</span>',
      contentHtml: `
        <div class="space-y-3">
          <p class="text-sm text-slate-300">${state.description}</p>
          <div class="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60">
            <h5 class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Upcoming Expeditions</h5>
            <ul class="text-xs text-slate-300 space-y-1">
              ${state.pillars.map(p => `<li>${p.icon} ${p.label}</li>`).join('')}
            </ul>
          </div>
          <p class="text-xs text-emerald-400 font-medium">💡 Tip: Complete all 4 zones of Gujarat to unlock early access to the National Tour!</p>
        </div>
      `,
      primaryBtnText: 'Explore Gujarat Instead →',
      secondaryBtnText: 'Close',
      onPrimary: () => {
        this.selectState('gujarat', true);
      }
    });
  }

  launchGujaratExpedition() {
    soundFx.playChime();
    router.navigateTo('gujarat-intro');
  }
}
