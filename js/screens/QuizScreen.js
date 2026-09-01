// js/screens/QuizScreen.js - Screen controller for the BharatVerse Reusable Quiz Engine

import { QuizEngine } from '../components/QuizEngine.js';
import { getGujaratMasterQuiz, getQuizByLocationId } from '../data/quizData.js';
import { playerState } from '../state/playerState.js';
import { soundFx } from '../utils/audio.js';
import { router } from '../utils/router.js';

export class QuizScreen {
  constructor() {
    this.screenEl = null;
    this.engine = new QuizEngine();
    this.locationId = 'gujarat-master';
    this.keyHandler = null;
  }

  init() {
    this.screenEl = document.getElementById('screen-quiz');
  }

  onEnter(params = {}) {
    const locId = params.locationId || 'gujarat-master';
    this.locationId = locId;

    const quizData = locId === 'gujarat-master' 
      ? getGujaratMasterQuiz() 
      : getQuizByLocationId(locId);

    this.engine.loadQuiz(quizData, {
      onStateChange: () => this.render(),
      onComplete: (results) => this.handleQuizComplete(results)
    });

    this.bindKeyboardShortcuts();
    this.render();
  }

  onLeave() {
    this.unbindKeyboardShortcuts();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  bindKeyboardShortcuts() {
    this.unbindKeyboardShortcuts();
    this.keyHandler = (e) => {
      const state = this.engine.getState();
      if (state.isFinished) return;

      // Keys 1-4 or A-D to answer
      if (!state.isAnswered) {
        if (e.key === '1' || e.key === 'a' || e.key === 'A') this.selectAnswer(0);
        else if (e.key === '2' || e.key === 'b' || e.key === 'B') this.selectAnswer(1);
        else if (e.key === '3' || e.key === 'c' || e.key === 'C') this.selectAnswer(2);
        else if (e.key === '4' || e.key === 'd' || e.key === 'D') this.selectAnswer(3);
      } else {
        // Space or Enter for next question
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleNextQuestion();
        }
      }
    };
    window.addEventListener('keydown', this.keyHandler);
  }

  unbindKeyboardShortcuts() {
    if (this.keyHandler) {
      window.removeEventListener('keydown', this.keyHandler);
      this.keyHandler = null;
    }
  }

