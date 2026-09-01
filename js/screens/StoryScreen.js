// js/screens/StoryScreen.js - Story-driven learning orchestrator & interactive choices

import { getStoryByLocationId } from '../data/storyData.js';
import { playerState } from '../state/playerState.js';
import { soundFx } from '../utils/audio.js';
import { router } from '../utils/router.js';

export class StoryScreen {
  constructor() {
    this.screenEl = null;
    this.locationId = 'kutch';
    this.story = null;
    this.currentStep = 0; // 0, 1, 2 = Slides, 3 = Challenge, 4 = Victory
    this.flippedDyk = false;
    this.selectedOption = null;
    this.hasAnswered = false;
  }

  init() {
    this.screenEl = document.getElementById('screen-story');
  }

  onEnter(params = {}) {
    const locId = params.locationId || playerState.getState().selectedGujaratLocationId || 'kutch';
    this.locationId = locId;
    this.story = getStoryByLocationId(locId);

    if (!this.story) {
      console.error(`Story for location "${locId}" not found, falling back to kutch.`);
      this.locationId = 'kutch';
      this.story = getStoryByLocationId('kutch');
    }

    this.currentStep = 0;
    this.flippedDyk = false;
    this.selectedOption = null;
    this.hasAnswered = false;

    this.render();
  }

  onLeave() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  render() {
    if (!this.screenEl || !this.story) return;

    const totalSlides = this.story.slides.length;
    const isSlideStep = this.currentStep < totalSlides;
    const isChallengeStep = this.currentStep === totalSlides;
    const isVictoryStep = this.currentStep > totalSlides;

    // Generate Header & Progress Dots
    const progressPillsHtml = Array.from({ length: totalSlides + 1 }).map((_, idx) => {
      let statusClass = '';
      if (idx < this.currentStep) statusClass = 'completed';
      else if (idx === this.currentStep) statusClass = 'active';
      return `<div class="story-step-dot ${statusClass}" title="${idx < totalSlides ? `Slide ${idx + 1}` : 'Challenge'}"></div>`;
    }).join('');

    this.screenEl.innerHTML = `
      <div class="story-screen-layout">
        
        <!-- Story Top Bar & Breadcrumbs -->
        <div class="story-top-bar">
          <nav class="breadcrumb-nav" aria-label="Breadcrumb">
            <button id="story-back-to-map-btn" class="breadcrumb-btn" aria-label="Back to Gujarat Map">
              <span>←</span> Gujarat Map
            </button>
            <span>/</span>
            <span style="color: var(--color-royal-gold); font-weight: 700;">${this.story.subtitle}</span>
          </nav>

          <!-- Step Progress Indicator -->
          <div class="story-progress-pills">
            ${progressPillsHtml}
          </div>
        </div>

        <!-- Main Dynamic Story Content Area -->
        <div id="story-dynamic-content">
          ${isSlideStep ? this.renderSlideHtml(this.story.slides[this.currentStep]) : ''}
          ${isChallengeStep ? this.renderChallengeHtml(this.story.interactiveChallenge) : ''}
          ${isVictoryStep ? this.renderVictoryHtml() : ''}
        </div>

        <!-- Bottom Navigation Controls (for Slides & Challenge) -->
        ${!isVictoryStep ? this.renderNavigationDockHtml(isSlideStep, isChallengeStep, totalSlides) : ''}

      </div>
    `;

    this.bindEvents(isSlideStep, isChallengeStep);
  }

