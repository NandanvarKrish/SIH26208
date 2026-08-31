// js/screens/MiniGameScreen.js - Educational Heritage Puzzle Mini-Game Orchestrator

import { getMiniGameByLocationId } from '../data/miniGamesData.js';
import { playerState } from '../state/playerState.js';
import { soundFx } from '../utils/audio.js';
import { router } from '../utils/router.js';

export class MiniGameScreen {
  constructor() {
    this.screenEl = null;
    this.locationId = 'ahmedabad-central';
    this.config = null;
    this.placements = {}; // slotId -> itemId
    this.selectedItemId = null;
    this.score = 0;
    this.timeLeft = 60;
    this.timerInterval = null;
    this.isCompleted = false;
  }

  init() {
    this.screenEl = document.getElementById('screen-game');
  }

  onEnter(params = {}) {
    const locId = params.locationId || playerState.getState().selectedGujaratLocationId || 'ahmedabad-central';
    this.locationId = locId;
    this.config = getMiniGameByLocationId(locId);

    this.resetGameState();
    this.render();
    this.startTimer();
  }

  onLeave() {
    this.clearTimer();
  }

  resetGameState() {
    this.clearTimer();
    this.placements = {};
    this.selectedItemId = null;
    this.score = 0;
    this.timeLeft = this.config ? this.config.timeLimitSeconds : 60;
    this.isCompleted = false;
  }

