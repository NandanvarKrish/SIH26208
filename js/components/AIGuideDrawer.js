// js/components/AIGuideDrawer.js - Interactive Mira AI Cultural Guide Drawer Component

import { aiGuideService } from '../services/aiGuideService.js';
import { playerState } from '../state/playerState.js';
import { soundFx } from '../utils/audio.js';

class AIGuideDrawer {
  constructor() {
    this.drawerEl = null;
    this.fabBtn = null;
    this.messagesContainer = null;
    this.inputEl = null;
    this.sendBtn = null;
    this.promptsContainer = null;
    this.contextPill = null;
    this.isOpen = false;
    this.isTyping = false;
    this.messages = [];
  }

  init() {
    this.renderHtml();
    this.bindElements();
    this.bindEvents();

    // Subscribe to state to update context
    playerState.subscribe((state) => this.handleStateChange(state));
  }

  renderHtml() {
    // 1. Floating FAB Button
    let fab = document.getElementById('ai-guide-fab-btn');
    if (!fab) {
      fab = document.createElement('button');
      fab.id = 'ai-guide-fab-btn';
      fab.className = 'ai-guide-fab hidden';
      fab.setAttribute('aria-label', 'Open Mira AI Cultural Guide');
      fab.innerHTML = `
        <div class="fab-avatar-ring anim-glow-aura">
          <img src="character/mira-avatar.png" alt="Mira" class="fab-avatar-img" />
          <span class="fab-online-dot"></span>
        </div>
        <div class="fab-label-text">
          <span class="fab-label-title">Ask Mira</span>
          <span class="fab-label-sub">AI Cultural Guide</span>
        </div>
      `;
      document.body.appendChild(fab);
    }
    this.fabBtn = fab;

    // 2. Chat Drawer Panel
    let drawer = document.getElementById('ai-guide-drawer');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'ai-guide-drawer';
      drawer.className = 'ai-guide-drawer drawer-closed';
      drawer.setAttribute('role', 'dialog');
      drawer.setAttribute('aria-label', 'Mira AI Guide Chat');

      drawer.innerHTML = `
        <!-- Drawer Header -->
        <div class="drawer-header">
          <div class="drawer-header-info">
            <div class="drawer-mira-avatar anim-glow-aura">
              <img src="character/mira-avatar.png" alt="Mira" class="drawer-mira-avatar-img" />
            </div>
            <div>
              <div class="drawer-title">Mira • Cultural AI Guide</div>
              <div class="drawer-status-pill">
                <span>🟢</span> Online • Gujarat Heritage Companion
              </div>
            </div>
          </div>

          <div class="drawer-actions-row">
            <button id="ai-drawer-clear-btn" class="drawer-btn-icon" title="Clear Chat History">🗑️</button>
            <button id="ai-drawer-close-btn" class="drawer-btn-icon" title="Minimize Guide">✕</button>
          </div>
        </div>

        <!-- Context Bar -->
        <div class="drawer-context-bar">
          <span id="ai-drawer-context-text">📍 Context: Gujarat Exploration Hub</span>
          <span style="font-size: 0.65rem; color: #94A3B8;">BharatVerse Intelligence</span>
        </div>

        <!-- Messages Stream -->
        <div id="ai-chat-messages" class="chat-messages-viewport">
          <!-- Messages dynamically appended here -->
        </div>

        <!-- Suggested Questions Prompt Chips -->
        <div id="ai-suggested-prompts" class="drawer-suggested-prompts">
          <!-- Chips populated dynamically -->
        </div>

        <!-- Input Bar -->
        <div class="drawer-input-bar">
          <input id="ai-chat-input" type="text" class="chat-text-input" placeholder="Ask Mira about Gujarat heritage..." autocomplete="off">
          <button id="ai-chat-send-btn" class="chat-send-btn" title="Send Message" aria-label="Send Message">➤</button>
        </div>
      `;
      document.body.appendChild(drawer);
    }
    this.drawerEl = drawer;
  }

  bindElements() {
    this.messagesContainer = document.getElementById('ai-chat-messages');
    this.inputEl = document.getElementById('ai-chat-input');
    this.sendBtn = document.getElementById('ai-chat-send-btn');
    this.promptsContainer = document.getElementById('ai-suggested-prompts');
    this.contextPill = document.getElementById('ai-drawer-context-text');
  }

  bindEvents() {
    // FAB Button toggle
    if (this.fabBtn) {
      this.fabBtn.addEventListener('click', () => {
        soundFx.playClick();
        this.toggle();
      });
    }

    // Close & Clear buttons
    const closeBtn = document.getElementById('ai-drawer-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        soundFx.playClick();
        this.close();
      });
    }

    const clearBtn = document.getElementById('ai-drawer-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        soundFx.playClick();
        this.clearMessages();
        this.addInitialGreeting();
      });
    }

    // Send on button click
    if (this.sendBtn) {
      this.sendBtn.addEventListener('click', () => this.handleUserSend());
    }

    // Send on Enter key
    if (this.inputEl) {
      this.inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.handleUserSend();
        }
      });
    }
  }

  handleStateChange(state) {
    // Show FAB button when user is logged in
    if (state.isLoggedIn) {
      if (this.fabBtn) this.fabBtn.classList.remove('hidden');
    } else {
      if (this.fabBtn) this.fabBtn.classList.add('hidden');
      this.close();
    }

    this.updateContextBar(state);
    this.updateSuggestedPrompts(state);
  }

  updateContextBar(state) {
    if (!this.contextPill) return;
    const locId = state.selectedGujaratLocationId || 'kutch';
    const locName = aiGuideService.getLocationName(locId);
    this.contextPill.textContent = `📍 Active Context: ${locName}`;
  }

  updateSuggestedPrompts(state) {
    if (!this.promptsContainer) return;

    const locId = state.selectedGujaratLocationId || 'kutch';

    const basePrompts = [
      'What can I learn here?',
      'Tell me about this place.',
      'Why is this important?',
      'What should I explore next?'
    ];

    // Location specific prompts
    const regionalPrompts = {
      'kutch': ['How is Rogan art made?', 'Tell me about the White Desert'],
      'gir-saurashtra': ['Tell me about Gir lions', 'Who are the Maldhari tribes?'],
      'ahmedabad-central': ['What was the Dandi March?', 'Tell me about Gujarati Thali'],
      'patan-north': ['Why is Rani ki Vav famous?', 'How does Patola silk work?']
    };

    const combined = basePrompts.concat(regionalPrompts[locId] || []);

    this.promptsContainer.innerHTML = combined.map(prompt => `
      <button class="prompt-chip-btn" data-prompt="${prompt}">
        ${prompt}
      </button>
    `).join('');

    // Bind prompt clicks
    const chipBtns = this.promptsContainer.querySelectorAll('.prompt-chip-btn');
    chipBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = e.currentTarget.getAttribute('data-prompt');
        soundFx.playClick();
        this.submitPrompt(text);
      });
    });
  }

  open() {
    if (!this.drawerEl) return;
    this.isOpen = true;
    this.drawerEl.classList.remove('drawer-closed');

    if (this.messages.length === 0) {
      this.addInitialGreeting();
    }

    if (this.inputEl) this.inputEl.focus();
  }

  close() {
    if (!this.drawerEl) return;
    this.isOpen = false;
    this.drawerEl.classList.add('drawer-closed');
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  addInitialGreeting() {
    const state = playerState.getState();
    const playerName = state.name || 'Yatri';
    const locId = state.selectedGujaratLocationId || 'kutch';
    const locName = aiGuideService.getLocationName(locId);

    this.appendMiraMessage({
      text: `**Kem Cho, ${playerName}! 🙏** I am **Mira**, your cultural AI guide. We are currently exploring **${locName}**! Ask me anything about Gujarat's artisanal heritage, wildlife, history, or what to discover next.`,
      suggestedNextStep: `Tap any suggested question below or type your own inquiry!`
    });
  }

  handleUserSend() {
    if (!this.inputEl || this.isTyping) return;
    const text = this.inputEl.value.trim();
    if (!text) return;

    this.inputEl.value = '';
    this.submitPrompt(text);
  }

  async submitPrompt(text) {
    if (this.isTyping) return;

    // Append player message
    this.appendUserMessage(text);
    this.isTyping = true;
    this.showTypingIndicator();

    const state = playerState.getState();
    const context = {
      locationId: state.selectedGujaratLocationId || 'kutch'
    };

    try {
      const response = await aiGuideService.sendMessage(text, context);
      this.hideTypingIndicator();
      this.appendMiraMessage(response);
      soundFx.playChime();
    } catch (err) {
      this.hideTypingIndicator();
      this.appendMiraMessage({
        text: `I apologize, ${state.name}. I encountered a momentary disturbance in my cultural archives. Please ask again!`
      });
    } finally {
      this.isTyping = false;
    }
  }

  appendUserMessage(text) {
    if (!this.messagesContainer) return;

    const row = document.createElement('div');
    row.className = 'chat-msg-row user-row';
    row.innerHTML = `
      <div class="chat-bubble-user">
        ${this.escapeHtml(text)}
      </div>
    `;

    this.messagesContainer.appendChild(row);
    this.messages.push({ role: 'user', text });
    this.scrollToBottom();
  }

  appendMiraMessage({ text, culturalInsight, suggestedNextStep }) {
    if (!this.messagesContainer) return;

    const row = document.createElement('div');
    row.className = 'chat-msg-row mira-row';

    // Format simple markdown (**bold** and newlines)
    const formattedText = this.formatMarkdown(text);

    row.innerHTML = `
      <div class="chat-msg-avatar">
        <img src="character/mira-avatar.png" alt="Mira" class="chat-msg-avatar-img" />
      </div>
      <div class="chat-bubble-mira">
        <div>${formattedText}</div>
        
        ${culturalInsight ? `
          <div class="chat-insight-box">
            <strong>💡 Cultural Insight:</strong> ${culturalInsight}
          </div>
        ` : ''}

        ${suggestedNextStep ? `
          <div class="chat-next-step-box">
            👉 ${suggestedNextStep}
          </div>
        ` : ''}

        <button class="chat-tts-btn" title="Listen to Mira's voice">
          <span>🔊</span> Read aloud
        </button>
      </div>
    `;

    // Bind TTS button
    const ttsBtn = row.querySelector('.chat-tts-btn');
    if (ttsBtn) {
      ttsBtn.addEventListener('click', () => {
        this.speakText(text);
      });
    }

    this.messagesContainer.appendChild(row);
    this.messages.push({ role: 'mira', text });
    this.scrollToBottom();
  }

  showTypingIndicator() {
    if (!this.messagesContainer) return;

    let indicator = document.getElementById('ai-typing-indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'ai-typing-indicator';
      indicator.className = 'chat-msg-row mira-row';
      indicator.innerHTML = `
        <div class="chat-msg-avatar">
          <img src="character/mira-avatar.png" alt="Mira" class="chat-msg-avatar-img" />
        </div>
        <div class="typing-indicator-bubble">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      `;
      this.messagesContainer.appendChild(indicator);
    }
    this.scrollToBottom();
  }

  hideTypingIndicator() {
    const indicator = document.getElementById('ai-typing-indicator');
    if (indicator && indicator.parentNode) {
      indicator.parentNode.removeChild(indicator);
    }
  }

  clearMessages() {
    this.messages = [];
    if (this.messagesContainer) {
      this.messagesContainer.innerHTML = '';
    }
  }

  scrollToBottom() {
    if (this.messagesContainer) {
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
  }

  formatMarkdown(str) {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  speakText(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Strip markdown asterisks for clean speech
      const cleanText = text.replace(/\*\*/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    } else {
      soundFx.playChime();
    }
  }
}

export const aiGuideDrawer = new AIGuideDrawer();