  // 1. RENDER SLIDE CONTENT
  renderSlideHtml(slide) {
    return `
      <div class="story-slide-card">
        
        <div class="story-slide-header">
          <div>
            <span class="scene-tag-badge">📍 ${slide.sceneTag}</span>
            <h2 class="story-slide-title">${slide.title}</h2>
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; color: #94A3B8;">
            CHAPTER ${slide.slideIndex} / 3
          </div>
        </div>

        <!-- Narration Story Text -->
        <p class="story-narration-text">${slide.narration}</p>

        <!-- Mira Cultural Dialogue Companion Box -->
        <div class="mira-story-bubble">
          <div class="mira-story-avatar anim-float">🪔</div>
          <div class="mira-story-content">
            <div class="mira-story-name">
              <span>MIRA'S CULTURAL INSIGHT</span>
              <button id="story-tts-btn" class="btn-icon" style="width: 28px; height: 28px; font-size: 0.75rem;" title="Listen to Mira">
                🔊
              </button>
            </div>
            <p class="mira-story-quote">"${slide.miraDialogue}"</p>
          </div>
        </div>

        <!-- Inspectable Artifact Micro-Pill -->
        <div class="inspectable-artifact-pill">
          <div class="artifact-pill-icon">${slide.inspectable.icon}</div>
          <div class="artifact-pill-info">
            <span class="artifact-pill-label">CULTURAL ARTIFACT: ${slide.inspectable.label}</span>
            <span class="artifact-pill-detail">${slide.inspectable.detail}</span>
          </div>
        </div>

        <!-- Flippable 3D Did You Know Card -->
        <div id="story-dyk-card" class="did-you-know-card" role="button" tabindex="0" aria-label="Did you know card">
          <div class="dyk-header">
            <span>💡 Did You Know?</span>
            <span style="font-size: 0.75rem; color: var(--color-peacock-light);">
              ${this.flippedDyk ? 'Tap to Close ▲' : 'Tap to Reveal ▼'}
            </span>
          </div>
          <p class="dyk-question">${slide.didYouKnow.question}</p>
          ${this.flippedDyk ? `<p class="dyk-answer">${slide.didYouKnow.answer}</p>` : ''}
        </div>

      </div>
    `;
  }

