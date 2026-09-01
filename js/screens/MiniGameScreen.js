// js/screens/MiniGameScreen.js - Mini-Game Arena (Zone Heritage Challenges & 2D Canvas Expedition)

import { EXPEDITION_REGIONS } from '../data/expeditionData.js';
import { getMiniGameByLocationId, GUJARAT_MINIGAMES } from '../data/miniGamesData.js';
import { playerState } from '../state/playerState.js';
import { soundFx } from '../utils/audio.js';
import { router } from '../utils/router.js';

export class MiniGameScreen {
  constructor() {
    this.screenEl = null;
    this.canvas = null;
    this.ctx = null;
    this.animFrameId = null;

    // Active Mode: 'zone-challenge' | '2d-expedition'
    this.mode = 'zone-challenge';
    this.locationId = 'kutch';

    // Zone Challenge State
    this.zoneGame = null;
    this.currentRoundIndex = 0;
    this.selectedOption = null;
    this.isRoundAnswered = false;
    this.zoneChallengeScore = 0;

    // 2D Expedition Game Progression State
    this.currentRegionIndex = 0;
    this.collectedTokens = []; // ['token-ahmedabad', 'token-kutch', 'token-gir', 'token-dwarka']
    this.pickedCollectibleIds = new Set();
    this.score = 0;
    this.isCompleted = false;
    this.isTransitioning = false;
    this.transitionTimer = 0;

    // Player State
    this.player = {
      x: 120,
      y: 300,
      radius: 18,
      speed: 3.8,
      vx: 0,
      vy: 0,
      facing: 'right', // 'up' | 'down' | 'left' | 'right'
      isMoving: false,
      walkCycle: 0
    };

    // Input State
    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false
    };
    this.touchTarget = null;

