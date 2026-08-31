# BharatVerse — Visual Design System & UI/UX Specification

> **Design Direction**: Cinematic Adventure Game × Modern Cultural Metaverse × Immersive Heritage App  
> **Visual Philosophy**: "Ancient Majesty Meets Modern Glassmorphism" — Rich royal jewel tones (Kesariya Saffron, Peacock Teal, Royal Gold, Rann White), atmospheric layered depths, intricate subtle mandala geometry, glowing tactile game controls, and fluid micro-interactions.

---

## 1. Color Palette System

The palette combines authentic Indian heritage pigments with high-contrast gaming dark mode foundations.

### 1.1 Core Cultural & Semantic Palette Tokens

```css
:root {
  /* --- Brand & Heritage Primaries --- */
  --color-kesariya: #FF7A00;          /* Deep Festive Saffron / Fire */
  --color-kesariya-glow: rgba(255, 122, 0, 0.45);
  --color-marigold: #FFAA00;          /* Warm Marigold Gold */
  
  --color-peacock: #008E8A;           /* Majestic Peacock Teal */
  --color-peacock-light: #00D2C4;     /* Electric Cyan-Teal Accent */
  --color-peacock-glow: rgba(0, 210, 196, 0.35);

  --color-royal-gold: #FFD700;        /* Royal Temple Gold */
  --color-gold-metallic: linear-gradient(135deg, #FFE259 0%, #FFA751 100%);
  --color-gold-border: rgba(255, 215, 0, 0.35);

  /* --- Regional Gujarat Earth Tones --- */
  --color-rann-white: #F8FAFC;        /* Salt Desert Crystalline White */
  --color-rann-sand: #F1E5D1;         /* Kutch Sunbaked Sand */
  --color-terracotta: #D9534F;        /* Saurashtra Clay Red */
  
  /* --- Surface & Cinematic Dark Foundations --- */
  --bg-cosmic-dark: #070B14;          /* Deep Midnight Sky */
  --bg-surface-elevated: #0F172A;     /* Primary Card Background */
  --bg-surface-glass: rgba(15, 23, 42, 0.75); /* Glassmorphic Surface */
  --bg-surface-glass-border: rgba(255, 255, 255, 0.12);
  --bg-surface-glass-hover: rgba(30, 41, 59, 0.85);

  /* --- Game Feedback & Status --- */
  --color-success: #10B981;           /* Emerald Victory Green */
  --color-success-glow: rgba(16, 185, 129, 0.4);
  --color-error: #EF4444;             /* Vermilion Warning Red */
  --color-streak-flame: #FF4500;      /* Combo Streak Orange-Red */
  --color-xp-cyan: #38BDF8;           /* High-Tech Learning XP */
  
  /* --- Rarity Tiers --- */
  --rarity-common: #94A3B8;          /* Slate Silver */
  --rarity-rare: #3B82F6;            /* Lapis Blue */
  --rarity-legendary: #EC4899;       /* Royal Fuchsia / Radiant Magenta */
  --rarity-mythic: #F59E0B;          /* Sunstone Amber */
}
```

