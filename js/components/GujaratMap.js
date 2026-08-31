// js/components/GujaratMap.js - Interactive Gujarat Regional SVG Map & Location Deck component

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
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="gujarat-svg-viewport">
        <!-- Gujarat Regional Vector SVG Map -->
        <svg class="gujarat-regional-svg" viewBox="0 0 700 650" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gujarat Regional Map">
          <defs>
            <radialGradient id="kutchGrad" cx="40%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#334155" />
              <stop offset="100%" stop-color="#1E293B" />
            </radialGradient>
            <radialGradient id="saurashtraGrad" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stop-color="#1E3A5F" />
              <stop offset="100%" stop-color="#0F172A" />
            </radialGradient>
            <filter id="zoneGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <!-- 1. KUTCH REGION (North-West Desert & Salt Flats) -->
          <path class="zone-path" data-loc-id="kutch"
            d="M 60,180 L 140,110 L 260,95 L 340,135 L 360,195 L 305,230 L 220,225 L 140,265 L 75,250 Z" 
            title="Great Rann of Kutch" />

          <!-- 2. PATAN & NORTH GUJARAT -->
          <path class="zone-path" data-loc-id="patan-north"
            d="M 340,135 L 420,100 L 490,140 L 485,240 L 415,260 L 360,195 Z" 
            title="Patan & Rani ki Vav" />

          <!-- 3. AHMEDABAD & CENTRAL GUJARAT -->
          <path class="zone-path" data-loc-id="ahmedabad-central"
            d="M 415,260 L 485,240 L 560,280 L 540,410 L 460,430 L 410,360 L 360,310 Z" 
            title="Ahmedabad Heritage City & Sabarmati" />

          <!-- 4. SAURASHTRA & GIR FOREST (Kathiawar Peninsula) -->
          <path class="zone-path" data-loc-id="gir-saurashtra"
            d="M 140,265 L 220,225 L 305,230 L 360,310 L 410,360 L 370,480 L 285,550 L 180,510 L 130,410 L 145,330 Z" 
            title="Gir National Park & Saurashtra" />

          <!-- Gulf of Kutch Waters Indicator -->
          <path d="M 140,265 Q 220,270 280,240 Q 230,290 145,330 Z" fill="rgba(0, 210, 196, 0.15)" stroke="rgba(0, 210, 196, 0.3)" stroke-width="1" />
          
          <!-- Gulf of Khambhat Waters Indicator -->
          <path d="M 360,310 Q 410,370 420,440 Q 380,420 370,360 Z" fill="rgba(0, 210, 196, 0.15)" stroke="rgba(0, 210, 196, 0.3)" stroke-width="1" />
        </svg>

        <!-- Interactive Location Markers Overlay -->
        <div class="gujarat-pins-overlay">
          ${GUJARAT_LOCATIONS.map(loc => `
            <div class="gujarat-loc-pin ${loc.id === this.selectedLocationId ? 'active' : ''}" 
                 style="left: ${loc.coordinates.x}%; top: ${loc.coordinates.y}%;" 
                 data-loc-id="${loc.id}" 
                 role="button" 
                 tabindex="0"
                 aria-label="${loc.name}">
              <div class="loc-pin-icon-wrap anim-glow-aura">
                <span>${loc.icon}</span>
                <div class="pin-radar-ring anim-radar"></div>
              </div>
              <div class="loc-pin-badge">${loc.name}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Click on SVG Zone paths
    const paths = this.container.querySelectorAll('.zone-path[data-loc-id]');
    paths.forEach(path => {
      path.addEventListener('click', (e) => {
        const locId = e.currentTarget.getAttribute('data-loc-id');
        this.selectLocation(locId, true);
      });
    });

    // Click on POI Pins
    const pins = this.container.querySelectorAll('.gujarat-loc-pin');
    pins.forEach(pin => {
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        const locId = e.currentTarget.getAttribute('data-loc-id');
        this.selectLocation(locId, true);
      });
    });
  }

  selectLocation(locationId, playSound = false) {
    const location = getLocationById(locationId);
    if (!location) return;

    this.selectedLocationId = locationId;
    playerState.setSelectedGujaratLocation(locationId);

    if (playSound) soundFx.playChime();

    // Update active zone path
    const allPaths = this.container.querySelectorAll('.zone-path');
    allPaths.forEach(p => p.classList.remove('active-zone'));
    const activePath = this.container.querySelector(`.zone-path[data-loc-id="${locationId}"]`);
    if (activePath) activePath.classList.add('active-zone');

    // Update active pin
    const allPins = this.container.querySelectorAll('.gujarat-loc-pin');
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

    const state = playerState.getState();
    const isVisited = state.visitedLocations && state.visitedLocations.includes(location.id);
    const isStoryDone = playerState.isStoryCompleted(location.id);

    this.deckPanel.innerHTML = `
      <div class="location-deck-header">
        <div class="loc-region-pill">
          <span>📍</span> ${location.region}
        </div>
        <h2 class="loc-name-title">${location.name}</h2>
        <p class="loc-tagline-text">${location.tagline}</p>
      </div>

      <!-- Mira Live Cultural Tip -->
      <div class="mira-live-tip-box">
        <div class="mira-mini-avatar anim-float">🪔</div>
        <div class="mira-speech-bubble" style="gap: 0.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-family: var(--font-title); font-size: 0.75rem; font-weight: 700; color: var(--color-royal-gold);">MIRA'S GUIDE NOTE</span>
            <button id="mira-deck-tts-btn" class="btn-icon" style="width: 26px; height: 26px; font-size: 0.75rem;" title="Listen to Mira">🔊</button>
          </div>
          <p class="mira-tip-content">${location.miraTip}</p>
        </div>
      </div>

      <!-- Cultural Summary -->
      <div>
        <p class="text-sm text-slate-300 leading-relaxed">${location.culturalSummary}</p>
      </div>

      <!-- 4 Cultural Pillars Checklist -->
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
            <span class="quest-item-title">🎮 Mini-Game (Playable)</span>
            <span class="quest-item-sub">${location.questline.miniGame.title} (+100 XP)</span>
          </div>

          <div class="quest-item-card" style="border-color: rgba(255, 215, 0, 0.4); cursor: pointer;" id="deck-quiz-card">
            <span class="quest-item-title">🏆 Cultural Quiz (Playable)</span>
            <span class="quest-item-sub">${location.questline.quiz.title} (+150 XP)</span>
          </div>

          <div class="quest-item-card">
            <span class="quest-item-title">🏺 Museum Collectible</span>
            <span class="quest-item-sub" style="color: var(--color-royal-gold);">${location.questline.artifact.name}</span>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-auto pt-3" style="display: flex; flex-direction: column; gap: 0.4rem;">
        <button id="loc-play-story-btn" class="btn btn-primary btn-shimmer-effect" style="width: 100%;">
          ${isStoryDone ? '🔄 Replay Story (+100 XP) →' : '📖 Discover Story (+100 XP) →'}
        </button>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem;">
          <button id="loc-play-game-btn" class="btn btn-secondary" style="font-size: 0.82rem; padding: 0.6rem 0.5rem;">
            🎮 Mini-Game
          </button>
          <button id="loc-play-quiz-btn" class="btn btn-outline" style="font-size: 0.82rem; padding: 0.6rem 0.5rem; border-color: var(--color-royal-gold); color: var(--color-royal-gold);">
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

  handleStartExpedition(location) {
    const xpReward = 50;
    playerState.visitGujaratLocation(location.id);
    playerState.addXP(xpReward);
    soundFx.playChime();

    modal.show({
      title: `${location.name} Expedition Ready! 🌟`,
      subtitle: `+${xpReward} Exploration XP Awarded`,
      badgeHtml: '<span class="badge-playable">🗺️ EXPEDITION ACTIVE</span>',
      contentHtml: `
        <div class="space-y-3">
          <p class="text-sm text-slate-200">
            Welcome to <strong>${location.name}</strong>! Mira has prepared your interactive cultural story chapter.
          </p>

          <div class="bg-slate-800/80 p-3 rounded-lg border border-slate-700 space-y-2 text-xs">
            <div class="flex items-center gap-2 text-amber-300">
              <span>📖</span> <strong>Story:</strong> ${location.questline.story.title} (+100 XP)
            </div>
            <div class="flex items-center gap-2 text-cyan-300">
              <span>🎮</span> <strong>Mini-Game:</strong> ${location.questline.miniGame.title}
            </div>
            <div class="flex items-center gap-2 text-emerald-300">
              <span>🏆</span> <strong>Quiz:</strong> ${location.questline.quiz.title}
            </div>
            <div class="flex items-center gap-2 text-pink-300">
              <span>🏺</span> <strong>Artifact Reward:</strong> ${location.questline.artifact.name}
            </div>
          </div>

          <p class="text-xs text-slate-400">
            Total Exploration XP: <strong>${playerState.getState().totalXP} XP</strong>. Step into the story cards to begin interactive learning!
          </p>
        </div>
      `,
      primaryBtnText: '📖 Launch Story Chapter (+100 XP) →',
      secondaryBtnText: 'Stay on Map',
      onPrimary: () => {
        router.navigateTo('story', { locationId: location.id });
      },
      onSecondary: () => {
        this.renderDeckPanel(location);
      }
    });
  }
}
