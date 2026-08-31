// js/data/statesData.js - State metadata, playable configurations, and locked state teasers

export const AVATARS = [
  { id: 'veer', name: 'Veer', icon: '🪖', title: 'Valiant Scout' },
  { id: 'ananya', name: 'Ananya', icon: '🪔', title: 'Heritage Seeker' },
  { id: 'kabir', name: 'Kabir', icon: '🧭', title: 'Curious Wanderer' },
  { id: 'diya', name: 'Diya', icon: '🎨', title: 'Artisan Scholar' }
];

export const STATES_DATA = {
  'gujarat': {
    id: 'gujarat',
    name: 'Gujarat',
    status: 'playable', // 'playable' | 'locked'
    tagline: 'Land of Legends, Lions & Legacy',
    capital: 'Gandhinagar',
    pinCoords: { x: 26, y: 50 }, // Percentage within SVG container
    stats: {
      zones: 4,
      collectibles: 12,
      mastery: '0%'
    },
    description: 'Explore the shimmering White Desert of Kutch, the sacred temples of Saurashtra, the roar of the Asiatic Lion in Gir, and the world heritage city of Ahmedabad.',
    pillars: [
      { icon: '🏛️', label: 'Rani ki Vav Stepwell & Somnath' },
      { icon: '🦁', label: 'Gir Forest Asiatic Lion Sanctuary' },
      { icon: '🧵', label: 'Patan Patola & Rogan Castor Art' },
      { icon: '🍲', label: 'Authentic 5-Course Gujarati Thali' }
    ],
    ctaText: 'Enter Gujarat Expedition →',
    badgeText: 'Playable Prototype'
  },
  'rajasthan': {
    id: 'rajasthan',
    name: 'Rajasthan',
    status: 'locked',
    tagline: 'Land of Kings & Thar Desert Forts',
    capital: 'Jaipur',
    pinCoords: { x: 30, y: 38 },
    stats: {
      zones: 5,
      collectibles: 15,
      mastery: 'Locked'
    },
    description: 'Journey through the golden sands of Jaisalmer, the pink arches of Hawa Mahal, the blue city of Jodhpur, and royal Rajput puppet traditions.',
    pillars: [
      { icon: '🏰', label: 'Mehrangarh & Amber Fortresses' },
      { icon: '🐪', label: 'Thar Desert Camel Caravans' },
      { icon: '🎭', label: 'Kathputli Puppet Master Quests' },
      { icon: '🍛', label: 'Dal Baati Churma Culinary Lore' }
    ],
    ctaText: 'Locked in Prototype',
    badgeText: 'Coming in National Tour'
  },
  'tamil-nadu': {
    id: 'tamil-nadu',
    name: 'Tamil Nadu',
    status: 'locked',
    tagline: 'Cradle of Dravidian Art & Architecture',
    capital: 'Chennai',
    pinCoords: { x: 44, y: 82 },
    stats: {
      zones: 5,
      collectibles: 14,
      mastery: 'Locked'
    },
    description: 'Marvel at the towering Gopurams of Madurai Meenakshi, ancient rock-cut temples of Mahabalipuram, Carnatic classical ragas, and Chettinad spices.',
    pillars: [
      { icon: '🛕', label: 'Brihadeeswara & Madurai Gopurams' },
      { icon: '💃', label: 'Bharatanatyam Classical Rhythm' },
      { icon: '☕', label: 'Traditional Kumbakonam Filter Coffee' },
      { icon: '🗿', label: 'Shore Temple UNESCO Sculptures' }
    ],
    ctaText: 'Locked in Prototype',
    badgeText: 'Coming in National Tour'
  },
  'west-bengal': {
    id: 'west-bengal',
    name: 'West Bengal',
    status: 'locked',
    tagline: 'The Cultural Capital & Bengal Renaissance',
    capital: 'Kolkata',
    pinCoords: { x: 74, y: 48 },
    stats: {
      zones: 4,
      collectibles: 12,
      mastery: 'Locked'
    },
    description: 'Celebrate the grand artistry of Durga Puja, sail through the Sundarbans mangrove tiger reserves, taste authentic Rosogolla, and explore Darjeeling tea estates.',
    pillars: [
      { icon: '🐅', label: 'Royal Bengal Tigers of Sundarbans' },
      { icon: '🥁', label: 'Durga Puja Dhak Beats & Pandal Art' },
      { icon: '📜', label: 'Rabindranath Tagore Shantiniketan Lore' },
      { icon: '🍮', label: 'Darjeeling Tea & Mishti Doi Delicacies' }
    ],
    ctaText: 'Locked in Prototype',
    badgeText: 'Coming in National Tour'
  }
};