### 1.2 Tailwind Configuration Snippet (`tailwind.config.js`)

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        kesariya: { DEFAULT: '#FF7A00', glow: 'rgba(255, 122, 0, 0.45)' },
        peacock: { DEFAULT: '#008E8A', light: '#00D2C4', glow: 'rgba(0, 210, 196, 0.35)' },
        gold: { royal: '#FFD700', muted: '#C5A059' },
        rann: { white: '#F8FAFC', sand: '#F1E5D1' },
        dark: { cosmic: '#070B14', surface: '#0F172A', card: 'rgba(15, 23, 42, 0.75)' },
        streak: '#FF4500',
        xp: '#38BDF8'
      },
      boxShadow: {
        'glow-kesariya': '0 0 25px rgba(255, 122, 0, 0.5), inset 0 0 10px rgba(255, 215, 0, 0.3)',
        'glow-peacock': '0 0 25px rgba(0, 210, 196, 0.45)',
        'glow-gold': '0 0 30px rgba(255, 215, 0, 0.4)',
        'card-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    }
  }
}
```

---

## 2. Typography System

### 2.1 Font Pairings & Roles
1. **Display & Cultural Headings**: `Cinzel Decorative` / `Rozha One` / `Poppins` (Bold/Black)
   - *Feel*: Ancient temple inscriptions refined with modern gaming punch.
2. **Game UI & Counters**: `Rajdhani` / `Chakra Petch` / `Space Grotesk`
   - *Feel*: High-precision HUD, countdown timers, score counters, XP numbers.
3. **Body & Educational Storytelling**: `Plus Jakarta Sans` / `Inter`
   - *Feel*: Clean, highly legible, accessible with generous line-heights.

### 2.2 Type Scale Hierarchy

| Element | Font Family | Size | Weight | Line Height | Letter Spacing | CSS Utility / Tailwind |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | `Cinzel Decorative` | `48px` / `3rem` | `800` | `1.15` | `+0.05em` | `font-display text-4xl sm:text-5xl font-extrabold tracking-wider` |
| **Section Header** | `Poppins` | `32px` / `2rem` | `700` | `1.2` | `+0.02em` | `font-display text-2xl sm:text-3xl font-bold` |
| **Card / POI Title** | `Poppins` | `20px` / `1.25rem` | `600` | `1.3` | `normal` | `text-xl font-semibold` |
| **HUD Counter** | `Rajdhani` | `24px` / `1.5rem` | `700` | `1.0` | `+0.08em` | `font-mono text-2xl font-bold tracking-widest` |
| **Body Narrative** | `Plus Jakarta Sans`| `16px` / `1rem` | `400` | `1.65` | `normal` | `text-base leading-relaxed text-slate-200` |
| **Caption / Trivia** | `Plus Jakarta Sans`| `13px` / `0.81rem`| `500` | `1.4` | `+0.01em` | `text-xs sm:text-sm text-slate-400` |

---

## 3. Background Styles & Layering

The UI uses a **3-Layer Depth Engine**:

```text
┌─────────────────────────────────────────────────────────────┐
│ LAYER 3: Interactive Glass UI HUD (Cards, Modals, Buttons)  │
├─────────────────────────────────────────────────────────────┤
│ LAYER 2: Ambient Particle Layer (Floating golden dust, stars)│
├─────────────────────────────────────────────────────────────┤
│ LAYER 1: Deep Cosmic Gradient + Subtle SVG Sacred Mandala   │
└─────────────────────────────────────────────────────────────┘
```

### CSS Implementation
```css
/* Base Canvas Backdrop */
.bg-bharat-universe {
  background-color: var(--bg-cosmic-dark);
  background-image: 
    radial-gradient(circle at 15% 20%, rgba(255, 122, 0, 0.15) 0%, transparent 40%),
    radial-gradient(circle at 85% 80%, rgba(0, 210, 196, 0.12) 0%, transparent 45%),
    radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.8) 0%, #070B14 100%),
    url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.025' fill-rule='evenodd'%3E%3Cpath d='M30 30L15 0h30L30 30zM0 15l30 15L0 45V15zm60 0v30L30 30l30-15zM30 30l15 30H15l15-30z'/%3E%3C/g%3E%3C/svg%3E");
}

/* Glassmorphic Panel Style */
.glass-panel {
  background: rgba(15, 23, 42, 0.72);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15);
  border-radius: 1.25rem;
}
```

---

## 4. Button System

### 4.1 Primary "Expedition Action" Button (Tactile 3D Saffron-Gold)
* **Usage**: Main gameplay triggers ("Begin Yatra", "Start Mini-Game", "Claim Artifact").
* **Style**: Glowing saffron gradient, bevel highlight, tactile depression on press.

```html
<button class="btn-primary-adventure">
  <span class="btn-shimmer"></span>
  <span class="btn-content">
    <span>Begin Gujarat Expedition</span>
    <svg class="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" ...></svg>
  </span>
