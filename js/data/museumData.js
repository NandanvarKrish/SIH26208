// js/data/museumData.js - Authentic Gujarat cultural museum artifacts and unlock conditions

export const GUJARAT_MUSEUM_ARTIFACTS = [
  {
    id: 'rogan-tree-of-life',
    name: 'Rogan Tree of Life Tapestry',
    category: 'Crafts & Textiles',
    locationId: 'kutch',
    locationName: 'Nirona, Great Rann of Kutch',
    rarity: 'Rare',
    rarityColor: '#00D2C4',
    icon: '🌳',
    era: '17th Century Tradition',
    unlockCondition: {
      type: 'story_or_xp',
      storyId: 'kutch',
      minXP: 100,
      description: 'Master the Kutch Story Chapter or earn 100+ Total XP'
    },
    shortDesc: 'A sacred mirror-symmetrical textile crafted with boiled castor seed oil paint.',
    fullLore: 'Preserved exclusively by the Khatri family of Nirona village in Kutch, Rogan painting is a 300-year-old art form. Castor oil is slow-boiled for over 12 hours until it forms a thick elastic paste (Rogan), which is mixed with natural mineral pigments. Using a 6-inch blunt metal stylus, the artisan spins threads of paint in mid-air without the stylus ever touching the fabric. The fabric is then folded in half to create a perfect mirror symmetry.',
    provenance: 'Nirona Artisan Guild, Kutch, Gujarat',
    funFact: 'In 2014, the Prime Minister of India presented a handcrafted Rogan "Tree of Life" painting to the President of the United States.'
  },

  {
    id: 'bronze-gir-lion',
    name: 'Asiatic Lion Bronze Emblem',
    category: 'Wildlife & Nature',
    locationId: 'gir-saurashtra',
    locationName: 'Gir National Park, Saurashtra',
    rarity: 'Epic',
    rarityColor: '#FFD700',
    icon: '🦁',
    era: 'Saurashtra Forest Sanctuary',
    unlockCondition: {
      type: 'story_or_xp',
      storyId: 'gir-saurashtra',
      minXP: 200,
      description: 'Master the Gir Story Chapter or earn 200+ Total XP'
    },
    shortDesc: 'Hand-carved bronze insignia of the endangered Asiatic Lion (Panthera leo persica).',
    fullLore: 'Gir National Park is the sole global sanctuary for the ~670 remaining wild Asiatic lions. Distinguishable from African lions by their characteristic longitudinal belly skin fold and exposed ears, these apex predators coexist peacefully with the indigenous Maldhari pastoral tribes who reside inside traditional forest hamlets called Nesses.',
    provenance: 'Gir Forest Eco-Sanctuary, Junagadh District',
    funFact: 'The historic Nawabs of Junagadh declared the first hunting bans in the early 1900s when fewer than 20 Asiatic lions remained, saving the species from total extinction.'
  },

  {
    id: 'sabarmati-charkha',
    name: 'Sabarmati Teakwood Charkha',
    category: 'Freedom & History',
    locationId: 'ahmedabad-central',
    locationName: 'Sabarmati Ashram, Ahmedabad',
    rarity: 'Epic',
    rarityColor: '#FF7A00',
    icon: '🪡',
    era: '1917 CE • Freedom Movement',
    unlockCondition: {
      type: 'story_or_xp',
      storyId: 'ahmedabad-central',
      minXP: 300,
      description: 'Master the Ahmedabad Story Chapter or earn 300+ Total XP'
    },
    shortDesc: 'The iconic traditional spinning wheel used by Mahatma Gandhi to weave Khadi and self-reliance.',
    fullLore: 'Established on the banks of the Sabarmati River in 1917, the Sabarmati Ashram served as the headquarters of the Indian Independence Movement. The Charkha became the supreme symbol of Swadeshi (economic self-reliance) and non-violent resistance. From this ashram\'s Hriday Kunj, Gandhi launched the historic 384 km Dandi Salt March on March 12, 1930 with 78 satyagrahis.',
    provenance: 'Sabarmati Ashram Trust, Ahmedabad, Gujarat',
    funFact: 'Gandhi vowed never to return to reside at Sabarmati Ashram until India had achieved complete Swaraj (Independence).'
  },

  {
    id: 'patola-silk-heirloom',
    name: 'Patan Double-Ikkat Patola Silk',
    category: 'Crafts & Textiles',
    locationId: 'patan-north',
    locationName: 'Patan Royal Guilds',
    rarity: 'Mythic',
    rarityColor: '#C084FC',
    icon: '🧵',
    era: '11th Century Solanki Dynasty',
    unlockCondition: {
      type: 'story_or_xp',
      storyId: 'patan-north',
      minXP: 400,
      description: 'Master the Patan Story Chapter or earn 400+ Total XP'
    },
    shortDesc: 'Reversible master silk woven with mathematically pre-dyed warp and weft yarns.',
    fullLore: 'Double-Ikkat Patola weaving in Patan is one of the most intricate textile arts on Earth. Both warp and weft silk yarns are mathematically calculated, tied, and dyed before being mounted on the handloom. The resulting textile is 100% identical and reversible on both sides. A single saree takes up to 6 months of master teamwork and lasts over 300 years without color degradation.',
    provenance: 'Salvi Master Weavers Guild, Patan, Gujarat',
    funFact: 'The Gujarati proverb "Padi Patole Bhaat, Faate Pan Fitey Nahi" means: The fabric may tear with the centuries, but the sacred design and colors will never fade.'
  },

  {
    id: 'royal-brass-thali',
    name: 'The Royal Brass Thali of the 5 Rasas',
    category: 'Gastronomy & Culture',
    locationId: 'ahmedabad-central',
    locationName: 'Gujarat Heritage Kitchens',
    rarity: 'Rare',
    rarityColor: '#34D399',
    icon: '🍲',
    era: 'Traditional Culinary Lore',
    unlockCondition: {
      type: 'game',
      gameId: 'thali-master',
      minXP: 150,
      description: 'Solve "The Grand Gujarati Thali Master" Mini-Game'
    },
    shortDesc: 'Engraved ceremonial brass platter showcasing the Ayurvedic harmony of the six tastes.',
    fullLore: 'The authentic Gujarati Thali is engineered around the Ayurvedic principle of "Shad Rasa" (six tastes: sweet, salty, sour, pungent, bitter, and astringent) in a single wholesome sitting. Featuring Khaman Dhokla, delicate rolled Khandvi, travelling Methi Theplas, clay-pot winter Undhiyu, and saffron Kesar Shrikhand, the thali represents hospitality (Atithi Devo Bhava) and digestive balance.',
    provenance: 'Gujarat Culinary Heritage Foundation',
    funFact: 'Traditional Gujarati families serve snacks called "Farsan" and sweets called "Mithai" simultaneously during the main meal rather than in separate western courses.'
  },

  {
    id: 'gujarat-master-crown',
    name: 'Crown of Gujarat Cultural Mastery',
    category: 'Royal Antiquities',
    locationId: 'gujarat',
    locationName: 'State of Gujarat',
    rarity: 'Mythic',
    rarityColor: '#FFD700',
    icon: '👑',
    era: 'State Yatra Grand Champion',
    unlockCondition: {
      type: 'quiz',
      quizId: 'gujarat-master',
      minXP: 500,
      description: 'Conquer the Grand Gujarat Cultural Mastery Quiz with a passing score'
    },
    shortDesc: 'The supreme royal regalia bestowed upon yatris who demonstrate complete mastery of Gujarat.',
    fullLore: 'The Crown of Gujarat Cultural Mastery symbolizes profound understanding across all four cultural pillars of the state: the artisanal alchemy of Kutch Rogan art, the ecological conservation of Gir\'s Asiatic lions, the courageous freedom legacy of Sabarmati Ashram, and the subterranean architectural genius of Patan\'s Rani ki Vav.',
    provenance: 'BharatVerse State Archives of India',
    funFact: 'Gujarat boasts India\'s longest coastline (1,600 km) and the world\'s tallest statue, the Statue of Unity (182 meters).'
  }
];

