// js/state/playerState.js - Centralized reactive player state management & progression system

import { AVATARS } from '../data/statesData.js';
import { notification } from '../components/NotificationToast.js';

const STORAGE_KEY = 'bharatverse_player_state_v2';

const LEVEL_TITLES = [
  'Novice Yatri',
  'Cultural Scout',
  'Heritage Seeker',
  'State Scholar',
  'Guardian of Gujarat 👑'
];

const DEFAULT_STATE = {
  isLoggedIn: false,
  name: 'Yatri Explorer',
  avatarId: 'veer',
  avatarIcon: '🪖',
  title: 'Novice Yatri',
  level: 1,
  xp: 0,
  xpToNextLevel: 250,
  totalXP: 0,
  score: 0,
  coins: 100,
  completedLocations: [],
  completedStories: [],
  completedGames: [],
  quizResults: {},
  unlockedItems: [],
  unlockedStates: ['gujarat'],
  rajasthanUnlockShown: false,
  rajasthanUnlockAnimationPlayed: false,
  selectedStateId: 'gujarat',
  selectedGujaratLocationId: 'kutch',
  soundEnabled: true,
  language: 'en' // 'en' | 'hi' | 'gu'
};

class PlayerStateManager {
  constructor() {
    this.state = this.loadState();
    this.listeners = new Set();
  }

  loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_STATE,
          ...parsed,
          language: parsed.language || 'en',
          completedLocations: Array.isArray(parsed.completedLocations) ? parsed.completedLocations : (parsed.visitedLocations || []),
          completedStories: Array.isArray(parsed.completedStories) ? parsed.completedStories : [],
          completedGames: Array.isArray(parsed.completedGames) ? parsed.completedGames : [],
          quizResults: parsed.quizResults || {},
          unlockedItems: Array.isArray(parsed.unlockedItems) ? parsed.unlockedItems : [],
          unlockedStates: Array.isArray(parsed.unlockedStates) ? parsed.unlockedStates : ['gujarat'],
          rajasthanUnlockShown: Boolean(parsed.rajasthanUnlockShown),
          rajasthanUnlockAnimationPlayed: Boolean(parsed.rajasthanUnlockAnimationPlayed)
        };
      }
    } catch (e) {
      console.warn('Failed to load player state from localStorage', e);
    }
    return { ...DEFAULT_STATE };
  }

  setLanguage(lang) {
    this.state.language = lang || 'en';
    this.saveState();
    this.notify();
  }

  getLanguage() {
    return this.state.language || 'en';
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to save player state', e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    // Immediately emit current state to new subscriber
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  getState() {
    return { ...this.state };
  }

  // --- Profile & Authentication ---

  login(name, avatarId) {
    const avatar = AVATARS.find(a => a.id === avatarId) || AVATARS[0];
    this.state.isLoggedIn = true;
    this.state.name = name.trim() || 'Yatri';
    this.state.avatarId = avatar.id;
    this.state.avatarIcon = avatar.icon;
    this.state.title = LEVEL_TITLES[Math.min(this.state.level - 1, LEVEL_TITLES.length - 1)];
    this.saveState();
  }

  loginAsGuest() {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const guestAvatar = AVATARS[0];
    this.login(`Yatri_${randomSuffix}`, guestAvatar.id);
  }

  logout() {
    this.state = { ...DEFAULT_STATE };
    localStorage.removeItem(STORAGE_KEY);
    this.notify();
  }

  resetProgress() {
    const currentName = this.state.name;
    const currentAvatar = this.state.avatarId;
    const currentAvatarIcon = this.state.avatarIcon;
    const sound = this.state.soundEnabled;

    this.state = {
      ...DEFAULT_STATE,
      isLoggedIn: true,
      name: currentName,
      avatarId: currentAvatar,
      avatarIcon: currentAvatarIcon,
      soundEnabled: sound
    };

    this.saveState();
    notification.showReward({
      title: 'Expedition Progress Reset',
      subtitle: 'All scores and exploration metrics have been reset to zero.',
      icon: '🔄',
      badge: 'RESET SYSTEM'
    });
  }

  // --- XP & Score Calculations ---

  addXP(amount) {
    if (amount <= 0) return { leveledUp: false, newLevel: this.state.level };

    this.state.totalXP += amount;
    this.state.xp += amount;

    let leveledUp = false;
    let oldLevel = this.state.level;

    while (this.state.xp >= this.state.xpToNextLevel) {
      this.state.xp -= this.state.xpToNextLevel;
      this.state.level += 1;
      this.state.xpToNextLevel = this.state.level * 250;
      leveledUp = true;
    }

    if (leveledUp) {
      this.state.title = LEVEL_TITLES[Math.min(this.state.level - 1, LEVEL_TITLES.length - 1)];
      notification.showLevelUp(this.state.level, this.state.title);
    }

    this.saveState();
    return { leveledUp, newLevel: this.state.level, oldLevel };
  }

  addScore(amount) {
    this.state.score += amount;
    this.saveState();
  }

  addCoins(amount) {
    this.state.coins += amount;
    this.saveState();
  }

  toggleSound() {
    this.state.soundEnabled = !this.state.soundEnabled;
    this.saveState();
    return this.state.soundEnabled;
  }

  setSelectedState(stateId) {
    this.state.selectedStateId = stateId;
    this.saveState();
  }

  setSelectedGujaratLocation(locationId) {
    this.state.selectedGujaratLocationId = locationId;
    this.saveState();
  }

  // --- Exploration Tracking & State Unlocks ---

  getGujaratExplorationProgress() {
    const GUJARAT_ALL_LOCATIONS = ['kutch', 'gir-saurashtra', 'ahmedabad-central', 'patan-north'];
    const exploredList = GUJARAT_ALL_LOCATIONS.filter(id => this.state.completedLocations.includes(id));
    const exploredCount = exploredList.length;
    const totalLocations = GUJARAT_ALL_LOCATIONS.length;
    const percentage = Math.min(100, Math.round((exploredCount / totalLocations) * 100));
    const isCompleted = exploredCount === totalLocations;
    const isRajasthanUnlocked = this.isStateUnlocked('rajasthan');

    return {
      totalLocations,
      exploredCount,
      percentage,
      isCompleted,
      exploredList,
      isRajasthanUnlocked,
      rajasthanUnlockShown: Boolean(this.state.rajasthanUnlockShown),
      rajasthanUnlockAnimationPlayed: Boolean(this.state.rajasthanUnlockAnimationPlayed)
    };
  }

  isLocationExplored(locationId) {
    return Boolean(this.state.completedLocations && this.state.completedLocations.includes(locationId));
  }

  isStateUnlocked(stateId) {
    if (stateId === 'gujarat') return true;
    return Boolean(this.state.unlockedStates && this.state.unlockedStates.includes(stateId));
  }

  unlockState(stateId) {
    if (!this.state.unlockedStates.includes(stateId)) {
      this.state.unlockedStates.push(stateId);
      this.saveState();
    }
  }

  setRajasthanUnlockShown(shown = true) {
    this.state.rajasthanUnlockShown = shown;
    this.saveState();
  }

  isRajasthanUnlockAnimationPending() {
    return this.isStateUnlocked('rajasthan') && !this.state.rajasthanUnlockAnimationPlayed;
  }

  setRajasthanUnlockAnimationPlayed(played = true) {
    this.state.rajasthanUnlockAnimationPlayed = played;
    this.saveState();
  }

  // --- Progression Event Hooks ---

  // 1. Exploring Locations (+50 XP, +100 Score)
  recordLocationExplored(locationId, xp = 50, score = 100) {
    const isFirstTime = !this.state.completedLocations.includes(locationId);

    if (isFirstTime) {
      this.state.completedLocations.push(locationId);
    }

    const earnedXP = isFirstTime ? xp : Math.round(xp / 2);
    const earnedScore = isFirstTime ? score : Math.round(score / 2);

    this.addScore(earnedScore);
    const xpResult = this.addXP(earnedXP);

    // Check if Gujarat 4/4 locations completed and unlock Rajasthan
    const progress = this.getGujaratExplorationProgress();
    let newlyCompletedGujarat = false;

    if (progress.isCompleted && !this.isStateUnlocked('rajasthan')) {
      this.unlockState('rajasthan');
      newlyCompletedGujarat = true;
    }

    notification.showReward({
      title: `${isFirstTime ? 'New Location Discovered!' : 'Location Re-explored!'}`,
      subtitle: `${locationId.toUpperCase()} mapped in your heritage journal.`,
      xp: earnedXP,
      score: earnedScore,
      icon: '📍',
      badge: 'EXPLORATION'
    });

    this.saveState();
    return {
      ...xpResult,
      isFirstTime,
      newlyCompletedGujarat,
      progress
    };
  }

  markLocationExplored(locationId, xp = 50, score = 100) {
    return this.recordLocationExplored(locationId, xp, score);
  }

  visitGujaratLocation(locationId) {
    return this.recordLocationExplored(locationId);
  }

  // 2. Completing Stories (+100 XP, +200 Score)
  recordStoryCompleted(locationId, xp = 100, score = 200) {
    const isFirstTime = !this.state.completedStories.includes(locationId);

    if (isFirstTime) {
      this.state.completedStories.push(locationId);
    }

    const earnedXP = isFirstTime ? xp : Math.round(xp / 2);
    const earnedScore = isFirstTime ? score : Math.round(score / 2);

    this.addScore(earnedScore);
    const xpResult = this.addXP(earnedXP);

    notification.showReward({
      title: `${isFirstTime ? 'Story Chapter Mastered!' : 'Story Replayed!'}`,
      subtitle: 'Cultural lore and heritage insight recorded.',
      xp: earnedXP,
      score: earnedScore,
      icon: '📖',
      badge: 'STORY CHAPTER'
    });

    this.saveState();
    return xpResult;
  }

  completeStory(locationId, xp = 100) {
    return this.recordStoryCompleted(locationId, xp);
  }

  isStoryCompleted(locationId) {
    return this.state.completedStories && this.state.completedStories.includes(locationId);
  }

  // 3. Completing Mini-Games (+100 XP, +Game Score)
  recordGameCompleted(gameId, xp = 100, gameScore = 300) {
    const isFirstTime = !this.state.completedGames.includes(gameId);

    if (isFirstTime) {
      this.state.completedGames.push(gameId);
    }

    this.addScore(gameScore);
    this.addCoins(50);
    const xpResult = this.addXP(xp);

    notification.showReward({
      title: 'Heritage Puzzle Solved! ⭐⭐⭐',
      subtitle: 'Culinary flavor harmony achieved with excellence.',
      xp: xp,
      score: gameScore,
      icon: '🎮',
      badge: 'MINI-GAME WIN'
    });

    this.saveState();
    return xpResult;
  }

  // 4. Answering Quizzes & Master Rewards (+150 XP, +Quiz Score)
  recordQuizResult(quizId, results) {
    const isFirstPass = !this.state.quizResults[quizId] || !this.state.quizResults[quizId].passed;

    this.state.quizResults[quizId] = {
      passed: results.isPassed,
      score: results.score,
      correctCount: results.correctCount,
      totalQuestions: results.totalQuestions,
      timestamp: Date.now()
    };

    this.addScore(results.score);
    this.addCoins(50);

    let unlockedItem = null;
    if (results.isPassed && results.unlocksArtifact) {
      unlockedItem = this.unlockItem(results.unlocksArtifact);
    }

    const earnedXP = results.xpEarned || 150;
    const xpResult = this.addXP(earnedXP);

    notification.showReward({
      title: `${results.isPassed ? 'Cultural Mastery Quiz Conquered!' : 'Quiz Attempt Finished!'}`,
      subtitle: `${results.correctCount}/${results.totalQuestions} questions answered accurately.`,
      xp: earnedXP,
      score: results.score,
      icon: '🏆',
      badge: 'QUIZ ENGINE',
      itemUnlocked: unlockedItem
    });

    this.saveState();
    return xpResult;
  }

  // Unlocking Collectibles & Artifacts
  unlockItem(artifactData) {
    if (!artifactData || !artifactData.id) return null;

    const exists = this.state.unlockedItems.find(i => i.id === artifactData.id);
    if (!exists) {
      const item = {
        ...artifactData,
        unlockedAt: Date.now()
      };
      this.state.unlockedItems.push(item);
      this.saveState();
      return item;
    }
    return null;
  }

  // --- Completion Percentage & Mastery Analytics ---

  getGujaratCompletionStats() {
    const totalLocations = 4;
    const totalStories = 4;
    const totalGames = 4;

    const locExplored = this.state.completedLocations.length;
    const storiesMastered = this.state.completedStories.length;
    const gamesWon = this.state.completedGames.length;
    const isQuizPassed = Boolean(this.state.quizResults['gujarat-master'] && this.state.quizResults['gujarat-master'].passed);

    // Total 13 objective points: 4 locations + 4 stories + 4 games + 1 master quiz
    const totalPoints = totalLocations + totalStories + totalGames + 1;
    const earnedPoints = locExplored + storiesMastered + gamesWon + (isQuizPassed ? 1 : 0);
    const overallPercentage = Math.min(100, Math.round((earnedPoints / totalPoints) * 100));

    let masteryRank = 'Novice Yatri';
    if (overallPercentage === 100) masteryRank = 'Guardian of Gujarat 👑';
    else if (overallPercentage >= 75) masteryRank = 'State Scholar 📜';
    else if (overallPercentage >= 50) masteryRank = 'Heritage Seeker 🧭';
    else if (overallPercentage >= 25) masteryRank = 'Cultural Scout 🌟';

    return {
      locExplored,
      totalLocations,
      storiesMastered,
      totalStories,
      gamesWon,
      totalGames,
      isQuizPassed,
      overallPercentage,
      masteryRank,
      totalScore: this.state.score,
      totalXP: this.state.totalXP,
      unlockedItemsCount: this.state.unlockedItems.length
    };
  }
}

export const playerState = new PlayerStateManager();