</button>
```

```css
.btn-primary-adventure {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #FF7A00 0%, #E65100 100%);
  border: 1px solid #FFD700;
  box-shadow: 0 4px 0 #993300, 0 8px 25px rgba(255, 122, 0, 0.5);
  color: #FFFFFF;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.05em;
  padding: 0.875rem 2rem;
  border-radius: 0.875rem;
  cursor: pointer;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
}

.btn-primary-adventure:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 0 #993300, 0 12px 30px rgba(255, 122, 0, 0.7);
  background: linear-gradient(135deg, #FFA040 0%, #FF6F00 100%);
}

.btn-primary-adventure:active {
  transform: translateY(2px);
  box-shadow: 0 2px 0 #993300, 0 4px 15px rgba(255, 122, 0, 0.4);
}
```

### 4.2 Secondary Peacock Action Button
* **Usage**: "Inspect Artifact", "View Museum", "Read Lore".
* **Style**: Deep translucent teal glass with electric cyan border.

```css
.btn-secondary-peacock {
  background: rgba(0, 142, 138, 0.25);
  border: 1px solid #00D2C4;
  color: #E0F7F6;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  backdrop-filter: blur(8px);
  transition: all 0.2s ease;
}
.btn-secondary-peacock:hover {
  background: rgba(0, 142, 138, 0.45);
  box-shadow: 0 0 20px rgba(0, 210, 196, 0.4);
}
```

### 4.3 Icon & Action Buttons
* `Icon Action (44x44px)`: Circular glass badge with subtle gold hover glow (Sound toggle, Back button, Map layer filter).

---

## 5. Cards & Content Containers

### 5.1 Interactive Story Card (Swipeable Comic Deck)
* **Structure**: High-impact cultural illustration on top (60% height), ambient gradient fade into content text (40%), with an audio pronunciation chip (`Kem Cho! 🔊`).
* **Border**: Delicate 1px gold metallic border with corner filigree notches.

### 5.2 3D Flippable "Did You Know?" Trivia Card
```html
<div class="flip-card-container">
  <div class="flip-card-inner">
    <!-- Front: Teaser question with glowing lotus -->
    <div class="flip-card-front glass-panel">
      <div class="badge-trivia">Did You Know?</div>
      <p class="text-lg font-medium text-amber-200">Why does the Rann desert turn into white silver during winter?</p>
      <span class="text-xs text-slate-400 mt-4 flex items-center">Tap to Flip 🔄</span>
    </div>
    <!-- Back: Cultural revelation fact -->
    <div class="flip-card-back glass-panel bg-gradient-to-br from-slate-900 to-indigo-950">
      <p class="text-sm leading-relaxed text-slate-100">The Arabian Sea floods the lowlands in monsoons. When winter arrives, blazing evaporation leaves behind a 3-foot crust of pure white mineral salt crystals!</p>
    </div>
  </div>
</div>
```

---

## 6. Map Markers & POI Indicators

### 6.1 State Map Marker (Interactive India Map)

```text
       ┌──────────────┐
       │ PLAYABLE NOW │  <-- Glowing Saffron Pill
       └──────┬───────┘
              ▼
           ( ★ )         <-- Pulsing Golden Ashoka Star Pin
          /     \
      [ Gujarat Map ]
```

* **Playable State Pin (Gujarat)**:
  * Center: Golden Ashoka Chakra / Fortress Icon inside a pulsing glowing ring (`box-shadow: 0 0 20px #FFD700`).
  * Continuous radar wave animation radiating outward (`@keyframes radar-pulse`).
  * Hover: Expands preview thumbnail card with zone completion meter (`0/4 Zones Completed`).
