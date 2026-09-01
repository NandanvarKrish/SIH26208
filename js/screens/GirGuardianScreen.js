// js/screens/GirGuardianScreen.js - Complete interactive screen controller for "The Gir Guardian" location mission

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
      this.screenEl.setAttribute('aria-label', 'The Gir Guardian Mission');
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

    let contentHtml = '';
    switch (state.currentStep) {
      case 'intro':
        contentHtml = this.renderIntroHtml(data.intro);
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
      case 'mission-4':
        contentHtml = this.renderMission4Html(data.mission4, state);
        break;
      case 'final-challenge':
        contentHtml = this.renderFinalChallengeHtml(data.finalChallenge, state);
        break;
      case 'results':
        contentHtml = this.renderResultsHtml(data, state);
        break;
      default:
        contentHtml = this.renderIntroHtml(data.intro);
    }

    this.screenEl.innerHTML = `
      <div class="gir-screen-container">
        <div class="gir-ambient-fog"></div>
        <div class="gir-content-wrap">
          
          <!-- Top Breadcrumb & Status HUD -->
          <header class="gir-breadcrumb-bar">
            <nav class="gir-breadcrumb-links" aria-label="Breadcrumb">
              <button id="gir-nav-bharatverse">BHARATVERSE</button>
              <span>/</span>
              <button id="gir-nav-gujarat">GUJARAT</button>
              <span>/</span>
              <button id="gir-nav-gir">GIR NATIONAL PARK</button>
              <span>/</span>
              <span style="color: var(--gir-warm-gold);">THE GIR GUARDIAN</span>
            </nav>

            <div class="gir-hud-status-group">
              <div class="gir-hud-pill gir-lives-pill" title="Guardian Lives / Attempts">
                ${'❤️'.repeat(state.lives)}${'🖤'.repeat(Math.max(0, 3 - state.lives))}
              </div>
              <div class="gir-hud-pill" title="Total Accumulated XP">
                <span>⚡</span>
                <span id="gir-total-xp">${state.totalXP} XP</span>
              </div>
              <button id="gir-reset-btn" class="btn-icon" style="width: 28px; height: 28px; font-size: 0.75rem;" title="Reset Gir Progress">🔄</button>
            </div>
          </header>

          <!-- Mission Step Tracker (Hidden on Intro & Results) -->
          ${state.currentStep !== 'intro' && state.currentStep !== 'results' ? this.renderTrackerHtml(state) : ''}

          <!-- Screen Content Body -->
          ${contentHtml}

        </div>
      </div>
    `;

    this.bindEvents();
  }

  // --- 1. INTRO SCREEN ---
  renderIntroHtml(intro) {
    return `
      <div class="gir-intro-hero anim-fade-in">
        <div class="gir-intro-emblem anim-glow-aura">🦁</div>
        
        <div>
          <span class="badge-playable" style="background: rgba(16, 185, 129, 0.2); border-color: #10B981; color: #34D399; margin-bottom: 0.5rem;">
            ${intro.badge}
          </span>
          <h1 class="gir-hero-title">${intro.heading}</h1>
          <p class="gir-hero-sub">${intro.subheading}</p>
        </div>

        <p class="gir-hero-desc">${intro.description}</p>

        <!-- Mira Greeting Box -->
        <div class="gir-mira-bubble" style="max-width: 680px; text-align: left;">
          <div class="gir-mira-avatar-orb anim-float">
            <img src="assets/mira/mira.png" alt="Mira" onerror="this.src='character/mira-avatar.png'" />
          </div>
          <div class="gir-mira-text-wrap">
            <div class="gir-mira-header-row">
              <span class="gir-mira-name">MIRA • ADVENTURE COMPANION</span>
              <button id="gir-mira-tts" class="btn-icon" style="width: 24px; height: 24px; font-size: 0.7rem;" title="Listen to Mira">🔊</button>
            </div>
            <p class="gir-mira-speech">"${intro.miraGreeting}"</p>
          </div>
        </div>

        <!-- 4 Key Sanctuary Stats -->
        <div class="gir-stats-grid">
          ${intro.stats.map(s => `
            <div class="gir-stat-box">
              <span class="gir-stat-val">${s.value}</span>
              <span class="gir-stat-lbl">${s.label}</span>
            </div>
          `).join('')}
        </div>

        <div style="margin-top: 0.5rem;">
          <button id="gir-start-mission-btn" class="btn btn-primary btn-shimmer-effect" style="padding: 0.85rem 2.5rem; font-size: 1.05rem;">
            ${intro.cta} →
          </button>
        </div>
      </div>
    `;
  }

  // --- 2. MISSION 1: WILDLIFE DETECTIVE ---
  renderMission1Html(m1, state) {
    const currentCase = m1.cases[state.m1CaseIndex];
    const revealedCount = state.m1RevealedClues.length;
    const potentialXP = m1.xpPerClue[revealedCount - 1] || 40;

    return `
      <div class="flex flex-col gap-4 anim-fade-in">
        
        <!-- Mission Header & Mira Callout -->
        <div class="gir-mira-bubble">
          <div class="gir-mira-avatar-orb anim-float">
            <img src="assets/mira/mira.png" alt="Mira" onerror="this.src='character/mira-avatar.png'" />
          </div>
          <div class="gir-mira-text-wrap">
            <div class="gir-mira-header-row">
              <span class="gir-mira-name">MIRA • WILDLIFE DETECTIVE</span>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--gir-warm-gold);">CASE ${state.m1CaseIndex + 1} OF ${m1.cases.length}</span>
            </div>
            <p class="gir-mira-speech">"${m1.miraIntro}"</p>
          </div>
        </div>

        <div class="gir-detective-arena">
          
          <!-- Left: Forensic Clues Board -->
          <div class="gir-clue-board">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">
              <h3 style="font-family: var(--font-title); font-size: 1rem; font-weight: 700; color: #FFFFFF;">
                🔍 ${currentCase.title}
              </h3>
              <span class="gir-hud-pill">Current Value: +${potentialXP} XP</span>
            </div>

            <div class="space-y-2">
              ${currentCase.clues.map((clueText, idx) => {
                const isRevealed = state.m1RevealedClues.includes(idx);
                return `
                  <div class="gir-clue-card ${isRevealed ? 'revealed' : ''}">
                    <span class="gir-clue-badge">CLUE ${idx + 1}</span>
                    ${isRevealed 
                      ? `<p class="gir-clue-text">${clueText}</p>` 
                      : `<p class="gir-clue-locked-text">🔒 Locked clue (Reveal costs ${100 - (m1.xpPerClue[idx] || 40)} XP potential)</p>`}
                  </div>
                `;
              }).join('')}
            </div>

            ${revealedCount < 4 ? `
              <button id="gir-reveal-clue-btn" class="btn btn-outline w-full" style="margin-top: 0.5rem; font-size: 0.82rem;">
                🔓 Reveal Next Clue (${4 - revealedCount} remaining)
              </button>
            ` : ''}
          </div>

          <!-- Right: Wildlife Identification Cards -->
          <div class="flex flex-col gap-2">
            <h4 style="font-family: var(--font-title); font-size: 0.9rem; font-weight: 700; color: var(--gir-emerald-bright);">
              Select the Mystery Animal:
            </h4>
            <div class="gir-options-board">
              ${currentCase.options.map(opt => `
                <div class="gir-animal-card" data-animal-id="${opt.id}" role="button" tabindex="0">
                  <div class="gir-animal-icon">${opt.icon}</div>
                  <div class="gir-animal-name">${opt.name}</div>
                  <div class="gir-animal-sci">${opt.scientific}</div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>
    `;
  }

  // --- 3. MISSION 2: BECOME A GIR RANGER ---
  renderMission2Html(m2, state) {
    const selectedRoute = m2.routes.find(r => r.id === state.m2SelectedRouteId);

    return `
      <div class="flex flex-col gap-4 anim-fade-in">
        
        <div class="gir-mira-bubble">
          <div class="gir-mira-avatar-orb anim-float">
            <img src="assets/mira/mira.png" alt="Mira" onerror="this.src='character/mira-avatar.png'" />
          </div>
          <div class="gir-mira-text-wrap">
            <div class="gir-mira-header-row">
              <span class="gir-mira-name">MIRA • GIR RANGER PATROL</span>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--gir-warm-gold);">CORE HABITAT SURVEILLANCE</span>
            </div>
            <p class="gir-mira-speech">"${m2.miraIntro}"</p>
          </div>
        </div>

        <div class="gir-ranger-layout">
          
          <!-- Left: Stylized Interactive Vector Map of Gir -->
          <div class="gir-map-viewport">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <span style="font-family: var(--font-title); font-size: 0.85rem; font-weight: 700; color: var(--gir-warm-gold);">🗺️ GIR SANCTUARY SECTOR GRID</span>
              <span style="font-size: 0.7rem; color: #94A3B8;">Click a route or card to patrol</span>
            </div>

            <svg class="gir-svg-map" viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="coreTeakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#064E3B" />
                  <stop offset="100%" stop-color="#022C22" />
                </linearGradient>
                <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#0284C7" />
                  <stop offset="100%" stop-color="#0369A1" />
                </linearGradient>
              </defs>

              <!-- Dense Teak Forest Core Zone -->
              <path class="map-zone-path" d="M 40,40 L 220,30 L 320,80 L 280,220 L 150,260 L 30,180 Z" fill="url(#coreTeakGrad)" />
              <text x="110" y="110" fill="#34D399" font-size="10" font-weight="bold" letter-spacing="1">DENSE TEAK CANOPY CORE</text>

              <!-- Kamleshwar Reservoir & Hiran River -->
              <path d="M 200,60 Q 250,140 280,200 Q 320,280 340,320" stroke="url(#waterGrad)" stroke-width="12" fill="none" stroke-linecap="round" />
              <circle cx="260" cy="150" r="28" fill="url(#waterGrad)" opacity="0.8" />
              <text x="225" y="155" fill="#FFFFFF" font-size="9" font-weight="bold">Kamleshwar Dam 💧</text>

              <!-- Savanna Scrub Plains (East) -->
              <path class="map-zone-path" d="M 320,80 L 460,70 L 470,240 L 340,280 L 280,220 Z" fill="#78350F" fill-opacity="0.4" />
              <text x="360" y="130" fill="#FBBF24" font-size="9" font-weight="bold">SAVANNA PLAINS</text>

              <!-- Village Buffer Zone (South) -->
              <path d="M 20,280 L 480,310" stroke="#EF4444" stroke-width="2" stroke-dasharray="6,4" fill="none" />
              <text x="50" y="325" fill="#EF4444" font-size="9" font-weight="bold">⚠️ VILLAGE BUFFER & SOLAR FENCE CORRIDOR</text>

              <!-- Patrol Route Lines -->
              <polyline points="70,120 120,80 180,70 230,90" stroke="#F59E0B" stroke-width="3" stroke-dasharray="4,4" fill="none" />
              <polyline points="200,70 240,120 260,180" stroke="#0284C7" stroke-width="3" fill="none" />

              <!-- Waypoints / Animal Markers -->
              <g class="map-waypoint-marker" transform="translate(225, 90)">
                <circle cx="0" cy="0" r="14" fill="#F59E0B" opacity="0.85" />
                <text x="-6" y="5" font-size="12">🦁</text>
              </g>
              <g class="map-waypoint-marker" transform="translate(260, 150)">
                <circle cx="0" cy="0" r="12" fill="#0284C7" opacity="0.9" />
                <text x="-6" y="4" font-size="11">🐊</text>
              </g>
              <g class="map-waypoint-marker" transform="translate(130, 180)">
                <circle cx="0" cy="0" r="12" fill="#10B981" opacity="0.85" />
                <text x="-5" y="4" font-size="11">🦌</text>
              </g>
            </svg>
          </div>

          <!-- Right: Strategic Route Options List -->
          <div class="gir-routes-list">
            <h4 style="font-family: var(--font-title); font-size: 0.9rem; font-weight: 700; color: #FFFFFF;">
              Select Patrol Route:
            </h4>
            ${m2.routes.map(r => `
              <div class="gir-route-card ${state.m2SelectedRouteId === r.id ? 'selected-route' : ''}" data-route-id="${r.id}">
                <div class="gir-route-header">
                  <span class="gir-route-name">${r.name}</span>
                  <span class="gir-hud-pill">+${r.xp} XP</span>
                </div>
                <p style="font-size: 0.78rem; color: #CBD5E1;">${r.terrain}</p>
                <div class="gir-route-meta">
                  <span>Dist: ${r.distance}</span>
                  <span>Disturbance: <strong>${r.disturbanceLevel}</strong></span>
                  <span>Risk: ${r.riskLevel}</span>
                </div>
              </div>
            `).join('')}

            ${selectedRoute ? `
              <div class="p-3 rounded-lg border border-amber-500/40 bg-slate-900/90 text-xs space-y-2 mt-2 anim-scale-up">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <strong style="color: var(--gir-warm-gold); font-size: 0.85rem;">${selectedRoute.consequence.status}</strong>
                  <span class="gir-hud-pill">+${selectedRoute.scorePoints} Ranger XP</span>
                </div>
                <p style="color: #E2E8F0; line-height: 1.4;">${selectedRoute.consequence.text}</p>
                <div style="background: rgba(16,185,129,0.12); padding: 0.4rem 0.6rem; border-left: 2px solid #10B981; border-radius: 2px; color: #6EE7B7;">
                  <strong>💡 Ecological Lesson:</strong> ${selectedRoute.consequence.ecologicalTakeaway}
                </div>
                <button id="gir-proceed-to-m3-btn" class="btn btn-primary btn-shimmer-effect w-full" style="margin-top: 0.5rem;">
                  Proceed to Mission 3: Build Ecosystem →
                </button>
              </div>
            ` : ''}
          </div>

        </div>

      </div>
    `;
  }

  // --- 4. MISSION 3: BUILD THE GIR ECOSYSTEM ---
  renderMission3Html(m3, state) {
    const allFilled = state.m3IsWebComplete;

    return `
      <div class="gir-ecosystem-arena anim-fade-in">
        
        <div class="gir-mira-bubble">
          <div class="gir-mira-avatar-orb anim-float">
            <img src="assets/mira/mira.png" alt="Mira" onerror="this.src='character/mira-avatar.png'" />
          </div>
          <div class="gir-mira-text-wrap">
            <div class="gir-mira-header-row">
              <span class="gir-mira-name">MIRA • ECOSYSTEM ARCHITECT</span>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--gir-warm-gold);">TROPHIC ENERGY PYRAMID</span>
            </div>
            <p class="gir-mira-speech">"${m3.miraIntro}"</p>
          </div>
        </div>

        <!-- 5 Trophic Slots -->
        <div class="gir-trophic-slots-container">
          ${m3.tiers.map(tier => {
            const slottedItemId = state.m3Slots[tier.targetId];
            const slottedItem = slottedItemId ? m3.items.find(i => i.id === slottedItemId) : null;

            return `
              <div class="gir-trophic-slot ${slottedItem ? 'slot-filled' : ''}" data-target-id="${tier.targetId}">
                <span class="gir-slot-tier-label">${tier.category}</span>
                ${slottedItem ? `
                  <div style="font-size: 2.2rem;">${slottedItem.icon}</div>
                  <strong style="font-size: 0.8rem; color: #FFFFFF;">${slottedItem.name}</strong>
                  <span style="font-size: 0.65rem; color: #34D399;">✓ Connected</span>
                ` : `
                  <div style="font-size: 1.8rem; opacity: 0.4;">📦</div>
                  <span style="font-size: 0.72rem; color: #94A3B8;">Click a token below to slot</span>
                `}
              </div>
            `;
          }).join('')}
        </div>

        <!-- Available Organism Tokens Palette -->
        <div class="gir-trophic-palette">
          <span style="font-size: 0.75rem; color: var(--gir-warm-gold); font-weight: 700; width: 100%; text-align: center;">
            CLICK AN ORGANISM TOKEN TO PLACE IT IN ITS NATURAL TROPHIC LEVEL:
          </span>
          ${m3.items.map(item => {
            const isUsed = Object.values(state.m3Slots).includes(item.id);
            return `
              <div class="gir-palette-token ${isUsed ? 'token-used' : ''}" data-item-id="${item.id}" data-item-type="${item.type}">
                <span>${item.icon}</span>
                <span>${item.name}</span>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Ecological Shockwave Dilemma (Reveals when food web is built) -->
        ${allFilled ? `
          <div class="p-4 rounded-xl border border-emerald-500/50 bg-slate-900/95 space-y-3 anim-scale-up">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="badge-playable" style="background: rgba(16, 185, 129, 0.2); border-color: #10B981; color: #34D399;">
                ⚡ FOOD WEB ONLINE • ACTIVE SIMULATION
              </span>
              <span class="gir-hud-pill">+100 XP Assembled</span>
            </div>
            
            <h4 style="font-family: var(--font-title); font-size: 1.05rem; font-weight: 700; color: #FFFFFF;">
              🧪 Ecological Dilemma: ${m3.dilemma.question}
            </h4>

            <div class="space-y-2">
              ${m3.dilemma.options.map(opt => `
                <button class="gir-dilemma-opt-btn btn btn-outline w-full text-left" data-opt-id="${opt.id}" style="padding: 0.75rem 1rem; font-size: 0.85rem; justify-content: flex-start; text-align: left;">
                  ${opt.text}
                </button>
              `).join('')}
            </div>

            ${state.m3DilemmaAnswered ? `
              <div class="p-3 rounded-lg border border-amber-500/40 bg-slate-800/90 text-xs space-y-2 anim-fade-in">
                <p style="color: #F8FAFC; line-height: 1.45;">
                  ${m3.dilemma.options.find(o => o.isCorrect).feedback}
                </p>
                <button id="gir-proceed-to-m4-btn" class="btn btn-primary btn-shimmer-effect w-full" style="margin-top: 0.5rem;">
                  Proceed to Mission 4: Conservation Crisis →
                </button>
              </div>
            ` : ''}
          </div>
        ` : ''}

      </div>
    `;
  }

  // --- 5. MISSION 4: THE CONSERVATION CRISIS ---
  renderMission4Html(m4, state) {
    const selectedPolicy = m4.choices.find(c => c.id === state.m4SelectedPolicyId);

    return `
      <div class="flex flex-col gap-4 anim-fade-in">
        
        <div class="gir-mira-bubble">
          <div class="gir-mira-avatar-orb anim-float">
            <img src="assets/mira/mira.png" alt="Mira" onerror="this.src='character/mira-avatar.png'" />
          </div>
          <div class="gir-mira-text-wrap">
            <div class="gir-mira-header-row">
              <span class="gir-mira-name">MIRA • CONSERVATION STEWARD</span>
              <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #EF4444;">COMMUNITY COEXISTENCE CRISIS</span>
            </div>
            <p class="gir-mira-speech">"${m4.miraIntro}"</p>
          </div>
        </div>

        <div class="gir-crisis-dossier">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: #EF4444; font-family: var(--font-title); font-size: 0.95rem;">${m4.scenario.title}</strong>
            <span class="gir-hud-pill">Stakeholder Decision</span>
          </div>
          <p style="font-size: 0.85rem; color: #CBD5E1; line-height: 1.5;">${m4.scenario.context}</p>
        </div>

        <h4 style="font-family: var(--font-title); font-size: 0.95rem; font-weight: 700; color: #FFFFFF;">
          Choose Your Conservation Policy:
        </h4>

        <div class="gir-policy-grid">
          ${m4.choices.map(policy => `
            <div class="gir-policy-card ${state.m4SelectedPolicyId === policy.id ? 'selected-policy' : ''}" data-policy-id="${policy.id}">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 1.6rem;">${policy.icon}</span>
                <span class="gir-hud-pill">Impact Score: ${policy.score} pts</span>
              </div>
              <h5 style="font-family: var(--font-title); font-size: 0.92rem; font-weight: 700; color: #FFFFFF;">${policy.title}</h5>
              <p style="font-size: 0.78rem; color: #CBD5E1; line-height: 1.4;">${policy.description}</p>
            </div>
          `).join('')}
        </div>

        ${selectedPolicy ? `
          <div class="p-4 rounded-xl border border-amber-500/50 bg-slate-900/95 space-y-3 anim-scale-up">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <strong style="color: var(--gir-warm-gold); font-size: 1rem;">${selectedPolicy.consequences.outcomeBadge}</strong>
              <span class="gir-hud-pill">+${selectedPolicy.score} Decision XP</span>
            </div>
            
            <p style="font-size: 0.85rem; color: #E2E8F0; line-height: 1.5;">
              ${selectedPolicy.consequences.verdict}
            </p>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; font-size: 0.75rem; text-align: center;">
              <div style="background: rgba(16,185,129,0.1); padding: 0.5rem; border-radius: 4px;">
                <div style="font-weight: 800; color: #34D399; font-size: 1rem;">${selectedPolicy.consequences.ecologicalHealth}%</div>
                <div style="color: #94A3B8;">Ecological Health</div>
              </div>
              <div style="background: rgba(59,130,246,0.1); padding: 0.5rem; border-radius: 4px;">
                <div style="font-weight: 800; color: #60A5FA; font-size: 1rem;">${selectedPolicy.consequences.communityTrust}%</div>
                <div style="color: #94A3B8;">Community Trust</div>
              </div>
              <div style="background: rgba(245,158,11,0.1); padding: 0.5rem; border-radius: 4px;">
                <div style="font-weight: 800; color: #FBBF24; font-size: 1rem;">${selectedPolicy.consequences.financialSustainability}%</div>
                <div style="color: #94A3B8;">Sustainability</div>
              </div>
            </div>

            <button id="gir-proceed-to-boss-btn" class="btn btn-primary btn-shimmer-effect w-full" style="margin-top: 0.5rem;">
              Enter The Final Guardian Test 🦁 →
            </button>
          </div>
        ` : ''}

      </div>
    `;
  }

  // --- 6. FINAL CHALLENGE: SAVE GIR ---
  renderFinalChallengeHtml(finalData, state) {
    const stage = finalData.stages[state.finalStageIndex];

    return `
      <div class="flex flex-col gap-4 anim-fade-in">
        
        <div class="gir-emergency-banner">
          <div style="display: flex; align-items: center; gap: 0.6rem;">
            <span style="font-size: 1.5rem;">🚨</span>
            <div>
              <div style="font-family: var(--font-title); font-weight: 800; font-size: 0.95rem; color: #FCA5A5;">FINAL GUARDIAN CRISIS RESPONSE</div>
              <div style="font-size: 0.72rem; color: #FECACA;">Stage ${state.finalStageIndex + 1} of ${finalData.stages.length}</div>
            </div>
          </div>
          <span class="gir-hud-pill" style="border-color: #EF4444; color: #FCA5A5;">High Stakes</span>
        </div>

        <div class="gir-mira-bubble">
          <div class="gir-mira-avatar-orb anim-float">
            <img src="assets/mira/mira.png" alt="Mira" onerror="this.src='character/mira-avatar.png'" />
          </div>
          <div class="gir-mira-text-wrap">
            <div class="gir-mira-header-row">
              <span class="gir-mira-name">MIRA • EMERGENCY COMMAND</span>
            </div>
            <p class="gir-mira-speech">"${finalData.miraIntro}"</p>
          </div>
        </div>

        <div class="p-4 rounded-xl border border-red-500/40 bg-slate-900/95 space-y-3">
          <h3 style="font-family: var(--font-title); font-size: 1.05rem; font-weight: 700; color: #FFFFFF;">
            ${stage.alert}
          </h3>
          <p style="font-size: 0.88rem; color: #CBD5E1; line-height: 1.45;">
            ${stage.prompt}
          </p>

          <div class="space-y-2 pt-2">
            ${stage.options.map((opt, idx) => `
              <button class="gir-final-opt-btn btn btn-outline w-full text-left" data-stage-idx="${state.finalStageIndex}" data-opt-idx="${idx}" style="padding: 0.85rem 1rem; font-size: 0.85rem; justify-content: flex-start; text-align: left;">
                ${opt.text}
              </button>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }

  // --- 7. FINAL RESULTS SCREEN ---
  renderResultsHtml(data, state) {
    const metrics = state.calculatedMetrics;

    return `
      <div class="gir-results-panel anim-scale-up">
        
        <div class="gir-intro-emblem anim-glow-aura">🏆</div>

        <div>
          <span class="badge-playable" style="background: rgba(251, 191, 36, 0.2); border-color: #FBBF24; color: #FBBF24; margin-bottom: 0.5rem;">
            EXPEDITION COMPLETE • BHARATVERSE REWARD
          </span>
          <h1 class="gir-hero-title">GIR GUARDIAN</h1>
          <p style="font-size: 0.95rem; color: var(--gir-emerald-bright); font-family: var(--font-title);">
            Rank: ${metrics.overallRank}
          </p>
        </div>

        <!-- Mira Closing Celebration -->
        <div class="gir-mira-bubble" style="max-width: 680px; text-align: left;">
          <div class="gir-mira-avatar-orb anim-float">
            <img src="assets/mira/mira.png" alt="Mira" onerror="this.src='character/mira-avatar.png'" />
          </div>
          <div class="gir-mira-text-wrap">
            <div class="gir-mira-header-row">
              <span class="gir-mira-name">MIRA • ADVENTURE PARTNER</span>
            </div>
            <p class="gir-mira-speech">
              "You didn't just visit Gir, Guardian. You understood how an entire forest ecosystem survives and how humans and predators thrive together!"
            </p>
          </div>
        </div>

        <!-- 4 Dynamic Performance Scores -->
        <div class="gir-score-bars-grid">
          <div class="gir-score-card">
            <span class="gir-score-val">${metrics.knowledgePct}%</span>
            <span class="gir-stat-lbl">Wildlife Knowledge</span>
          </div>
          <div class="gir-score-card">
            <span class="gir-score-val">${metrics.explorationPct}%</span>
            <span class="gir-stat-lbl">Forest Patrol</span>
          </div>
          <div class="gir-score-card">
            <span class="gir-score-val">${metrics.decisionPct}%</span>
            <span class="gir-stat-lbl">Decision Making</span>
          </div>
          <div class="gir-score-card">
            <span class="gir-score-val">${metrics.conservationPct}%</span>
            <span class="gir-stat-lbl">Conservation</span>
          </div>
        </div>

        <!-- Total XP Pill -->
        <div style="font-family: var(--font-mono); font-size: 1.3rem; font-weight: 800; color: var(--gir-warm-gold);">
          TOTAL EXPEDITION XP: +${state.totalXP} XP
        </div>

        <!-- Unlocked Badges Showcase -->
        <div class="gir-badge-unlock-showcase">
          <div style="font-size: 2.5rem;">🦁</div>
          <strong style="font-family: var(--font-title); font-size: 1.1rem; color: #FFFFFF;">
            BADGE UNLOCKED: GUARDIAN OF GIR
          </strong>
          <p style="font-size: 0.78rem; color: #CBD5E1; max-width: 450px;">
            Recognized for mastering biodiversity, food webs, and community stewardship in Gir National Park.
          </p>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; margin-top: 0.5rem;">
          <button id="gir-restart-btn" class="btn btn-outline" style="padding: 0.75rem 1.8rem;">
            🔄 Explore Gir Again
          </button>
          <button id="gir-return-hub-btn" class="btn btn-primary btn-shimmer-effect" style="padding: 0.75rem 2rem;">
            🗺️ Return to Gujarat Hub →
          </button>
        </div>

      </div>
    `;
  }

  // --- PROGRESS TRACKER BAR ---
  renderTrackerHtml(state) {
    const stepMap = {
      'mission-1': 1,
      'mission-2': 2,
      'mission-3': 3,
      'mission-4': 4,
      'final-challenge': 4
    };
    const currentNum = stepMap[state.currentStep] || 1;
    const pct = Math.round((currentNum / 4) * 100);

    return `
      <div class="gir-mission-tracker">
        <span style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 800; color: var(--gir-warm-gold);">
          MISSION ${currentNum} / 4
        </span>
        <div class="gir-tracker-steps">
          <div class="gir-tracker-step ${currentNum >= 1 ? (currentNum > 1 ? 'completed-step' : 'active-step') : ''}"></div>
          <div class="gir-tracker-step ${currentNum >= 2 ? (currentNum > 2 ? 'completed-step' : 'active-step') : ''}"></div>
          <div class="gir-tracker-step ${currentNum >= 3 ? (currentNum > 3 ? 'completed-step' : 'active-step') : ''}"></div>
          <div class="gir-tracker-step ${currentNum >= 4 ? (state.finalCompleted ? 'completed-step' : 'active-step') : ''}"></div>
        </div>
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #94A3B8;">${pct}%</span>
      </div>
    `;
  }

  // --- EVENT BINDINGS ---
  bindEvents() {
    // 1. Navigation Breadcrumb Links
    const b1 = this.screenEl.querySelector('#gir-nav-bharatverse');
    if (b1) b1.addEventListener('click', () => router.navigateTo('map'));

    const b2 = this.screenEl.querySelector('#gir-nav-gujarat');
    if (b2) b2.addEventListener('click', () => router.navigateTo('gujarat-map'));

    const b3 = this.screenEl.querySelector('#gir-nav-gir');
    if (b3) b3.addEventListener('click', () => girGuardianState.setStep('intro'));

    // Reset Progress
    const resetBtn = this.screenEl.querySelector('#gir-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset Gir Guardian progress?')) {
          soundFx.playClick();
          girGuardianState.reset();
        }
      });
    }

    // Start Mission CTA
    const startBtn = this.screenEl.querySelector('#gir-start-mission-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        soundFx.playChime();
        girGuardianState.setStep('mission-1');
      });
    }

    // Mission 1: Reveal Clue
    const revealBtn = this.screenEl.querySelector('#gir-reveal-clue-btn');
    if (revealBtn) {
      revealBtn.addEventListener('click', () => {
        soundFx.playClick();
        girGuardianState.revealNextClue();
      });
    }

    // Mission 1: Wildlife Card Click
    const animalCards = this.screenEl.querySelectorAll('.gir-animal-card');
    animalCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const animalId = e.currentTarget.getAttribute('data-animal-id');
        const res = girGuardianState.submitWildlifeGuess(animalId);
        if (res.isCorrect) {
          soundFx.playCorrect();
          alert(`🎉 Correct! +${res.points} XP\n\n${res.fact}`);
          if (res.isLastCase) {
            girGuardianState.setStep('mission-2');
          } else {
            girGuardianState.advanceToNextWildlifeCase();
          }
        } else {
          soundFx.playWrong();
          alert(`❌ Not quite. The clues point elsewhere! Lives remaining: ${res.remainingLives}`);
        }
      });
    });

    // Mission 2: Route Selection
    const routeCards = this.screenEl.querySelectorAll('.gir-route-card');
    routeCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const routeId = e.currentTarget.getAttribute('data-route-id');
        soundFx.playChime();
        girGuardianState.selectRoute(routeId);
      });
    });

    const toM3Btn = this.screenEl.querySelector('#gir-proceed-to-m3-btn');
    if (toM3Btn) {
      toM3Btn.addEventListener('click', () => {
        soundFx.playChime();
        girGuardianState.setStep('mission-3');
      });
    }

    // Mission 3: Trophic Token Clicks
    let selectedTokenId = null;
    const tokens = this.screenEl.querySelectorAll('.gir-palette-token:not(.token-used)');
    tokens.forEach(token => {
      token.addEventListener('click', (e) => {
        soundFx.playClick();
        tokens.forEach(t => t.style.borderColor = 'rgba(245, 158, 11, 0.4)');
        e.currentTarget.style.borderColor = '#FBBF24';
        selectedTokenId = e.currentTarget.getAttribute('data-item-id');
      });
    });

    const slots = this.screenEl.querySelectorAll('.gir-trophic-slot');
    slots.forEach(slot => {
      slot.addEventListener('click', (e) => {
        if (!selectedTokenId) {
          alert('Click an organism token below first, then click the matching trophic slot!');
          return;
        }
        const targetId = e.currentTarget.getAttribute('data-target-id');
        const res = girGuardianState.slotEcosystemItem(targetId, selectedTokenId);
        if (res.success) {
          soundFx.playCorrect();
          selectedTokenId = null;
        } else {
          soundFx.playWrong();
          alert('❌ That organism belongs to a different trophic level. Think about how energy flows from the sun!');
        }
      });
    });

    // Mission 3: Dilemma Options
    const dilemmaBtns = this.screenEl.querySelectorAll('.gir-dilemma-opt-btn');
    dilemmaBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const optId = e.currentTarget.getAttribute('data-opt-id');
        const res = girGuardianState.submitEcosystemDilemma(optId);
        if (res && res.isCorrect) {
          soundFx.playCorrect();
        } else {
          soundFx.playWrong();
        }
      });
    });

    const toM4Btn = this.screenEl.querySelector('#gir-proceed-to-m4-btn');
    if (toM4Btn) {
      toM4Btn.addEventListener('click', () => {
        soundFx.playChime();
        girGuardianState.setStep('mission-4');
      });
    }

    // Mission 4: Policy Choices
    const policyCards = this.screenEl.querySelectorAll('.gir-policy-card');
    policyCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const policyId = e.currentTarget.getAttribute('data-policy-id');
        soundFx.playChime();
        girGuardianState.selectConservationPolicy(policyId);
      });
    });

    const toBossBtn = this.screenEl.querySelector('#gir-proceed-to-boss-btn');
    if (toBossBtn) {
      toBossBtn.addEventListener('click', () => {
        soundFx.playChime();
        girGuardianState.setStep('final-challenge');
      });
    }

    // Final Challenge Option Clicks
    const finalBtns = this.screenEl.querySelectorAll('.gir-final-opt-btn');
    finalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const sIdx = parseInt(e.currentTarget.getAttribute('data-stage-idx'), 10);
        const oIdx = parseInt(e.currentTarget.getAttribute('data-opt-idx'), 10);
        const res = girGuardianState.submitFinalStageAnswer(sIdx, oIdx);
        if (res.isCorrect) {
          soundFx.playCorrect();
        } else {
          soundFx.playWrong();
        }

        if (res.isLastStage) {
          soundFx.playLevelUpFanfare();
          girGuardianState.setStep('results');
        } else {
          girGuardianState.state.finalStageIndex++;
          girGuardianState.save();
        }
      });
    });

    // Results Actions
    const restartBtn = this.screenEl.querySelector('#gir-restart-btn');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        soundFx.playClick();
        girGuardianState.reset();
      });
    }

    const returnHubBtn = this.screenEl.querySelector('#gir-return-hub-btn');
    if (returnHubBtn) {
      returnHubBtn.addEventListener('click', () => {
        soundFx.playChime();
        router.navigateTo('gujarat-map');
      });
    }
  }
}

export const girGuardianScreen = new GirGuardianScreen();
