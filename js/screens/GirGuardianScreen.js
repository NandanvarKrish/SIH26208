// js/screens/GirGuardianScreen.js - Complete interactive screen controller for "GIR GUARDIAN"

import { GIR_GUARDIAN_DATA } from '../data/girGuardianData.js';
import { girGuardianState } from '../state/girGuardianState.js';
import { playerState } from '../state/playerState.js';
import { soundFx } from '../utils/audio.js';
import { router } from '../utils/router.js';

export class GirGuardianScreen {
  constructor() {
    this.screenEl = null;
    this.unsubscribe = null;
  }

  init() {
    this.screenEl = document.getElementById('screen-gir-guardian');
    if (!this.screenEl) {
      this.screenEl = document.createElement('section');
      this.screenEl.id = 'screen-gir-guardian';
      this.screenEl.className = 'screen';
      this.screenEl.setAttribute('aria-label', 'Gir Guardian Game Screen');
      const screensViewport = document.querySelector('.screens-viewport') || document.getElementById('app');
      if (screensViewport) screensViewport.appendChild(this.screenEl);
    }
  }

  onEnter() {
    if (!this.screenEl) this.init();
    if (this.unsubscribe) this.unsubscribe();
    this.unsubscribe = girGuardianState.subscribe(() => this.render());
    this.render();
  }

  onLeave() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  render() {
    if (!this.screenEl) return;

    const state = girGuardianState.getState();
    const data = GIR_GUARDIAN_DATA;
    const globalPlayer = playerState.getState();

    let contentHtml = '';
    switch (state.currentScreen) {
      case 'intro':
        contentHtml = this.renderIntroHtml(data.intro);
        break;
      case 'environment':
        contentHtml = this.renderEnvironmentHtml(data, state);
        break;
      case 'mission-1':
        contentHtml = this.renderMission1Html(data.mission1, state);
        break;
      case 'mission-2':
        contentHtml = this.renderMission2Html(data.mission2, state);
        break;
      case 'mission-3':
        contentHtml = this.renderMission3Html(data.mission3, state);
        break;
      case 'completion':
        contentHtml = this.renderCompletionHtml(data, state);
        break;
      default:
        contentHtml = this.renderIntroHtml(data.intro);
    }

    this.screenEl.innerHTML = `
      <div class="gir-screen-container">
        <div class="gir-ambient-mist"></div>
        <div class="gir-content-wrap">
          
          <!-- GIR GUARDIAN GAME HUD -->
          <header class="gir-guardian-hud">
            
            <!-- Left: Player Profile -->
            <div class="gir-hud-profile">
              <div class="gir-hud-avatar-orb anim-glow-aura">
                <img src="character/mira-avatar.png" alt="Player Avatar" onerror="this.src='assets/mira/mira.png'" />
              </div>
              <div class="gir-hud-player-meta">
                <span class="gir-hud-player-name">${globalPlayer.name || 'Yatri Guardian'}</span>
                <span class="gir-hud-player-rank">${state.finalRank} (Lvl ${state.guardianLevel})</span>
              </div>
            </div>

            <!-- Center: Current Mission Context -->
            <div class="gir-hud-mission-center">
              <span class="gir-hud-mission-tag">
                ${state.currentScreen.startsWith('mission') 
                  ? `ACTIVE MISSION • STEP ${this.getCurrentStepNum(state)}/3` 
                  : 'GIR NATIONAL PARK • GUJARAT'}
              </span>
              <span class="gir-hud-mission-title">${this.getScreenTitle(state.currentScreen)}</span>
            </div>

            <!-- Right: Guardian XP & Navigation -->
            <div class="gir-hud-xp-group">
              <div class="gir-hud-xp-badge">
                <span>⚡</span>
                <span>${state.guardianXP} XP</span>
              </div>
              ${state.currentScreen !== 'environment' && state.currentScreen !== 'intro' ? `
                <button id="gir-hud-map-btn" class="gir-hud-nav-btn">🗺️ Environment</button>
              ` : ''}
              <button id="gir-hud-reset-btn" class="gir-hud-nav-btn" title="Reset Gir Progress">🔄</button>
            </div>

          </header>

          <!-- Main Screen Viewport -->
          ${contentHtml}

          <!-- Animated Field Discovery Popup Overlay -->
          ${state.activeDiscovery ? this.renderDiscoveryModalHtml(state.activeDiscovery) : ''}

        </div>
      </div>
    `;

    this.bindEvents();
  }

  getScreenTitle(screen) {
    switch (screen) {
      case 'intro': return 'Sanctuary Induction';
      case 'environment': return 'Gir Forest Interactive Map';
      case 'mission-1': return 'Mission 1: The Silent Trail';
      case 'mission-2': return 'Mission 2: Water of Life';
      case 'mission-3': return 'Mission 3: Guardian of the Pride';
      case 'completion': return '🦁 Gir Guardian Status';
      default: return 'The Gir Guardian';
    }
  }

