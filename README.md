# BharatVerse — The Cultural Metaverse of India 🇮🇳

> **An Interactive Gamified Cultural Learning Experience**
> 
> A vibrant, immersive metaverse that celebrates India's diverse heritage through interactive storytelling, mini-games, quizzes, and AI-powered cultural guidance. Built for the **Smart India Hackathon (SIH) 2026**.

![BharatVerse](https://img.shields.io/badge/Status-Hackathon%20Prototype-blue) ![License](https://img.shields.io/badge/License-MIT-green)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Game Progression](#game-progression)
- [Screens & Navigation](#screens--navigation)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**BharatVerse** is an interactive gamified learning platform that transforms cultural education into an engaging adventure. Players explore Indian states through immersive storytelling, collect cultural artifacts, complete region-specific challenges, and learn about India's rich heritage—all powered by AI guidance.

### Hackathon Scope
- **Playable State**: Gujarat (fully featured with 4 regional zones)
- **Preview States**: Rajasthan, Tamil Nadu, West Bengal (locked, coming soon)
- **Core Game Loop**: Story → Mini-Game → Quiz → Rewards & Artifact Collection
- **AI Companion**: "Indi" — An AI guide powered by Google Gemini Flash API

---

## 🎮 Key Features

### 1. **Interactive Maps & Navigation**
   - 🗺️ National India map hub for state selection
   - 🧭 Regional zone maps with points of interest
   - 📍 Animated pins showing progress status (Active, In-Progress, Mastered)

### 2. **Gamified Learning**
   - 📖 **Story Screens**: Bite-sized cultural narratives with audio pronunciation
   - 🎮 **Mini-Games**: Region-specific interactive challenges
     - *Garba Rhythm Beats* (Kutch) — Dandiya rhythm tapping
     - *Gujarati Thali Master* (Ahmedabad) — Dish arrangement puzzle
     - *Safari Wildlife Spotter* (Gir) — Animal recognition game
   - 🏆 **Quiz Engine**: Knowledge assessment with lifelines (50:50, AI hints)

### 3. **Progression & Rewards System**
   - 📊 XP & Level system with player titles (Novice Yatri → Master Traveler)
   - 💰 Bharat Coins for achievements
   - 🔥 Streak tracking for consecutive daily plays
   - 🏅 Star rating system (1-3 stars) for achievements

### 4. **Cultural Artifact Museum**
   - 🏛️ Personal collection gallery of unlocked artifacts
   - 🎨 Rarity tiers (Common, Rare, Legendary, Mythic)
   - 📍 Real-world location mapping to historic sites
   - 🔊 Audio narration and historical context

### 5. **AI Cultural Companion "Indi"**
   - 💬 Conversational AI guide via Google Gemini Flash API
   - 🎤 Multilingual support (English, Hindi, Gujarati)
   - 🔊 Text-to-Speech audio synthesis
   - 📝 Context-aware suggestions throughout gameplay

### 6. **Accessible & Immersive Design**
   - 🌙 Dark-mode cinematic UI with glassmorphism effects
   - 🎨 Heritage-inspired color palette (Saffron, Peacock Teal, Royal Gold)
   - 📱 Fully responsive design (mobile-first)
   - ♿ WCAG-compliant accessibility features

---

## 📁 Project Structure

```
SIH26208/
├── index.html                 # Main HTML entry point
├── README.md                  # This file
├── ARCHITECTURE.md            # Detailed technical architecture
├── DESIGN_SYSTEM.md          # Visual design system & UI specs
│
├── css/                       # Stylesheets
│   ├── main.css             # Core styling & base styles
│   ├── components.css       # Component-specific styles
│   ├── animations.css       # Keyframes & transitions
│   ├── map.css              # Map UI styling
│   ├── gujarat.css          # Gujarat-specific styling
│   ├── story.css            # Story screen styling
│   ├── minigame.css         # Mini-game UI styling
│   ├── quiz.css             # Quiz engine styling
│   ├── museum.css           # Museum gallery styling
│   └── aiguide.css          # AI guide drawer styling
│
├── js/                        # JavaScript modules
│   ├── app.js               # Main application entry & initialization
│   │
│   ├── components/          # Reusable UI components
│   │   ├── AIGuideDrawer.js
│   │   ├── GujaratMap.js
│   │   ├── IndiaMap.js
│   │   ├── Modal.js
│   │   ├── NotificationToast.js
│   │   ├── QuizEngine.js
│   │   └── TopHUD.js
│   │
│   ├── screens/             # Full-screen view controllers
│   │   ├── SplashScreen.js
│   │   ├── LoginScreen.js
│   │   ├── MapScreen.js
│   │   ├── GujaratIntroScreen.js
│   │   ├── GujaratMapScreen.js
│   │   ├── StoryScreen.js
│   │   ├── MiniGameScreen.js
│   │   ├── QuizScreen.js
│   │   └── MuseumScreen.js
│   │
│   ├── data/                # Game data & datasets
│   │   ├── gujaratLocationsData.js  # Location POIs & zones
│   │   ├── miniGamesData.js         # Game configurations
│   │   ├── museumData.js            # Artifact catalog
│   │   ├── quizData.js              # Quiz questions & answers
│   │   ├── statesData.js            # State metadata
│   │   └── storyData.js             # Story content & narratives
│   │
│   ├── services/            # External integrations
│   │   └── aiGuideService.js        # Google Gemini API integration
│   │
│   ├── state/               # State management
│   │   └── playerState.js           # Player data & progression
│   │
│   └── utils/               # Helper functions
│       ├── audio.js         # Sound & music management
│       └── router.js        # Navigation & routing
│
└── character/               # Character assets (avatars, sprites)
```

---

## 🛠️ Tech Stack

### Frontend
- **HTML5 / CSS3** — Semantic markup, advanced styling, animations
- **Vanilla JavaScript (ES6+)** — No build step required for hackathon simplicity
- **Canvas API** — Mini-game graphics (Garba, Thali, Safari)
- **SVG** — Interactive maps and vector graphics

### Styling & Design
- **CSS3 Animations** — Glassmorphism, glow effects, micro-interactions
- **CSS Variables** — Theme system (Heritage Color Palette)
- **Responsive Design** — Mobile-first approach with media queries

### External APIs & Services
- **Google Gemini Flash API** (`@google/genai`) — AI cultural companion "Indi"
- **Web Audio API** — Background music, sound effects, text-to-speech
- **localStorage** — Player state persistence (offline capability)

### Tools & Utilities
- **Git & GitHub** — Version control
- **Browser DevTools** — Debugging & performance optimization

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for Gemini API & Google Fonts)
- Optional: Google Cloud API Key for Gemini Flash API

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SIH26208.git
   cd SIH26208
   ```

2. **Set up Google Gemini API** (Optional, for AI Guide)
   - Create a `.env` file in the root directory
   - Add your Google Cloud API key:
     ```
     VITE_GOOGLE_GEMINI_API_KEY=your_api_key_here
     ```

3. **Open in browser**
   - Simple option: Double-click `index.html` or open in a local server
   - Recommended: Use a local development server
     ```bash
     # Using Python 3
     python3 -m http.server 8000
     
     # Using Node.js
     npx http-server
     ```
   - Navigate to `http://localhost:8000`

---

## 🎮 Game Progression

### Player Journey

```
1. Onboarding Screen
   ↓ (Name, Avatar, Sound Settings)
   
2. India Map Hub
   ↓ (National overview, state selection)
   
3. Gujarat Introduction Hero
   ↓ (Cultural hook & heritage preview)
   
4. Gujarat Regional Zone Map
   ↓ (4 zones: Kutch, Saurashtra, Ahmedabad, Ekta Nagar)
   
5. Story & Cultural Learning
   ↓ (Bite-sized narratives with audio)
   
6. Mini-Game Arena
   ↓ (Interactive challenge specific to region)
   
7. Zone Knowledge Quiz
   ↓ (Assessment with lifelines)
   
8. Victory & Reward Celebration
   ↓ (XP, Coins, Artifact Unlock)
   
9. Heritage Museum
   ↓ (Collectible gallery & artifact details)
```

### XP & Progression System
- **Story Completion**: +50 XP
- **Mini-Game Mastery**: +100 XP (based on stars: 1⭐ = 50, 2⭐ = 75, 3⭐ = 100)
- **Quiz Perfect Score**: +150 XP
- **Artifact Unlock**: +200 XP + 50 Bharat Coins
- **Levels**: Unlock new titles and special rewards

---

## 🖼️ Screens & Navigation

### 1. **Onboarding & Explorer Setup**
- Avatar selection (Veer, Ananya, Kabir, Diya)
- Name customization
- Sound preference settings

### 2. **India Interactive Map**
- National state overview
- Gujarat highlighted as playable
- Locked preview states (Rajasthan, Tamil Nadu, West Bengal)
- Top HUD with profile, XP, coins

### 3. **Gujarat Introduction Hero**
- Cultural immersion hook
- Heritage highlights grid (Architecture, Wildlife, Crafts, Cuisine)
- AI companion introduction

### 4. **Gujarat Regional Zone Map**
- Stylized 2.5D map with 4 zones
- Interactive POI pins with progress badges
- Zone selection drawer

### 5. **Story & Cultural Learning**
- 3-4 swipeable story cards
- Audio pronunciation buttons
- "Did You Know?" interactive trivia
- Progression indicators

### 6. **Cultural Mini-Game**
- Garba Rhythm Beats (Kutch)
- Gujarati Thali Master (Ahmedabad)
- Safari Wildlife Spotter (Gir)
- HUD with score, timer, combo counter

### 7. **Zone Knowledge Quiz**
- 4-question quiz per zone
- 50:50 lifeline
- AI hint lifeline
- Streak tracking & timer
- Instant visual feedback

### 8. **Reward Celebration Modal**
- Confetti animation
- XP & coin roll-up counter
- Artifact unlock showcase

### 9. **Heritage Museum**
- Artifact grid with filtering
- Rarity tier display
- 360° artifact detail viewer
- Historical context & narration

### 10. **Indi AI Guide Drawer**
- Floating action button (FAB)
- Chat interface with message history
- Quick-prompt suggestion chips
- Multilingual support with TTS

---

## 🏗️ Architecture

### Design Principles
- **Mobile-First Responsive Design** — Optimized for all screen sizes
- **Glassmorphism UI** — Modern aesthetic with frosted glass effects
- **Cultural Heritage Color Palette** — Saffron, Peacock Teal, Royal Gold
- **Accessibility-First** — WCAG 2.1 AA compliant
- **Offline-Capable** — localStorage persistence for game state
- **Zero-Build for Hackathon** — Plain JavaScript without build tools

### State Management
- **Player State**: Name, avatar, progression, XP, coins, streaks
- **Progression State**: Zone completion, unlocked artifacts, badges
- **Quiz State**: Current question, answers, lifelines used, score
- **AI State**: Chat messages, typing indicator, drawer visibility
- **Persistence**: All state synced to `localStorage`

### Component Architecture
Modular component-based design for reusability:
- **Layout Components**: AppShell, TopHUD, BottomDock
- **Map Components**: IndiaSvgMap, GujaratZoneMap, StatePin
- **Story Components**: StoryDeck, StorySlide, DidYouKnowFlipCard
- **Game Components**: MiniGameContainer, specific game implementations
- **Quiz Components**: QuizEngine, TimerProgressRing, AnswerOptionCard
- **Museum Components**: MuseumGrid, ArtifactDetailViewer
- **AI Components**: IndiFAB, IndiChatDrawer, MessageBubble

For detailed technical architecture, see [ARCHITECTURE.md](ARCHITECTURE.md).

---

## 🎨 Design System

### Color Palette
- **Primary Heritage**: Saffron (#FF7A00), Marigold (#FFAA00)
- **Secondary**: Peacock Teal (#008E8A), Electric Cyan (#00D2C4)
- **Accent**: Royal Gold (#FFD700)
- **Dark Surfaces**: Cosmic Dark (#070B14), Surface (#0F172A)
- **Feedback**: Success Green (#10B981), Error Red (#EF4444)

### Typography
- **Headings**: Cinzel Decorative, Poppins
- **Game UI**: Rajdhani, Space Grotesk
- **Body**: Plus Jakarta Sans, Inter

### Components
- Glowing tactile buttons with 3D effects
- Glassmorphic cards with backdrop blur
- Animated progress indicators
- Rarity-based icon systems

For complete design specifications, see [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md).

---

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

All screens are fully responsive with touch-friendly interaction targets.

---

## ♿ Accessibility

- WCAG 2.1 Level AA compliance
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast ratios ≥ 4.5:1
- Alternative text for images
- Captions for audio content

---

## 🤝 Contributing

Contributions are welcome! For the hackathon:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow semantic HTML & CSS best practices
- Write modular, reusable JavaScript components
- Test across mobile, tablet, and desktop
- Maintain accessibility standards
- Update documentation as needed

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

**Project Team**: SIH 2026 - Smart India Hackathon Participants

For questions or issues, please open a GitHub Issue or contact the team.

---

## 🙏 Acknowledgments

- **Design Inspiration**: Indian heritage, modern gaming UI, glassmorphism trends
- **Content**: Cultural research from authentic Indian heritage sources
- **AI Integration**: Google Gemini Flash API for intelligent guidance
- **SIH 2026**: Smart India Hackathon for the opportunity

---

## 🚀 Roadmap

- [ ] Add more Indian states (Rajasthan, Tamil Nadu, West Bengal)
- [ ] Expand to all 28 Indian states
- [ ] Implement multiplayer challenges
- [ ] Add user authentication & cloud sync
- [ ] iOS & Android mobile app versions
- [ ] Advanced AR features for artifact visualization
- [ ] Integration with educational institutions

---

**Happy Exploring! Begin Your Yatra (Journey) Today!** 🗺️✨