// js/screens/MuseumScreen.js - Cultural Museum & Heritage Reward Vault Controller

import { modal } from '../components/Modal.js';
import { getMuseumArtifacts, isArtifactUnlocked } from '../data/museumData.js';
import { playerState } from '../state/playerState.js';
import { soundFx } from '../utils/audio.js';
import { router } from '../utils/router.js';

export class MuseumScreen {
  constructor() {
    this.screenEl = null;
    this.activeCategory = 'All';
    this.artifacts = [];
  }

  init() {
    this.screenEl = document.getElementById('screen-museum');
  }

  onEnter() {
    this.artifacts = getMuseumArtifacts();
    this.render();
  }

  onLeave() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  render() {
    if (!this.screenEl) return;

    const state = playerState.getState();
    const categories = ['All', 'Crafts & Textiles', 'Wildlife & Nature', 'Freedom & History', 'Royal Antiquities'];

    // Filter artifacts by category
    const filteredArtifacts = this.activeCategory === 'All'
      ? this.artifacts
      : this.artifacts.filter(a => a.category === this.activeCategory);

    // Calculate museum completion metrics
    const totalCount = this.artifacts.length;
    const unlockedCount = this.artifacts.filter(a => isArtifactUnlocked(a, state)).length;
    const completionPercent = Math.round((unlockedCount / totalCount) * 100);

    this.screenEl.innerHTML = `
      <div class="museum-screen-layout">
        
        <!-- Header & Breadcrumb Nav -->
        <div class="flex justify-between items-center">
          <nav class="breadcrumb-nav" aria-label="Breadcrumb">
            <button id="museum-back-gujarat-btn" class="breadcrumb-btn" aria-label="Back to Gujarat Map">
              <span>←</span> Gujarat Hub
            </button>
            <span>/</span>
            <span style="color: #F8FAFC; font-weight: 700;">Cultural Museum Vault</span>
          </nav>

          <span class="badge-playable">🏛️ BHARATVERSE STATE GALLERY</span>
        </div>

        <!-- Grand Pavilion Hero Banner -->
        <div class="museum-header-banner">
          <div class="museum-title-group">
            <div class="museum-vault-icon anim-float">🏛️</div>
            <div>
              <h1 class="museum-main-title">Gujarat Heritage Pavilion</h1>
              <p class="museum-sub-title">Explore authentic cultural relics and master artisan heirlooms unlocked through your exploration.</p>
            </div>
          </div>

          <!-- Progress / Collection Indicator -->
          <div class="museum-completion-box">
            <div class="flex justify-between items-center text-xs font-mono">
              <span class="text-amber-300 font-bold">GALLERY CURATION</span>
              <span class="text-white font-bold">${unlockedCount} / ${totalCount} (${completionPercent}%)</span>
            </div>
            <div class="museum-progress-bar-track">
              <div class="museum-progress-bar-fill" style="width: ${completionPercent}%;"></div>
            </div>
            <div style="font-size: 0.7rem; color: #94A3B8; text-align: right;">
              ${completionPercent === 100 ? '👑 Master Curator of Gujarat' : `${totalCount - unlockedCount} relics waiting to be unlocked`}
            </div>
          </div>
        </div>

        <!-- Category Filter Tabs -->
        <div class="museum-filter-tabs" role="tablist">
          ${categories.map(cat => `
            <button class="museum-tab-btn ${this.activeCategory === cat ? 'active' : ''}" 
                    data-category="${cat}"
                    role="tab"
                    aria-selected="${this.activeCategory === cat}">
              ${cat}
            </button>
          `).join('')}
        </div>

        <!-- Exhibition Grid -->
        <div class="museum-artifacts-grid">
          ${filteredArtifacts.map(artifact => {
            const unlocked = isArtifactUnlocked(artifact, state);

            return `
              <div class="artifact-card ${unlocked ? 'unlocked' : 'locked'}" 
                   data-artifact-id="${artifact.id}"
                   role="button"
                   tabindex="0"
                   aria-label="${artifact.name} (${unlocked ? 'Unlocked' : 'Locked'})">
                
                <!-- Pedestal -->
                <div class="artifact-pedestal" style="${unlocked ? `border-color: ${artifact.rarityColor}; box-shadow: 0 0 20px ${artifact.rarityColor}40;` : ''}">
                  <span>${artifact.icon}</span>
                  ${!unlocked ? '<div class="artifact-lock-overlay">🔒</div>' : ''}
                </div>

                <!-- Rarity Badge -->
                <span class="artifact-rarity-badge" style="background: ${unlocked ? artifact.rarityColor + '20' : 'rgba(255,255,255,0.1)'}; color: ${unlocked ? artifact.rarityColor : '#94A3B8'}; border: 1px solid ${unlocked ? artifact.rarityColor + '50' : 'rgba(255,255,255,0.2)'};">
                  ${artifact.rarity}
                </span>

                <!-- Title & Location -->
                <div>
                  <h3 class="artifact-name">${unlocked ? artifact.name : 'Unknown Cultural Relic'}</h3>
                  <p class="artifact-location">📍 ${artifact.locationName}</p>
                </div>

                <!-- Description / Unlock Hint -->
                ${unlocked ? `
                  <p class="artifact-desc-snippet">${artifact.shortDesc}</p>
                  <button class="btn btn-outline" style="width: 100%; font-size: 0.78rem; padding: 0.4rem; margin-top: auto; border-color: ${artifact.rarityColor}; color: ${artifact.rarityColor};">
                    🔍 Inspect Exhibit Lore →
                  </button>
                ` : `
                  <div class="artifact-unlock-hint">
                    🔒 <strong>Locked:</strong> ${artifact.unlockCondition.description}
                  </div>
                  <button class="btn btn-secondary" style="width: 100%; font-size: 0.78rem; padding: 0.4rem; margin-top: auto;">
                    🎯 View Unlock Quest
                  </button>
                `}

              </div>
            `;
          }).join('')}
        </div>

      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Back navigation
    const backBtn = this.screenEl.querySelector('#museum-back-gujarat-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        soundFx.playClick();
        router.navigateTo('gujarat-map');
      });
    }

    // Category filter tabs
    const tabBtns = this.screenEl.querySelectorAll('.museum-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        soundFx.playClick();
        this.activeCategory = e.currentTarget.getAttribute('data-category');
        this.render();
      });
    });

    // Artifact card clicks
    const artifactCards = this.screenEl.querySelectorAll('.artifact-card');
    artifactCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const artifactId = e.currentTarget.getAttribute('data-artifact-id');
        this.handleArtifactClick(artifactId);
      });
    });
  }

  handleArtifactClick(artifactId) {
    const artifact = this.artifacts.find(a => a.id === artifactId);
    if (!artifact) return;

    const state = playerState.getState();
    const unlocked = isArtifactUnlocked(artifact, state);

    if (unlocked) {
      soundFx.playChime();
      this.showArtifactDetailModal(artifact);
    } else {
      soundFx.playLockedBuzz();
      this.showLockedArtifactModal(artifact);
    }
  }

  showArtifactDetailModal(artifact) {
    modal.show({
      title: `${artifact.name} ${artifact.icon}`,
      subtitle: `${artifact.category} • ${artifact.era}`,
      badgeHtml: `<span class="badge-playable" style="background: ${artifact.rarityColor}25; border-color: ${artifact.rarityColor}; color: ${artifact.rarityColor};">✨ ${artifact.rarity.toUpperCase()} COLLECTIBLE</span>`,
      contentHtml: `
        <div class="artifact-modal-showcase">
          
          <div class="modal-artifact-icon-glow anim-float">
            <span>${artifact.icon}</span>
          </div>

          <div style="text-align: left; line-height: 1.6; color: #E2E8F0; font-size: 0.9rem;">
            ${artifact.fullLore}
          </div>

          <div class="modal-artifact-provenance-box">
            <div>
              <span class="text-slate-400 font-mono">ORIGIN & PROVENANCE:</span>
              <div class="font-bold text-white">${artifact.provenance}</div>
            </div>
            <div>
              <span class="text-slate-400 font-mono">HISTORICAL PERIOD:</span>
              <div class="font-bold text-amber-300">${artifact.era}</div>
            </div>
          </div>

          <div class="modal-fun-fact-box">
            <strong>💡 Did You Know?</strong> ${artifact.funFact}
          </div>

        </div>
      `,
      primaryBtnText: '🔊 Listen to Mira\'s Audio Lore',
      secondaryBtnText: 'Return to Gallery',
      onPrimary: () => {
        this.speakText(`${artifact.name}. ${artifact.fullLore}`);
      }
    });
  }

  showLockedArtifactModal(artifact) {
    modal.show({
      title: `Locked Heritage Relic 🔒`,
      subtitle: `Requires Exploration Unlock`,
      badgeHtml: `<span class="badge-locked">LOCKED • ${artifact.rarity.toUpperCase()}</span>`,
      contentHtml: `
        <div class="space-y-3 text-left">
          <p class="text-sm text-slate-200">
            This cultural artifact is locked inside the royal pavilion vault. Complete the corresponding regional activity to acquire it for your permanent museum collection.
          </p>

          <div class="bg-slate-800/80 p-3 rounded-lg border border-amber-500/40 text-xs space-y-1">
            <div class="text-amber-400 font-bold">🎯 UNLOCK REQUIREMENT:</div>
            <div class="text-white text-sm">${artifact.unlockCondition.description}</div>
            <div class="text-slate-400 pt-1">Location: <strong>${artifact.locationName}</strong></div>
          </div>

          <p class="text-xs text-slate-400">
            Total Player XP: <strong>${playerState.getState().totalXP} XP</strong>. Step back into the Gujarat map to undertake this quest!
          </p>
        </div>
      `,
      primaryBtnText: '🗺️ Go to Gujarat Map Quest →',
      secondaryBtnText: 'Stay in Museum',
      onPrimary: () => {
        router.navigateTo('gujarat-map');
      }
    });
  }

  speakText(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    } else {
      soundFx.playChime();
    }
  }
}

export const museumScreen = new MuseumScreen();
