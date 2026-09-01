// js/data/gujaratLocationsData.js - Reusable data structure for Gujarat exploration locations

export const GUJARAT_LOCATIONS = [
  {
    id: 'kutch',
    name: 'Great Rann of Kutch',
    region: 'North-West Gujarat',
    tagline: 'The Moonlit White Salt Desert & Artisan Guilds',
    coordinates: { x: 28.75, y: 29.3 }, // Percentage position on the Gujarat regional map
    icon: '🏜️',
    status: 'unlocked', // 'unlocked' | 'locked'
    unlockRequirement: 'Initial Starting Hub',
    colorTheme: '#F59E0B',
    culturalSummary: 'The Great Rann is one of the largest salt deserts in the world. Famous for the vibrant winter Rann Utsav and 300-year-old Rogan castor oil textile art preserved in Nirona village.',
    miraTip: 'Kem Cho! Did you know only one single family in Nirona village preserves the ancient art of Rogan painting today? Watch the salt sparkle under the full moon!',
    pillars: [
      { icon: '🌕', title: 'Rann Utsav Festivities', desc: 'Folk music, tent cities, and moonlit salt desert camel rides.' },
      { icon: '🎨', title: 'Master Rogan Art', desc: 'Boiled castor oil and natural earth pigments painted with fine metal styluses.' },
      { icon: '🦩', title: 'Flamingo City Sanctuary', desc: 'Breeding haven for millions of Greater and Lesser Flamingos.' }
    ],
    questline: {
      story: { title: 'The Moonlit Salt Symphony', duration: '2 min read', xp: 50 },
      miniGame: { title: 'Garba Dandiya Rhythm Tap', type: 'rhythm', xp: 100 },
      quiz: { title: 'Master of the White Desert', questionCount: 3, xp: 150 },
      artifact: { name: 'Rogan Tree of Life Tapestry', rarity: 'Legendary', icon: '🏺' }
    }
  },
  {
    id: 'gir-saurashtra',
    name: 'Gir National Park & Saurashtra',
    region: 'South-West Gujarat',
    tagline: 'The Last Sanctuary of the Asiatic Lion & Somnath Temple',
    coordinates: { x: 36.85, y: 73.6 },
    icon: '🦁',
    status: 'unlocked',
    unlockRequirement: 'Accessible for Exploration',
    colorTheme: '#10B981',
    culturalSummary: 'The only natural habitat in the world where the majestic Asiatic Lion roams free. Saurashtra is also home to the legendary Somnath temple, the first among the twelve Jyotirlinga shrines.',
    miraTip: 'Listen closely for the roar! The Asiatic lion has a distinctive belly skin fold that sets it apart from African lions. The local Maldhari tribe lives in harmony with them.',
    pillars: [
      { icon: '👑', title: 'Asiatic Lion Habitat', desc: 'Sole wild refuge for over 600 endangered Asiatic lions.' },
      { icon: '🛕', title: 'Somnath Shore Temple', desc: 'Ancient coastal shrine reconstructed through millennia of history.' },
      { icon: '🌿', title: 'Maldhari Pastoral Heritage', desc: 'Generations of pastoralists coexisting peacefully with apex predators.' }
    ],
    questline: {
      story: { title: 'The King of Asia & Ancient Shrines', duration: '2 min read', xp: 50 },
      miniGame: { title: 'Gir Forest Wildlife Tracker', type: 'spotter', xp: 100 },
      quiz: { title: 'Guardian of Saurashtra', questionCount: 3, xp: 150 },
      artifact: { name: 'Gir Bronze Lion Emblem', rarity: 'Rare', icon: '🦁' }
    }
  },
  {
    id: 'ahmedabad-central',
    name: 'Ahmedabad Heritage & Sabarmati',
    region: 'Central Gujarat',
    tagline: 'India\'s First UNESCO World Heritage City & Culinary Capital',
    coordinates: { x: 64.35, y: 49.3 },
    icon: '🏛️',
    status: 'unlocked',
    unlockRequirement: 'Accessible for Exploration',
    colorTheme: '#3B82F6',
    culturalSummary: 'Founded in 1411 on the banks of the Sabarmati River. Renowned for its intricate pols (heritage neighborhoods), Mahatma Gandhi\'s historic Sabarmati Ashram, and world-famous street food.',
    miraTip: 'Aavo Padharo! Try hot Fafda and Jalebi in the morning, and visit Hriday Kunj where Mahatma Gandhi spun Khadi on his wooden charkha!',
    pillars: [
      { icon: '🕊️', title: 'Sabarmati Ashram', desc: 'Headquarters of the peaceful Indian freedom movement & 1930 Salt March.' },
      { icon: '🏘️', title: 'Historic Pols & Otlas', desc: 'Centuries-old wooden bird feeders (chabutras) and secret underground passage architecture.' },
      { icon: '🍲', title: 'Legendary Gujarati Thali', desc: 'A rich culinary feast balancing sweet, salty, sour, and spicy flavors.' }
    ],
    questline: {
      story: { title: 'The Charkha & The Ancient Pols', duration: '2 min read', xp: 50 },
      miniGame: { title: 'Restore the Heritage Challenge', type: 'discovery', xp: 100 },
      quiz: { title: 'Scholar of the Heritage City', questionCount: 3, xp: 150 },
      artifact: { name: 'Sabarmati Golden Charkha', rarity: 'Legendary', icon: '🪙' }
    }
  },
  {
    id: 'patan-north',
    name: 'Patan & Rani ki Vav',
    region: 'North Gujarat',
    tagline: 'The Inverted Subterranean Temple & Royal Double-Ikkat Silk',
    coordinates: { x: 61.25, y: 28.6 },
    icon: '🧵',
    status: 'unlocked',
    unlockRequirement: 'Accessible for Exploration',
    colorTheme: '#EC4899',
    culturalSummary: 'The former medieval capital of the Solanki rulers. Home to Rani ki Vav—a 7-level underground stepwell featuring over 500 principal sculptures—and the world-famous double-ikkat Patola silk weaves.',
    miraTip: 'Look at the back of an Indian ₹100 banknote—that is Rani ki Vav! And Patola sarees are so intricately tie-dyed that both sides are identical.',
    pillars: [
      { icon: '🪜', title: 'Rani ki Vav Stepwell', desc: '11th-century UNESCO marvel built as an inverted subterranean temple.' },
      { icon: '✨', title: 'Patan Patola Guilds', desc: 'Pure silk weaving taking up to 6 months per saree with 300-year color fastness.' },
      { icon: '☀️', title: 'Sun Temple of Modhera', desc: 'Solar architectural wonder designed so the rising equinox sun illuminates the sanctum.' }
    ],
    questline: {
      story: { title: 'Inverted Temples & Silk Alchemy', duration: '2 min read', xp: 50 },
      miniGame: { title: 'Patola Pattern Weaver', type: 'pattern', xp: 100 },
      quiz: { title: 'Master of Solanki Architecture', questionCount: 3, xp: 150 },
      artifact: { name: 'Royal Patola Silk Heirloom', rarity: 'Legendary', icon: '👑' }
    }
  }
];

// Helper methods for easy querying and dynamic expansion
export function getGujaratLocations() {
  return [...GUJARAT_LOCATIONS];
}

export function getLocationById(locationId) {
  return GUJARAT_LOCATIONS.find(loc => loc.id === locationId) || null;
}

export function registerGujaratLocation(newLocation) {
  if (!newLocation.id) {
    console.error('Location must have an ID');
    return false;
  }
  const existing = GUJARAT_LOCATIONS.findIndex(l => l.id === newLocation.id);
  if (existing >= 0) {
    GUJARAT_LOCATIONS[existing] = newLocation;
  } else {
    GUJARAT_LOCATIONS.push(newLocation);
  }
  return true;
}