  getCurrentStepNum(state) {
    if (state.currentScreen === 'mission-1') return state.m1Step + 1;
    if (state.currentScreen === 'mission-2') return state.m2Step + 1;
    if (state.currentScreen === 'mission-3') return state.m3Step + 1;
    return 1;
  }

  // =========================================================================
  // 1. INTRO SCREEN
  // =========================================================================
  renderIntroHtml(intro) {
    return `
      <div class="gir-intro-hero anim-fade-in">
        <div class="gir-intro-emblem anim-glow-aura">🦁</div>
        
        <div>
          <span class="badge-playable" style="background: rgba(16, 185, 129, 0.2); border-color: #10B981; color: #34D399; margin-bottom: 0.5rem;">
            🌟 PLAYABLE LOCATION MISSION
          </span>
          <h1 class="gir-hero-title">${intro.heading}</h1>
          <p class="gir-hero-sub">${intro.tagline}</p>
        </div>

        <p class="gir-hero-desc">${intro.description}</p>

        <!-- Mira Greeting Box -->
        <div class="gir-mira-bubble" style="max-width: 700px; text-align: left;">
          <div class="gir-mira-avatar-orb anim-float">
            <img src="character/mira-avatar.png" alt="Mira" onerror="this.src='assets/mira/mira.png'" />
          </div>
          <div class="gir-mira-text-wrap">
            <div class="gir-mira-header-row">
              <span class="gir-mira-name">MIRA • ADVENTURE PARTNER</span>
              <button id="gir-mira-tts-btn" class="btn-icon" style="width: 26px; height: 26px; font-size: 0.75rem;" title="Listen to Mira">🔊</button>
            </div>
            <p class="gir-mira-speech">"${intro.miraDialogue}"</p>
          </div>
        </div>

        <!-- 4 Stats -->
        <div class="gir-stats-grid">
          ${intro.stats.map(s => `
            <div class="gir-stat-box">
              <span class="gir-stat-val">${s.value}</span>
              <span class="gir-stat-lbl">${s.label}</span>
            </div>
          `).join('')}
        </div>

        <div style="margin-top: 0.5rem;">
          <button id="gir-enter-game-btn" class="btn btn-primary btn-shimmer-effect" style="padding: 0.85rem 2.8rem; font-size: 1.05rem;">
            START GIR GUARDIAN →
          </button>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 2. GIR ENVIRONMENT MAP & MISSION SELECTOR
  // =========================================================================
  renderEnvironmentHtml(data, state) {
    const m1Done = state.m1Completed;
    const m2Done = state.m2Completed;
    const m3Done = state.m3Completed;

    return `
      <div class="gir-map-arena anim-fade-in">
        
        <!-- Mira Briefing -->
        <div class="gir-mira-bubble">
          <div class="gir-mira-avatar-orb anim-float">
            <img src="character/mira-avatar.png" alt="Mira" onerror="this.src='assets/mira/mira.png'" />
          </div>
          <div class="gir-mira-text-wrap">
            <div class="gir-mira-header-row">
              <span class="gir-mira-name">MIRA • SECTOR INTEL</span>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--gir-gold-bright);">
                DISCOVERIES: ${state.unlockedDiscoveryIds.length}/6 UNLOCKED
              </span>
            </div>
            <p class="gir-mira-speech">
              "Here is our sector map of Gir. Choose an active mission beacon or click a region to investigate wildlife tracks, water levels, and pride movements!"
            </p>
          </div>
        </div>

        <!-- Interactive SVG Environment Map -->
        <div class="gir-map-viewport">
          <svg class="gir-svg-map" viewBox="0 0 700 380" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="teakCanopyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#064E3B" />
                <stop offset="100%" stop-color="#022C22" />
              </linearGradient>
              <linearGradient id="waterBasinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0284C7" />
                <stop offset="100%" stop-color="#0369A1" />
              </linearGradient>
              <linearGradient id="savannaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#78350F" />
                <stop offset="100%" stop-color="#451A03" />
              </linearGradient>
            </defs>

            <!-- Dense Teak Core Region -->
            <path d="M 40,40 L 320,30 L 420,110 L 360,260 L 180,290 L 30,200 Z" fill="url(#teakCanopyGrad)" opacity="0.85" stroke="#10B981" stroke-width="1.5" />
            <text x="80" y="80" fill="#34D399" font-size="11" font-weight="bold" letter-spacing="1">DENSE TEAK CANOPY CORE</text>

            <!-- Kamleshwar Reservoir & River -->
            <path d="M 260,60 Q 320,150 360,220 Q 420,300 460,340" stroke="url(#waterBasinGrad)" stroke-width="16" fill="none" stroke-linecap="round" />
            <circle cx="340" cy="180" r="38" fill="url(#waterBasinGrad)" opacity="0.85" stroke="#38BDF8" stroke-width="2" />
            <text x="290" y="185" fill="#FFFFFF" font-size="11" font-weight="bold">Kamleshwar Basin 💧</text>