* **Locked State Pin (Rajasthan / Tamil Nadu / West Bengal)**:
  * Frosted slate badge with miniature brass padlock icon `🔒`.
  * Subtle hover shake with tooltip: *"Unlocking in National Tour Expedition"*.

### 6.2 Zone POI Marker (Gujarat Regional Map)
* Circular badge (56px diameter) featuring region-specific icons:
  * **Kutch**: Desert Sun / Rogan Brush
  * **Gir**: Roaring Asiatic Lion Silhouette
  * **Ahmedabad**: Spinning Charkha Wheel
  * **Patan**: Subterranean Stepwell Arch
* **Status Rings**:
  * *Locked*: Dashed gray border.
  * *Available*: Pulsing saffron glow.
  * *Mastered*: Golden laurel wreath border + 3 glowing stars.

---

## 7. Navigation & HUD

### 7.1 Desktop Top HUD Bar
Floating glass pill docked at the top viewport with 4 key clusters:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [Avatar + "Yatri Veer" + Lv.2] ──── [State Progress: Gujarat 45%] ──── [🪙 250 | ⚡ 450 XP] │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

1. **Left (Player Identity)**: Circular avatar with glowing level badge (`Lv. 2`), Player name, and Title (*"Cultural Scout"*).
2. **Center (National Quest)**: Active region crumb (*"India > Gujarat > Kutch Region"*).
3. **Right (Treasury & Shortcuts)**:
   - Bharat Coins Counter (`🪙 350`)
   - Total XP Counter (`⚡ 650 XP`)
   - Heritage Museum Shortcut (`🏛️ Museum (2/12)`)
   - Audio/BGM quick slider toggle.

### 7.2 Mobile Bottom Thumb Dock
Fixed 64px floating glass pill at screen bottom with 4 primary touch targets ($48 \times 48\text{px}$ touch targets):
- 🗺️ **Expedition Map**
- 📖 **Story Quest**
- 🏛️ **Museum**
- 🪔 **Indi AI Guide**

---

## 8. Progress Indicators & Mastery Gauges

### 8.1 Circular SVG Level XP Meter
```html
<div class="relative w-16 h-16 flex items-center justify-center">
  <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
    <!-- Background Track -->
    <path class="text-slate-800" stroke-width="3.5" stroke="currentColor" fill="none"
      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
    <!-- Animated XP Fill -->
    <path class="text-kesariya drop-shadow-[0_0_8px_rgba(255,122,0,0.8)]" 
      stroke-dasharray="75, 100" stroke-width="3.5" stroke-linecap="round" stroke="currentColor" fill="none"
      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
  </svg>
  <span class="absolute font-mono text-sm font-bold text-white">75%</span>
</div>
```

### 8.2 Multi-Segment Zone Mastery Bar
* Divided into 3 distinct micro-lights per zone:
  * Light 1: 📖 **Story Discovered** (Fills Cyan)
  * Light 2: 🎮 **Mini-Game Conquered** (Fills Purple)
  * Light 3: 🏆 **Quiz Mastered** (Fills Gold)

---

## 9. XP, Score & Streak Components

### 9.1 Floating XP Reward Popup
When the player completes an action, an animated badge floats upward and fades:

```css
@keyframes float-up-fade {
  0% { transform: translateY(0px) scale(0.8); opacity: 0; }
  20% { transform: translateY(-10px) scale(1.15); opacity: 1; }
  80% { transform: translateY(-35px) scale(1.0); opacity: 1; }
  100% { transform: translateY(-50px) scale(0.9); opacity: 0; }
}

.xp-float-badge {
  animation: float-up-fade 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  color: #FFD700;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 800;
  text-shadow: 0 0 12px rgba(255, 215, 0, 0.8);
}
```

### 9.2 Streak Flame Combo Indicator
* Displays active streak multipliers (`🔥 x3 STREAK (1.5x XP)`).
* Animated flame SVG with pulsing orange-to-red radial glow.