    // Particles & FX
    this.particles = [];
    this.floatingTexts = [];
    this.gameTime = 0;
  }

  init() {
    this.screenEl = document.getElementById('screen-game');
  }

  onEnter(params = {}) {
    const locId = params.locationId || playerState.getState().selectedGujaratLocationId || 'kutch';
    this.locationId = locId;
    this.zoneGame = getMiniGameByLocationId(locId);

    // If specific mode requested in params
    if (params.mode) {
      this.mode = params.mode;
    } else {
      this.mode = 'zone-challenge';
    }

    this.currentRoundIndex = 0;
    this.selectedOption = null;
    this.isRoundAnswered = false;
    this.zoneChallengeScore = 0;

    this.resetExpedition();
    this.render();

    if (this.mode === '2d-expedition') {
      this.initCanvas();
      this.bindInputs();
      this.startGameLoop();
    }
  }

  onLeave() {
    this.stopGameLoop();
    this.unbindInputs();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  setMode(newMode) {
    if (this.mode === newMode) return;
    this.mode = newMode;
    if (newMode === '2d-expedition') {
      this.render();
      this.initCanvas();
      this.bindInputs();
      this.startGameLoop();
    } else {
      this.stopGameLoop();
      this.unbindInputs();
      this.render();
    }
  }

  resetExpedition() {
    this.currentRegionIndex = 0;
    this.collectedTokens = [];
    this.pickedCollectibleIds = new Set();
    this.score = 0;
    this.isCompleted = false;
    this.isTransitioning = false;
    this.transitionTimer = 0;
    this.particles = [];
    this.floatingTexts = [];
    this.touchTarget = null;
    this.gameTime = 0;
    this.spawnPlayerForRegion(0);
  }

  spawnPlayerForRegion(regionIdx) {
    const region = EXPEDITION_REGIONS[regionIdx];
    if (region) {
      this.player.x = region.playerStart.x;
      this.player.y = region.playerStart.y;
      this.player.vx = 0;
      this.player.vy = 0;
    }
  }

  render() {
    if (!this.screenEl) return;

    if (this.mode === 'zone-challenge') {
      this.renderZoneChallenge();
    } else {
      this.render2DExpedition();
    }
  }

  // =========================================================================
  // ZONE HERITAGE DISCOVERY CHALLENGE RENDERER
  // =========================================================================
  renderZoneChallenge() {
    if (!this.zoneGame) {
      this.zoneGame = getMiniGameByLocationId(this.locationId);
    }
    const game = this.zoneGame;
    const isFinished = this.currentRoundIndex >= game.rounds.length;

    if (isFinished) {
      this.renderZoneChallengeVictory();
      return;
    }

    const currentRound = game.rounds[this.currentRoundIndex];

    this.screenEl.innerHTML = `
      <div class="expedition-game-layout">
        
        <!-- Top HUD Bar -->
        <div class="expedition-top-hud">
          <div class="hud-left-group">
            <button id="zone-challenge-exit-btn" class="breadcrumb-btn" aria-label="Exit Game">
              <span>←</span> Exit
            </button>
            <div class="hud-region-badge">
              <span>${game.icon}</span>
              <span>${game.title}</span>
            </div>
          </div>

          <!-- Round Progress Indicators -->
          <div class="expedition-journey-tracker">
            ${game.rounds.map((r, idx) => `
              <div class="journey-node ${idx < this.currentRoundIndex ? 'completed' : (idx === this.currentRoundIndex ? 'active' : '')}">
                <span>${idx < this.currentRoundIndex ? '✓' : `Round ${idx + 1}`}</span>
              </div>
              ${idx < game.rounds.length - 1 ? '<div class="journey-node-line ' + (idx < this.currentRoundIndex ? 'line-completed' : '') + '"></div>' : ''}
            `).join('')}
          </div>

          <div class="hud-right-group">
            <div class="hud-score-pill">
              <span class="score-label">SCORE:</span>
              <span class="score-val">${this.zoneChallengeScore} PTS</span>
            </div>

            <button id="switch-to-2d-btn" class="btn btn-outline btn-sm" style="padding: 0.25rem 0.6rem; font-size: 0.75rem; border-color: var(--color-peacock-light); color: var(--color-peacock-light);" title="Switch to 2D Canvas Game">
              🎮 2D Mode
            </button>
          </div>
        </div>

        <!-- Heritage Discovery Card Container -->
        <div class="heritage-challenge-card anim-enter-slide">
          
          <!-- Slot Banner -->
          <div class="heritage-slot-banner">
            <div>
              <span style="font-size: 0.72rem; color: #CBD5E1; font-family: var(--font-mono); text-transform: uppercase;">
                ROUND ${currentRound.roundNumber} OF ${game.rounds.length}
              </span>
              <h2 class="heritage-slot-title">${currentRound.slotName}</h2>
            </div>
            <span class="heritage-slot-tag">🏛️ ${currentRound.structureTag}</span>
          </div>

          <!-- Mira's Cultural Clue Box -->
          <div class="heritage-mira-hint">
            <div class="mira-story-avatar anim-float" style="width: 48px; height: 48px; flex-shrink: 0;">
              <img src="character/mira-avatar.png" alt="Mira" class="mira-story-avatar-img" />
            </div>
            <div style="flex: 1;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                <span style="font-family: var(--font-title); font-size: 0.8rem; font-weight: 700; color: var(--color-royal-gold);">MIRA'S ARCHITECTURAL CLUE</span>
                <button id="challenge-tts-btn" class="btn-icon" style="width: 26px; height: 26px; font-size: 0.75rem;" title="Listen to Clue">🔊</button>
              </div>
              <p style="font-size: 0.88rem; color: #F8FAFC; line-height: 1.5;">${currentRound.miraClue}</p>
            </div>
          </div>

          <!-- 3 Interactive Options Grid -->
          <div class="heritage-options-grid">
            ${currentRound.options.map((opt) => {
              let stateClass = '';
              if (this.selectedOption && this.selectedOption.id === opt.id) {
                stateClass = opt.isCorrect ? 'correct' : 'incorrect';
              }
              return `
                <button class="heritage-option-btn ${stateClass}" 
                        data-option-id="${opt.id}"
                        ${this.isRoundAnswered && opt.isCorrect ? 'disabled' : ''}>
                  <span class="heritage-option-icon">${opt.icon}</span>
                  <span class="heritage-option-name">${opt.name}</span>
                  <span class="heritage-option-sub">${opt.subtitle}</span>
                  <span style="font-size: 0.68rem; color: var(--color-peacock-light); font-family: var(--font-mono);">${opt.category}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Feedback Box after selection -->
          ${this.selectedOption ? `
            <div class="heritage-feedback-box ${this.selectedOption.isCorrect ? '' : 'error-box'} anim-enter-slide">
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <strong style="color: ${this.selectedOption.isCorrect ? 'var(--color-success)' : 'var(--color-error)'}; font-size: 0.95rem;">
                  ${this.selectedOption.isCorrect ? '✨ Brilliant Cultural Deduction!' : '⚠️ Not Quite the Right Element!'}
                </strong>
                ${this.selectedOption.isCorrect ? '<span style="color: var(--color-royal-gold); font-weight: 800; font-family: var(--font-mono);">+100 PTS</span>' : ''}
              </div>
              <p style="font-size: 0.85rem; color: #E2E8F0; line-height: 1.4;">
                ${this.selectedOption.isCorrect ? this.selectedOption.feedback : this.selectedOption.hint}
              </p>
              ${this.selectedOption.isCorrect && this.selectedOption.culturalInsight ? `
                <div style="font-size: 0.78rem; color: var(--color-peacock-light); border-top: 1px dashed rgba(255,255,255,0.15); padding-top: 0.4rem;">
                  💡 <strong>Cultural Insight:</strong> ${this.selectedOption.culturalInsight}
                </div>
              ` : ''}
              ${this.selectedOption.isCorrect ? `
                <button id="challenge-next-round-btn" class="btn btn-primary btn-shimmer-effect" style="margin-top: 0.5rem; align-self: flex-end;">
                  ${this.currentRoundIndex < game.rounds.length - 1 ? 'Next Component →' : 'Complete Challenge & Claim Artifact 🏆'}
                </button>
              ` : ''}
            </div>
          ` : ''}

        </div>

      </div>
    `;

    // Bind Zone Challenge Events
    const exitBtn = this.screenEl.querySelector('#zone-challenge-exit-btn');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        soundFx.playClick();
        router.navigateTo('gujarat-map');
      });
    }

    const switchTo2dBtn = this.screenEl.querySelector('#switch-to-2d-btn');
    if (switchTo2dBtn) {
      switchTo2dBtn.addEventListener('click', () => {
        soundFx.playClick();
        this.setMode('2d-expedition');
      });
    }

    const ttsBtn = this.screenEl.querySelector('#challenge-tts-btn');
    if (ttsBtn) {
      ttsBtn.addEventListener('click', () => {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(currentRound.miraClue);
          utterance.rate = 1.0;
          utterance.pitch = 1.1;
          window.speechSynthesis.speak(utterance);
        } else {
          soundFx.playChime();
        }
      });
    }

    const optionBtns = this.screenEl.querySelectorAll('.heritage-option-btn:not([disabled])');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const optId = e.currentTarget.getAttribute('data-option-id');
        this.handleZoneOptionSelect(optId);
      });
    });

    const nextRoundBtn = this.screenEl.querySelector('#challenge-next-round-btn');
    if (nextRoundBtn) {
      nextRoundBtn.addEventListener('click', () => {
        soundFx.playClick();
        this.currentRoundIndex += 1;
        this.selectedOption = null;
        this.isRoundAnswered = false;
        this.render();
      });
    }
  }

  handleZoneOptionSelect(optionId) {
    const currentRound = this.zoneGame.rounds[this.currentRoundIndex];
    const option = currentRound.options.find(o => o.id === optionId);
    if (!option) return;

    this.selectedOption = option;

    if (option.isCorrect) {
      soundFx.playChime();
      this.isRoundAnswered = true;
      this.zoneChallengeScore += 100;
    } else {
      soundFx.playLockedBuzz();
    }

    this.render();
  }

  renderZoneChallengeVictory() {
    const game = this.zoneGame;
    playerState.recordGameCompleted(game.id, game.xpReward || 100, this.zoneChallengeScore);
    if (game.artifactUnlock) {
      playerState.unlockItem(game.artifactUnlock);
    }

    this.screenEl.innerHTML = `
      <div class="expedition-game-layout">
        
        <div class="expedition-victory-card glass-panel anim-enter-slide">
          
          <div class="victory-emblem-wrap anim-float">
            <div class="victory-sun-aura">${game.icon}</div>
          </div>

          <span class="badge-playable">CHALLENGE CONQUERED ⭐⭐⭐</span>
          <h2 class="victory-main-title">${game.title} Mastered!</h2>
          <p class="victory-subtitle">${game.subtitle}</p>

          <!-- Reward Box -->
          <div class="expedition-score-summary" style="width: 100%; max-width: 500px;">
            <div class="points-badge-text">CHALLENGE DISCOVERY SCORE</div>
            <div class="points-total-number">+${this.zoneChallengeScore} PTS</div>
            <div class="points-xp-bonus">+${game.xpReward || 100} XP AWARDED ⚡</div>
          </div>

          ${game.artifactUnlock ? `
            <div class="unlocked-artifact-banner" style="width: 100%; max-width: 500px; display: flex; align-items: center; gap: 1rem; background: rgba(255, 215, 0, 0.12); border: 1.5px solid var(--color-royal-gold); border-radius: var(--radius-md); padding: 0.85rem 1.25rem;">
              <div style="font-size: 2.2rem;">${game.artifactUnlock.icon}</div>
              <div style="text-align: left;">
                <div style="font-size: 0.7rem; font-family: var(--font-mono); font-weight: 700; color: var(--color-royal-gold);">
                  ✨ UNLOCKED ${game.artifactUnlock.rarity.toUpperCase()} ARTIFACT
                </div>
                <h4 style="font-family: var(--font-title); font-weight: 700; color: #FFFFFF; font-size: 1rem;">
                  ${game.artifactUnlock.name}
                </h4>
              </div>
            </div>
          ` : ''}

          <!-- Action Buttons -->
          <div class="victory-actions-row">
            <button id="challenge-to-quiz-btn" class="btn btn-primary btn-shimmer-effect" style="padding: 0.9rem 2.2rem;">
              🏆 Take Zone Quiz (+150 XP) →
            </button>

            <button id="challenge-to-2d-btn" class="btn btn-outline" style="padding: 0.9rem 1.6rem;">
              🎮 Play 2D Canvas Expedition
            </button>

            <button id="challenge-to-map-btn" class="btn btn-secondary" style="padding: 0.9rem 1.6rem;">
              🗺️ Return to Gujarat Map
            </button>
          </div>

        </div>

      </div>
    `;

    const toQuizBtn = this.screenEl.querySelector('#challenge-to-quiz-btn');
    if (toQuizBtn) {
      toQuizBtn.addEventListener('click', () => {
        soundFx.playChime();
        router.navigateTo('quiz', { locationId: this.locationId });
      });
    }

    const to2dBtn = this.screenEl.querySelector('#challenge-to-2d-btn');
    if (to2dBtn) {
      to2dBtn.addEventListener('click', () => {
        soundFx.playClick();
        this.setMode('2d-expedition');
      });
    }

    const toMapBtn = this.screenEl.querySelector('#challenge-to-map-btn');
    if (toMapBtn) {
      toMapBtn.addEventListener('click', () => {
        soundFx.playClick();
        router.navigateTo('gujarat-map');
      });
    }
  }

  // =========================================================================
  // 2D CANVAS EXPEDITION RENDERER
  // =========================================================================
  render2DExpedition() {
    if (this.isCompleted) {
      this.renderVictory();
      return;
    }

    const currentRegion = EXPEDITION_REGIONS[this.currentRegionIndex];

    this.screenEl.innerHTML = `
      <div class="expedition-game-layout">
        
        <!-- Top Expedition HUD Bar -->
        <div class="expedition-top-hud">
          
          <div class="hud-left-group">
            <button id="expedition-exit-btn" class="breadcrumb-btn" aria-label="Exit Game">
              <span>←</span> Exit
            </button>
            <div class="hud-region-badge">
              <span class="hud-region-icon">${currentRegion.icon}</span>
              <span class="hud-region-name">${currentRegion.name}</span>
            </div>
          </div>

          <!-- Journey Route Progress Nodes -->
          <div class="expedition-journey-tracker">
            ${EXPEDITION_REGIONS.map((reg, idx) => {
              let stateClass = '';
              if (idx < this.currentRegionIndex || this.collectedTokens.includes(reg.mainToken.id)) {
                stateClass = 'completed';
              } else if (idx === this.currentRegionIndex) {
                stateClass = 'active';
              }
              return `
                <div class="journey-node ${stateClass}" title="${reg.name}">
                  <span class="journey-node-icon">${reg.icon}</span>
                  <span class="journey-node-label">${reg.name.split(' ')[0]}</span>
                </div>
                ${idx < EXPEDITION_REGIONS.length - 1 ? '<div class="journey-node-line ' + (idx < this.currentRegionIndex ? 'line-completed' : '') + '"></div>' : ''}
              `;
            }).join('')}
          </div>

          <div class="hud-right-group">
            <div class="hud-score-pill">
              <span class="score-label">DISCOVERY PTS:</span>
              <span id="expedition-score-val" class="score-val">${this.score}</span>
            </div>

            <button id="expedition-mute-btn" class="btn-icon" title="Toggle Audio" style="width: 32px; height: 32px; font-size: 0.85rem;">
              ${playerState.getState().soundEnabled ? '🔊' : '🔇'}
            </button>
          </div>

        </div>

        <!-- Canvas Game Arena Viewport -->
        <div class="expedition-canvas-wrapper" id="canvas-container">
          <canvas id="expedition-canvas" width="1000" height="600" aria-label="Gujarat Expedition Game Viewport"></canvas>
          
          <!-- Dynamic Objective Pill Overlay -->
          <div class="expedition-objective-banner" id="objective-banner">
            <span>🎯</span> ${currentRegion.objective}
          </div>

          <!-- On-Screen Mobile Controls Overlay -->
          <div class="mobile-controls-overlay" id="mobile-controls">
            <div class="dpad-container">
              <button class="dpad-btn dpad-up" data-dir="up">▲</button>
              <button class="dpad-btn dpad-left" data-dir="left">◀</button>
              <button class="dpad-btn dpad-down" data-dir="down">▼</button>
              <button class="dpad-btn dpad-right" data-dir="right">▶</button>
            </div>
          </div>
        </div>

      </div>
    `;

    // Bind HUD events
    const exitBtn = this.screenEl.querySelector('#expedition-exit-btn');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        soundFx.playClick();
        router.navigateTo('gujarat-map');
      });
    }

    const muteBtn = this.screenEl.querySelector('#expedition-mute-btn');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        const soundOn = playerState.toggleSound();
        muteBtn.textContent = soundOn ? '🔊' : '🔇';
      });
    }
  }

  initCanvas() {
    this.canvas = this.screenEl.querySelector('#expedition-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.resizeCanvas();
  };

  resizeCanvas() {
    if (!this.canvas) return;
    const container = this.screenEl.querySelector('#canvas-container');
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Internal coordinate space is 1000x600, scaled with aspect ratio preservation
    this.canvas.width = 1000;
    this.canvas.height = 600;
  }

  bindInputs() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);

    // Canvas click/touch navigation
    if (this.canvas) {
      this.canvas.addEventListener('pointerdown', this.handlePointerDown);
      this.canvas.addEventListener('pointermove', this.handlePointerMove);
      window.addEventListener('pointerup', this.handlePointerUp);
    }

    // On-screen mobile D-Pad
    const dpadBtns = this.screenEl.querySelectorAll('.dpad-btn');
    dpadBtns.forEach(btn => {
      const dir = btn.getAttribute('data-dir');
      const startMove = (e) => {
        e.preventDefault();
        this.keys[dir] = true;
      };
      const endMove = (e) => {
        e.preventDefault();
        this.keys[dir] = false;
      };
      btn.addEventListener('pointerdown', startMove);
      btn.addEventListener('pointerup', endMove);
      btn.addEventListener('pointerleave', endMove);
    });
  }

  unbindInputs() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('pointerup', this.handlePointerUp);
  }

  handleKeyDown = (e) => {
    const key = e.key.toLowerCase();
    if (['arrowup', 'w'].includes(key)) { this.keys.up = true; e.preventDefault(); }
    if (['arrowdown', 's'].includes(key)) { this.keys.down = true; e.preventDefault(); }
    if (['arrowleft', 'a'].includes(key)) { this.keys.left = true; e.preventDefault(); }
    if (['arrowright', 'd'].includes(key)) { this.keys.right = true; e.preventDefault(); }
  };

  handleKeyUp = (e) => {
    const key = e.key.toLowerCase();
    if (['arrowup', 'w'].includes(key)) this.keys.up = false;
    if (['arrowdown', 's'].includes(key)) this.keys.down = false;
    if (['arrowleft', 'a'].includes(key)) this.keys.left = false;
    if (['arrowright', 'd'].includes(key)) this.keys.right = false;
  };

  handlePointerDown = (e) => {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    this.touchTarget = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  handlePointerMove = (e) => {
    if (!this.touchTarget) return;
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    this.touchTarget = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  handlePointerUp = () => {
    this.touchTarget = null;
  };

  startGameLoop() {
    let lastTime = performance.now();

    const loop = (currentTime) => {
      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;
      this.gameTime += dt;

      this.update(dt);
      this.draw();

      if (!this.isCompleted) {
        this.animFrameId = requestAnimationFrame(loop);
      }
    };

    this.animFrameId = requestAnimationFrame(loop);
  }

  stopGameLoop() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  update(dt) {
    if (this.isTransitioning) {
      this.transitionTimer -= dt;
      if (this.transitionTimer <= 0) {
        this.isTransitioning = false;
        this.currentRegionIndex++;
        if (this.currentRegionIndex >= EXPEDITION_REGIONS.length) {
          this.completeExpedition();
        } else {
          this.spawnPlayerForRegion(this.currentRegionIndex);
          this.render();
          this.initCanvas();
          this.bindInputs();
        }
      }
      return;
    }

    const region = EXPEDITION_REGIONS[this.currentRegionIndex];
    if (!region) return;

    // Movement Physics
    let moveX = 0;
    let moveY = 0;

    if (this.keys.up) moveY -= 1;
    if (this.keys.down) moveY += 1;
    if (this.keys.left) moveX -= 1;
    if (this.keys.right) moveX += 1;

    // Touch Target Steering
    if (this.touchTarget) {
      const dx = this.touchTarget.x - this.player.x;
      const dy = this.touchTarget.y - this.player.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 15) {
        moveX = dx / dist;
        moveY = dy / dist;
      }
    }

    // Normalize diagonal velocity
    if (moveX !== 0 && moveY !== 0) {
      moveX *= 0.7071;
      moveY *= 0.7071;
    }

    // Apply Regional Wind Mechanics (Kutch)
    if (region.wind) {
      moveX += region.wind.x * 0.4;
      moveY += region.wind.y * 0.4;
    }

    this.player.isMoving = (moveX !== 0 || moveY !== 0);

    if (this.player.isMoving) {
      this.player.walkCycle += dt * 10;
      if (Math.abs(moveX) > Math.abs(moveY)) {
        this.player.facing = moveX > 0 ? 'right' : 'left';
      } else {
        this.player.facing = moveY > 0 ? 'down' : 'up';
      }

      // Add walk dust particle
      if (Math.random() < 0.25) {
        this.particles.push({
          x: this.player.x + (Math.random() * 8 - 4),
          y: this.player.y + 14,
          vx: -moveX * 12 + (Math.random() * 6 - 3),
          vy: -moveY * 12 + (Math.random() * 6 - 3),
          radius: Math.random() * 3 + 2,
          color: region.colors.wallTop || 'rgba(255,255,255,0.4)',
          alpha: 0.6,
          life: 0.4
        });
      }
    }

    // Candidate position
    let nextX = this.player.x + moveX * this.player.speed;
    let nextY = this.player.y + moveY * this.player.speed;

    // Boundary & Obstacle Collisions
    const r = this.player.radius;

    // Check X Movement
    let canMoveX = true;
    for (const obs of region.obstacles) {
      if (this.checkCircleRectCollide(nextX, this.player.y, r, obs)) {
        canMoveX = false;
        break;
      }
    }
    if (canMoveX) this.player.x = nextX;

    // Check Y Movement
    let canMoveY = true;
    for (const obs of region.obstacles) {
      if (this.checkCircleRectCollide(this.player.x, nextY, r, obs)) {
        canMoveY = false;
        break;
      }
    }
    if (canMoveY) this.player.y = nextY;

    // Dwarka Ocean Wave Hazards (Tide surge)
    if (region.hasWaves && region.waves) {
      region.waves.forEach(wave => {
        const waveProgress = (Math.sin(this.gameTime * 2.2 + wave.phase) + 1) / 2; // 0 to 1
        const isSurging = waveProgress > 0.65;
        if (isSurging) {
          if (this.checkCircleRectCollide(this.player.x, this.player.y, r, wave)) {
            // Push player back gently with water splash
            this.player.x = Math.max(60, this.player.x - 2.5);
            soundFx.playClick();
            for (let i = 0; i < 4; i++) {
              this.particles.push({
                x: this.player.x + (Math.random() * 12 - 6),
                y: this.player.y + (Math.random() * 12 - 6),
                vx: Math.random() * 40 - 20,
                vy: Math.random() * 40 - 20,
                radius: Math.random() * 3 + 2,
                color: '#00D2C4',
                alpha: 0.8,
                life: 0.5
              });
            }
          }
        }
      });
    }

    // Collectibles Check
    region.collectibles.forEach(col => {
      if (!this.pickedCollectibleIds.has(col.id)) {
        const dist = Math.hypot(this.player.x - col.x, this.player.y - col.y);
        if (dist < this.player.radius + 18) {
          this.pickedCollectibleIds.add(col.id);
          this.score += col.points;
          soundFx.playPickup();
          this.triggerPickupFX(col.x, col.y, col.points, col.icon);
          this.updateScoreDisplay();
        }
      }
    });

    // Main Discovery Token Check
    const token = region.mainToken;
    if (!this.collectedTokens.includes(token.id)) {
      const dist = Math.hypot(this.player.x - token.x, this.player.y - token.y);
      if (dist < this.player.radius + 24) {
        this.collectedTokens.push(token.id);
        this.score += token.points + 50; // 100 token + 50 region clear bonus
        soundFx.playLevelUpFanfare();
        this.triggerTokenUnlockFX(token.x, token.y, token.icon, region.name);
        this.updateScoreDisplay();
        this.startTransition();
      }
    }

    // Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      p.alpha = Math.max(0, p.life);
      if (p.life <= 0) this.particles.splice(i, 1);
    }

    // Update Floating Text
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y -= 30 * dt;
      ft.life -= dt;
      ft.alpha = Math.max(0, ft.life / ft.maxLife);
      if (ft.life <= 0) this.floatingTexts.splice(i, 1);
    }
  }

  checkCircleRectCollide(cx, cy, radius, rect) {
    const closestX = Math.max(rect.x, Math.min(cx, rect.x + rect.w));
    const closestY = Math.max(rect.y, Math.min(cy, rect.y + rect.h));
    const distanceX = cx - closestX;
    const distanceY = cy - closestY;
    return (distanceX * distanceX + distanceY * distanceY) < (radius * radius);
  }

  triggerPickupFX(x, y, points, icon) {
    // Floating score tag
    this.floatingTexts.push({
      text: `+${points} ${icon}`,
      x: x,
      y: y - 10,
      alpha: 1,
      life: 0.9,
      maxLife: 0.9,
      color: '#FFD700'
    });

    // Particle burst
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * (Math.random() * 40 + 30),
        vy: Math.sin(angle) * (Math.random() * 40 + 30),
        radius: Math.random() * 3 + 2,
        color: '#FFD700',
        alpha: 1,
        life: 0.5
      });
    }
  }

  triggerTokenUnlockFX(x, y, icon, regionName) {
    this.floatingTexts.push({
      text: `✨ ${regionName.toUpperCase()} DISCOVERY UNLOCKED! +150 PTS`,
      x: 500,
      y: 250,
      alpha: 1,
      life: 2.2,
      maxLife: 2.2,
      color: '#00D2C4',
      isBanner: true
    });

    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 120 + 40;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 4 + 2,
        color: ['#FFD700', '#FF7A00', '#00D2C4', '#10B981'][Math.floor(Math.random() * 4)],
        alpha: 1,
        life: 1.2
      });
    }
  }

  updateScoreDisplay() {
    const el = this.screenEl ? this.screenEl.querySelector('#expedition-score-val') : null;
    if (el) el.textContent = this.score;
  }

  startTransition() {
    this.isTransitioning = true;
    this.transitionTimer = 2.4; // 2.4 seconds transition animation
  }

  completeExpedition() {
    this.isCompleted = true;
    this.score += 200; // Gujarat Expedition Completion Bonus!

    playerState.addXP(100);
    playerState.completeGame('gujarat-expedition', this.score);

    this.renderVictory();
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const region = EXPEDITION_REGIONS[this.currentRegionIndex];
    if (!region) return;

    ctx.clearRect(0, 0, 1000, 600);

    // 1. Draw Ground Base
    ctx.fillStyle = region.colors.ground;
    ctx.fillRect(0, 0, 1000, 600);

    // Ground Grid / Cobblestone / Sand Ripple Texture
    ctx.strokeStyle = region.colors.groundLight || 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    for (let x = 60; x < 940; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 50);
      ctx.lineTo(x, 550);
      ctx.stroke();
    }
    for (let y = 60; y < 540; y += 50) {
      ctx.beginPath();
      ctx.moveTo(50, y);
      ctx.lineTo(950, y);
      ctx.stroke();
    }

    // 2. Draw Moving Waves (Dwarka)
    if (region.hasWaves && region.waves) {
      region.waves.forEach(wave => {
        const waveProgress = (Math.sin(this.gameTime * 2.2 + wave.phase) + 1) / 2;
        const isSurging = waveProgress > 0.6;
        
        ctx.fillStyle = isSurging ? 'rgba(0, 180, 216, 0.55)' : 'rgba(0, 180, 216, 0.2)';
        ctx.fillRect(wave.x, wave.y, wave.w, wave.h);

        if (isSurging) {
          ctx.strokeStyle = '#CAF0F8';
          ctx.lineWidth = 2;
          ctx.strokeRect(wave.x, wave.y, wave.w, wave.h);

          // Wave foam lines
          ctx.beginPath();
          for (let wy = wave.y + 10; wy < wave.y + wave.h; wy += 25) {
            ctx.moveTo(wave.x, wy);
            ctx.lineTo(wave.x + wave.w, wy + Math.sin(this.gameTime * 8 + wy) * 6);
          }
          ctx.stroke();
        }
      });
    }

    // 3. Draw Scenery / Decorative Elements
    if (region.scenery) {
      region.scenery.forEach(item => {
        if (item.type === 'lantern' || item.type === 'lamp') {
          ctx.fillStyle = 'rgba(255, 179, 0, 0.25)';
          ctx.beginPath();
          ctx.arc(item.x, item.y, 22, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#FFB300';
          ctx.beginPath();
          ctx.arc(item.x, item.y, 6, 0, Math.PI * 2);
          ctx.fill();
        } else if (item.type === 'moon') {
          ctx.fillStyle = '#FAF7F2';
          ctx.shadowColor = '#FFD700';
          ctx.shadowBlur = 20;
          ctx.beginPath();
          ctx.arc(item.x, item.y, 25, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (item.type === 'temple') {
          ctx.fillStyle = '#1E527D';
          ctx.fillRect(item.x - 20, item.y - 30, 40, 60);
          ctx.fillStyle = '#FF7A00';
          ctx.beginPath();
          ctx.moveTo(item.x - 20, item.y - 30);
          ctx.lineTo(item.x, item.y - 55);
          ctx.lineTo(item.x + 20, item.y - 30);
          ctx.fill();
        }
      });
    }

    // 4. Draw Obstacles (Buildings, Pillars, Bhungas, Trees)
    region.obstacles.forEach(obs => {
      // Base Drop Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.fillRect(obs.x + 4, obs.y + 4, obs.w, obs.h);

      // Main Obstacle Body
      ctx.fillStyle = region.colors.wall;
      ctx.fillRect(obs.x, obs.y, obs.w, obs.h);

      // Top Highlight Rim
      ctx.fillStyle = region.colors.wallTop;
      ctx.fillRect(obs.x, obs.y, obs.w, 10);

      // Border Accent
      ctx.strokeStyle = region.colors.accent;
      ctx.lineWidth = 1.2;
      ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);

      // Decorative Label
      if (obs.label) {
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = "bold 9px 'Rajdhani', sans-serif";
        ctx.textAlign = 'center';
        ctx.fillText(obs.label, obs.x + obs.w / 2, obs.y + obs.h / 2 + 3);
      }
    });

    // 5. Draw Small Collectibles & Fragments
    region.collectibles.forEach(col => {
      if (!this.pickedCollectibleIds.has(col.id)) {
        const floatY = col.y + Math.sin(this.gameTime * 4 + col.x) * 4;

        // Glow Halo
        ctx.fillStyle = 'rgba(255, 215, 0, 0.2)';
        ctx.beginPath();
        ctx.arc(col.x, floatY, 14, 0, Math.PI * 2);
        ctx.fill();

        // Icon
        ctx.font = '16px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(col.icon, col.x, floatY);
      }
    });

    // 6. Draw Main Discovery Token (Radiant Landmark)
    const token = region.mainToken;
    if (!this.collectedTokens.includes(token.id)) {
      const tokenPulse = Math.sin(this.gameTime * 3) * 6;

      // Radial Glow Halo
      const grad = ctx.createRadialGradient(token.x, token.y, 4, token.x, token.y, 36 + tokenPulse);
      grad.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
      grad.addColorStop(0.5, 'rgba(255, 122, 0, 0.35)');
      grad.addColorStop(1, 'rgba(255, 122, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(token.x, token.y, 36 + tokenPulse, 0, Math.PI * 2);
      ctx.fill();

      // Radar Ring
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(token.x, token.y, 22 + (tokenPulse * 0.5), 0, Math.PI * 2);
      ctx.stroke();

      // Large Floating Icon
      ctx.font = '26px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(token.icon, token.x, token.y);

      // Token Label Badge
      ctx.fillStyle = 'rgba(11, 16, 28, 0.9)';
      ctx.fillRect(token.x - 55, token.y + 30, 110, 18);
      ctx.strokeStyle = '#FFD700';
      ctx.strokeRect(token.x - 55, token.y + 30, 110, 18);
      ctx.fillStyle = '#FFD700';
      ctx.font = "bold 9px 'Rajdhani', sans-serif";
      ctx.fillText("DISCOVERY TOKEN", token.x, token.y + 40);
    }

    // 7. Draw Player Character (Yatri Explorer)
    const px = this.player.x;
    const py = this.player.y;
    const bob = this.player.isMoving ? Math.sin(this.player.walkCycle) * 2.5 : 0;

    // Player Ambient Light Aura
    const pGrad = ctx.createRadialGradient(px, py, 6, px, py, 45);
    pGrad.addColorStop(0, 'rgba(255, 226, 89, 0.28)');
    pGrad.addColorStop(1, 'rgba(255, 226, 89, 0)');
    ctx.fillStyle = pGrad;
    ctx.beginPath();
    ctx.arc(px, py, 45, 0, Math.PI * 2);
    ctx.fill();

    // Drop Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.ellipse(px, py + 12, 14, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Backpack
    ctx.fillStyle = '#8D5B28';
    ctx.beginPath();
    ctx.arc(px - (this.player.facing === 'right' ? 8 : (this.player.facing === 'left' ? -8 : 0)), py + bob - 2, 7, 0, Math.PI * 2);
    ctx.fill();

    // Explorer Body (Saffron/Gold Expedition Jacket)
    ctx.fillStyle = '#D96B27';
    ctx.beginPath();
    ctx.arc(px, py + bob, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 1.8;
    ctx.stroke();

    // Explorer Head / Cap
    ctx.fillStyle = '#FAF7F2';
    ctx.beginPath();
    ctx.arc(px, py + bob - 6, 7.5, 0, Math.PI * 2);
    ctx.fill();

    // Compass Eye Pointer
    ctx.fillStyle = '#0F172A';
    let eyeX = px;
    let eyeY = py + bob - 6;
    if (this.player.facing === 'right') eyeX += 4;
    else if (this.player.facing === 'left') eyeX -= 4;
    else if (this.player.facing === 'up') eyeY -= 3;
    else if (this.player.facing === 'down') eyeY += 3;
    ctx.beginPath();
    ctx.arc(eyeX, eyeY, 2.2, 0, Math.PI * 2);
    ctx.fill();

    // 8. Draw Wind Dust Streaks (Kutch)
    if (region.wind && (region.wind.x !== 0 || region.wind.y !== 0)) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const wx = ((this.gameTime * 200 + i * 180) % 1000);
        const wy = 80 + i * 80;
        ctx.beginPath();
        ctx.moveTo(wx, wy);
        ctx.lineTo(wx + 40, wy - 8);
        ctx.stroke();
      }
    }

    // 9. Draw Particles
    this.particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;

    // 10. Draw Floating Texts & Banners
    this.floatingTexts.forEach(ft => {
      ctx.globalAlpha = ft.alpha;
      if (ft.isBanner) {
        ctx.fillStyle = 'rgba(11, 16, 28, 0.94)';
        ctx.fillRect(150, ft.y - 25, 700, 50);
        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.strokeRect(150, ft.y - 25, 700, 50);
        ctx.fillStyle = ft.color;
        ctx.font = "bold 16px 'Cinzel Decorative', serif";
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ft.text, 500, ft.y);
      } else {
        ctx.fillStyle = ft.color;
        ctx.font = "bold 13px 'Rajdhani', sans-serif";
        ctx.textAlign = 'center';
        ctx.fillText(ft.text, ft.x, ft.y);
      }
    });
    ctx.globalAlpha = 1.0;

    // 11. Cinematic Map Transition Overlay
    if (this.isTransitioning) {
      const alpha = Math.min(1, Math.sin((this.transitionTimer / 2.4) * Math.PI));
      ctx.fillStyle = `rgba(11, 16, 28, ${alpha * 0.88})`;
      ctx.fillRect(0, 0, 1000, 600);

      if (alpha > 0.3) {
        ctx.fillStyle = '#FFD700';
        ctx.font = "bold 22px 'Cinzel Decorative', serif";
        ctx.textAlign = 'center';
        ctx.fillText(`TRAVELING ACROSS GUJARAT...`, 500, 270);

        ctx.fillStyle = '#00D2C4';
        ctx.font = "bold 15px 'Rajdhani', sans-serif";
        const nextRegion = EXPEDITION_REGIONS[this.currentRegionIndex + 1];
        if (nextRegion) {
          ctx.fillText(`NEXT DESTINATION: ${nextRegion.name.toUpperCase()} (${nextRegion.tagline})`, 500, 310);
        }
      }
    }
  }

  renderVictory() {
    this.screenEl.innerHTML = `
      <div class="expedition-game-layout">
        
        <div class="expedition-victory-card glass-panel anim-enter-slide">
          
          <div class="victory-emblem-wrap anim-float">
            <div class="victory-sun-aura">🏆</div>
          </div>

          <span class="badge-playable">GUJARAT EXPEDITION COMPLETE</span>
          <h2 class="victory-main-title">You Travelled Across the Land of Legends!</h2>
          <p class="victory-subtitle">
            You navigated all four iconic realms of Gujarat, collected every Discovery Token, and mastered the expedition.
          </p>

          <!-- 4 Collected Discovery Tokens Showcase -->
          <div class="tokens-showcase-grid">
            <div class="token-showcase-tile">
              <span class="token-showcase-icon">🏛️</span>
              <strong>Ahmedabad</strong>
              <span class="token-showcase-sub">Heritage Token</span>
            </div>

            <div class="token-showcase-tile">
              <span class="token-showcase-icon">🎨</span>
              <strong>Rann of Kutch</strong>
              <span class="token-showcase-sub">Culture Token</span>
            </div>

            <div class="token-showcase-tile">
              <span class="token-showcase-icon">🦁</span>
              <strong>Gir Forest</strong>
              <span class="token-showcase-sub">Wildlife Token</span>
            </div>

            <div class="token-showcase-tile">
              <span class="token-showcase-icon">🌊</span>
              <strong>Dwarka Shore</strong>
              <span class="token-showcase-sub">Coastal Token</span>
            </div>
          </div>

          <!-- Total Score & XP Reward Banner -->
          <div class="expedition-score-summary">
            <div class="points-badge-text">TOTAL DISCOVERY SCORE</div>
            <div class="points-total-number">+${this.score} PTS</div>
            <div class="points-xp-bonus">+100 EXPEDITION XP AWARDED ⚡</div>
          </div>

          <div class="achievement-pill">
            <span>🏆 ACHIEVEMENT UNLOCKED:</span> <strong>GUJARAT EXPLORER</strong>
          </div>

          <!-- Victory Action Buttons -->
          <div class="victory-actions-row">
            <button id="expedition-to-quiz-btn" class="btn btn-primary btn-shimmer-effect" style="padding: 0.9rem 2.2rem; font-size: 0.95rem;">
              🏆 Continue to Quiz (+150 XP) →
            </button>

            <button id="expedition-replay-btn" class="btn btn-outline" style="padding: 0.9rem 1.6rem;">
              🔄 Replay Expedition
            </button>

            <button id="expedition-to-map-btn" class="btn btn-secondary" style="padding: 0.9rem 1.6rem;">
              🗺️ Return to Gujarat Map
            </button>
          </div>

        </div>

      </div>
    `;

    // Bind Victory Events
    const toQuizBtn = this.screenEl.querySelector('#expedition-to-quiz-btn');
    if (toQuizBtn) {
      toQuizBtn.addEventListener('click', () => {
        soundFx.playChime();
        router.navigateTo('quiz', { locationId: 'gujarat-master' });
      });
    }

    const replayBtn = this.screenEl.querySelector('#expedition-replay-btn');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        soundFx.playClick();
        this.resetExpedition();
        this.render();
        this.initCanvas();
        this.bindInputs();
        this.startGameLoop();
      });
    }

    const toMapBtn = this.screenEl.querySelector('#expedition-to-map-btn');
    if (toMapBtn) {
      toMapBtn.addEventListener('click', () => {
        soundFx.playClick();
        router.navigateTo('gujarat-map');
      });
    }
  }
}

export const miniGameScreen = new MiniGameScreen();
