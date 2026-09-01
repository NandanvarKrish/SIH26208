import { getArtifactById } from '../data/museumData.js';

export class QuizEngine {
  constructor() {
    this.quizData = null;
    this.currentIndex = 0;
    this.score = 0;
    this.correctCount = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.selectedOptionIndex = null;
    this.isAnswered = false;
    this.lifelines = {
      fiftyFifty: false,
      aiHint: false
    };
    this.disabledOptionIndices = new Set();
    this.showAiHint = false;
    this.isFinished = false;
    this.callbacks = {
      onStateChange: null,
      onComplete: null
    };
  }

  loadQuiz(quizData, callbacks = {}) {
    this.quizData = quizData;
    this.callbacks = { ...this.callbacks, ...callbacks };
    this.restart();
  }

  restart() {
    this.currentIndex = 0;
    this.score = 0;
    this.correctCount = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.selectedOptionIndex = null;
    this.isAnswered = false;
    this.lifelines = {
      fiftyFifty: false,
      aiHint: false
    };
    this.disabledOptionIndices = new Set();
    this.showAiHint = false;
    this.isFinished = false;
    this.notify();
  }

  getCurrentQuestion() {
    if (!this.quizData || !this.quizData.questions) return null;
    return this.quizData.questions[this.currentIndex] || null;
  }

  selectOption(index) {
    // Prevent accidental double submissions or selecting disabled options
    if (this.isAnswered || this.disabledOptionIndices.has(index) || this.isFinished) {
      return null;
    }

    const question = this.getCurrentQuestion();
    if (!question) return null;

    this.isAnswered = true;
    this.selectedOptionIndex = index;

    const isCorrect = index === question.correctIndex;

    if (isCorrect) {
      this.correctCount++;
      this.streak++;
      if (this.streak > this.maxStreak) this.maxStreak = this.streak;

      // Base score 100 + Streak bonus multiplier
      const streakMultiplier = this.streak > 1 ? 1 + (this.streak - 1) * 0.2 : 1.0;
      const questionScore = Math.round(100 * streakMultiplier);
      this.score += questionScore;
    } else {
      this.streak = 0;
    }

    this.notify();
    return {
      isCorrect,
      correctIndex: question.correctIndex,
      explanation: question.explanation,
      culturalFact: question.culturalFact,
      scoreGained: isCorrect ? Math.round(100 * (this.streak > 1 ? 1 + (this.streak - 1) * 0.2 : 1.0)) : 0
    };
  }

  useFiftyFifty() {
    if (this.lifelines.fiftyFifty || this.isAnswered || this.isFinished) {
      return false;
    }

    const question = this.getCurrentQuestion();
    if (!question) return false;

    // Find all wrong option indices
    const wrongIndices = question.options
      .map((_, idx) => idx)
      .filter(idx => idx !== question.correctIndex);

    // Shuffle and pick 2 wrong options to disable
    wrongIndices.sort(() => Math.random() - 0.5);
    const toDisable = wrongIndices.slice(0, 2);

    toDisable.forEach(idx => this.disabledOptionIndices.add(idx));
    this.lifelines.fiftyFifty = true;

    this.notify();
    return true;
  }

  useAiHint() {
    if (this.lifelines.aiHint || this.isFinished) {
      return false;
    }

    this.showAiHint = true;
    this.lifelines.aiHint = true;
    this.notify();
    return true;
  }

  nextQuestion() {
    if (!this.isAnswered && !this.isFinished) {
      return false;
    }

    const totalQuestions = this.quizData.questions.length;
    if (this.currentIndex + 1 < totalQuestions) {
      this.currentIndex++;
      this.selectedOptionIndex = null;
      this.isAnswered = false;
      this.disabledOptionIndices.clear();
      this.showAiHint = false;
      this.notify();
      return true;
    } else {
      this.finishQuiz();
      return false;
    }
  }

  finishQuiz() {
    this.isFinished = true;
    const results = this.getFinalResults();

    this.notify();
    if (typeof this.callbacks.onComplete === 'function') {
      this.callbacks.onComplete(results);
    }
    return results;
  }

  getFinalResults() {
    if (!this.quizData) return null;

    const totalQuestions = this.quizData.questions.length;
    const percentage = Math.round((this.correctCount / totalQuestions) * 100);
    const passingScore = this.quizData.passingScore || Math.ceil(totalQuestions * 0.7);
    const isPassed = this.correctCount >= passingScore;

    // Calculate XP reward
    const baseXP = this.quizData.xpReward || 150;
    const earnedXP = Math.round((this.correctCount / totalQuestions) * baseXP);

    let performanceGrade = 'Novice Yatri';
    let performanceMessage = 'Keep exploring the cultural hubs to deepen your heritage knowledge!';

    if (percentage === 100) {
      performanceGrade = 'Crown Heritage Scholar 👑';
      performanceMessage = 'Flawless Mastery! You answered every question with profound cultural wisdom.';
    } else if (percentage >= 80) {
      performanceGrade = 'Master Explorer 🌟';
      performanceMessage = 'Outstanding performance! You have captured the spirit and heritage of Gujarat.';
    } else if (percentage >= 60) {
      performanceGrade = 'Cultural Scout 🧭';
      performanceMessage = 'Good job! Review the story slides to master the subtle details.';
    }

    let unlockedArtifact = this.quizData.unlocksArtifact || null;
    if (!unlockedArtifact && this.quizData.unlocksArtifactId) {
      const art = getArtifactById(this.quizData.unlocksArtifactId);
      if (art) {
        unlockedArtifact = {
          id: art.id,
          name: art.name,
          rarity: art.rarity,
          icon: art.icon,
          desc: art.shortDesc || art.description
        };
      }
    }

    return {
      quizId: this.quizData.id,
      title: this.quizData.title,
      totalQuestions,
      correctCount: this.correctCount,
      percentage,
      score: this.score,
      maxStreak: this.maxStreak,
      xpEarned: isPassed ? baseXP : earnedXP,
      isPassed,
      unlocksArtifact: unlockedArtifact,
      performanceGrade,
      performanceMessage
    };
  }

  notify() {
    if (typeof this.callbacks.onStateChange === 'function') {
      this.callbacks.onStateChange(this.getState());
    }
  }

  getState() {
    return {
      quizTitle: this.quizData ? this.quizData.title : '',
      quizSubtitle: this.quizData ? this.quizData.subtitle : '',
      currentIndex: this.currentIndex,
      totalQuestions: this.quizData ? this.quizData.questions.length : 0,
      currentQuestion: this.getCurrentQuestion(),
      score: this.score,
      streak: this.streak,
      correctCount: this.correctCount,
      selectedOptionIndex: this.selectedOptionIndex,
      isAnswered: this.isAnswered,
      lifelines: { ...this.lifelines },
      disabledOptionIndices: Array.from(this.disabledOptionIndices),
      showAiHint: this.showAiHint,
      isFinished: this.isFinished
    };
  }
}
