// js/data/expeditionData.js - Map definitions, obstacles, collectibles and visual themes for Gujarat Expedition

export const EXPEDITION_REGIONS = [
  {
    id: 'ahmedabad',
    name: 'Ahmedabad Heritage',
    tagline: 'The Historic Pols & Stepwells',
    icon: '🏛️',
    tokenName: 'Heritage Discovery Token',
    tokenIcon: '🏛️',
    objective: 'NAVIGATE THE POLS & FIND THE HERITAGE TOKEN 🏛️',
    colors: {
      bg: '#1E1510',
      ground: '#2D2017',
      groundLight: '#3D2C20',
      wall: '#704D2D',
      wallTop: '#8F663D',
      accent: '#E5B869',
      water: '#1B828F',
      lantern: '#FF9E1B'
    },
    wind: { x: 0, y: 0 },
    hasWaves: false,
    playerStart: { x: 120, y: 300 },
    obstacles: [
      // Top & bottom boundary walls
      { x: 0, y: 0, w: 1000, h: 50, type: 'wall' },
      { x: 0, y: 550, w: 1000, h: 50, type: 'wall' },
      // Left boundary wall
      { x: 0, y: 50, w: 50, h: 500, type: 'wall' },
      // Historic Pol Architecture Pillars & Buildings
      { x: 200, y: 120, w: 60, h: 140, type: 'building', label: 'Haveli Pol' },
      { x: 200, y: 340, w: 60, h: 150, type: 'building', label: 'Khadki Gate' },
      { x: 380, y: 50, w: 70, h: 180, type: 'building', label: 'Carved Jali' },
      { x: 380, y: 370, w: 70, h: 180, type: 'building', label: 'Otla Step' },
      { x: 560, y: 150, w: 80, h: 130, type: 'building', label: 'Chabutra' },
      { x: 560, y: 340, w: 80, h: 120, type: 'building', label: 'Tanka Well' },
      { x: 740, y: 90, w: 60, h: 170, type: 'building', label: 'Stepwell Plinth' },
      { x: 740, y: 360, w: 60, h: 140, type: 'building', label: 'Heritage Arch' }
    ],
    collectibles: [
      // 4 Small Shards (10 pts)
      { id: 'ahm-1', x: 220, y: 290, icon: '🪔', name: 'Brass Diya', points: 10, type: 'shard' },
      { id: 'ahm-2', x: 420, y: 280, icon: '🪙', name: 'Solanki Coin', points: 10, type: 'shard' },
      { id: 'ahm-3', x: 610, y: 100, icon: '🪔', name: 'Temple Lamp', points: 10, type: 'shard' },
      { id: 'ahm-4', x: 610, y: 500, icon: '🪙', name: 'Heritage Token', points: 10, type: 'shard' },
      // 2 Regional Cultural Fragments (25 pts)
      { id: 'ahm-f1', x: 300, y: 180, icon: '📜', name: 'Sabarmati Parchment', points: 25, type: 'fragment' },
      { id: 'ahm-f2', x: 680, y: 250, icon: '🧵', name: 'Patola Silk Spool', points: 25, type: 'fragment' }
    ],
    mainToken: {
      id: 'token-ahmedabad',
      x: 880,
      y: 300,
      icon: '🏛️',
      name: 'Heritage Discovery Token',
      points: 100
    },
    scenery: [
      { x: 120, y: 100, type: 'lamp' },
      { x: 120, y: 500, type: 'lamp' },
      { x: 300, y: 90, type: 'lantern' },
      { x: 500, y: 510, type: 'lantern' },
      { x: 700, y: 100, type: 'tree' },
      { x: 880, y: 220, type: 'pillar' },
      { x: 880, y: 380, type: 'pillar' }
    ]
  },

  {
    id: 'kutch',
    name: 'Rann of Kutch',
    tagline: 'The Moonlit White Salt Desert',
    icon: '🏜️',
    tokenName: 'Culture Discovery Token',
    tokenIcon: '🎨',
    objective: 'CROSS THE DESERT WIND & DISCOVER THE CULTURE TOKEN 🎨',
    colors: {
      bg: '#141A29',
      ground: '#E2E8F0',
      groundLight: '#F8FAFC',
      wall: '#475569',
      wallTop: '#94A3B8',
      accent: '#FF7A00',
      wind: 'rgba(255, 255, 255, 0.4)'
    },
    wind: { x: 0.8, y: -0.15 }, // Subtle wind drift
    hasWaves: false,
    playerStart: { x: 120, y: 300 },
    obstacles: [
      { x: 0, y: 0, w: 1000, h: 50, type: 'wall' },
      { x: 0, y: 550, w: 1000, h: 50, type: 'wall' },
      { x: 0, y: 50, w: 50, h: 500, type: 'wall' },
      // Bhunga Circular Huts & Salt Dune Formations
      { x: 220, y: 100, w: 80, h: 80, type: 'bhunga', label: 'Bhunga Hut' },
      { x: 220, y: 420, w: 80, h: 80, type: 'bhunga', label: 'Artisan Tent' },
      { x: 380, y: 220, w: 90, h: 160, type: 'saltdune', label: 'Salt Crystal Dune' },
      { x: 550, y: 90, w: 80, h: 140, type: 'bhunga', label: 'Mirror Workshop' },
      { x: 550, y: 370, w: 80, h: 140, type: 'bhunga', label: 'Kutch Pavilion' },
      { x: 720, y: 180, w: 70, h: 120, type: 'saltdune', label: 'White Dune' },
      { x: 720, y: 380, w: 70, h: 100, type: 'saltdune', label: 'Salt Ridge' }
    ],
    collectibles: [
      // 4 Small Shards (10 pts)
      { id: 'kut-1', x: 240, y: 280, icon: '🧂', name: 'Pure Salt Crystal', points: 10, type: 'shard' },
      { id: 'kut-2', x: 400, y: 140, icon: '🧂', name: 'Desert Quartz', points: 10, type: 'shard' },
      { id: 'kut-3', x: 600, y: 270, icon: '🧂', name: 'Shining Halite', points: 10, type: 'shard' },
      { id: 'kut-4', x: 440, y: 480, icon: '🧂', name: 'Moonlit Salt', points: 10, type: 'shard' },
      // 2 Regional Cultural Fragments (25 pts)
      { id: 'kut-f1', x: 320, y: 400, icon: '🎨', name: 'Rogan Paint Stylus', points: 25, type: 'fragment' },
      { id: 'kut-f2', x: 660, y: 160, icon: '🪞', name: 'Lippan Mirror Art', points: 25, type: 'fragment' }
    ],
    mainToken: {
      id: 'token-kutch',
      x: 880,
      y: 300,
      icon: '🎨',
      name: 'Culture Discovery Token',
      points: 100
    },
    scenery: [
      { x: 160, y: 120, type: 'kite' },
      { x: 460, y: 80, type: 'moon' },
      { x: 660, y: 490, type: 'camel' },
      { x: 880, y: 210, type: 'tent' },
      { x: 880, y: 390, type: 'tent' }
    ]
  },

  {
    id: 'gir',
    name: 'Gir National Park',
    tagline: 'Sanctuary of the Asiatic Lion',
    icon: '🦁',
    tokenName: 'Wildlife Discovery Token',
    tokenIcon: '🦁',
    objective: 'EXPLORE THE FOREST TRAILS & FIND THE WILDLIFE TOKEN 🦁',
    colors: {
      bg: '#0A1C12',
      ground: '#133924',
      groundLight: '#1B4D31',
      wall: '#0A2616',
      wallTop: '#22543D',
      accent: '#10B981',
      path: '#2F4F2F'
    },
    wind: { x: 0, y: 0 },
    hasWaves: false,
    playerStart: { x: 120, y: 300 },
    obstacles: [
      { x: 0, y: 0, w: 1000, h: 50, type: 'wall' },
      { x: 0, y: 550, w: 1000, h: 50, type: 'wall' },
      { x: 0, y: 50, w: 50, h: 500, type: 'wall' },
      // Dense Teak Forest Thickets & Banyan Root Clusters
      { x: 220, y: 50, w: 90, h: 180, type: 'treeCluster', label: 'Teak Canopy' },
      { x: 220, y: 370, w: 90, h: 180, type: 'treeCluster', label: 'Forest Thicket' },
      { x: 380, y: 160, w: 80, h: 150, type: 'rockCluster', label: 'Girnar Boulders' },
      { x: 380, y: 410, w: 90, h: 140, type: 'treeCluster', label: 'Banyan Grove' },
      { x: 550, y: 50, w: 90, h: 170, type: 'treeCluster', label: 'Wild Grass' },
      { x: 550, y: 310, w: 90, h: 160, type: 'treeCluster', label: 'Stream Clearing' },
      { x: 720, y: 120, w: 80, h: 160, type: 'rockCluster', label: 'Lion Ridge' },
      { x: 720, y: 380, w: 80, h: 130, type: 'treeCluster', label: 'Forest Trail' }
    ],
    collectibles: [
      // 4 Small Shards (10 pts)
      { id: 'gir-1', x: 260, y: 280, icon: '🌿', name: 'Medicinal Herb', points: 10, type: 'shard' },
      { id: 'gir-2', x: 420, y: 100, icon: '🌿', name: 'Teak Leaf', points: 10, type: 'shard' },
      { id: 'gir-3', x: 600, y: 240, icon: '🌿', name: 'Forest Berry', points: 10, type: 'shard' },
      { id: 'gir-4', x: 450, y: 470, icon: '🌿', name: 'Wild Flower', points: 10, type: 'shard' },
      // 2 Regional Cultural Fragments (25 pts)
      { id: 'gir-f1', x: 320, y: 360, icon: '🛖', name: 'Maldhari Charm', points: 25, type: 'fragment' },
      { id: 'gir-f2', x: 660, y: 440, icon: '🫖', name: 'Copper Forest Pot', points: 25, type: 'fragment' }
    ],
    mainToken: {
      id: 'token-gir',
      x: 880,
      y: 300,
      icon: '🦁',
      name: 'Wildlife Discovery Token',
      points: 100
    },
    wildlife: [
      { x: 330, y: 120, icon: '🦌', name: 'Chital Deer' },
      { x: 660, y: 140, icon: '🦚', name: 'Saurashtra Peacock' },
      { x: 860, y: 120, icon: '🦁', name: 'Asiatic Lion Lookout' }
    ],
    scenery: [
      { x: 150, y: 120, type: 'banyan' },
      { x: 480, y: 300, type: 'stream' },
      { x: 880, y: 200, type: 'cliff' },
      { x: 880, y: 400, type: 'cliff' }
    ]
  },

  {
    id: 'dwarka',
    name: 'Dwarka Coastal Shore',
    tagline: 'The Sacred Western Gateway & Arabian Sea',
    icon: '🌊',
    tokenName: 'Coastal Heritage Token',
    tokenIcon: '🌊',
    objective: 'DODGE OCEAN SURGES & CLAIM THE FINAL COASTAL TOKEN 🌊',
    colors: {
      bg: '#071A2E',
      ground: '#0C2B47',
      groundLight: '#14466F',
      wall: '#0A1D33',
      wallTop: '#1E527D',
      accent: '#00D2C4',
      water: '#00B4D8',
      foam: '#CAF0F8'
    },
    wind: { x: 0, y: 0 },
    hasWaves: true, // Moving tide surges
    playerStart: { x: 120, y: 300 },
    obstacles: [
      { x: 0, y: 0, w: 1000, h: 50, type: 'wall' },
      { x: 0, y: 550, w: 1000, h: 50, type: 'wall' },
      { x: 0, y: 50, w: 50, h: 500, type: 'wall' },
      // Coastal Ghats, Stone Causeways & Temple Seawalls
      { x: 200, y: 80, w: 70, h: 160, type: 'ghat', label: 'Stone Ghat' },
      { x: 200, y: 360, w: 70, h: 160, type: 'ghat', label: 'Temple Seawall' },
      { x: 380, y: 50, w: 80, h: 150, type: 'ghat', label: 'Causeway Pier' },
      { x: 380, y: 400, w: 80, h: 150, type: 'ghat', label: 'Gomti Ghat' },
      { x: 560, y: 100, w: 70, h: 170, type: 'ghat', label: 'Ancient Pier' },
      { x: 560, y: 350, w: 70, h: 150, type: 'ghat', label: 'Submerged Ghat' },
      { x: 740, y: 70, w: 60, h: 160, type: 'ghat', label: 'Temple Sanctum' },
      { x: 740, y: 370, w: 60, h: 150, type: 'ghat', label: 'Sanctum Pillar' }
    ],
    waves: [
      { x: 290, y: 50, w: 70, h: 500, phase: 0 },
      { x: 480, y: 50, w: 65, h: 500, phase: Math.PI },
      { x: 650, y: 50, w: 70, h: 500, phase: Math.PI * 0.5 }
    ],
    collectibles: [
      // 4 Small Shards (10 pts)
      { id: 'dwa-1', x: 230, y: 290, icon: '🐚', name: 'Sacred Shankh', points: 10, type: 'shard' },
      { id: 'dwa-2', x: 410, y: 250, icon: '🐚', name: 'Pearl Oyster', points: 10, type: 'shard' },
      { id: 'dwa-3', x: 590, y: 300, icon: '🐚', name: 'Golden Cowrie', points: 10, type: 'shard' },
      { id: 'dwa-4', x: 440, y: 470, icon: '🐚', name: 'Sacred Shell', points: 10, type: 'shard' },
      // 2 Regional Cultural Fragments (25 pts)
      { id: 'dwa-f1', x: 340, y: 150, icon: '⚓', name: 'Ancient Bronze Anchor', points: 25, type: 'fragment' },
      { id: 'dwa-f2', x: 680, y: 220, icon: '🚩', name: 'Dwarkadhish Dhwaja', points: 25, type: 'fragment' }
    ],
    mainToken: {
      id: 'token-dwarka',
      x: 880,
      y: 300,
      icon: '🌊',
      name: 'Coastal Heritage Token',
      points: 100
    },
    scenery: [
      { x: 120, y: 80, type: 'flag' },
      { x: 500, y: 80, type: 'wave' },
      { x: 880, y: 180, type: 'temple' },
      { x: 880, y: 420, type: 'temple' }
    ]
  }
];
