// js/state/girGuardianState.js - Centralized reactive game state for "GIR GUARDIAN"

import { GIR_GUARDIAN_DATA } from '../data/girGuardianData.js';
import { playerState } from './playerState.js';

const STORAGE_KEY = 'bharatverse_gir_guardian_v2';

class GirGuardianState {
  constructor() {
    this.listeners = [];
    this.reset(false);
    this.load();
  }

  getDefaultState() {
    return {
      currentScreen: 'intro', // 'intro' | 'environment' | 'mission-1' | 'mission-2' | 'mission-3' | 'completion'
      activeMissionId: null,
      
      // Mission Step Trackers
      m1Step: 0,
      m1CluesInspected: [],
      m1Completed: false,

      m2Step: 0,
      m2CluesInspected: [],
      m2DecisionId: null,
      m2Completed: false,

      m3Step: 0,
      m3HazardsInspected: [],
      m3ActionId: null,
      m3Completed: false,

      // Discoveries & Collectibles
      unlockedDiscoveryIds: [],
      activeDiscovery: null, // Discovery popup card data

      // Guardian Progression Metrics
      guardianXP: 0,
      guardianLevel: 1,
      completedMissions: [], // ['mission-1', 'mission-2', 'mission-3']

      // Calculated Performance Metrics
      explorationPct: 0,
      wildlifePct: 0,
      conservationPct: 0,
      finalRank: 'Novice Yatri'
    };
  }

