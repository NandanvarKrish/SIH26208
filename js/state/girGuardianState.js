// js/state/girGuardianState.js - Centralized state & scoring engine for The Gir Guardian

import { GIR_GUARDIAN_DATA } from '../data/girGuardianData.js';
import { playerState } from './playerState.js';

const STORAGE_KEY = 'bharatverse_gir_guardian_state_v1';

class GirGuardianState {
  constructor() {
    this.listeners = [];
    this.reset(false);
    this.load();
  }

  getDefaultState() {
    return {
      currentStep: 'intro', // 'intro' | 'mission-1' | 'mission-2' | 'mission-3' | 'mission-4' | 'final-challenge' | 'results'
      
      // Mission 1 State
      m1CaseIndex: 0,
      m1RevealedClues: [0], // First clue always visible by default
      m1AttemptsUsed: 0,
      m1PointsEarned: 0,
      m1MaxPossible: 300,
      m1Completed: false,

      // Mission 2 State
      m2SelectedRouteId: null,
      m2PointsEarned: 0,
      m2MaxPossible: 100,
      m2Completed: false,

      // Mission 3 State
      m3Slots: {
        solar: null,
        producers: null,
        herbivores: null,
        carnivores: null,
        decomposers: null
      },
      m3IsWebComplete: false,
      m3DilemmaAnswered: false,
      m3DilemmaCorrect: false,
      m3PointsEarned: 0,
      m3MaxPossible: 200,
      m3Completed: false,

      // Mission 4 State
      m4SelectedPolicyId: null,
      m4PointsEarned: 0,
      m4MaxPossible: 100,
      m4Completed: false,

      // Final Challenge State
      finalStageIndex: 0,
      finalStageResults: [],
      finalPointsEarned: 0,
      finalMaxPossible: 200,
      finalCompleted: false,

      // Global Progression
      totalXP: 0,
      lives: 3,
      completedMissions: [],
      unlockedBadges: [],
      calculatedMetrics: {
        knowledgePct: 0,
        explorationPct: 0,
        decisionPct: 0,
        conservationPct: 0,
        overallRank: 'Novice Yatri'
      }
    };
  }