---

## 10. Quiz Components

```text
┌─────────────────────────────────────────────────────────────┐
│ Question 2 of 4                   ⏱️ 14s | 🔥 2x Streak     │
│ [=======================>                             ]     │
├─────────────────────────────────────────────────────────────┤
│ What natural oil is boiled and used as the primary base for │
│ traditional Rogan art in Kutch?                             │
├─────────────────────────────────────────────────────────────┤
│ [A] Mustard Oil                  │ [B] Castor Oil (Correct) │
│     (Neutral Glass)              │     (Glowing Emerald)    │
├──────────────────────────────────┼──────────────────────────┤
│ [C] Coconut Oil                  │ [D] Sesame Oil           │
│     (Struck out - 50:50)         │     (Neutral Glass)      │
├─────────────────────────────────────────────────────────────┤
│ 💡 Indi AI Lifeline              │ ✂️ 50:50 Lifeline        │
└─────────────────────────────────────────────────────────────┘
```

### Answer Card State Styles:
* **Default**: Dark glass surface with 1px border (`hover:border-kesariya hover:bg-slate-800/80`).
* **Selected / Correct**: Deep emerald background (`#065F46`), neon green border (`#10B981`), pulsing celebratory glow, and checkmark icon.
* **Selected / Wrong**: Vermilion background (`#7F1D1D`), shake animation (`@keyframes shake`), and brief explanation slide-down.
* **50:50 Disabled**: 30% opacity with diagonal line-through strike.

---

## 11. Mini-Game Visual Components

### 11.1 Garba Dandiya Rhythm Beats UI
* **Playfield**: Top-down view of a vibrant circular Rangoli mandala.
* **Target Area**: Center glowing Dandiya stick icon with dual concentric hit rings.
* **Rhythm Notes**: Radiant floral pulses contracting inward to the beat.
* **Hit Feedback**:
  * *PERFECT* (Gold typography + spark particle burst)
  * *GOOD* (Teal typography)
  * *MISS* (Red ripple + streak reset)

### 11.2 Gujarati Thali Master UI
* **Platter**: High-res brass *Thali* with 5 embossed circular grooves for bowls (*Katoris*).
* **Tray Drawer**: Horizontal conveyor containing freshly prepped cultural dishes:
  - `Dhokla` (Spongy yellow with mustard seeds)
  - `Thepla` (Golden-brown fenugreek flatbread)
  - `Khandvi` (Tightly rolled yellow gram rolls)
  - `Undhiyu` (Rich green vegetable clay-pot delicacy)
  - `Shrikhand` (Saffron-infused creamy dessert with pistachios)
* **Visual Drag & Drop**: Dragging displays realistic item drop-shadow; dropping into correct bowl triggers an appetizing steam particle effect.

---

## 12. Museum Components & Collectible Cards

### 12.1 3D Tilt Collectible Artifact Card
* Uses CSS 3D transforms (`perspective: 1000px`) with dynamic mouse-movement tilt and holographic foil reflection.

```css
.artifact-card {
  position: relative;
  width: 240px;
  height: 320px;
  background: linear-gradient(145deg, #1E293B, #0F172A);
  border-radius: 1.25rem;
  border: 1px solid var(--color-gold-border);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Legendary Rarity Hologram Shimmer */
.artifact-legendary::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    60deg,
    transparent 30%,
    rgba(255, 215, 0, 0.15) 45%,
    rgba(236, 72, 153, 0.2) 50%,
    rgba(0, 210, 196, 0.15) 55%,
    transparent 70%
  );
  transform: rotate(25deg);
  animation: holo-shimmer 6s infinite linear;
}
```

---

## 13. AI Guide Interface ("Indi")