  render() {
    if (!this.screenEl) return;

    const state = this.engine.getState();

    if (state.isFinished) {
      this.renderResultsScreen(this.engine.getFinalResults());
      return;
    }

    const question = state.currentQuestion;
    if (!question) return;

    const keycaps = ['A', 'B', 'C', 'D'];

    this.screenEl.innerHTML = `
      <div class="quiz-screen-layout">
        
        <!-- Quiz Top Bar -->
        <div class="quiz-top-bar">
          <button id="quiz-exit-btn" class="breadcrumb-btn" aria-label="Exit Quiz">
            <span>←</span> Exit Quiz
          </button>

          <div class="quiz-stat-pill">
            <span>QUESTION:</span>
            <span class="val">${state.currentIndex + 1} / ${state.totalQuestions}</span>
          </div>

          <div class="quiz-stat-pill">
            <span>SCORE:</span>
            <span class="val">${state.score} PTS</span>
          </div>

          ${state.streak > 1 ? `
            <div class="quiz-stat-pill quiz-streak-flame">
              <span>🔥 x${state.streak} STREAK!</span>
            </div>
          ` : ''}
        </div>

        <!-- Lifelines Dock -->
        <div class="quiz-lifelines-dock">
          <button id="quiz-fifty-fifty-btn" class="lifeline-btn" ${state.lifelines.fiftyFifty || state.isAnswered ? 'disabled' : ''}>
            <span>✂️</span> 50:50 Lifeline
          </button>

          <button id="quiz-ai-hint-btn" class="lifeline-btn" ${state.lifelines.aiHint || state.isAnswered ? 'disabled' : ''}>
            <span>💡</span> Mira's AI Cultural Hint
          </button>
        </div>

        <!-- Question Card -->
        <div class="quiz-question-card">
          
          <div class="question-header-row">
            <span class="question-location-pill">📍 ${question.location || 'Gujarat Heritage'}</span>
            <span class="question-progress-text">Q${state.currentIndex + 1} OF ${state.totalQuestions}</span>
          </div>

          <h2 class="question-text-title">${question.question}</h2>

          <!-- Mira AI Cultural Hint Box (if lifeline active) -->
          ${state.showAiHint ? `
            <div class="mira-ai-hint-box">
              <div class="mira-hint-avatar anim-float">
                <img src="character/mira-avatar.png" alt="Mira" class="mira-hint-avatar-img" />
              </div>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.2rem;">
                  <strong style="font-size: 0.78rem; color: var(--color-royal-gold); font-family: var(--font-title);">MIRA'S CULTURAL CLUE</strong>
                  <button id="hint-tts-btn" class="btn-icon" style="width: 24px; height: 24px; font-size: 0.7rem;" title="Listen to Hint">🔊</button>
                </div>
                <p style="font-size: 0.85rem; color: #F8FAFC; line-height: 1.4;">${question.aiHint}</p>
              </div>
            </div>
          ` : ''}

          <!-- 4 Answer Options Grid -->
          <div class="quiz-options-grid">
            ${question.options.map((optText, idx) => {
              const isDisabled5050 = state.disabledOptionIndices.includes(idx);
              let stateClass = '';

              if (state.isAnswered) {
                if (idx === question.correctIndex) {
                  stateClass = 'opt-correct';
                } else if (idx === state.selectedOptionIndex) {
                  stateClass = 'opt-wrong';
                }
              }

              return `
                <button class="quiz-option-btn ${stateClass} ${isDisabled5050 ? 'opt-disabled-5050' : ''}" 
                        data-option-index="${idx}"
                        ${state.isAnswered || isDisabled5050 ? 'disabled' : ''}
                        aria-label="Option ${keycaps[idx]}: ${optText}">
                  <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <span class="option-keycap">${keycaps[idx]}</span>
                    <span>${optText}</span>
                  </div>
                  
                  ${state.isAnswered ? (
                    idx === question.correctIndex 
                      ? '<span style="font-size: 1.2rem;">✅</span>' 
                      : (idx === state.selectedOptionIndex ? '<span style="font-size: 1.2rem;">❌</span>' : '')
                  ) : ''}
                </button>
              `;
            }).join('')}
          </div>

          <!-- Educational Explanation Box (Shows after answering) -->
          ${state.isAnswered ? `
            <div class="quiz-explanation-box">
              <div class="explanation-status-row ${state.selectedOptionIndex === question.correctIndex ? 'correct' : 'wrong'}">
                <span>${state.selectedOptionIndex === question.correctIndex ? '🌟 Excellent! Correct Answer' : '⚠️ Misconception Clarified'}</span>
                <span style="font-size: 0.8rem; font-family: var(--font-mono); color: #94A3B8;">EDUCATIONAL INSIGHT</span>
              </div>
              <p class="explanation-body-text">${question.explanation}</p>
              <div class="explanation-cultural-callout">
                <strong>Cultural Provenance:</strong> ${question.culturalFact}
              </div>
            </div>
          ` : ''}

          <!-- Bottom Navigation Action Button -->
          <div style="display: flex; justify-content: flex-end; margin-top: 0.5rem;">
            <button id="quiz-next-question-btn" class="btn btn-primary btn-shimmer-effect" 
                    ${!state.isAnswered ? 'disabled style="opacity: 0.4; pointer-events: none;"' : ''}>
              ${state.currentIndex + 1 === state.totalQuestions ? 'Finish Quiz & View Results 🏆 →' : 'Next Question →'}
            </button>
          </div>

        </div>

      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Exit quiz button
    const exitBtn = this.screenEl.querySelector('#quiz-exit-btn');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        soundFx.playClick();
        router.navigateTo('gujarat-map');
      });
    }

    // 50:50 Lifeline button
    const fiftyFiftyBtn = this.screenEl.querySelector('#quiz-fifty-fifty-btn');
    if (fiftyFiftyBtn) {
      fiftyFiftyBtn.addEventListener('click', () => {
        soundFx.playClick();
        this.engine.useFiftyFifty();
      });
    }

    // AI Hint Lifeline button
    const aiHintBtn = this.screenEl.querySelector('#quiz-ai-hint-btn');
    if (aiHintBtn) {
      aiHintBtn.addEventListener('click', () => {
        soundFx.playClick();
        this.engine.useAiHint();
      });
    }

    // TTS audio button for Hint
    const hintTtsBtn = this.screenEl.querySelector('#hint-tts-btn');
    if (hintTtsBtn) {
      hintTtsBtn.addEventListener('click', () => {
        const question = this.engine.getCurrentQuestion();
        if (question && question.aiHint) {
          this.speakText(question.aiHint);
        }
      });
    }

    // Option selection clicks
    const optionBtns = this.screenEl.querySelectorAll('.quiz-option-btn:not([disabled])');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-option-index'), 10);
        this.selectAnswer(index);
      });
    });

    // Next question button
    const nextBtn = this.screenEl.querySelector('#quiz-next-question-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        soundFx.playClick();
        this.handleNextQuestion();
      });
    }
  }

  selectAnswer(index) {
    const result = this.engine.selectOption(index);
    if (!result) return;

    if (result.isCorrect) {
      soundFx.playChime();
    } else {
      soundFx.playLockedBuzz();
    }
  }

  handleNextQuestion() {
    this.engine.nextQuestion();
  }

  handleQuizComplete(results) {
    soundFx.playChime();

    // Record complete quiz results, award XP/score, unlock collectibles
    playerState.recordQuizResult(this.locationId, results);
  }

  renderResultsScreen(results) {
    this.screenEl.innerHTML = `
      <div class="quiz-screen-layout" style="justify-content: center;">
        
        <div class="quiz-results-card">
          
          <div class="anim-float">
            <div style="width: 90px; height: 90px; border-radius: 50%; background: radial-gradient(circle, #FFE259, #FF7A00); display: flex; align-items: center; justify-content: center; font-size: 3rem; box-shadow: 0 0 35px rgba(255, 215, 0, 0.6); border: 2px solid #FFFFFF;">
              ${results.isPassed ? '👑' : '📜'}
            </div>
          </div>

          <div>
            <span class="badge-playable" style="margin-bottom: 0.5rem;">QUIZ ASSESSMENT COMPLETE</span>
            <h2 style="font-family: var(--font-display); font-size: 2rem; color: #FFFFFF; line-height: 1.2;">
              ${results.performanceGrade}
            </h2>
            <p style="font-size: 0.9rem; color: var(--color-peacock-light); margin-top: 0.25rem; max-width: 600px;">
              ${results.performanceMessage}
            </p>
          </div>

          <!-- Stats Matrix -->
          <div class="results-stats-matrix">
            <div class="result-stat-cell">
              <span class="result-stat-val">${results.correctCount} / ${results.totalQuestions}</span>
              <span class="result-stat-lbl">Correct Answers</span>
            </div>

            <div class="result-stat-cell">
              <span class="result-stat-val">${results.percentage}%</span>
              <span class="result-stat-lbl">Accuracy</span>
            </div>

            <div class="result-stat-cell">
              <span class="result-stat-val">${results.score}</span>
              <span class="result-stat-lbl">Final Score</span>
            </div>

            <div class="result-stat-cell">
              <span class="result-stat-val" style="color: #34D399;">+${results.xpEarned} XP</span>
              <span class="result-stat-lbl">XP Earned ⚡</span>
            </div>
          </div>

          <!-- Unlocked Artifact Card Banner -->
          ${results.isPassed && results.unlocksArtifact ? `
            <div class="unlocked-artifact-banner">
              <div class="unlocked-artifact-icon">${results.unlocksArtifact.icon}</div>
              <div>
                <div style="font-size: 0.72rem; font-family: var(--font-mono); font-weight: 700; color: var(--color-royal-gold); text-transform: uppercase;">
                  ✨ UNLOCKED ${results.unlocksArtifact.rarity} ARTIFACT
                </div>
                <h4 style="font-family: var(--font-title); font-weight: 700; font-size: 1rem; color: #FFFFFF;">
                  ${results.unlocksArtifact.name}
                </h4>
                <p style="font-size: 0.78rem; color: #CBD5E1; line-height: 1.4;">${results.unlocksArtifact.desc}</p>
              </div>
            </div>
          ` : ''}

          <!-- Action Buttons -->
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-top: 0.5rem;">
            <button id="results-retake-btn" class="btn btn-outline" style="padding: 0.75rem 1.75rem;">
              🔄 Retake Quiz
            </button>
            
            <button id="results-return-map-btn" class="btn btn-primary btn-shimmer-effect" style="padding: 0.75rem 2rem;">
              🗺️ Continue Gujarat Yatra →
            </button>
          </div>

        </div>

      </div>
    `;

    const retakeBtn = this.screenEl.querySelector('#results-retake-btn');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
        soundFx.playClick();
        this.engine.restart();
        this.render();
      });
    }

    const returnMapBtn = this.screenEl.querySelector('#results-return-map-btn');
    if (returnMapBtn) {
      returnMapBtn.addEventListener('click', () => {
        soundFx.playChime();
        router.navigateTo('gujarat-map');
      });
    }
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

export const quizScreen = new QuizScreen();