export function getMuseumArtifacts() {
  return GUJARAT_MUSEUM_ARTIFACTS;
}

export function getArtifactById(id) {
  return GUJARAT_MUSEUM_ARTIFACTS.find(a => a.id === id) || null;
}

export function isArtifactUnlocked(artifact, state) {
  if (!artifact || !state) return false;

  // 1. Direct unlock check in playerState.unlockedItems
  if (state.unlockedItems && state.unlockedItems.some(item => item.id === artifact.id)) {
    return true;
  }

  const cond = artifact.unlockCondition;
  if (!cond) return false;

  // 2. Story / XP condition
  if (cond.type === 'story_or_xp') {
    const isStoryDone = state.completedStories && state.completedStories.includes(cond.storyId);
    const hasXP = (state.totalXP || 0) >= cond.minXP;
    return isStoryDone || hasXP;
  }

  // 3. Mini-Game condition
  if (cond.type === 'game') {
    const isGameDone = state.completedGames && state.completedGames.includes(cond.gameId);
    const hasXP = (state.totalXP || 0) >= cond.minXP;
    return isGameDone || hasXP;
  }

  // 4. Quiz condition
  if (cond.type === 'quiz') {
    const quizResult = state.quizResults && state.quizResults[cond.quizId];
    return Boolean(quizResult && quizResult.passed);
  }

  return (state.totalXP || 0) >= (cond.minXP || 500);
}
