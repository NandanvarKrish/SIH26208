// js/data/miniGamesData.js - Modular configuration and data for Gujarat educational mini-games

export const GUJARAT_MINIGAMES = {
  'ahmedabad-central': {
    id: 'thali-master',
    locationId: 'ahmedabad-central',
    title: 'The Grand Gujarati Thali Master',
    subtitle: 'Culinary Heritage & Flavor Harmony Puzzle',
    icon: '🍲',
    instructions: 'Assemble an authentic 5-course Gujarati Thali! Match each traditional dish from the kitchen tray to its correct Katori bowl based on Ayurvedic flavor clues. Watch out for non-authentic impostor dishes!',
    timeLimitSeconds: 60,
    targetScore: 500,
    xpReward: 100,
    slots: [
      {
        id: 'slot-farsan-1',
        label: 'Farsan (Steamed Snack)',
        clue: 'Golden, spongy steamed savory cake made of fermented chickpea flour, tempered with mustard seeds and green chillies.',
        targetItemId: 'dhokla'
      },
      {
        id: 'slot-farsan-2',
        label: 'Roll Snack (Delicate Bite)',
        clue: 'Paper-thin rolled cylinders of gram flour and buttermilk, garnished with freshly grated coconut and coriander.',
        targetItemId: 'khandvi'
      },
      {
        id: 'slot-bread',
        label: 'Rotli / Bread',
        clue: 'Fragrant spiced whole-wheat flatbread infused with fresh fenugreek (methi) leaves, perfect for traveling.',
        targetItemId: 'thepla'
      },
      {
        id: 'slot-shaak',
        label: 'Shaak (Festive Main)',
        clue: 'Legendary winter vegetable delicacy slow-cooked upside-down in an earthen pot (matla) with muthia dumplings.',
        targetItemId: 'undhiyu'
      },
      {
        id: 'slot-sweet',
        label: 'Mithai (Sweet Finale)',
        clue: 'Velvety strained yogurt dessert infused with royal Kashmiri saffron strands and crushed green cardamoms.',
        targetItemId: 'shrikhand'
      }
    ],
    items: [
      {
        id: 'dhokla',
        name: 'Khaman Dhokla',
        icon: '🧽',
        taste: 'Sour & Savory',
        desc: 'Steamed fermented chickpea sponge with mustard tempering',
        isAuthentic: true
      },
      {
        id: 'khandvi',
        name: 'Rolled Khandvi',
        icon: '🥢',
        taste: 'Silky & Spiced',
        desc: 'Melt-in-mouth gram flour & yogurt rolled spirals',
        isAuthentic: true
      },
      {
        id: 'thepla',
        name: 'Methi Thepla',
        icon: '🫓',
        taste: 'Herbal & Savory',
        desc: 'Fenugreek spiced wholesome travelling flatbread',
        isAuthentic: true
      },
      {
        id: 'undhiyu',
        name: 'Surti Undhiyu',
        icon: '🥘',
        taste: 'Rich & Earthy',
        desc: 'Clay-pot winter medley with purple yam & muthias',
        isAuthentic: true
      },
      {
        id: 'shrikhand',
        name: 'Kesar Shrikhand',
        icon: '🍨',
        taste: 'Sweet & Aromatic',
        desc: 'Saffron-infused hung curd dessert with pistachios',
        isAuthentic: true
      },
      {
        id: 'chowmein',
        name: 'Hakka Chowmein',
        icon: '🍜',
        taste: 'Fast Food',
        desc: 'Stir-fried noodles (Not part of a traditional Gujarati Thali)',
        isAuthentic: false
      },
      {
        id: 'burger',
        name: 'Double Burger',
        icon: '🍔',
        taste: 'Western Snack',
        desc: 'Fast food sandwich (Not part of a traditional Gujarati Thali)',
        isAuthentic: false
      }
    ]
  },

  'kutch': {
    id: 'rogan-weaver',
    locationId: 'kutch',
    title: 'The Rogan Artisan Motif Sorter',
    subtitle: 'Nirona Craft & Symmetrical Mirror Puzzle',
    icon: '🎨',
    instructions: 'Match the ancestral Rogan painting tools and natural ingredients to their respective master workshop stations!',
    timeLimitSeconds: 60,
    targetScore: 400,
    xpReward: 100,
    slots: [
      {
        id: 'slot-oil',
        label: 'Base Ingredient',
        clue: 'Boiled for 12 hours until it forms a pliable, sticky golden jelly.',
        targetItemId: 'castor-oil'
      },
      {
        id: 'slot-stylus',
        label: 'Master Tool',
        clue: '6-inch blunt metal rod used to spin elastic paint threads in mid-air.',
        targetItemId: 'metal-stylus'
      },
      {
        id: 'slot-pigment',
        label: 'Coloring Pigment',
        clue: 'Natural earth and stone powders mixed into the boiled oil paste.',
        targetItemId: 'earth-pigment'
      },
      {
        id: 'slot-motif',
        label: 'Sacred Motif',
        clue: 'The iconic symmetrical Kutchi design symbolizing eternal life and resilience.',
        targetItemId: 'tree-of-life'
      }
    ],
    items: [
      {
        id: 'castor-oil',
        name: 'Boiled Castor Oil',
        icon: '🫗',
        taste: 'Viscous Jelly',
        desc: 'The essential 12-hour boiled elastic paint binder',
        isAuthentic: true
      },
      {
        id: 'metal-stylus',
        name: 'Blunt Metal Stylus',
        icon: '🖌️',
        taste: 'Artisan Rod',
        desc: 'Fine metal tool that spins paint threads in the air',
        isAuthentic: true
      },
      {
        id: 'earth-pigment',
        name: 'Natural Earth Pigments',
        icon: '🎨',
        taste: 'Vibrant Powders',
        desc: 'Natural mineral stones crushed into rich colors',
        isAuthentic: true
      },
      {
        id: 'tree-of-life',
        name: 'Tree of Life Pattern',
        icon: '🌳',
        taste: 'Symmetrical',
        desc: 'Legendary mirror-folded Kutchi master motif',
        isAuthentic: true
      },
      {
        id: 'acrylic-spray',
        name: 'Synthetic Spray Paint',
        icon: '🧪',
        taste: 'Modern Chemical',
        desc: 'Artificial paint (Not used in 300-year-old Rogan art)',
        isAuthentic: false
      }
    ]
  },

  'gir-saurashtra': {
    id: 'gir-tracker',
    locationId: 'gir-saurashtra',
    title: 'Gir Forest Eco-Tracker',
    subtitle: 'Wildlife Ecology & Coexistence Matcher',
    icon: '🦁',
    instructions: 'Match each iconic Gir inhabitant and sacred landmark to its correct habitat zone!',
    timeLimitSeconds: 60,
    targetScore: 400,
    xpReward: 100,
    slots: [
      {
        id: 'slot-apex',
        label: 'Apex Predator',
        clue: 'The only wild lion in Asia, identified by its distinctive longitudinal belly skin fold.',
        targetItemId: 'asiatic-lion'
      },
      {
        id: 'slot-guardian',
        label: 'Pastoral Guardian',
        clue: 'Indigenous community living peacefully in circular forest Nesses without fences.',
        targetItemId: 'maldhari-tribe'
      },
      {
        id: 'slot-coastal',
        label: 'Coastal Jyotirlinga',
        clue: 'Ancient Lord Shiva shrine overlooking the Arabian Sea with the famous Baan Stambh.',
        targetItemId: 'somnath-shrine'
      },
      {
        id: 'slot-prey',
        label: 'Prized Livestock',
        clue: 'Massive indigenous buffalo breed native to Saurashtra providing rich high-fat milk.',
        targetItemId: 'jafrabadi-buffalo'
      }
    ],
    items: [
      {
        id: 'asiatic-lion',
        name: 'Asiatic Lion (Gir)',
        icon: '🦁',
        taste: 'Panthera leo persica',
        desc: 'Endangered wild king with belly fold & exposed ears',
        isAuthentic: true
      },
      {
        id: 'maldhari-tribe',
        name: 'Maldhari Pastoralist',
        icon: '🛖',
        taste: 'Indigenous Tribe',
        desc: 'Generational forest keepers living in harmony with lions',
        isAuthentic: true
      },
      {
        id: 'somnath-shrine',
        name: 'Somnath Shore Temple',
        icon: '🛕',
        taste: 'First Jyotirlinga',
        desc: 'Sacred coastal shrine with ancient arrow pillar',
        isAuthentic: true
      },
      {
        id: 'jafrabadi-buffalo',
        name: 'Jafrabadi Buffalo',
        icon: '🐃',
        taste: 'Prized Native Breed',
        desc: 'Heavy horned Saurashtra buffalo yielding rich milk',
        isAuthentic: true
      },
      {
        id: 'penguin',
        name: 'Emperor Penguin',
        icon: '🐧',
        taste: 'Antarctic Bird',
        desc: 'Polar creature (Not found in the tropical scrub of Gir)',
        isAuthentic: false
      }
    ]
  },

  'patan-north': {
    id: 'patan-patola-puzzle',
    locationId: 'patan-north',
    title: 'Patan Stepwell & Double-Ikkat Weaver',
    subtitle: 'Solanki Royal Architecture & Silk Geometry',
    icon: '🧵',
    instructions: 'Place the correct architectural levels and double-ikkat silk components into the royal Solanki vault!',
    timeLimitSeconds: 60,
    targetScore: 400,
    xpReward: 100,
    slots: [
      {
        id: 'slot-vav',
        label: 'Subterranean Monument',
        clue: '7-level inverted stepwell adorned with over 500 sculptures, featured on the ₹100 note.',
        targetItemId: 'rani-ki-vav'
      },
      {
        id: 'slot-weave',
        label: 'Double-Ikkat Technique',
        clue: 'Both warp and weft silk yarns are mathematically tie-dyed before weaving for reversible pattern.',
        targetItemId: 'double-ikkat'
      },
      {
        id: 'slot-sun',
        label: 'Solar Sanctuary',
        clue: '1026 CE temple engineered so the rising equinox sun illuminates the inner sanctum.',
        targetItemId: 'modhera-sun'
      },
      {
        id: 'slot-sculpture',
        label: 'Principal Deity',
        clue: 'The 10 divine incarnations (Dashavatara) carved along the subterranean corridors.',
        targetItemId: 'vishnu-dashavatara'
      }
    ],
    items: [
      {
        id: 'rani-ki-vav',
        name: 'Rani ki Vav Stepwell',
        icon: '🪜',
        taste: 'UNESCO Wonder',
        desc: '11th-century 7-level underground water temple',
        isAuthentic: true
      },
      {
        id: 'double-ikkat',
        name: 'Double-Ikkat Patola',
        icon: '🧵',
        taste: 'Royal Silk Weave',
        desc: 'Reversible pure silk dyed in warp and weft before weaving',
        isAuthentic: true
      },
      {
        id: 'modhera-sun',
        name: 'Modhera Sun Temple',
        icon: '☀️',
        taste: 'Solanki Solar Shrine',
        desc: 'Astronomical equinox temple with 108-shrine Surya Kund',
        isAuthentic: true
      },
      {
        id: 'vishnu-dashavatara',
        name: 'Dashavatara Reliefs',
        icon: '🔱',
        taste: 'Subterranean Art',
        desc: '500+ principal Vishnu sculptures along stepwell walls',
        isAuthentic: true
      },
      {
        id: 'plastic-loom',
        name: 'Nylon Powerloom',
        icon: '🏭',
        taste: 'Industrial Machine',
        desc: 'Mass-production machine (Patan Patola is 100% handloom)',
        isAuthentic: false
      }
    ]
  }
};

export function getMiniGameByLocationId(locationId) {
  return GUJARAT_MINIGAMES[locationId] || GUJARAT_MINIGAMES['ahmedabad-central'];
}