  startTimer() {
    this.clearTimer();
    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        const timerEl = this.screenEl ? this.screenEl.querySelector('#game-timer-val') : null;
        if (timerEl) timerEl.textContent = `${this.timeLeft}s`;
      } else {
        this.clearTimer();
      }
    }, 1000);
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  render() {
    if (!this.screenEl || !this.config) return;

    if (this.isCompleted) {
      this.renderVictory();
      return;
    }

    const totalSlots = this.config.slots.length;
    const filledSlotsCount = Object.keys(this.placements).length;

    this.screenEl.innerHTML = `
      <div class="game-screen-layout">
        
        <!-- Game Top HUD -->
        <div class="game-top-hud">
          <button id="game-exit-btn" class="breadcrumb-btn" aria-label="Exit Game">
            <span>←</span> Exit
          </button>

          <div class="game-hud-stat">
            <span>SCORE:</span>
            <span id="game-score-val" class="val">${this.score}</span>
          </div>

          <div class="game-hud-stat">
            <span>⏱️ TIME:</span>
            <span id="game-timer-val" class="val">${this.timeLeft}s</span>
          </div>

          <div class="game-hud-stat">
            <span>PROGRESS:</span>
            <span class="val">${filledSlotsCount}/${totalSlots}</span>
          </div>
        </div>

        <!-- Instruction Banner -->
        <div class="game-instruction-banner">
          <div style="font-size: 2rem;" class="anim-float">${this.config.icon}</div>
          <div class="game-instruction-text">
            <strong>${this.config.title}:</strong> ${this.config.instructions}
          </div>
        </div>

        <!-- The Royal Platter / Puzzle Slots Board -->
        <div class="puzzle-board-container">
          <div class="board-header">
            <h3 class="board-title">
              <span>👑</span> ${this.config.subtitle}
            </h3>
            <span class="badge-playable">Tap dish, then tap matching slot</span>
          </div>

          <div class="puzzle-slots-grid">
            ${this.config.slots.map(slot => {
              const placedItemId = this.placements[slot.id];
              const placedItem = placedItemId ? this.config.items.find(i => i.id === placedItemId) : null;
              const isFilled = Boolean(placedItem);

              return `
                <div class="puzzle-slot ${isFilled ? 'slot-filled' : ''} ${this.selectedItemId && !isFilled ? 'highlight-target' : ''}" 
                     data-slot-id="${slot.id}"
                     role="button"
                     tabindex="0"
                     aria-label="Slot: ${slot.label}">
                  
                  ${isFilled ? `
                    <button class="slot-remove-btn" data-remove-slot="${slot.id}" title="Remove dish">✕</button>
                    <div class="slot-filled-content">
                      <span class="slot-filled-icon">${placedItem.icon}</span>
                      <span class="slot-filled-name">${placedItem.name}</span>
                      <span style="font-size: 0.65rem; color: #34D399; font-weight: 700;">✓ PLACED</span>
                    </div>
                  ` : `
                    <span class="slot-label">${slot.label}</span>
                    <p class="slot-clue-text">"${slot.clue}"</p>
                    <span style="font-size: 0.68rem; color: var(--color-royal-gold); margin-top: auto;">▼ Empty Slot</span>
                  `}
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Item Tray / Kitchen Conveyor -->
        <div class="item-tray-section">
          <div class="tray-header">
            <h4 class="tray-title">
              <span>🧺</span> Available Cultural Items (Select to Place)
            </h4>
            <span style="font-size: 0.72rem; color: #94A3B8;">${this.selectedItemId ? '👉 Now tap a matching slot above' : 'Tap an item below'}</span>
          </div>

          <div class="puzzle-items-grid">
            ${this.config.items.map(item => {
              const isAlreadyPlaced = Object.values(this.placements).includes(item.id);
              const isSelected = this.selectedItemId === item.id;

              return `
                <div class="puzzle-item-card ${isSelected ? 'selected' : ''} ${isAlreadyPlaced ? 'already-placed' : ''}"
                     data-item-id="${item.id}"
                     role="button"
                     tabindex="0"
                     aria-label="Item: ${item.name}">
                  <span class="item-card-icon">${item.icon}</span>
                  <span class="item-card-name">${item.name}</span>
                  <span class="item-card-taste">${item.taste}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Exit game button
    const exitBtn = this.screenEl.querySelector('#game-exit-btn');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        soundFx.playClick();
        this.clearTimer();
        router.navigateTo('gujarat-map');
      });
    }

    // Click on Items in Tray
    const itemCards = this.screenEl.querySelectorAll('.puzzle-item-card:not(.already-placed)');
    itemCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const itemId = e.currentTarget.getAttribute('data-item-id');
        this.handleItemSelect(itemId);
      });
    });

    // Click on Slots in Board
    const slots = this.screenEl.querySelectorAll('.puzzle-slot');
    slots.forEach(slot => {
      slot.addEventListener('click', (e) => {
        // If clicking remove button, ignore slot click
        if (e.target.closest('.slot-remove-btn')) return;
        const slotId = e.currentTarget.getAttribute('data-slot-id');
        this.handleSlotClick(slotId);
      });
    });

    // Click on Remove buttons inside slots
    const removeBtns = this.screenEl.querySelectorAll('.slot-remove-btn');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const slotId = e.currentTarget.getAttribute('data-remove-slot');
        this.handleRemoveItem(slotId);
      });
    });
  }

  handleItemSelect(itemId) {
    soundFx.playClick();
    if (this.selectedItemId === itemId) {
      this.selectedItemId = null; // Deselect
    } else {
      this.selectedItemId = itemId;
    }
    this.render();
  }

  handleSlotClick(slotId) {
    if (!this.selectedItemId) {
      soundFx.playClick();
      return;
    }

    const slot = this.config.slots.find(s => s.id === slotId);
    const item = this.config.items.find(i => i.id === this.selectedItemId);

    if (!slot || !item) return;

    // Check if item matches slot
    if (slot.targetItemId === item.id) {
      // Correct placement!
      soundFx.playChime();
      this.placements[slotId] = item.id;
      this.score += 100;
      this.selectedItemId = null;

      // Check for puzzle completion
      if (Object.keys(this.placements).length === this.config.slots.length) {
        this.handleGameVictory();
        return;
      }
    } else {
      // Incorrect placement
      soundFx.playLockedBuzz();
      this.score = Math.max(0, this.score - 10);
      
      const slotEl = this.screenEl.querySelector(`.puzzle-slot[data-slot-id="${slotId}"]`);
      if (slotEl) {
        slotEl.classList.add('anim-shake');
        setTimeout(() => slotEl.classList.remove('anim-shake'), 400);
      }
    }

    this.render();
  }

  handleRemoveItem(slotId) {
    soundFx.playClick();
    if (this.placements[slotId]) {
      delete this.placements[slotId];
      this.score = Math.max(0, this.score - 50);
      this.render();
    }
  }

  handleGameVictory() {
    this.clearTimer();
    this.isCompleted = true;

    // Add speed bonus
    const speedBonus = this.timeLeft * 5;
    this.score += speedBonus;

    // Award XP, Score, and mark game completed in playerState
    playerState.recordGameCompleted(this.config.id, this.config.xpReward || 100, this.score);
    soundFx.playChime();

    this.render();
  }

  renderVictory() {
    const totalXP = playerState.getState().totalXP;

    this.screenEl.innerHTML = `
      <div class="game-screen-layout" style="justify-content: center;">
        
        <div class="game-victory-card">
          
          <div class="game-stars-row anim-float">
            <span>⭐</span>
            <span>⭐</span>
            <span>⭐</span>
          </div>

          <div>
            <span class="badge-playable" style="margin-bottom: 0.5rem;">PUZZLE MASTERED</span>
            <h2 style="font-family: var(--font-display); font-size: 2rem; color: #FFFFFF; line-height: 1.2;">
              ${this.config.title} Completed!
            </h2>
            <p style="font-size: 0.9rem; color: var(--color-peacock-light); margin-top: 0.25rem;">
              You have assembled the authentic heritage ensemble with master culinary precision.
            </p>
          </div>

          <!-- Score & XP Breakdown -->
          <div style="background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 215, 0, 0.3); border-radius: var(--border-radius-md); padding: 1rem 2rem; display: flex; gap: 2rem; text-align: center;">
            <div>
              <div style="font-size: 0.72rem; color: #94A3B8; font-family: var(--font-mono);">FINAL SCORE</div>
              <div style="font-family: var(--font-mono); font-size: 1.6rem; font-weight: 800; color: var(--color-royal-gold);">${this.score} PTS</div>
            </div>
            <div>
              <div style="font-size: 0.72rem; color: #94A3B8; font-family: var(--font-mono);">TIME REMAINING</div>
              <div style="font-family: var(--font-mono); font-size: 1.6rem; font-weight: 800; color: var(--color-peacock-light);">${this.timeLeft}s</div>
            </div>
            <div>
              <div style="font-size: 0.72rem; color: #94A3B8; font-family: var(--font-mono);">REWARD</div>
              <div style="font-family: var(--font-mono); font-size: 1.6rem; font-weight: 800; color: #34D399;">+100 XP ⚡</div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-top: 0.5rem;">
            <button id="game-replay-btn" class="btn btn-outline" style="padding: 0.75rem 1.75rem;">
              🔄 Replay / Try Again
            </button>
            
            <button id="game-return-map-btn" class="btn btn-primary btn-shimmer-effect" style="padding: 0.75rem 2rem;">
              🗺️ Continue Gujarat Yatra →
            </button>
          </div>

        </div>

      </div>
    `;

    const replayBtn = this.screenEl.querySelector('#game-replay-btn');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        soundFx.playClick();
        this.resetGameState();
        this.render();
        this.startTimer();
      });
    }

    const returnMapBtn = this.screenEl.querySelector('#game-return-map-btn');
    if (returnMapBtn) {
      returnMapBtn.addEventListener('click', () => {
        soundFx.playChime();
        router.navigateTo('gujarat-map');
      });
    }
  }
}

export const miniGameScreen = new MiniGameScreen();
