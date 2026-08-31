// js/screens/GujaratIntroScreen.js - Gujarat introduction sequence & Mira guide character introduction

import { playerState } from '../state/playerState.js';
import { soundFx } from '../utils/audio.js';
import { router } from '../utils/router.js';

export class GujaratIntroScreen {
  constructor() {
    this.screenEl = null;
    this.currentStep = 0;
    this.dialogueSteps = [];
  }

  init() {
    this.screenEl = document.getElementById('screen-gujarat-intro');
    this.render();
  }

  render() {
    if (!this.screenEl) return;

    const state = playerState.getState();
    const playerName = state.name || 'Yatri';

    this.dialogueSteps = [
      {
        stepLabel: 'STEP 1 • GREETING',
        text: `Kem Cho, <strong>${playerName}</strong>! I am <strong>Mira</strong>, your cultural explorer companion across Gujarat. Welcome to the land of legends, lions, and timeless artisanal mastery!`,
        actionText: 'Tell Me More →',
        showLaunch: false
      },
      {
        stepLabel: 'STEP 2 • REGIONAL OVERVIEW',
        text: `We have mapped <strong>4 legendary heritage zones</strong> for you: The Moonlit White Rann of Kutch, the wild Gir Forest, UNESCO-heritage Ahmedabad, and the architectural wonder of Patan.`,
        actionText: 'What is Our Mission? →',
        showLaunch: false
      },
      {
        stepLabel: 'STEP 3 • EXPEDITION MISSION',
        text: `In each zone, you will unlock deep cultural stories, play regional mini-games, conquer knowledge quizzes, and claim rare artifacts for the <strong>Bharat Heritage Museum</strong>!`,
        actionText: 'Launch Gujarat Map 🗺️',
        showLaunch: true
      }
    ];

    this.screenEl.innerHTML = `
      <div class="gujarat-intro-layout">
        
        <!-- Breadcrumb / Back Navigation -->
        <nav class="breadcrumb-nav" aria-label="Breadcrumb">
          <button id="gujarat-back-to-india-btn" class="breadcrumb-btn" aria-label="Back to India Map">
            <span>←</span> Back to India Map
          </button>
          <span>/</span>
          <span style="color: #F8FAFC; font-weight: 700;">Gujarat Introduction</span>
        </nav>

        <!-- Gujarat Hero Banner -->
        <div class="gujarat-hero-banner glass-panel">
          <div class="gujarat-title-row">
            <div>
              <span class="badge-playable" style="margin-bottom: 0.5rem;">🌟 PLAYABLE STATE EXPEDITION</span>
              <h1 class="gujarat-main-title">Gujarat: Land of Legends</h1>
              <p class="gujarat-subtitle">Capital: Gandhinagar • Gateway to the Arabian Sea</p>
            </div>
            <div style="text-align: right;">
              <div style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 700; color: var(--color-royal-gold);">
                4 EXPLORATION ZONES
              </div>
              <div style="font-size: 0.75rem; color: #94A3B8;">12 Collectibles to Discover</div>
            </div>
          </div>
          <p style="font-size: 0.92rem; color: #CBD5E1; max-width: 800px; line-height: 1.6; margin-top: 0.5rem;">
            From the world's sole wild refuge of Asiatic lions in the Gir forest to the dazzling silver salt crust of the Great Rann, Gujarat stands as an epic intersection of ancient seafaring trade, sacred stepwell architecture, and vibrant festive traditions.
          </p>
        </div>

        <!-- MIRA Cultural Guide Interactive Dialogue Box -->
        <div class="mira-dialog-container glass-panel">
          <div class="mira-avatar-card">
            <div class="mira-avatar-orb anim-glow-aura">
              <span>🪔</span>
              <div class="mira-badge-online" title="Mira is Online & Ready"></div>
            </div>
            <div class="mira-name-tag">Mira</div>
            <div class="mira-role-tag">Heritage Guide</div>
          </div>

          <div class="mira-speech-bubble">
            <div class="mira-speech-header">
              <span id="mira-step-label" class="mira-speech-step">STEP 1 • GREETING</span>
              <button id="mira-tts-btn" class="btn-icon" style="width: 32px; height: 32px; font-size: 0.85rem;" title="Listen to Mira">
                🔊
              </button>
            </div>
            
            <div id="mira-speech-text" class="mira-speech-text">
              ${this.dialogueSteps[0].text}
            </div>

            <div class="mira-speech-actions">
              <div style="display: flex; gap: 0.5rem;">
                <button id="mira-prev-btn" class="btn btn-outline" style="padding: 0.4rem 0.85rem; font-size: 0.8rem; display: none;">
                  ← Prev
                </button>
                <button id="mira-next-btn" class="btn btn-secondary" style="padding: 0.4rem 1rem; font-size: 0.85rem;">
                  Tell Me More →
                </button>
              </div>

              <button id="mira-enter-map-btn" class="btn btn-primary btn-shimmer-effect" style="padding: 0.6rem 1.5rem; font-size: 0.9rem;">
                Enter Gujarat Map →
              </button>
            </div>
          </div>
        </div>

        <!-- 4 Cultural Highlights Grid -->
        <div>
          <h3 style="font-family: var(--font-title); font-size: 1.1rem; font-weight: 700; color: #FFFFFF; margin-bottom: 0.75rem;">
            Explore the 4 Cultural Pillars of Gujarat
          </h3>

          <div class="gujarat-pillars-grid">
            <div class="pillar-card">
              <span class="pillar-card-icon">🏛️</span>
              <h4 class="pillar-card-title">Ancient Architecture</h4>
              <p class="pillar-card-desc">7-level subterranean Rani ki Vav stepwell & sacred Modhera Sun Temple.</p>
            </div>

            <div class="pillar-card">
              <span class="pillar-card-icon">🦁</span>
              <h4 class="pillar-card-title">Wildlife & Sanctuary</h4>
              <p class="pillar-card-desc">Sole global habitat of Asiatic Lions in Gir & Wild Ass in the Little Rann.</p>
            </div>

            <div class="pillar-card">
              <span class="pillar-card-icon">🧵</span>
              <h4 class="pillar-card-title">Living Artisanal Crafts</h4>
              <p class="pillar-card-desc">300-year-old Nirona Rogan art, Patan double-ikkat Patola & Bandhani tie-dye.</p>
            </div>

            <div class="pillar-card">
              <span class="pillar-card-icon">🍲</span>
              <h4 class="pillar-card-title">Culinary Traditions</h4>
              <p class="pillar-card-desc">Festive 5-course Gujarati Thali, steaming Dhokla, Thepla, and Undhiyu.</p>
            </div>
          </div>
        </div>

      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Back to India Map
    const backBtn = this.screenEl.querySelector('#gujarat-back-to-india-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        soundFx.playClick();
        router.navigateTo('map');
      });
    }

    // Mira Dialogue Actions
    const nextBtn = this.screenEl.querySelector('#mira-next-btn');
    const prevBtn = this.screenEl.querySelector('#mira-prev-btn');
    const enterMapBtn = this.screenEl.querySelector('#mira-enter-map-btn');
    const ttsBtn = this.screenEl.querySelector('#mira-tts-btn');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        soundFx.playClick();
        if (this.currentStep < this.dialogueSteps.length - 1) {
          this.currentStep++;
          this.updateDialogue();
        } else {
          this.navigateToMap();
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        soundFx.playClick();
        if (this.currentStep > 0) {
          this.currentStep--;
          this.updateDialogue();
        }
      });
    }

    if (enterMapBtn) {
      enterMapBtn.addEventListener('click', () => {
        soundFx.playChime();
        this.navigateToMap();
      });
    }

    if (ttsBtn) {
      ttsBtn.addEventListener('click', () => {
        this.speakMiraDialogue();
      });
    }
  }

  updateDialogue() {
    const step = this.dialogueSteps[this.currentStep];
    const labelEl = this.screenEl.querySelector('#mira-step-label');
    const textEl = this.screenEl.querySelector('#mira-speech-text');
    const nextBtn = this.screenEl.querySelector('#mira-next-btn');
    const prevBtn = this.screenEl.querySelector('#mira-prev-btn');

    if (labelEl) labelEl.textContent = step.stepLabel;
    if (textEl) textEl.innerHTML = step.text;
    if (nextBtn) nextBtn.textContent = step.actionText;

    if (prevBtn) {
      prevBtn.style.display = this.currentStep > 0 ? 'inline-flex' : 'none';
    }
  }

  speakMiraDialogue() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const step = this.dialogueSteps[this.currentStep];
      const cleanText = step.text.replace(/<[^>]*>?/gm, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    } else {
      soundFx.playChime();
    }
  }

  navigateToMap() {
    router.navigateTo('gujarat-map');
  }

  onEnter() {
    this.currentStep = 0;
    this.render();
  }

  onLeave() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const gujaratIntroScreen = new GujaratIntroScreen();