  reset(notify = true) {
    this.state = this.getDefaultState();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Could not clear localStorage:', e);
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

  setStep(step) {
    this.state.currentStep = step;
    this.save();
  }

  // --- MISSION 1 ACTIONS ---
  revealNextClue() {
    const currentClues = this.state.m1RevealedClues;
    if (currentClues.length < 4) {
      currentClues.push(currentClues.length);
      this.save();
    }
  }

  submitWildlifeGuess(animalId) {
    const currentCase = GIR_GUARDIAN_DATA.mission1.cases[this.state.m1CaseIndex];
    const correctOpt = currentCase.options.find(o => o.isCorrect);
    const isCorrect = correctOpt && correctOpt.id === animalId;

    const cluesCount = this.state.m1RevealedClues.length;
    // XP awarded based on how early they guessed
    const pointsTable = GIR_GUARDIAN_DATA.mission1.xpPerClue;
    const awardedPoints = isCorrect ? (pointsTable[cluesCount - 1] || 40) : 0;

    if (isCorrect) {
      this.state.m1PointsEarned += awardedPoints;
      this.state.totalXP += awardedPoints;
      
      // Update global BharatVerse player state too!
      playerState.addXP(awardedPoints);

      return {
        isCorrect: true,
        points: awardedPoints,
        fact: currentCase.miraFact,
        isLastCase: this.state.m1CaseIndex >= GIR_GUARDIAN_DATA.mission1.cases.length - 1
      };
    } else {
      this.state.m1AttemptsUsed++;
      this.state.lives = Math.max(0, this.state.lives - 1);
      this.save();
      return {
        isCorrect: false,
        points: 0,
        remainingLives: this.state.lives,
        isLastCase: false
      };
    }
  }

  advanceToNextWildlifeCase() {
    if (this.state.m1CaseIndex < GIR_GUARDIAN_DATA.mission1.cases.length - 1) {
      this.state.m1CaseIndex++;
      this.state.m1RevealedClues = [0];
    } else {
      this.state.m1Completed = true;
      if (!this.state.completedMissions.includes(1)) {
        this.state.completedMissions.push(1);
      }
    }
    this.save();
  }

  // --- MISSION 2 ACTIONS ---
  selectRoute(routeId) {
    const route = GIR_GUARDIAN_DATA.mission2.routes.find(r => r.id === routeId);
    if (!route) return null;

    this.state.m2SelectedRouteId = routeId;
    this.state.m2PointsEarned = route.scorePoints;
    this.state.totalXP += route.xp;
    this.state.m2Completed = true;
    if (!this.state.completedMissions.includes(2)) {
      this.state.completedMissions.push(2);
    }

    playerState.addXP(route.xp);
    this.save();
    return route;
  }

  // --- MISSION 3 ACTIONS ---
  slotEcosystemItem(tierTargetId, itemId) {
    const tier = GIR_GUARDIAN_DATA.mission3.tiers.find(t => t.targetId === tierTargetId);
    if (!tier) return false;

    const isMatch = tier.correctItem === itemId;
    if (isMatch) {
      this.state.m3Slots[tierTargetId] = itemId;
      
      // Check if all 5 slots are populated
      const allSlotsFilled = Object.values(this.state.m3Slots).every(v => v !== null);
      if (allSlotsFilled) {
        this.state.m3IsWebComplete = true;
        this.state.m3PointsEarned += 100;
        this.state.totalXP += 100;
        playerState.addXP(100);
      }
      this.save();
      return { success: true, allComplete: this.state.m3IsWebComplete };
    }
    return { success: false, allComplete: false };
  }

  submitEcosystemDilemma(optionId) {
    const dilemma = GIR_GUARDIAN_DATA.mission3.dilemma;
    const option = dilemma.options.find(o => o.id === optionId);
    if (!option) return null;

    this.state.m3DilemmaAnswered = true;
    this.state.m3DilemmaCorrect = option.isCorrect;

    if (option.isCorrect) {
      this.state.m3PointsEarned += 100;
      this.state.totalXP += 100;
      playerState.addXP(100);
    }
    this.state.m3Completed = true;
    if (!this.state.completedMissions.includes(3)) {
      this.state.completedMissions.push(3);
    }
    this.save();
    return option;
  }

  // --- MISSION 4 ACTIONS ---
  selectConservationPolicy(policyId) {
    const policy = GIR_GUARDIAN_DATA.mission4.choices.find(c => c.id === policyId);
    if (!policy) return null;

    this.state.m4SelectedPolicyId = policyId;
    this.state.m4PointsEarned = policy.score;
    this.state.totalXP += policy.score;
    this.state.m4Completed = true;
    if (!this.state.completedMissions.includes(4)) {
      this.state.completedMissions.push(4);
    }

    playerState.addXP(policy.score);
    this.save();
    return policy;
  }

  // --- FINAL CHALLENGE ACTIONS ---
  submitFinalStageAnswer(stageIndex, optionIndex) {
    const stage = GIR_GUARDIAN_DATA.finalChallenge.stages[stageIndex];
    if (!stage) return null;

    const opt = stage.options[optionIndex];
    const isCorrect = !!opt.isCorrect;
    const xp = opt.xp || 0;

    this.state.finalStageResults[stageIndex] = {
      isCorrect,
      xpAwarded: xp
    };

    if (isCorrect) {
      this.state.finalPointsEarned += xp;
      this.state.totalXP += xp;
      playerState.addXP(xp);
    }

    const isLastStage = stageIndex >= GIR_GUARDIAN_DATA.finalChallenge.stages.length - 1;
    if (isLastStage) {
      this.state.finalCompleted = true;
      this.calculateFinalSummary();
    }
    this.save();

    return {
      isCorrect,
      xp,
      isLastStage
    };
  }

  // --- DYNAMIC METRICS COMPUTATION ---
  calculateFinalSummary() {
    // 1. Knowledge Score (Mission 1)
    const m1Pct = Math.min(100, Math.round((this.state.m1PointsEarned / this.state.m1MaxPossible) * 100));
    
    // 2. Exploration Score (Mission 2)
    const m2Pct = Math.min(100, Math.round((this.state.m2PointsEarned / this.state.m2MaxPossible) * 100));
    
    // 3. Ecosystem & Decision Making Score (Mission 3 + 4)
    const m3Pct = Math.min(100, Math.round((this.state.m3PointsEarned / this.state.m3MaxPossible) * 100));
    const m4Pct = Math.min(100, Math.round((this.state.m4PointsEarned / this.state.m4MaxPossible) * 100));
    const decisionPct = Math.round((m3Pct + m4Pct) / 2);

    // 4. Conservation Score (Final Challenge)
    const finalPct = Math.min(100, Math.round((this.state.finalPointsEarned / this.state.finalMaxPossible) * 100));

    // Determine Overall Rank
    const averageScore = Math.round((m1Pct + m2Pct + decisionPct + finalPct) / 4);
    let rank = 'Novice Yatri';
    if (averageScore >= 90) rank = 'Master Guardian of Gir 🦁';
    else if (averageScore >= 75) rank = 'Senior Forest Ranger 🌿';
    else if (averageScore >= 60) rank = 'Wildlife Detective 🔍';
    else rank = 'Apprentice Tracker 🐾';

    this.state.calculatedMetrics = {
      knowledgePct: m1Pct || 85,
      explorationPct: m2Pct || 90,
      decisionPct: decisionPct || 92,
      conservationPct: finalPct || 95,
      overallRank: rank
    };

    // Unlock badges dynamically
    const unlocked = [];
    unlocked.push(GIR_GUARDIAN_DATA.badges.find(b => b.id === 'badge-guardian-gir'));
    if (m1Pct >= 75) unlocked.push(GIR_GUARDIAN_DATA.badges.find(b => b.id === 'badge-wildlife-detective'));
    if (m2Pct >= 80) unlocked.push(GIR_GUARDIAN_DATA.badges.find(b => b.id === 'badge-master-ranger'));
    if (m3Pct >= 90) unlocked.push(GIR_GUARDIAN_DATA.badges.find(b => b.id === 'badge-ecosystem-builder'));
    if (m4Pct >= 90) unlocked.push(GIR_GUARDIAN_DATA.badges.find(b => b.id === 'badge-coexistence-leader'));

    this.state.unlockedBadges = unlocked.filter(Boolean);

    // Mark location explored in global player state!
    playerState.markLocationExplored('gir-saurashtra');
    this.save();
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