### 13.1 Floating Action Button (FAB)
* **Visual**: Circular glowing orb featuring a stylized golden Diya / peacock feather holographic avatar.
* **Ambient Animation**: Gentle vertical floating motion with rhythmic breathing halo glow (`box-shadow: 0 0 25px rgba(255,170,0,0.5)`).

### 13.2 Chat Drawer Specifications
* **Width**: 380px on desktop; full-width bottom sheet (85vh) on mobile.
* **Header**: "Indi — Cultural AI Companion" with green "Online / Ready" status pill.
* **Quick Prompt Pills**: Translucent clickable chips across the top:
  - *"Tell me the story of Patola silk"*
  - *"Why are lions only in Gir?"*
  - *"How is authentic Dhokla cooked?"*
* **Response Rendering**: Markdown formatted with instant Text-to-Speech audio button `🔊 Play Audio`.

---

## 14. Core Keyframe Animations

```css
/* 1. Radar Pulse for Playable Map Locations */
@keyframes radar-pulse {
  0% { transform: scale(1); opacity: 0.8; }
  70% { transform: scale(2.2); opacity: 0; }
  100% { transform: scale(2.2); opacity: 0; }
}

/* 2. Holographic Shimmer for Rare Collectibles */
@keyframes holo-shimmer {
  0% { transform: translate(-30%, -30%) rotate(0deg); }
  100% { transform: translate(30%, 30%) rotate(360deg); }
}

/* 3. Screen Error Shake */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}

/* 4. Ambient Diya Flame Glow */
@keyframes flame-breathe {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 122, 0, 0.4); }
  50% { box-shadow: 0 0 35px rgba(255, 215, 0, 0.8); }
}
```

---

## 15. Screen Transitions & Cinematic Flow

```text
Map View ──[Click Zone]──> [Zoom & Blur Map (0.35s)] ──> [Slide Up Zone Expedition View]
                                                                  │
                                                        [Tap "Begin Mission"]
                                                                  │
                                                                  ▼
                                                      [Cinematic Fade-Through-Black (0.2s)]
                                                                  │
                                                                  ▼
                                                      [Story Hub Carousel Slide In]
```

1. **Page Transition**: Fast 250ms cross-fade using `framer-motion` (`initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}`).
2. **Modal In/Out**: Spring-physics scale-up from center (`tension: 300, friction: 25`).
3. **Reward Sequence**: Dark overlay fade $\to$ Explosive Confetti burst $\to$ Artifact card drops with subtle bounce $\to$ XP number counter scrolls rapidly from $0 \to +200$.

---

## 16. Responsive UI & Viewport Rules

| Viewport | Breakpoint | Map Behavior | Navigation HUD | Quiz / Game Layout |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile** | `360px – 767px` | Pinch-to-zoom SVG; auto-centers on active zone | Floating bottom 4-tab thumb dock | Fullscreen vertical stack; 48px touch targets |
| **Tablet** | `768px – 1024px` | Full map viewport with expandable bottom drawer | Floating top HUD + side drawer | Split 2-column view (media left, questions right) |
| **Desktop** | `1025px – 1920px+`| 2.5D widescreen interactive SVG map | Integrated Top HUD with real-time stats | Centered cinema frame (1200px max-width) |

---

## Quick Reference Implementation Checklist for Frontend Leads

- [x] **Import Google Fonts**: `Cinzel Decorative`, `Poppins`, `Rajdhani`, `Plus Jakarta Sans`.
- [x] **Add Tailwind Config**: Extend colors (`kesariya`, `peacock`, `gold`, `dark`), box shadows, and animation tokens.
- [x] **Drop in SVG Map Assets**: Ensure all SVG paths have `id="state-gujarat"`, `data-state="playable"`, and `tabindex="0"`.
- [x] **Embed Glassmorphism Utility**: Implement `.glass-panel` with backdrop-filter fallbacks.
- [x] **Sound Engine Hook**: Connect Web Audio triggers to `.btn-primary-adventure` and quiz answer actions.
