// js/components/GujaratMap.js - Interactive Gujarat Regional SVG Map, Location Deck & Exploration Tracking

import { GUJARAT_LOCATIONS, getLocationById } from '../data/gujaratLocationsData.js';
import { playerState } from '../state/playerState.js';
import { soundFx } from '../utils/audio.js';
import { router } from '../utils/router.js';
import { modal } from './Modal.js';

export class GujaratMap {
  constructor() {
    this.container = null;
    this.deckPanel = null;
    this.selectedLocationId = 'kutch';
  }

  init(containerEl, deckPanelEl) {
    this.container = containerEl;
    this.deckPanel = deckPanelEl;
    this.render();
    this.bindEvents();
    
    const state = playerState.getState();
    this.selectLocation(state.selectedGujaratLocationId || 'kutch', false);
    this.checkAndTriggerRajasthanUnlock();
  }

  render() {
    if (!this.container) return;

    // Check exploration states for all 4 locations
    const isKutchExplored = playerState.isLocationExplored('kutch');
    const isPatanExplored = playerState.isLocationExplored('patan-north');
    const isAhmedabadExplored = playerState.isLocationExplored('ahmedabad-central');
    const isGirExplored = playerState.isLocationExplored('gir-saurashtra');

    this.container.innerHTML = `
      <div class="gujarat-map-wrapper">
        
        <!-- SVG Vector Map of Gujarat -->
        <svg class="gujarat-state-svg" viewBox="0 0 800 700" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Interactive Map of Gujarat State">
          <defs>
            <!-- Map Gradients -->
            <radialGradient id="gujaratLandGrad" cx="50%" cy="45%" r="65%">
              <stop offset="0%" stop-color="#192841" />
              <stop offset="55%" stop-color="#121D31" />
              <stop offset="100%" stop-color="#0B1322" />
            </radialGradient>

            <linearGradient id="kutchSaltOverlay" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#E2E8F0" stop-opacity="0.18" />
              <stop offset="70%" stop-color="#94A3B8" stop-opacity="0.06" />
              <stop offset="100%" stop-color="#1E293B" stop-opacity="0" />
            </linearGradient>

            <linearGradient id="saurashtraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#163832" stop-opacity="0.35" />
              <stop offset="100%" stop-color="#0F2823" stop-opacity="0.1" />
            </linearGradient>

            <linearGradient id="waterBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#08202C" stop-opacity="0.7" />
              <stop offset="100%" stop-color="#04121A" stop-opacity="0.9" />
            </linearGradient>

            <linearGradient id="questTrailGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFD700" />
              <stop offset="50%" stop-color="#FF7A00" />
              <stop offset="100%" stop-color="#00D2C4" />
            </linearGradient>
          </defs>

          <!-- 1. CARTOGRAPHIC BACKGROUND GRID & COORDINATE TICKS -->
          <g class="cartography-grid-layer" opacity="0.35">
            <line x1="160" y1="40" x2="160" y2="660" stroke="#C89B3C" stroke-width="0.5" stroke-dasharray="3 6" opacity="0.3" />
            <line x1="320" y1="40" x2="320" y2="660" stroke="#C89B3C" stroke-width="0.5" stroke-dasharray="3 6" opacity="0.3" />
            <line x1="480" y1="40" x2="480" y2="660" stroke="#C89B3C" stroke-width="0.5" stroke-dasharray="3 6" opacity="0.3" />
            <line x1="640" y1="40" x2="640" y2="660" stroke="#C89B3C" stroke-width="0.5" stroke-dasharray="3 6" opacity="0.3" />
            
            <line x1="40" y1="160" x2="760" y2="160" stroke="#C89B3C" stroke-width="0.5" stroke-dasharray="3 6" opacity="0.3" />
            <line x1="40" y1="320" x2="760" y2="320" stroke="#C89B3C" stroke-width="0.5" stroke-dasharray="3 6" opacity="0.3" />
            <line x1="40" y1="480" x2="760" y2="480" stroke="#C89B3C" stroke-width="0.5" stroke-dasharray="3 6" opacity="0.3" />

            <text x="165" y="55" fill="#9E937F" font-size="9" font-family="monospace" letter-spacing="1">69°E</text>
            <text x="325" y="55" fill="#9E937F" font-size="9" font-family="monospace" letter-spacing="1">71°E</text>
            <text x="485" y="55" fill="#9E937F" font-size="9" font-family="monospace" letter-spacing="1">73°E</text>
            <text x="645" y="55" fill="#9E937F" font-size="9" font-family="monospace" letter-spacing="1">75°E</text>
            <text x="45" y="155" fill="#9E937F" font-size="9" font-family="monospace" letter-spacing="1">24°N</text>
            <text x="45" y="315" fill="#9E937F" font-size="9" font-family="monospace" letter-spacing="1">22°N</text>
            <text x="45" y="475" fill="#9E937F" font-size="9" font-family="monospace" letter-spacing="1">20°N</text>
          </g>

          <!-- 2. WATER BODIES -->
          <path class="water-body-shape" 
                d="M 125,370 C 180,335 245,330 310,340 C 335,310 325,275 290,270 C 220,280 150,275 100,240 C 85,270 95,330 125,370 Z" 
                fill="url(#waterBodyGrad)" stroke="#1B828F" stroke-width="0.8" stroke-dasharray="2 4" />
          
          <path class="water-body-shape" 
                d="M 435,460 C 420,490 405,535 390,580 C 445,550 490,520 535,530 C 515,480 475,445 435,460 Z" 
                fill="url(#waterBodyGrad)" stroke="#1B828F" stroke-width="0.8" stroke-dasharray="2 4" />

          <!-- Water Waves -->
          <g class="water-waves" stroke="#1B828F" stroke-width="0.7" fill="none" opacity="0.4">
            <path d="M 60,420 Q 80,415 100,420 Q 120,425 140,420" />
            <path d="M 50,450 Q 70,445 90,450 Q 110,455 130,450" />
            <path d="M 180,315 Q 200,310 220,315 Q 240,320 260,315" />
            <path d="M 460,560 Q 480,555 500,560 Q 520,565 540,560" />
          </g>

          <!-- 3. COMPLETE GUJARAT BASE LANDMASS -->
          <path class="gujarat-master-land" 
                d="M 95,235 
                   C 130,175 185,130 255,115 
                   C 335,100 415,115 470,145 
                   C 525,135 585,145 625,175 
                   C 660,205 680,260 670,315 
                   C 660,365 675,415 655,465 
                   C 635,515 615,570 590,625 
                   C 575,645 545,635 535,595 
                   C 525,550 515,515 485,475 
                   C 460,440 435,435 410,445 
                   C 385,455 370,495 385,545 
                   C 395,575 380,605 345,615 
                   C 295,625 245,615 195,575 
                   C 145,535 115,475 110,415 
                   C 105,370 120,345 150,335 
                   C 200,320 265,325 315,310 
                   C 330,305 335,285 320,275 
                   C 270,245 200,250 145,255 
                   C 115,260 95,255 95,235 Z" 
                fill="url(#gujaratLandGrad)" 
                stroke="#C89B3C" 
                stroke-width="2" 
                stroke-linejoin="round" />

          <!-- 4. REGIONAL TERRITORIES -->
          <!-- Zone 1: KUTCH -->
          <path class="zone-region-path ${this.selectedLocationId === 'kutch' ? 'active-zone' : ''}" data-loc-id="kutch" 
                d="M 95,235 C 130,175 185,130 255,115 C 335,100 415,115 470,145 C 440,185 410,230 380,260 C 330,270 260,255 200,250 C 145,255 115,260 95,235 Z" 
                fill="url(#kutchSaltOverlay)" stroke="#E5B869" stroke-width="1.2" stroke-dasharray="4 2" />

          <!-- Zone 2: PATAN -->
          <path class="zone-region-path ${this.selectedLocationId === 'patan-north' ? 'active-zone' : ''}" data-loc-id="patan-north" 
                d="M 470,145 C 525,135 585,145 625,175 C 645,195 650,230 635,265 C 575,275 525,285 470,285 C 425,285 395,265 380,260 C 410,230 440,185 470,145 Z" 
                fill="#16253B" stroke="#C89B3C" stroke-width="1" />

          <!-- Zone 3: AHMEDABAD -->
          <path class="zone-region-path ${this.selectedLocationId === 'ahmedabad-central' ? 'active-zone' : ''}" data-loc-id="ahmedabad-central" 
                d="M 470,285 C 525,285 575,275 635,265 C 660,315 675,365 655,415 C 635,465 605,485 550,490 C 515,485 460,455 435,435 C 420,385 435,325 470,285 Z" 
                fill="#152B3E" stroke="#1B828F" stroke-width="1" />

          <!-- Zone 4: GIR & SAURASHTRA -->
          <path class="zone-region-path ${this.selectedLocationId === 'gir-saurashtra' ? 'active-zone' : ''}" data-loc-id="gir-saurashtra" 
                d="M 150,335 C 120,345 105,370 110,415 C 115,475 145,535 195,575 C 245,615 295,625 345,615 C 380,605 395,575 385,545 C 370,495 385,455 410,445 C 390,390 355,340 315,310 C 265,325 200,320 150,335 Z" 
                fill="url(#saurashtraGrad)" stroke="#10B981" stroke-width="1.2" />

          <!-- Rivers -->
          <path class="river-path" d="M 560,175 C 545,225 530,280 520,335 C 510,380 495,430 475,465" fill="none" stroke="#00D2C4" stroke-width="1.8" opacity="0.75" />
          <path class="river-path" d="M 660,440 C 620,445 580,455 535,485" fill="none" stroke="#00D2C4" stroke-width="1.6" opacity="0.65" />

          <!-- Quest Trail -->
          <path class="quest-trail-line" 
                d="M 230,205 C 320,150 410,165 490,200 C 530,225 540,290 515,345 C 460,410 375,450 295,515" 
                fill="none" stroke="url(#questTrailGold)" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="6 8" />

          <!-- Compass Rose -->
          <g class="compass-rose-group" transform="translate(100, 560)">
            <circle cx="0" cy="0" r="32" fill="none" stroke="#C89B3C" stroke-width="0.7" opacity="0.4" />
            <polygon points="0,-28 4,-8 0,0 -4,-8" fill="#FFD700" opacity="0.85" />
            <polygon points="0,28 4,8 0,0 -4,8" fill="#C89B3C" opacity="0.6" />
            <polygon points="28,0 8,4 0,0 8,-4" fill="#C89B3C" opacity="0.6" />
            <polygon points="-28,0 -8,4 0,0 -8,-4" fill="#C89B3C" opacity="0.6" />
            <circle cx="0" cy="0" r="2.5" fill="#FFE259" />
            <text x="0" y="-33" text-anchor="middle" fill="#FFD700" font-family="'Cinzel Decorative', serif" font-size="10" font-weight="bold">N</text>
          </g>

          <!-- Watermarks -->
          <text x="240" y="90" fill="#E2E8F0" font-family="'Rajdhani', sans-serif" font-size="12" font-weight="700" letter-spacing="4" opacity="0.35">GREAT RANN OF KUTCH</text>
          <text x="180" y="295" fill="#00D2C4" font-family="'Rajdhani', sans-serif" font-size="10" font-weight="700" letter-spacing="2" opacity="0.45">GULF OF KUTCH</text>
          <text x="440" y="525" fill="#00D2C4" font-family="'Rajdhani', sans-serif" font-size="10" font-weight="700" letter-spacing="2" opacity="0.45">GULF OF KHAMBHAT</text>
          <text x="235" y="440" fill="#E2E8F0" font-family="'Rajdhani', sans-serif" font-size="13" font-weight="700" letter-spacing="3" opacity="0.3">SAURASHTRA PENINSULA</text>
          <text x="60" y="500" fill="#00D2C4" font-family="'Rajdhani', sans-serif" font-size="11" font-weight="700" letter-spacing="3" opacity="0.4">ARABIAN SEA</text>
        </svg>

        <!-- 5. INTERACTIVE LOCATION WAYPOINT PINS OVERLAY WITH PROGRESS BADGES -->
        <div class="gujarat-pins-container">
          
          <!-- Pin 1: Great Rann of Kutch -->
          <div class="waypoint-pin ${this.selectedLocationId === 'kutch' ? 'active' : ''} ${isKutchExplored ? 'explored' : ''}" 
               style="left: 28.75%; top: 29.3%;" 
               data-loc-id="kutch" 
               role="button" 
               tabindex="0" 
               aria-label="Great Rann of Kutch Waypoint">
            <div class="waypoint-beacon-ring"></div>
            <div class="waypoint-marker-shield anim-glow-aura">
              <span class="waypoint-icon">🏜️</span>
              ${isKutchExplored ? '<div class="pin-check-badge">✓</div>' : ''}
            </div>
            <div class="waypoint-tooltip">
              <div class="tooltip-header">
                <span class="tooltip-badge">NW GUJARAT</span>
                <span class="tooltip-xp">${isKutchExplored ? '✓ EXPLORED' : '+50 XP'}</span>
              </div>
              <div class="tooltip-title">Great Rann of Kutch</div>
              <div class="tooltip-sub">${isKutchExplored ? 'Cultural Lore Mastered' : 'White Salt Desert & Rogan Guilds'}</div>
            </div>
          </div>

          <!-- Pin 2: Patan & Rani ki Vav -->
          <div class="waypoint-pin ${this.selectedLocationId === 'patan-north' ? 'active' : ''} ${isPatanExplored ? 'explored' : ''}" 
               style="left: 61.25%; top: 28.6%;" 
               data-loc-id="patan-north" 
               role="button" 
               tabindex="0" 
               aria-label="Patan and Rani ki Vav Waypoint">
            <div class="waypoint-beacon-ring"></div>
            <div class="waypoint-marker-shield anim-glow-aura">
              <span class="waypoint-icon">🧵</span>
              ${isPatanExplored ? '<div class="pin-check-badge">✓</div>' : ''}
            </div>
            <div class="waypoint-tooltip">
              <div class="tooltip-header">
                <span class="tooltip-badge">NORTH GUJARAT</span>
                <span class="tooltip-xp">${isPatanExplored ? '✓ EXPLORED' : '+50 XP'}</span>
              </div>
              <div class="tooltip-title">Patan & Rani ki Vav</div>
              <div class="tooltip-sub">${isPatanExplored ? 'Stepwell & Silk Mastered' : 'Stepwell & Royal Patola Silk'}</div>
            </div>
          </div>

          <!-- Pin 3: Ahmedabad Heritage & Sabarmati -->
          <div class="waypoint-pin ${this.selectedLocationId === 'ahmedabad-central' ? 'active' : ''} ${isAhmedabadExplored ? 'explored' : ''}" 
               style="left: 64.35%; top: 49.3%;" 
               data-loc-id="ahmedabad-central" 
               role="button" 
               tabindex="0" 
               aria-label="Ahmedabad Heritage and Sabarmati Waypoint">
            <div class="waypoint-beacon-ring"></div>
            <div class="waypoint-marker-shield anim-glow-aura">
              <span class="waypoint-icon">🏛️</span>
              ${isAhmedabadExplored ? '<div class="pin-check-badge">✓</div>' : ''}
            </div>
            <div class="waypoint-tooltip">
              <div class="tooltip-header">
                <span class="tooltip-badge">CENTRAL GUJARAT</span>
                <span class="tooltip-xp">${isAhmedabadExplored ? '✓ EXPLORED' : '+50 XP'}</span>
              </div>
              <div class="tooltip-title">Ahmedabad Heritage</div>
              <div class="tooltip-sub">${isAhmedabadExplored ? 'Pols & Ashram Mastered' : 'UNESCO City & Sabarmati Ashram'}</div>
            </div>
          </div>

          <!-- Pin 4: Gir National Park & Saurashtra -->
          <div class="waypoint-pin ${this.selectedLocationId === 'gir-saurashtra' ? 'active' : ''} ${isGirExplored ? 'explored' : ''}" 
               style="left: 36.85%; top: 73.6%;" 
               data-loc-id="gir-saurashtra" 
               role="button" 
               tabindex="0" 
               aria-label="Gir National Park and Saurashtra Waypoint">
            <div class="waypoint-beacon-ring"></div>
            <div class="waypoint-marker-shield anim-glow-aura">
              <span class="waypoint-icon">🦁</span>
              ${isGirExplored ? '<div class="pin-check-badge">✓</div>' : ''}
            </div>
            <div class="waypoint-tooltip">
              <div class="tooltip-header">
                <span class="tooltip-badge">SAURASHTRA</span>
                <span class="tooltip-xp">${isGirExplored ? '✓ EXPLORED' : '+50 XP'}</span>
              </div>
              <div class="tooltip-title">Gir National Park</div>
              <div class="tooltip-sub">${isGirExplored ? 'Lion Sanctuary Mastered' : 'Asiatic Lion Refuge & Somnath'}</div>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  bindEvents() {
    // Click on SVG Regional paths
    const regionPaths = this.container.querySelectorAll('.zone-region-path[data-loc-id]');
    regionPaths.forEach(path => {
      path.addEventListener('click', (e) => {
        const locId = e.currentTarget.getAttribute('data-loc-id');
        this.selectLocation(locId, true);
      });
    });

    // Click on Interactive Waypoint Pins
    const waypointPins = this.container.querySelectorAll('.waypoint-pin');
    waypointPins.forEach(pin => {
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        const locId = e.currentTarget.getAttribute('data-loc-id');
        this.selectLocation(locId, true);
      });

      // Keyboard Accessibility
      pin.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const locId = e.currentTarget.getAttribute('data-loc-id');
          this.selectLocation(locId, true);
        }
      });
    });
  }

  selectLocation(locationId, playSound = false) {
    const location = getLocationById(locationId);
    if (!location) return;

    this.selectedLocationId = locationId;
    playerState.setSelectedGujaratLocation(locationId);

    if (playSound) soundFx.playChime();

    // Update active SVG zone region
    const allPaths = this.container.querySelectorAll('.zone-region-path');
    allPaths.forEach(p => p.classList.remove('active-zone'));
    const activePath = this.container.querySelector(`.zone-region-path[data-loc-id="${locationId}"]`);
    if (activePath) activePath.classList.add('active-zone');

    // Update active Waypoint Pin
    const allPins = this.container.querySelectorAll('.waypoint-pin');
    allPins.forEach(pin => {
      if (pin.getAttribute('data-loc-id') === locationId) {
        pin.classList.add('active');
      } else {
        pin.classList.remove('active');
      }
    });

    this.renderDeckPanel(location);
  }

  renderDeckPanel(location) {
    if (!this.deckPanel || !location) return;

    const isExplored = playerState.isLocationExplored(location.id);
    const isStoryDone = playerState.isStoryCompleted(location.id);

    this.deckPanel.innerHTML = `
      <div class="location-deck-header">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div class="loc-region-pill">
            <span>📍</span> ${location.region}
          </div>
          ${isExplored 
            ? '<span class="badge-playable" style="background: rgba(16, 185, 129, 0.2); border-color: #10B981; color: #34D399; font-size: 0.65rem;">✓ Explored & Mapped</span>' 
            : '<span class="badge-playable" style="font-size: 0.65rem;">🟢 Ready to Explore</span>'}
        </div>
        <h2 class="loc-name-title">${location.name}</h2>
        <p class="loc-tagline-text">${location.tagline}</p>
      </div>

      <!-- Mira Live Cultural Tip -->
      <div class="mira-live-tip-box">
        <div class="mira-mini-avatar anim-float">
          <img src="character/mira-avatar.png" alt="Mira" class="mira-mini-avatar-img" />
        </div>
        <div class="mira-speech-bubble" style="gap: 0.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-family: var(--font-title); font-size: 0.75rem; font-weight: 700; color: var(--gold-400);">MIRA'S GUIDE NOTE</span>
            <button id="mira-deck-tts-btn" class="btn-icon" style="width: 26px; height: 26px; font-size: 0.75rem;" title="Listen to Mira">🔊</button>
          </div>
          <p class="mira-tip-content">${location.miraTip}</p>
        </div>
      </div>

      <!-- Cultural Summary -->
      <div>
        <p class="text-sm text-slate-300 leading-relaxed">${location.culturalSummary}</p>
      </div>

      <!-- 3 Regional Cultural Highlights -->
      <div>
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Regional Highlights</h4>
        <div class="space-y-1">
          ${location.pillars.map(p => `
            <div class="pillar-item" style="font-size: 0.8rem; padding: 0.35rem 0.5rem;">
              <span>${p.icon}</span>
              <div>
                <strong style="color: #E2E8F0;">${p.title}:</strong> 
                <span style="color: #94A3B8;">${p.desc}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Questline Trackers (Story, Game, Quiz, Artifact) -->
      <div>
        <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Expedition Questline</h4>
        <div class="quest-checklist">
          <div class="quest-item-card" style="border-color: ${isStoryDone ? 'var(--color-success)' : 'rgba(255, 215, 0, 0.4)'}; background: ${isStoryDone ? 'rgba(6, 78, 59, 0.3)' : 'rgba(255, 255, 255, 0.04)'};">
            <span class="quest-item-title">${isStoryDone ? '✅ Story Mastered' : '📖 Story Chapter'}</span>
            <span class="quest-item-sub">${location.questline.story.title} (+${location.questline.story.xp} XP)</span>
          </div>

          <div class="quest-item-card" style="border-color: rgba(0, 210, 196, 0.4); cursor: pointer;" id="deck-game-card">
            <span class="quest-item-title">🎮 Gujarat Expedition (Play)</span>
            <span class="quest-item-sub">Land of Legends Adventure (+100 XP)</span>
          </div>

          <div class="quest-item-card" style="border-color: rgba(255, 215, 0, 0.4); cursor: pointer;" id="deck-quiz-card">
            <span class="quest-item-title">🏆 Cultural Quiz (Playable)</span>
            <span class="quest-item-sub">${location.questline.quiz.title} (+150 XP)</span>
          </div>

          <div class="quest-item-card" style="border-color: rgba(255, 215, 0, 0.4); cursor: pointer;" id="deck-artifact-card">
            <span class="quest-item-title">🏺 Museum Collectible (View)</span>
            <span class="quest-item-sub" style="color: var(--gold-400);">${location.questline.artifact.name}</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-auto pt-3" style="display: flex; flex-direction: column; gap: 0.4rem;">
        <button id="loc-play-story-btn" class="btn btn-primary btn-shimmer-effect" style="width: 100%;">
          ${isExplored ? '🔄 Replay Story Chapter (+50 XP) →' : '📖 Discover Story Chapter (+100 XP) →'}
        </button>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem;">
          <button id="loc-play-game-btn" class="btn btn-secondary" style="font-size: 0.82rem; padding: 0.6rem 0.5rem;">
            🎮 Expedition Game
          </button>
          <button id="loc-play-quiz-btn" class="btn btn-outline" style="font-size: 0.82rem; padding: 0.6rem 0.5rem; border-color: var(--gold-400); color: var(--gold-300);">
            🏆 Take Quiz
          </button>
        </div>
      </div>
    `;

    // Bind Deck Actions
    const playStoryBtn = this.deckPanel.querySelector('#loc-play-story-btn');
    if (playStoryBtn) {
      playStoryBtn.addEventListener('click', () => {
        soundFx.playChime();
        router.navigateTo('story', { locationId: location.id });
      });
    }

    const playGameBtn = this.deckPanel.querySelector('#loc-play-game-btn');
    const deckGameCard = this.deckPanel.querySelector('#deck-game-card');
    const handleLaunchGame = () => {
      soundFx.playChime();
      router.navigateTo('game', { locationId: location.id });
    };
    if (playGameBtn) playGameBtn.addEventListener('click', handleLaunchGame);
    if (deckGameCard) deckGameCard.addEventListener('click', handleLaunchGame);

    const playQuizBtn = this.deckPanel.querySelector('#loc-play-quiz-btn');
    const deckQuizCard = this.deckPanel.querySelector('#deck-quiz-card');
    const handleLaunchQuiz = () => {
      soundFx.playChime();
      router.navigateTo('quiz', { locationId: 'gujarat-master' });
    };
    if (playQuizBtn) playQuizBtn.addEventListener('click', handleLaunchQuiz);
    if (deckQuizCard) deckQuizCard.addEventListener('click', handleLaunchQuiz);

    const deckArtifactCard = this.deckPanel.querySelector('#deck-artifact-card');
    if (deckArtifactCard) {
      deckArtifactCard.addEventListener('click', () => {
        soundFx.playChime();
        router.navigateTo('museum');
      });
    }

    const ttsBtn = this.deckPanel.querySelector('#mira-deck-tts-btn');
    if (ttsBtn) {
      ttsBtn.addEventListener('click', () => {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(location.miraTip);
          utterance.rate = 1.0;
          utterance.pitch = 1.1;
          window.speechSynthesis.speak(utterance);
        } else {
          soundFx.playChime();
        }
      });
    }
  }

  // 100% Gujarat Exploration & Rajasthan Unlock Celebration Trigger
  checkAndTriggerRajasthanUnlock() {
    const progress = playerState.getGujaratExplorationProgress();
    if (progress.isCompleted && !progress.rajasthanUnlockShown) {
      setTimeout(() => {
        this.showRajasthanUnlockCelebration();
      }, 500);
    }
  }

  showRajasthanUnlockCelebration() {
    playerState.setRajasthanUnlockShown(true);
    soundFx.playLevelUpFanfare();

    modal.show({
      title: '✨ GUJARAT 100% EXPLORED! ✨',
      subtitle: 'All 4 Regional Destinations Discovered',
      badgeHtml: '<span class="badge-playable" style="background: linear-gradient(135deg, #D96B27, #FFD700); color: #000; font-weight: 800;">🏆 STATE CONQUERED</span>',
      contentHtml: `
        <div class="rajasthan-unlock-modal-content">
          
          <div class="unlock-emblem-wrap anim-float">
            <div class="unlock-palace-orb">🏰</div>
          </div>

          <div class="unlock-headline-group">
            <span class="unlock-tag">✨ NEW STATE UNLOCKED ✨</span>
            <h3 class="unlock-title">RAJASTHAN</h3>
            <p class="unlock-tagline">Land of Kings, Fortresses & Thar Desert Caravans</p>
          </div>

          <p class="unlock-desc">
            Magnificent exploration, Yatri! Because you thoroughly explored all 4 destinations of Gujarat (<strong>Kutch, Patan, Ahmedabad, and Gir</strong>), the royal state of <strong>Rajasthan</strong> is now permanently unlocked on your India Map!
          </p>

          <div class="unlock-features-grid">
            <div class="unlock-feat-pill">
              <span>🏰</span> <strong>Desert Forts</strong>
            </div>
            <div class="unlock-feat-pill">
              <span>🐪</span> <strong>Thar Caravans</strong>
            </div>
            <div class="unlock-feat-pill">
              <span>🎭</span> <strong>Kathputli Puppets</strong>
            </div>
          </div>

          <p class="unlock-reward-note">
            ⚡ <strong>+200 Exploration XP Awarded!</strong> Proceed to the National Map to view your newly unlocked state.
          </p>

        </div>
      `,
      primaryBtnText: '🗺️ View Rajasthan on India Map →',
      secondaryBtnText: 'Stay in Gujarat Hub',
      onPrimary: () => {
        soundFx.playChime();
        router.navigateTo('map');
      }
    });
  }
}