            <!-- Savanna Plains (East) -->
            <path d="M 420,110 L 640,90 L 660,270 L 480,310 L 360,260 Z" fill="url(#savannaGrad)" opacity="0.7" stroke="#F59E0B" stroke-width="1.5" />
            <text x="490" y="150" fill="#FBBF24" font-size="11" font-weight="bold">SAVANNA SCRUB PLAINS</text>

            <!-- Village Boundary Corridor (South) -->
            <path d="M 20,320 L 680,350" stroke="#EF4444" stroke-width="3" stroke-dasharray="8,5" fill="none" />
            <text x="50" y="365" fill="#EF4444" font-size="10" font-weight="bold">⚠️ VILLAGE BUFFER & RAILWAY CORRIDOR</text>

            <!-- Mission 1 Beacon: The Silent Trail -->
            <g class="map-mission-beacon" id="map-beacon-m1" transform="translate(180, 140)">
              <circle class="map-beacon-pulse" cx="0" cy="0" r="22" fill="#F59E0B" opacity="0.35" />
              <circle cx="0" cy="0" r="16" fill="${m1Done ? '#10B981' : '#F59E0B'}" stroke="#FFFFFF" stroke-width="2" />
              <text x="-7" y="6" font-size="14">${m1Done ? '✓' : '🐾'}</text>
            </g>

            <!-- Mission 2 Beacon: Water of Life -->
            <g class="map-mission-beacon" id="map-beacon-m2" transform="translate(340, 180)">
              <circle class="map-beacon-pulse" cx="0" cy="0" r="22" fill="#0284C7" opacity="0.35" />
              <circle cx="0" cy="0" r="16" fill="${m2Done ? '#10B981' : '#0284C7'}" stroke="#FFFFFF" stroke-width="2" />
              <text x="-7" y="5" font-size="13">${m2Done ? '✓' : '💧'}</text>
            </g>

            <!-- Mission 3 Beacon: Guardian of the Pride -->
            <g class="map-mission-beacon" id="map-beacon-m3" transform="translate(480, 270)">
              <circle class="map-beacon-pulse" cx="0" cy="0" r="22" fill="#EA580C" opacity="0.35" />
              <circle cx="0" cy="0" r="16" fill="${m3Done ? '#10B981' : '#EA580C'}" stroke="#FFFFFF" stroke-width="2" />
              <text x="-7" y="6" font-size="14">${m3Done ? '✓' : '👑'}</text>
            </g>
          </svg>
        </div>

        <!-- 3 Mission Action Cards Grid -->
        <div class="gir-missions-grid">
          
          <!-- Mission 1 Card -->
          <div class="gir-mission-card ${m1Done ? 'completed' : ''}" id="gir-launch-m1">
            <div class="gir-mission-card-header">
              <span class="gir-mission-num">MISSION 1 • ${m1Done ? '✅ COMPLETED' : '+50 XP'}</span>
              <span style="font-size: 1.3rem;">🐾</span>
            </div>
            <h3 class="gir-mission-title">The Silent Trail</h3>
            <p class="gir-mission-theme">Investigate environmental clues and identify keystone species on the riverbed trail.</p>
            <button class="btn ${m1Done ? 'btn-outline' : 'btn-primary'} w-full" style="margin-top: auto; font-size: 0.8rem; padding: 0.45rem;">
              ${m1Done ? 'Replay Tracking →' : 'Begin Mission 1 →'}
            </button>
          </div>

          <!-- Mission 2 Card -->
          <div class="gir-mission-card ${m2Done ? 'completed' : ''}" id="gir-launch-m2">
            <div class="gir-mission-card-header">
              <span class="gir-mission-num">MISSION 2 • ${m2Done ? '✅ COMPLETED' : '+60 XP'}</span>
              <span style="font-size: 1.3rem;">💧</span>
            </div>
            <h3 class="gir-mission-title">Water of Life</h3>
            <p class="gir-mission-theme">Resolve a dangerous waterhole drought crisis and observe ecological consequences.</p>
            <button class="btn ${m2Done ? 'btn-outline' : 'btn-primary'} w-full" style="margin-top: auto; font-size: 0.8rem; padding: 0.45rem;">
              ${m2Done ? 'Replay Decision →' : 'Begin Mission 2 →'}
            </button>
          </div>

          <!-- Mission 3 Card -->
          <div class="gir-mission-card ${m3Done ? 'completed' : ''}" id="gir-launch-m3">
            <div class="gir-mission-card-header">
              <span class="gir-mission-num">MISSION 3 • ${m3Done ? '✅ COMPLETED' : '+80 XP'}</span>
              <span style="font-size: 1.3rem;">👑</span>
            </div>
            <h3 class="gir-mission-title">Guardian of the Pride</h3>
            <p class="gir-mission-theme">Track a lion pride approaching railway & farm hazards and coordinate protection.</p>
            <button class="btn ${m3Done ? 'btn-outline' : 'btn-primary'} w-full" style="margin-top: auto; font-size: 0.8rem; padding: 0.45rem;">
              ${m3Done ? 'View Pride Status →' : 'Begin Mission 3 →'}
            </button>
          </div>