  // 2. RENDER INTERACTIVE CHALLENGE / QUESTION
  renderChallengeHtml(challenge) {
    return `
      <div class="story-slide-card challenge-arena-container glass-panel">
        
        <div class="story-slide-header">
          <div>
            <span class="scene-tag-badge">🎯 INTERACTIVE KNOWLEDGE CHALLENGE</span>
            <h2 class="story-slide-title">${challenge.title}</h2>
          </div>
          <div style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; color: var(--gold-400);">
            +100 XP REWARD
          </div>
        </div>

        <!-- Situation Context Narrative -->
        <p class="story-narration-text" style="color: var(--sand-200);">${challenge.context}</p>

        <!-- Mira Prompt Bubble -->
        <div class="mira-story-bubble">
          <div class="mira-story-avatar anim-float">🪔</div>
          <div class="mira-story-content">
            <div class="mira-story-name">
              <span>MIRA'S QUESTION</span>
              <button id="challenge-tts-btn" class="btn-icon" style="width: 28px; height: 28px; font-size: 0.75rem;" title="Listen to Question">🔊</button>
            </div>
            <p class="mira-story-quote">"${challenge.miraPrompt}"</p>
          </div>
        </div>

        <!-- Question Title -->
        <h3 class="challenge-question-text" style="color: var(--sand-50); font-family: var(--font-title); font-size: 1.15rem; font-weight: 700; margin: 0.25rem 0 0.5rem 0;">
          ${challenge.question}
        </h3>

        <!-- 4 Interactive Choice Buttons Grid -->
        <div class="story-choices-grid">
          ${challenge.options.map((opt, idx) => {
            let stateClass = '';
            if (this.selectedOption && this.selectedOption.id === opt.id) {
              stateClass = opt.isCorrect ? 'selected-correct' : 'selected-wrong';
            }
            return `
              <button class="choice-option-btn ${stateClass}" 
                      data-option-id="${opt.id}" 
                      ${this.hasAnswered && this.selectedOption && this.selectedOption.isCorrect ? 'disabled' : ''}
                      aria-label="Option ${String.fromCharCode(65 + idx)}: ${opt.text}">
                <div style="display: flex; align-items: center; gap: 0.75rem; flex: 1;">
                  <span class="choice-keycap">${String.fromCharCode(65 + idx)}</span>
                  <span class="choice-option-text">${opt.text}</span>
                </div>
                <span class="choice-status-icon">
                  ${this.selectedOption && this.selectedOption.id === opt.id 
                    ? (opt.isCorrect ? '✅' : '❌') 
                    : '→'}
                </span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Feedback Panel when answered -->
        ${this.selectedOption ? `
          <div class="choice-feedback-box">
            <div class="feedback-status-title ${this.selectedOption.isCorrect ? 'correct' : 'incorrect'}">
              <span>${this.selectedOption.isCorrect ? '🌟 Splendid Deduction!' : '⚠️ Needs Re-evaluation'}</span>
            </div>
            <p class="feedback-explanation">${this.selectedOption.feedback}</p>
            <div class="feedback-cultural-insight">
              <strong>Heritage Fact:</strong> ${this.selectedOption.culturalInsight}
            </div>
          </div>
        ` : ''}

      </div>
    `;
  }

  // 3. RENDER VICTORY & REPLAY SCREEN
  renderVictoryHtml() {
    const totalXP = playerState.getState().totalXP;

    return `
      <div class="story-victory-card glass-panel">
        
        <div class="anim-float">
          <div style="width: 90px; height: 90px; border-radius: 50%; background: radial-gradient(circle, #FFE259, #FF7A00); display: flex; align-items: center; justify-content: center; font-size: 3rem; box-shadow: 0 0 35px rgba(255, 215, 0, 0.6); border: 2px solid #FFFFFF;">
            🏆
          </div>
        </div>

        <div>
          <span class="badge-playable" style="margin-bottom: 0.5rem;">CHAPTER MASTERED</span>
          <h2 style="font-family: var(--font-display); font-size: 2rem; color: #FFFFFF; line-height: 1.2;">
            ${this.story.title}
          </h2>
          <p style="font-size: 0.9rem; color: var(--color-peacock-light); margin-top: 0.25rem;">
            You have discovered and mastered the cultural heritage of ${this.story.subtitle}.
          </p>
        </div>

        <!-- XP Reward Display -->
        <div class="victory-xp-burst">
          <span>⚡</span> +100 XP AWARDED!
        </div>

        <p style="font-size: 0.85rem; color: #94A3B8; max-width: 500px;">
          ${this.story.interactiveChallenge.bonusTrivia}
        </p>

        <!-- Action Buttons -->
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; margin-top: 1rem;">
          <button id="victory-play-game-btn" class="btn btn-primary btn-shimmer-effect" style="padding: 0.75rem 1.75rem;">
            🎮 Play Regional Mini-Game (+100 XP) →
          </button>
          
          <button id="victory-replay-btn" class="btn btn-outline" style="padding: 0.75rem 1.5rem;">
            🔄 Replay Story
          </button>
          
          <button id="victory-return-map-btn" class="btn btn-secondary" style="padding: 0.75rem 1.5rem;">
            🗺️ Gujarat Hub
          </button>
        </div>

      </div>
    `;
  }

  // 4. NAVIGATION DOCK
  renderNavigationDockHtml(isSlideStep, isChallengeStep, totalSlides) {
    if (isSlideStep) {
      const isFirst = this.currentStep === 0;
      const isLastSlide = this.currentStep === totalSlides - 1;

      return `
        <div class="story-nav-dock">
          <button id="story-prev-btn" class="btn btn-outline" ${isFirst ? 'style="visibility: hidden;"' : ''}>
            ← Previous Slide
          </button>

          <button id="story-next-btn" class="btn ${isLastSlide ? 'btn-primary btn-shimmer-effect' : 'btn-secondary'}">
            ${isLastSlide ? 'Take Knowledge Challenge 🎯' : 'Next Story Slide →'}
          </button>
        </div>
      `;
    }

    if (isChallengeStep) {
      const canProceed = this.selectedOption && this.selectedOption.isCorrect;

      return `
        <div class="story-nav-dock">
          <button id="challenge-review-slides-btn" class="btn btn-outline">
            ← Review Story Slides
          </button>

          <button id="challenge-complete-btn" class="btn btn-primary btn-shimmer-effect" ${!canProceed ? 'disabled style="opacity: 0.5; pointer-events: none;"' : ''}>
            Claim +100 XP & Finish Story →
          </button>
        </div>
      `;
    }

    return '';
  }

  // EVENT BINDINGS
  bindEvents(isSlideStep, isChallengeStep) {
    // Back to Map button
    const backBtn = this.screenEl.querySelector('#story-back-to-map-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        soundFx.playClick();
        router.navigateTo('gujarat-map');
      });
    }

    // Slide TTS button
    const ttsBtn = this.screenEl.querySelector('#story-tts-btn');
    if (ttsBtn && isSlideStep) {
      ttsBtn.addEventListener('click', () => {
        const slide = this.story.slides[this.currentStep];
        this.speakText(slide.miraDialogue);
      });
    }

    // Challenge TTS button
    const challengeTtsBtn = this.screenEl.querySelector('#challenge-tts-btn');
    if (challengeTtsBtn && isChallengeStep) {
      challengeTtsBtn.addEventListener('click', () => {
        this.speakText(this.story.interactiveChallenge.miraPrompt + ' ' + this.story.interactiveChallenge.question);
      });
    }

    // Did You Know Flip trigger
    const dykCard = this.screenEl.querySelector('#story-dyk-card');
    if (dykCard) {
      dykCard.addEventListener('click', () => {
        soundFx.playClick();
        this.flippedDyk = !this.flippedDyk;
        this.render();
      });
    }

    // Slide Navigation Buttons
    const nextBtn = this.screenEl.querySelector('#story-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        soundFx.playClick();
        this.currentStep++;
        this.flippedDyk = false;
        this.render();
      });
    }

    const prevBtn = this.screenEl.querySelector('#story-prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        soundFx.playClick();
        if (this.currentStep > 0) {
          this.currentStep--;
          this.flippedDyk = false;
          this.render();
        }
      });
    }

    // Challenge Option Selection
    if (isChallengeStep) {
      const optionBtns = this.screenEl.querySelectorAll('.choice-option-btn');
      optionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const optId = e.currentTarget.getAttribute('data-option-id');
          this.handleOptionSelect(optId);
        });
      });

      const reviewBtn = this.screenEl.querySelector('#challenge-review-slides-btn');
      if (reviewBtn) {
        reviewBtn.addEventListener('click', () => {
          soundFx.playClick();
          this.currentStep = this.story.slides.length - 1;
          this.render();
        });
      }

      const completeBtn = this.screenEl.querySelector('#challenge-complete-btn');
      if (completeBtn) {
        completeBtn.addEventListener('click', () => {
          this.handleCompleteStory();
        });
      }
    }

    // Victory Action Buttons
    const replayBtn = this.screenEl.querySelector('#victory-replay-btn');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        soundFx.playClick();
        this.currentStep = 0;
        this.flippedDyk = false;
        this.selectedOption = null;
        this.hasAnswered = false;
        this.render();
      });
    }

    const returnMapBtn = this.screenEl.querySelector('#victory-return-map-btn');
    if (returnMapBtn) {
      returnMapBtn.addEventListener('click', () => {
        soundFx.playChime();
        router.navigateTo('gujarat-map');
      });
    }

    const playGameBtn = this.screenEl.querySelector('#victory-play-game-btn');
    if (playGameBtn) {
      playGameBtn.addEventListener('click', () => {
        soundFx.playChime();
        router.navigateTo('game', { locationId: this.locationId });
      });
    }
  }

  handleOptionSelect(optionId) {
    const challenge = this.story.interactiveChallenge;
    const option = challenge.options.find(o => o.id === optionId);
    if (!option) return;

    this.selectedOption = option;
    this.hasAnswered = true;

    if (option.isCorrect) {
      soundFx.playChime();
    } else {
      soundFx.playLockedBuzz();
    }

    this.render();
  }

  handleCompleteStory() {
    soundFx.playChime();
    playerState.completeStory(this.locationId, this.story.xpReward || 100);
    playerState.markLocationExplored(this.locationId, 50, 100);
    this.currentStep = this.story.slides.length + 1; // Advance to victory step
    this.render();
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

export const storyScreen = new StoryScreen();
