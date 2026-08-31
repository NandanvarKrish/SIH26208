// js/state/playerState.js - Centralized reactive player state management

import { AVATARS } from '../data/statesData.js';

const STORAGE_KEY = 'bharatverse_player_state_v1';

const DEFAULT_STATE = {
  isLoggedIn: false,
  name: 'Yatri Explorer',
  avatarId: 'veer',
  avatarIcon: '🪖',
  title: 'Novice Yatri',
  level: 1,
  xp: 50,
  xpToNextLevel: 250,
  totalXP: 50,
  coins: 100,
  soundEnabled: true,
  unlockedStates: ['gujarat'],
  selectedStateId: 'gujarat',
  selectedGujaratLocationId: 'kutch',
  visitedLocations: [],
  completedStories: [],
  storyScores: {},
  completedZones: []
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
        return { ...DEFAULT_STATE, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load player state from localStorage', e);
    }
    return { ...DEFAULT_STATE };
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

  // --- Actions ---

  login(name, avatarId) {
    const avatar = AVATARS.find(a => a.id === avatarId) || AVATARS[0];
    this.state.isLoggedIn = true;
    this.state.name = name.trim() || 'Yatri';
    this.state.avatarId = avatar.id;
    this.state.avatarIcon = avatar.icon;
    this.state.title = avatar.title;
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

  addXP(amount) {
    this.state.totalXP += amount;
    this.state.xp += amount;

    let leveledUp = false;
    while (this.state.xp >= this.state.xpToNextLevel) {
      this.state.xp -= this.state.xpToNextLevel;
      this.state.level += 1;
      this.state.xpToNextLevel = this.state.level * 250;
      leveledUp = true;
    }

    this.saveState();
    return { leveledUp, newLevel: this.state.level };
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

  visitGujaratLocation(locationId) {
    if (!this.state.visitedLocations.includes(locationId)) {
      this.state.visitedLocations.push(locationId);
      this.saveState();
    }
  }

  completeStory(locationId, xpAmount = 100) {
    if (!this.state.completedStories.includes(locationId)) {
      this.state.completedStories.push(locationId);
    }
    this.state.storyScores[locationId] = {
      completed: true,
      timestamp: Date.now()
    };
    this.saveState();
    return this.addXP(xpAmount);
  }

  isStoryCompleted(locationId) {
    return this.state.completedStories && this.state.completedStories.includes(locationId);
  }

  completeZone(zoneId) {
    if (!this.state.completedZones.includes(zoneId)) {
      this.state.completedZones.push(zoneId);
      this.saveState();
    }
  }
}

export const playerState = new PlayerStateManager();