        </div>

        ${m1Done && m2Done && m3Done ? `
          <div style="text-align: center; margin-top: 0.5rem;" class="anim-scale-up">
            <button id="gir-view-completion-btn" class="btn btn-primary btn-shimmer-effect" style="padding: 0.75rem 2.5rem; font-size: 1rem;">
              🏆 View Gir Guardian Status Unlocked →
            </button>
          </div>
        ` : ''}

      </div>
    `;
  }

  // =========================================================================
  // 3. MISSION 1: “THE SILENT TRAIL”
  // =========================================================================
  renderMission1Html(m1, state) {
    const step = m1.steps[state.m1Step] || m1.steps[0];

    return `
      <div class="gir-mission-workspace anim-fade-in">
        
        <div class="gir-mira-bubble">
          <div class="gir-mira-avatar-orb anim-float">
            <img src="character/mira-avatar.png" alt="Mira" onerror="this.src='assets/mira/mira.png'" />
          </div>
          <div class="gir-mira-text-wrap">
            <div class="gir-mira-header-row">
              <span class="gir-mira-name">MIRA • WILDLIFE TRACKER</span>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--gir-gold-bright);">
                MISSION 1 • STEP ${state.m1Step + 1} OF 3
              </span>
            </div>
            <p class="gir-mira-speech">"${step.miraDialogue || m1.miraBrief}"</p>
          </div>
        </div>

        <!-- STEP 1: APPROACH TRAIL -->
        ${state.m1Step === 0 ? `
          <div class="p-4 rounded-xl border border-amber-500/40 bg-slate-900/90 space-y-3">
            <h3 style="font-family: var(--font-title); font-size: 1.1rem; color: #FFFFFF;">
              🐾 ${step.title}
            </h3>
            <p style="font-size: 0.88rem; color: #CBD5E1; line-height: 1.5;">
              ${step.narration}
            </p>
            <div style="background: rgba(245, 158, 11, 0.12); padding: 0.75rem 1rem; border-left: 3px solid #F59E0B; border-radius: 4px; font-size: 0.82rem; color: #FDE68A;">
              <strong>🎯 Objective:</strong> ${step.prompt}
            </div>
            <button id="gir-m1-inspect-trail-btn" class="btn btn-primary btn-shimmer-effect" style="margin-top: 0.5rem;">
              Inspect Environmental Clues →
            </button>
          </div>
        ` : ''}

        <!-- STEP 2: INVESTIGATE CLUES -->
        ${state.m1Step === 1 ? `
          <div>
            <h3 style="font-family: var(--font-title); font-size: 1.05rem; color: #FFFFFF; margin-bottom: 0.75rem;">
              🔍 Investigate Environmental Clues (Click each to examine):
            </h3>
            <div class="gir-clues-grid">
              ${step.clues.map(clue => {
                const isInspected = state.m1CluesInspected.includes(clue.id);
                return `
                  <div class="gir-clue-card ${isInspected ? 'inspected' : ''}" data-clue-id="${clue.id}">
                    <span class="gir-clue-icon">${clue.icon}</span>
                    <div>
                      <div class="gir-clue-title">${clue.label} ${isInspected ? '✓' : ''}</div>
                      <p class="gir-clue-detail">${clue.detail}</p>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
            <div style="margin-top: 1rem; display: flex; justify-content: flex-end;">
              <button id="gir-m1-to-deduction-btn" class="btn btn-primary btn-shimmer-effect">
                Proceed to Identification →
              </button>
            </div>
          </div>
        ` : ''}

        <!-- STEP 3: IDENTIFY SPECIMEN -->
        ${state.m1Step === 2 ? `
          <div class="space-y-3">
            <h3 style="font-family: var(--font-title); font-size: 1.05rem; color: #FFFFFF;">
              🎯 ${step.title}
            </h3>
            <p style="font-size: 0.88rem; color: #CBD5E1;">
              ${step.question}
            </p>
            <div class="space-y-2">
              ${step.options.map(opt => `
                <button class="gir-m1-opt-btn btn btn-outline w-full text-left" data-opt-id="${opt.id}" style="padding: 0.85rem 1.1rem; justify-content: flex-start; text-align: left;">
                  <span style="font-size: 1.4rem; margin-right: 0.65rem;">${opt.icon}</span>
                  <span style="font-weight: 700; font-size: 0.9rem;">${opt.name}</span>
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

      </div>
    `;
  }

  // =========================================================================
  // 4. MISSION 2: “WATER OF LIFE”
  // =========================================================================
  renderMission2Html(m2, state) {
    const step = m2.steps[state.m2Step] || m2.steps[0];
    const selectedDec = step.decisions ? step.decisions.find(d => d.id === state.m2DecisionId) : null;

    return `
      <div class="gir-mission-workspace anim-fade-in">
        
        <div class="gir-mira-bubble">
          <div class="gir-mira-avatar-orb anim-float">
            <img src="character/mira-avatar.png" alt="Mira" onerror="this.src='assets/mira/mira.png'" />
          </div>
          <div class="gir-mira-text-wrap">
            <div class="gir-mira-header-row">
              <span class="gir-mira-name">MIRA • CONSERVATION STEWARD</span>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--gir-gold-bright);">
                MISSION 2 • STEP ${state.m2Step + 1} OF 2
              </span>
            </div>
            <p class="gir-mira-speech">"${m2.miraBrief}"</p>
          </div>
        </div>

        <!-- STEP 1: INSPECT WATER CRISIS -->
        ${state.m2Step === 0 ? `
          <div class="space-y-3">
            <h3 style="font-family: var(--font-title); font-size: 1.05rem; color: #FFFFFF;">
              💧 ${step.title}
            </h3>
            <p style="font-size: 0.88rem; color: #CBD5E1;">
              ${step.narration}
            </p>
            <div class="gir-clues-grid">
              ${step.clues.map((clue, idx) => `
                <div class="gir-clue-card inspected">
                  <span class="gir-clue-icon">${clue.icon}</span>
                  <div>
                    <div class="gir-clue-title">${clue.label}</div>
                    <p class="gir-clue-detail">${clue.detail}</p>
                  </div>
                </div>
              `).join('')}
            </div>
            <div style="margin-top: 1rem; display: flex; justify-content: flex-end;">
              <button id="gir-m2-to-decision-btn" class="btn btn-primary btn-shimmer-effect">
                Make Conservation Decision →
              </button>
            </div>
          </div>
        ` : ''}

        <!-- STEP 2: GUARDIAN DECISION -->
        ${state.m2Step === 1 ? `
          <div class="space-y-3">
            <div style="border-left: 3.5px solid var(--gir-gold-bright); padding-left: 0.75rem;">
              <h3 style="font-family: var(--font-title); font-size: 1.1rem; color: #FFFFFF;">
                🦁 You are the Guardian. What will you do?
              </h3>
              <p style="font-size: 0.85rem; color: #CBD5E1;">${step.prompt}</p>
            </div>

            <div class="gir-decision-list">
              ${step.decisions.map(dec => `
                <div class="gir-decision-card ${state.m2DecisionId === dec.id ? 'selected-best' : ''}" data-dec-id="${dec.id}">
                  <span style="font-size: 1.8rem; line-height: 1;">${dec.icon}</span>
                  <div style="flex: 1;">
                    <div style="font-weight: 700; font-size: 0.9rem; color: #FFFFFF; margin-bottom: 0.2rem;">${dec.title}</div>
                    <span class="gir-hud-xp-badge" style="font-size: 0.7rem; padding: 0.15rem 0.5rem;">+${dec.xp} XP Potential</span>
                  </div>
                </div>
              `).join('')}
            </div>

            ${selectedDec ? `
              <div class="p-4 rounded-xl border border-emerald-500/50 bg-slate-900/95 space-y-2 mt-2 anim-scale-up">
                <strong style="color: var(--gir-gold-bright); font-size: 0.95rem;">${selectedDec.consequence.title}</strong>
                <p style="font-size: 0.85rem; color: #E2E8F0; line-height: 1.45;">${selectedDec.consequence.text}</p>
                <div style="background: rgba(16,185,129,0.12); padding: 0.4rem 0.75rem; border-left: 2.5px solid #10B981; font-size: 0.78rem; color: #6EE7B7;">
                  <strong>💡 Ecological Takeaway:</strong> ${selectedDec.consequence.ecologicalLesson}
                </div>
                <button id="gir-m2-complete-btn" class="btn btn-primary btn-shimmer-effect w-full" style="margin-top: 0.5rem;">
                  Collect Field Discovery & Continue →
                </button>
              </div>
            ` : ''}
          </div>
        ` : ''}

      </div>
    `;
  }

  // =========================================================================
  // 5. MISSION 3: “GUARDIAN OF THE PRIDE”
  // =========================================================================
  renderMission3Html(m3, state) {
    const step = m3.steps[state.m3Step] || m3.steps[0];
    const selectedAct = step.actions ? step.actions.find(a => a.id === state.m3ActionId) : null;

    return `
      <div class="gir-mission-workspace anim-fade-in">
        
        <div class="gir-mira-bubble">
          <div class="gir-mira-avatar-orb anim-float">
            <img src="character/mira-avatar.png" alt="Mira" onerror="this.src='assets/mira/mira.png'" />
          </div>
          <div class="gir-mira-text-wrap">
            <div class="gir-mira-header-row">
              <span class="gir-mira-name">MIRA • APEX STEWARD</span>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--gir-gold-bright);">
                MISSION 3 • STEP ${state.m3Step + 1} OF 3
              </span>
            </div>
            <p class="gir-mira-speech">"${m3.miraBrief}"</p>
          </div>
        </div>

        <!-- STEP 1: DISTANT ROAR -->
        ${state.m3Step === 0 ? `
          <div class="p-4 rounded-xl border border-amber-500/40 bg-slate-900/90 space-y-3">
            <h3 style="font-family: var(--font-title); font-size: 1.1rem; color: #FFFFFF;">
              🔊 ${step.title}
            </h3>
            <p style="font-size: 0.88rem; color: #CBD5E1; line-height: 1.5;">
              ${step.narration}
            </p>
            <div style="background: rgba(245, 158, 11, 0.12); padding: 0.75rem 1rem; border-left: 3px solid #F59E0B; border-radius: 4px; font-size: 0.82rem; color: #FDE68A;">
              <strong>🐾 Tracking Note:</strong> The pride contains a nursing mother and two small cubs heading toward the southern fringe corridor.
            </div>
            <button id="gir-m3-to-assess-btn" class="btn btn-primary btn-shimmer-effect" style="margin-top: 0.5rem;">
              Follow Trail to Southern Perimeter →
            </button>
          </div>
        ` : ''}

        <!-- STEP 2: ASSESS HAZARDS -->
        ${state.m3Step === 1 ? `
          <div class="space-y-3">
            <h3 style="font-family: var(--font-title); font-size: 1.05rem; color: #FFFFFF;">
              ⚠️ ${step.title}
            </h3>
            <p style="font-size: 0.88rem; color: #CBD5E1;">
              ${step.narration}
            </p>
            <div class="gir-clues-grid">
              ${step.hazards.map(h => `
                <div class="gir-clue-card inspected">
                  <span class="gir-clue-icon">${h.icon}</span>
                  <div>
                    <div class="gir-clue-title">${h.title}</div>
                    <p class="gir-clue-detail">${h.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
            <div style="margin-top: 1rem; display: flex; justify-content: flex-end;">
              <button id="gir-m3-to-protocol-btn" class="btn btn-primary btn-shimmer-effect">
                Deploy Guardian Protection Protocol →
              </button>
            </div>
          </div>
        ` : ''}

        <!-- STEP 3: COORDINATE ACTION -->
        ${state.m3Step === 2 ? `
          <div class="space-y-3">
            <div style="border-left: 3.5px solid var(--gir-gold-bright); padding-left: 0.75rem;">
              <h3 style="font-family: var(--font-title); font-size: 1.1rem; color: #FFFFFF;">
                🛡️ Guardian Coexistence Action
              </h3>
              <p style="font-size: 0.85rem; color: #CBD5E1;">${step.prompt}</p>
            </div>

            <div class="gir-decision-list">
              ${step.actions.map(act => `
                <div class="gir-decision-card ${state.m3ActionId === act.id ? 'selected-best' : ''}" data-act-id="${act.id}">
                  <span style="font-size: 1.8rem; line-height: 1;">${act.icon}</span>
                  <div style="flex: 1;">
                    <div style="font-weight: 700; font-size: 0.9rem; color: #FFFFFF; margin-bottom: 0.2rem;">${act.title}</div>
                    <span class="gir-hud-xp-badge" style="font-size: 0.7rem; padding: 0.15rem 0.5rem;">+${act.xp} XP Reward</span>
                  </div>
                </div>
              `).join('')}
            </div>

            ${selectedAct ? `
              <div class="p-4 rounded-xl border border-emerald-500/50 bg-slate-900/95 space-y-2 mt-2 anim-scale-up">
                <strong style="color: var(--gir-gold-bright); font-size: 0.95rem;">${selectedAct.consequence.title}</strong>
                <p style="font-size: 0.85rem; color: #E2E8F0; line-height: 1.45;">${selectedAct.consequence.text}</p>
                <div style="background: rgba(16,185,129,0.12); padding: 0.4rem 0.75rem; border-left: 2.5px solid #10B981; font-size: 0.78rem; color: #6EE7B7;">
                  <strong>💡 Coexistence Takeaway:</strong> ${selectedAct.consequence.ecologicalLesson}
                </div>
                <button id="gir-m3-complete-btn" class="btn btn-primary btn-shimmer-effect w-full" style="margin-top: 0.5rem;">
                  Claim Final Discovery & Unlock Status 🦁 →
                </button>
              </div>
            ` : ''}
          </div>
        ` : ''}

      </div>
    `;
  }

  // =========================================================================
  // 6. ANIMATED FIELD DISCOVERY MODAL
  // =========================================================================
  renderDiscoveryModalHtml(disc) {
    return `
      <div class="gir-discovery-overlay" id="gir-discovery-modal">
        <div class="gir-discovery-card">
          <span class="gir-discovery-badge">✨ NEW FIELD DISCOVERY UNLOCKED</span>
          
          <div class="gir-discovery-icon-orb anim-float">
            ${disc.icon}
          </div>

          <div>
            <h2 class="gir-discovery-title">${disc.title}</h2>
            <p class="gir-discovery-sci">${disc.scientific}</p>
          </div>

          <p class="gir-discovery-insight">
            ${disc.insight}
          </p>

          <div class="gir-hud-xp-badge" style="font-size: 0.9rem; padding: 0.4rem 1rem;">
            <span>⚡</span>
            <span>+${disc.xp} GUARDIAN XP</span>
          </div>

          <button id="gir-claim-disc-btn" class="btn btn-primary btn-shimmer-effect w-full" style="padding: 0.75rem; margin-top: 0.5rem;">
            Collect Discovery →
          </button>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 7. GIR COMPLETION & STATUS UNLOCKED
  // =========================================================================
  renderCompletionHtml(data, state) {
    return `
      <div class="gir-completion-panel anim-scale-up">
        
        <div class="gir-intro-emblem anim-glow-aura">🦁</div>

        <div>
          <span class="gir-completion-header-tag">EXPEDITION COMPLETE • BHARATVERSE REWARD</span>
          <h1 class="gir-hero-title">GIR GUARDIAN</h1>
          <p class="gir-completion-quote">"THE FOREST REMEMBERS YOUR CHOICES."</p>
        </div>

        <!-- Mira Closing Celebration -->
        <div class="gir-mira-bubble" style="max-width: 680px; text-align: left;">
          <div class="gir-mira-avatar-orb anim-float">
            <img src="character/mira-avatar.png" alt="Mira" onerror="this.src='assets/mira/mira.png'" />
          </div>
          <div class="gir-mira-text-wrap">
            <div class="gir-mira-header-row">
              <span class="gir-mira-name">MIRA • ADVENTURE PARTNER</span>
            </div>
            <p class="gir-mira-speech">
              "Outstanding work, Guardian! You didn't just observe Gir—you protected its water, tracked its king, and safeguarded peaceful coexistence."
            </p>
          </div>
        </div>

        <!-- Dynamic Guardian Performance Metrics -->
        <div class="gir-metric-bars-row">
          <div class="gir-metric-card">
            <span class="gir-metric-val">${state.explorationPct}%</span>
            <span class="gir-metric-lbl">Exploration</span>
          </div>
          <div class="gir-metric-card">
            <span class="gir-metric-val">${state.wildlifePct}%</span>
            <span class="gir-metric-lbl">Wildlife</span>
          </div>
          <div class="gir-metric-card">
            <span class="gir-metric-val">${state.conservationPct}%</span>
            <span class="gir-metric-lbl">Conservation</span>
          </div>
        </div>

        <div style="font-family: var(--font-mono); font-size: 1.1rem; color: var(--gir-gold-bright);">
          Discoveries: <strong>${state.unlockedDiscoveryIds.length}/6</strong> • Missions: <strong>3/3 Complete</strong> • Total: <strong>+${state.guardianXP} XP</strong>
        </div>

        <!-- Action Controls -->
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-top: 0.5rem;">
          <button id="gir-explore-again-btn" class="btn btn-outline" style="padding: 0.75rem 1.8rem;">
            🔄 Explore Gir Again
          </button>
          <button id="gir-return-hub-btn" class="btn btn-primary btn-shimmer-effect" style="padding: 0.75rem 2rem;">
            🗺️ Return to Gujarat Hub →
          </button>
        </div>

      </div>
    `;
  }

  // =========================================================================
  // 8. EVENT BINDINGS
  // =========================================================================
  bindEvents() {
    // HUD Buttons
    const mapBtn = this.screenEl.querySelector('#gir-hud-map-btn');
    if (mapBtn) mapBtn.addEventListener('click', () => {
      soundFx.playClick();
      girGuardianState.setScreen('environment');
    });

    const resetBtn = this.screenEl.querySelector('#gir-hud-reset-btn');
    if (resetBtn) resetBtn.addEventListener('click', () => {
      if (confirm('Reset Gir Guardian adventure?')) {
        soundFx.playClick();
        girGuardianState.reset();
      }
    });

    // Intro Screen CTA
    const enterGameBtn = this.screenEl.querySelector('#gir-enter-game-btn');
    if (enterGameBtn) enterGameBtn.addEventListener('click', () => {
      soundFx.playChime();
      girGuardianState.setScreen('environment');
    });

    // Environment Mission Cards & Map Beacons
    const b1 = this.screenEl.querySelector('#map-beacon-m1') || this.screenEl.querySelector('#gir-launch-m1');
    if (b1) b1.addEventListener('click', () => {
      soundFx.playChime();
      girGuardianState.startMission('mission-1');
    });

    const b2 = this.screenEl.querySelector('#map-beacon-m2') || this.screenEl.querySelector('#gir-launch-m2');
    if (b2) b2.addEventListener('click', () => {
      soundFx.playChime();
      girGuardianState.startMission('mission-2');
    });

    const b3 = this.screenEl.querySelector('#map-beacon-m3') || this.screenEl.querySelector('#gir-launch-m3');
    if (b3) b3.addEventListener('click', () => {
      soundFx.playChime();
      girGuardianState.startMission('mission-3');
    });

    const completionBtn = this.screenEl.querySelector('#gir-view-completion-btn');
    if (completionBtn) completionBtn.addEventListener('click', () => {
      soundFx.playLevelUpFanfare();
      girGuardianState.setScreen('completion');
    });

    // Mission 1 Events
    const m1InspectBtn = this.screenEl.querySelector('#gir-m1-inspect-trail-btn');
    if (m1InspectBtn) m1InspectBtn.addEventListener('click', () => {
      soundFx.playClick();
      girGuardianState.advanceM1Step();
    });

    const clueCards = this.screenEl.querySelectorAll('.gir-clue-card[data-clue-id]');
    clueCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const clueId = e.currentTarget.getAttribute('data-clue-id');
        soundFx.playClick();
        girGuardianState.inspectM1Clue(clueId);
      });
    });

    const m1DeductionBtn = this.screenEl.querySelector('#gir-m1-to-deduction-btn');
    if (m1DeductionBtn) m1DeductionBtn.addEventListener('click', () => {
      soundFx.playClick();
      girGuardianState.advanceM1Step();
    });

    const m1OptBtns = this.screenEl.querySelectorAll('.gir-m1-opt-btn');
    m1OptBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const optId = e.currentTarget.getAttribute('data-opt-id');
        if (optId === 'opt-lion') {
          soundFx.playCorrect();
          girGuardianState.completeMission1();
        } else {
          soundFx.playWrong();
          alert('❌ The clues point elsewhere! Remember: the pugmark has retracted claws and a short mane.');
        }
      });
    });

    // Mission 2 Events
    const m2DecisionBtn = this.screenEl.querySelector('#gir-m2-to-decision-btn');
    if (m2DecisionBtn) m2DecisionBtn.addEventListener('click', () => {
      soundFx.playClick();
      girGuardianState.advanceM2Step();
    });

    const m2DecisionCards = this.screenEl.querySelectorAll('.gir-decision-card[data-dec-id]');
    m2DecisionCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const decId = e.currentTarget.getAttribute('data-dec-id');
        soundFx.playChime();
        girGuardianState.submitM2Decision(decId);
      });
    });

    const m2CompleteBtn = this.screenEl.querySelector('#gir-m2-complete-btn');
    if (m2CompleteBtn) m2CompleteBtn.addEventListener('click', () => {
      soundFx.playChime();
      girGuardianState.setScreen('environment');
    });

    // Mission 3 Events
    const m3AssessBtn = this.screenEl.querySelector('#gir-m3-to-assess-btn');
    if (m3AssessBtn) m3AssessBtn.addEventListener('click', () => {
      soundFx.playClick();
      girGuardianState.advanceM3Step();
    });

    const m3ProtocolBtn = this.screenEl.querySelector('#gir-m3-to-protocol-btn');
    if (m3ProtocolBtn) m3ProtocolBtn.addEventListener('click', () => {
      soundFx.playClick();
      girGuardianState.advanceM3Step();
    });

    const m3ActionCards = this.screenEl.querySelectorAll('.gir-decision-card[data-act-id]');
    m3ActionCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const actId = e.currentTarget.getAttribute('data-act-id');
        soundFx.playChime();
        girGuardianState.submitM3Action(actId);
      });
    });

    const m3CompleteBtn = this.screenEl.querySelector('#gir-m3-complete-btn');
    if (m3CompleteBtn) m3CompleteBtn.addEventListener('click', () => {
      soundFx.playLevelUpFanfare();
      girGuardianState.setScreen('completion');
    });

    // Discovery Claim
    const claimDiscBtn = this.screenEl.querySelector('#gir-claim-disc-btn');
    if (claimDiscBtn) claimDiscBtn.addEventListener('click', () => {
      soundFx.playChime();
      girGuardianState.dismissDiscovery();
    });

    // Completion Screen Actions
    const exploreAgainBtn = this.screenEl.querySelector('#gir-explore-again-btn');
    if (exploreAgainBtn) exploreAgainBtn.addEventListener('click', () => {
      soundFx.playClick();
      girGuardianState.reset();
      girGuardianState.setScreen('environment');
    });

    const returnHubBtn = this.screenEl.querySelector('#gir-return-hub-btn');
    if (returnHubBtn) returnHubBtn.addEventListener('click', () => {
      soundFx.playChime();
      router.navigateTo('gujarat-map');
    });
  }
}

export const girGuardianScreen = new GirGuardianScreen();