  reset(notify = true) {
    this.state = this.getDefaultState();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Could not reset Gir Guardian localStorage:', e);
    }
    if (notify) this.notify();
  }

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        this.state = { ...this.getDefaultState(), ...parsed };
      }
    } catch (e) {
      console.warn('Failed to load Gir Guardian state:', e);
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to save Gir Guardian state:', e);
    }
    this.notify();
  }

  getState() {
    return this.state;
  }

  setScreen(screenName) {
    this.state.currentScreen = screenName;
    this.save();
  }

  startMission(missionId) {
    this.state.activeMissionId = missionId;
    this.state.currentScreen = missionId;
    this.save();
  }

  // --- DISCOVERY UNLOCK TRIGGER ---
  unlockDiscovery(discoveryId) {
    const disc = GIR_GUARDIAN_DATA.discoveries[discoveryId];
    if (!disc) return null;

    if (!this.state.unlockedDiscoveryIds.includes(discoveryId)) {
      this.state.unlockedDiscoveryIds.push(discoveryId);
      this.addGuardianXP(disc.xp);
    }

    this.state.activeDiscovery = disc;
    this.save();
    return disc;
  }

  dismissDiscovery() {
    this.state.activeDiscovery = null;
    this.save();
  }

  // --- PROGRESSION & XP ---
  addGuardianXP(amount) {
    this.state.guardianXP += amount;
    
    // Level calculation (Every 80 XP = 1 Level)
    this.state.guardianLevel = Math.max(1, Math.min(3, Math.floor(this.state.guardianXP / 80) + 1));
    
    // Sync with global player profile
    playerState.addXP(amount);
    this.calculateMetrics();
  }

  // --- MISSION 1 PROGRESSION ---
  inspectM1Clue(clueId) {
    if (!this.state.m1CluesInspected.includes(clueId)) {
      this.state.m1CluesInspected.push(clueId);
      this.save();
    }
  }

  advanceM1Step() {
    if (this.state.m1Step < 2) {
      this.state.m1Step++;
      this.save();
    }
  }

  completeMission1() {
    this.state.m1Completed = true;
    if (!this.state.completedMissions.includes('mission-1')) {
      this.state.completedMissions.push('mission-1');
      this.addGuardianXP(GIR_GUARDIAN_DATA.mission1.xpReward);
    }
    this.unlockDiscovery('disc-lion');
    this.unlockDiscovery('disc-teak');
    this.calculateMetrics();
    this.save();
  }

  // --- MISSION 2 PROGRESSION ---
  inspectM2Clue(index) {
    if (!this.state.m2CluesInspected.includes(index)) {
      this.state.m2CluesInspected.push(index);
      this.save();
    }
  }

  advanceM2Step() {
    if (this.state.m2Step < 1) {
      this.state.m2Step++;
      this.save();
    }
  }

  submitM2Decision(decisionId) {
    const dec = GIR_GUARDIAN_DATA.mission2.steps[1].decisions.find(d => d.id === decisionId);
    if (!dec) return null;

    this.state.m2DecisionId = decisionId;
    this.state.m2Completed = true;
    if (!this.state.completedMissions.includes('mission-2')) {
      this.state.completedMissions.push('mission-2');
      this.addGuardianXP(dec.xp);
    }
    this.unlockDiscovery('disc-waterhole');
    this.unlockDiscovery('disc-chital');
    this.calculateMetrics();
    this.save();
    return dec;
  }

  // --- MISSION 3 PROGRESSION ---
  inspectM3Hazard(index) {
    if (!this.state.m3HazardsInspected.includes(index)) {
      this.state.m3HazardsInspected.push(index);
      this.save();
    }
  }

  advanceM3Step() {
    if (this.state.m3Step < 2) {
      this.state.m3Step++;
      this.save();
    }
  }

  submitM3Action(actionId) {
    const act = GIR_GUARDIAN_DATA.mission3.steps[2].actions.find(a => a.id === actionId);
    if (!act) return null;

    this.state.m3ActionId = actionId;
    this.state.m3Completed = true;
    if (!this.state.completedMissions.includes('mission-3')) {
      this.state.completedMissions.push('mission-3');
      this.addGuardianXP(act.xp);
    }
    this.unlockDiscovery('disc-pride');
    this.unlockDiscovery('disc-maldhari');
    this.calculateMetrics();
    
    // Complete whole location in global state!
    playerState.markLocationExplored('gir-saurashtra');
    this.save();
    return act;
  }

  // --- CALCULATE DYNAMIC METRICS ---
  calculateMetrics() {
    const totalDiscoveries = Object.keys(GIR_GUARDIAN_DATA.discoveries).length;
    const unlockedCount = this.state.unlockedDiscoveryIds.length;
    
    const m1Done = this.state.m1Completed ? 1 : 0;
    const m2Done = this.state.m2Completed ? 1 : 0;
    const m3Done = this.state.m3Completed ? 1 : 0;
    const missionsDone = m1Done + m2Done + m3Done;

    // Wildlife %: based on clue inspections & animal discovery
    this.state.wildlifePct = Math.min(100, Math.round((unlockedCount / totalDiscoveries) * 100));

    // Exploration %: based on visited zones & trail progression
    this.state.explorationPct = Math.min(100, Math.round((missionsDone / 3) * 100));

    // Conservation %: based on decision quality
    let conservationPoints = 0;
    if (this.state.m2DecisionId === 'dec-solar-cistern') conservationPoints += 50;
    else if (this.state.m2DecisionId === 'dec-diesel-tanker') conservationPoints += 25;
    
    if (this.state.m3ActionId === 'act-smart-corridor') conservationPoints += 50;
    else if (this.state.m3ActionId === 'act-tranquilize') conservationPoints += 20;

    this.state.conservationPct = Math.min(100, conservationPoints || (missionsDone > 0 ? 60 : 0));

    // Final Rank
    const averageScore = Math.round((this.state.wildlifePct + this.state.explorationPct + this.state.conservationPct) / 3);
    if (averageScore >= 85) this.state.finalRank = 'Master Guardian of Gir 🦁';
    else if (averageScore >= 65) this.state.finalRank = 'Senior Wildlife Ranger 🌿';
    else this.state.finalRank = 'Guardian Trainee 🐾';
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  notify() {
    this.listeners.forEach(cb => {
      try {
        cb(this.state);
      } catch (e) {
        console.error('Error in GirGuardianState listener:', e);
      }
    });
  }
}

export const girGuardianState = new GirGuardianState();
