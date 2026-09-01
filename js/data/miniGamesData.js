// js/data/miniGamesData.js - Educational Heritage Discovery Challenges for BharatVerse

export const GUJARAT_MINIGAMES = {
  'ahmedabad-central': {
    id: 'restore-heritage-ahmedabad',
    locationId: 'ahmedabad-central',
    title: 'Restore the Heritage',
    subtitle: 'Ahmedabad UNESCO Pol Architecture Challenge',
    icon: '🏛️',
    miraIntro: 'Kem Cho! Every element in Ahmedabad\'s historic Pol architecture was engineered with brilliant purpose—for climate comfort, community compassion, and water conservation. Help me identify and restore these three missing heritage components to their rightful places!',
    totalRounds: 3,
    xpReward: 100,
    artifactUnlock: {
      id: 'sabarmati-charkha',
      name: 'Sabarmati Golden Charkha',
      icon: '🪙',
      rarity: 'Legendary'
    },
    rounds: [
      {
        roundNumber: 1,
        slotId: 'slot-jali',
        slotName: 'Upper Window Screen',
        structureTag: 'Climate Adaptation & Airflow',
        miraClue: 'Look at the upper façade! This element was intricately hand-carved from golden sandstone with geometric perforations to filter glaring desert sunlight while creating natural cooling breezes.',
        highlightZone: 'Upper Window Aperture',
        options: [
          {
            id: 'jali',
            name: 'Carved Sandstone Jali',
            category: 'Lattice Window Screen',
            icon: '🪟',
            subtitle: 'Perforated Light & Air Filter',
            isCorrect: true,
            feedback: 'Splendid deduction! The carved Jali acts as an ancestral air conditioner, utilizing the Venturi effect to compress and cool incoming breezes while softening harsh sunlight into ambient illumination.',
            culturalInsight: 'Ahmedabad\'s Sidi Saiyyed Jali (Tree of Life) is recognized globally as a pinnacle of Indo-Islamic geometric stone filigree.'
          },
          {
            id: 'dome',
            name: 'Solid Stone Dome',
            category: 'Roof Cupola (Kumbha)',
            icon: '🕌',
            subtitle: 'Heavy Overhead Vault',
            isCorrect: false,
            hint: 'A stone dome crowns rooftop pavilions for weather shielding, but does not allow cross-ventilation breezes through walls. Think of a perforated stone screen!'
          },
          {
            id: 'door',
            name: 'Iron-Studded Heavy Gate',
            category: 'Khadki Defense Barrier',
            icon: '🚪',
            subtitle: 'Solid Wooden Entrance',
            isCorrect: false,
            hint: 'Solid Khadki wooden gates were built at street level for defense and security, but they block all light and airflow. Look for a delicate carved aperture!'
          }
        ]
      },
      {
        roundNumber: 2,
        slotId: 'slot-chabutra',
        slotName: 'Central Courtyard Tower',
        structureTag: 'Community Compassion & Wildlife',
        miraClue: 'Standing tall in the open square of every Pol neighborhood, this elevated carved wooden tower was built by residents to feed pigeons and squirrels safely above street predators.',
        highlightZone: 'Courtyard Bird Feeder Plinth',
        options: [
          {
            id: 'chabutra',
            name: 'Community Chabutra',
            category: 'Elevated Bird Tower',
            icon: '🦜',
            subtitle: 'Wooden Feeder with Rain Canopy',
            isCorrect: true,
            feedback: 'Brilliant! The Chabutra represents Ahmedabad\'s deep cultural philosophy of "Jiva-Daya" (compassion for all living beings). Every morning, residents gather to fill its dishes with grains and fresh water.',
            culturalInsight: 'Over 120 historic carved wooden Chabutras still stand inside Ahmedabad\'s walled city, each an artistic community landmark.'
          },
          {
            id: 'otla',
            name: 'Stone Otla Plinth',
            category: 'Raised Verandah Step',
            icon: '🪜',
            subtitle: 'Ground-Level Doorway Platform',
            isCorrect: false,
            hint: 'An Otla is a raised stone platform right outside house doorways where human neighbors sit and chat, not an elevated bird tower in the square.'
          },
          {
            id: 'jharokha',
            name: 'Jharokha Balcony',
            category: 'Cantilevered Window Bay',
            icon: '🏰',
            subtitle: 'Projecting Upper-Floor Viewing Balcony',
            isCorrect: false,
            hint: 'A Jharokha is an overhanging private balcony attached to upper house walls for viewing festivals, not a freestanding communal bird sanctuary tower.'
          }
        ]
      },
      {
        roundNumber: 3,
        slotId: 'slot-tanka',
        slotName: 'Subterranean Reservoir',
        structureTag: 'Water Conservation & Sustainability',
        miraClue: 'Hidden beneath the central courtyard floor of historic Havelis, this sealed underground cistern collected pure monsoon rainwater from rooftop gutters, keeping water sweet and drinkable for years.',
        highlightZone: 'Subterranean Rainwater Chamber',
        options: [
          {
            id: 'tanka',
            name: 'Subterranean Tanka',
            category: 'Lime-Plastered Rain Cistern',
            icon: '💧',
            subtitle: 'Courtyard Rainwater Reservoir',
            isCorrect: true,
            feedback: 'Exceptional knowledge! The traditional Tanka rainwater harvesting system stored up to 25,000 liters of pure monsoon runoff, naturally filtered and purified with traditional lime-copper plaster.',
            culturalInsight: 'Tankas kept Pol residents 100% water self-sufficient through severe droughts for over six centuries without relying on external water sources.'
          },
          {
            id: 'todla',
            name: 'Carved Todla Bracket',
            category: 'Wooden Beam Corbel',
            icon: '🪵',
            subtitle: 'Sculpted Structural Timber',
            isCorrect: false,
            hint: 'Todlas are carved wooden animal and floral brackets that support heavy second-floor beams, not subterranean water cisterns.'
          },
          {
            id: 'peshkhana',
            name: 'Front Peshkhana',
            category: 'Formal Reception Foyer',
            icon: '🏛️',
            subtitle: 'Open Ground-Floor Hall',
            isCorrect: false,
            hint: 'The Peshkhana is the open front drawing room of a traditional Haveli for welcoming guests, not an underground rainwater cistern.'
          }
        ]
      }
    ]
  },

  'kutch': {
    id: 'restore-heritage-kutch',
    locationId: 'kutch',
    title: 'Rogan Masterpiece Restorer',
    subtitle: 'Nirona Ancestral Craft Challenge',
    icon: '🎨',
    miraIntro: 'In Nirona village, master artisans create 300-year-old Rogan art with incredible patience. Let\'s identify the true ancestral components that bring this timeless craft to life!',
    totalRounds: 3,
    xpReward: 100,
    artifactUnlock: {
      id: 'rogan-tapestry',
      name: 'Rogan Tree of Life Tapestry',
      icon: '🏺',
      rarity: 'Legendary'
    },
    rounds: [
      {
        roundNumber: 1,
        slotId: 'slot-binder',
        slotName: 'Natural Elastic Base',
        structureTag: 'Organic Chemistry & Alchemy',
        miraClue: 'Which natural agricultural seed oil is boiled continuously for over 12 hours until it transforms into a thick, elastic golden paste?',
        options: [
          {
            id: 'castor-oil',
            name: 'Boiled Castor Seed Oil',
            category: 'Natural Resin Binder',
            icon: '🫗',
            subtitle: '12-Hour Boiled Elastic Jelly',
            isCorrect: true,
            feedback: 'Correct! Castor oil boiled for 12 hours polymerizes into an elastic jelly that can be spun into fine threads at room temperature.',
            culturalInsight: 'Gujarat is the world\'s largest producer of castor seeds, making Rogan an ingenious local agricultural invention.'
          },
          {
            id: 'mustard-oil',
            name: 'Mustard Cooking Oil',
            category: 'Culinary Oil',
            icon: '🌾',
            subtitle: 'Pungent Kitchen Oil',
            isCorrect: false,
            hint: 'Mustard oil is used for spicy curries and pickles, but does not polymerize into an elastic craft binder.'
          },
          {
            id: 'coconut-oil',
            name: 'Cold-Pressed Coconut Oil',
            category: 'Solidifying Oil',
            icon: '🥥',
            subtitle: 'Solidifies in Winter',
            isCorrect: false,
            hint: 'Coconut oil solidifies in the cold and melts in heat, making it unsuitable for durable fabric painting.'
          }
        ]
      },
      {
        roundNumber: 2,
        slotId: 'slot-tool',
        slotName: 'Master Artisan Tool',
        structureTag: 'Precision Toolmaking',
        miraClue: 'The master painter never lets their tool touch the cloth! What six-inch instrument is used to spin and guide the paint thread in mid-air?',
        options: [
          {
            id: 'metal-stylus',
            name: 'Blunt Metal Stylus (Kalam)',
            category: 'Iron / Brass Guide Rod',
            icon: '🖌️',
            subtitle: '6-Inch Thread Spinner',
            isCorrect: true,
            feedback: 'Perfect! The blunt stylus spins a thin thread of colored paste in the air, allowing the artisan to draw intricate motifs without direct fabric contact.',
            culturalInsight: 'Artisans work with a small blob of paste on their palm, warming it with hand friction as they paint.'
          },
          {
            id: 'horsehair-brush',
            name: 'Horsehair Bristle Brush',
            category: 'Traditional Paintbrush',
            icon: '🎨',
            subtitle: 'Soft Hair Bristles',
            isCorrect: false,
            hint: 'Hair brushes smear the sticky paste. Rogan requires a blunt metal stylus to pull elastic threads.'
          },
          {
            id: 'wooden-block',
            name: 'Carved Teakwood Block',
            category: 'Block Printing Stamp',
            icon: '🪵',
            subtitle: 'Ajrakh Print Block',
            isCorrect: false,
            hint: 'Wooden blocks are used for Ajrakh block printing, whereas Rogan is entirely freehand thread spinning.'
          }
        ]
      },
      {
        roundNumber: 3,
        slotId: 'slot-motif',
        slotName: 'Symmetrical Masterwork',
        structureTag: 'Mirror Symmetry & Geometry',
        miraClue: 'After painting half the canvas, the artisan folds the fabric in half to stamp a mirror image. What iconic symmetrical motif represents eternal life?',
        options: [
          {
            id: 'tree-of-life',
            name: 'Tree of Life (Jhad)',
            category: 'Sacred Kutchi Symbol',
            icon: '🌳',
            subtitle: 'Flourishing Floral Canopy',
            isCorrect: true,
            feedback: 'Masterfully identified! The Tree of Life with its delicate blooming branches is the most revered and complex masterwork of Rogan artistry.',
            culturalInsight: 'A single Tree of Life Rogan tapestry takes over three months of concentrated handcrafting.'
          },
          {
            id: 'geometric-chevron',
            name: 'Industrial Chevron Lines',
            category: 'Modern Abstract',
            icon: '📐',
            subtitle: 'Linear Zig-Zag',
            isCorrect: false,
            hint: 'Traditional Rogan is inspired by flourishing natural flora, peacocks, and the Tree of Life.'
          },
          {
            id: 'polka-dots',
            name: 'Simple Polka Dots',
            category: 'Basic Pattern',
            icon: '⚪',
            subtitle: 'Repeated Circles',
            isCorrect: false,
            hint: 'Rogan art is renowned for its organic blooming canopies, not basic polka dots.'
          }
        ]
      }
    ]
  },

  'gir-saurashtra': {
    id: 'restore-heritage-gir',
    locationId: 'gir-saurashtra',
    title: 'Gir Ecosystem Harmony',
    subtitle: 'Wildlife Sanctuary & Coexistence Challenge',
    icon: '🦁',
    miraIntro: 'In the teak forests of Gir, apex predators and indigenous pastoralists have coexisted for centuries. Let\'s discover the three vital pillars that keep this sanctuary thriving!',
    totalRounds: 3,
    xpReward: 100,
    artifactUnlock: {
      id: 'gir-bronze-lion',
      name: 'Gir Bronze Lion Emblem',
      icon: '🦁',
      rarity: 'Rare'
    },
    rounds: [
      {
        roundNumber: 1,
        slotId: 'slot-lion',
        slotName: 'Apex Sanctuary Monarch',
        structureTag: 'Endangered Species Conservation',
        miraClue: 'Which unique physical feature distinguishes the Asiatic Lion of Gir from its African cousins?',
        options: [
          {
            id: 'belly-fold',
            name: 'Longitudinal Belly Skin Fold',
            category: 'Panthera leo persica Trait',
            icon: '🦁',
            subtitle: 'Distinctive Abdominal Fold & Exposed Ears',
            isCorrect: true,
            feedback: 'Correct! The Asiatic lion has a prominent longitudinal fold of skin running along its belly and exposed ears not covered by its mane.',
            culturalInsight: 'Gir is the only place in the wild where Asiatic lions still roam on Earth, protected by local communities.'
          },
          {
            id: 'striped-tail',
            name: 'Tiger-Like Striped Tail',
            category: 'Hybrid Trait',
            icon: '🐅',
            subtitle: 'Black Striped Fur',
            isCorrect: false,
            hint: 'Lions have solid tan coats with dark tail tufts, not striped fur.'
          },
          {
            id: 'giant-mane',
            name: 'Neck-to-Tail Giant Mane',
            category: 'African Lion Trait',
            icon: '👑',
            subtitle: 'Full Body Fur Cape',
            isCorrect: false,
            hint: 'Asiatic male lions actually have shorter, sparser manes so their ears remain clearly visible.'
          }
        ]
      },
      {
        roundNumber: 2,
        slotId: 'slot-maldhari',
        slotName: 'Pastoral Guardian',
        structureTag: 'Indigenous Coexistence',
        miraClue: 'What indigenous pastoral community lives in traditional circular settlements (Nesses) inside the core forest without fences?',
        options: [
          {
            id: 'maldhari',
            name: 'Maldhari Pastoralists',
            category: 'Indigenous Forest Guardians',
            icon: '🛖',
            subtitle: 'Living in Harmony with Lions',
            isCorrect: true,
            feedback: 'Spot on! The Maldharis (meaning "keepers of cattle wealth") have coexisted with lions for centuries, reading forest sounds to protect their herds peacefully.',
            culturalInsight: 'Maldharis consider the lion a sacred guardian of the forest rather than a threat.'
          },
          {
            id: 'sherpa',
            name: 'Himalayan Sherpas',
            category: 'Mountain Guides',
            icon: '🏔️',
            subtitle: 'High Altitude Climbers',
            isCorrect: false,
            hint: 'Sherpas are the indigenous mountain community of the Himalayas, not the dry deciduous forests of Gujarat.'
          },
          {
            id: 'inuit',
            name: 'Arctic Inuits',
            category: 'Polar Dwellers',
            icon: '❄️',
            subtitle: 'Tundra Hunters',
            isCorrect: false,
            hint: 'Inuits are arctic hunters, far from the tropical dry deciduous climate of Saurashtra.'
          }
        ]
      },
      {
        roundNumber: 3,
        slotId: 'slot-somnath',
        slotName: 'Coastal Spiritual Anchor',
        structureTag: 'Ancient Maritime Heritage',
        miraClue: 'On the southern shore of Saurashtra stands the first Jyotirlinga. What ancient pillar on its grounds indicates an unobstructed sea route to Antarctica?',
        options: [
          {
            id: 'baan-stambh',
            name: 'Baan Stambh (Arrow Pillar)',
            category: 'Astronomical Sea Marker',
            icon: '🏹',
            subtitle: 'Straight Line to the South Pole',
            isCorrect: true,
            feedback: 'Remarkable discovery! The Baan Stambh inscription at Somnath Temple notes that no landmass exists in a direct line southward between Somnath and Antarctica.',
            culturalInsight: 'This ancient navigational inscription demonstrates the sophisticated maritime and geographic knowledge of early Indian astronomers.'
          },
          {
            id: 'ashoka-edicts',
            name: 'Junagadh Rock Edict',
            category: 'Moral Inscriptions',
            icon: '📜',
            subtitle: 'Buddhist Inscriptions on Rock',
            isCorrect: false,
            hint: 'Emperor Ashoka\'s 14 edicts are carved on a boulder at the foot of Mount Girnar inland, not the arrow pillar on Somnath\'s shoreline.'
          },
          {
            id: 'lighthouse',
            name: 'Modern Diesel Lighthouse',
            category: '20th Century Maritime Tower',
            icon: '🏮',
            subtitle: 'Electric Rotating Beam',
            isCorrect: false,
            hint: 'Look for the ancient Sanskrit arrow pillar (Baan Stambh) marking the cosmic ocean meridian.'
          }
        ]
      }
    ]
  },

  'patan-north': {
    id: 'restore-heritage-patan',
    locationId: 'patan-north',
    title: 'Solanki Engineering & Silk Alchemy',
    subtitle: 'Rani ki Vav Stepwell Challenge',
    icon: '🧵',
    miraIntro: 'In medieval Patan, Solanki builders engineered inverted subterranean water palaces and weavers created impossible double-ikkat silks. Let\'s uncover the secrets of this dual mastery!',
    totalRounds: 3,
    xpReward: 100,
    artifactUnlock: {
      id: 'patan-patola-silk',
      name: 'Patan Double-Ikkat Patola Silk',
      icon: '👑',
      rarity: 'Legendary'
    },
    rounds: [
      {
        roundNumber: 1,
        slotId: 'slot-vav-levels',
        slotName: 'Subterranean Marvel',
        structureTag: 'Inverted Temple Architecture',
        miraClue: 'How many subterranean stepped levels descend into the water table at Rani ki Vav, featured on the reverse of the ₹100 banknote?',
        options: [
          {
            id: 'seven-levels',
            name: '7 Subterranean Terraces',
            category: 'Inverted Water Temple',
            icon: '🪜',
            subtitle: 'Over 500 Principal Sculptures',
            isCorrect: true,
            feedback: 'Correct! Rani ki Vav is designed as an inverted temple with seven stepped pillared pavilions descending down to the sacred circular well.',
            culturalInsight: 'Queen Udayamati commissioned this subterranean wonder in 1063 CE in memory of King Bhimdev I.'
          },
          {
            id: 'two-levels',
            name: '2 Simple Stairwells',
            category: 'Basic Village Well',
            icon: '🧱',
            subtitle: 'Shallow Stepped Tank',
            isCorrect: false,
            hint: 'Rani ki Vav is a massive 7-level underground masterpiece, not a simple 2-level village stepwell.'
          },
          {
            id: 'twenty-levels',
            name: '20 Modern Subway Floors',
            category: 'Modern Excavation',
            icon: '🏗️',
            subtitle: 'Modern Mine Shaft',
            isCorrect: false,
            hint: 'The medieval Solanki stepwell reaches seven majestic levels down into the groundwater.'
          }
        ]
      },
      {
        roundNumber: 2,
        slotId: 'slot-patola-weave',
        slotName: 'Double-Ikkat Silk Masterwork',
        structureTag: 'Mathematical Textile Alchemy',
        miraClue: 'Why is Patan\'s royal Double-Ikkat Patola silk so legendary and identical on both front and back sides?',
        options: [
          {
            id: 'double-ikkat',
            name: 'Both Warp & Weft Pre-Dyed',
            category: 'Mathematical Resist-Dyeing',
            icon: '🧵',
            subtitle: 'Tied and Dyed Before Weaving',
            isCorrect: true,
            feedback: 'Brilliant! In double-ikkat, both warp (vertical) and weft (horizontal) silk threads are tied and dyed with mathematical precision before being woven on the loom.',
            culturalInsight: 'A Gujarati proverb says: "Padi Patole Bhaat, Phate Pan Fite Nahi" (The design on a Patola may tear with age, but the color will never fade).'
          },
          {
            id: 'screen-print',
            name: 'Surface Ink Screen Printing',
            category: 'Machine Stencil',
            icon: '🖨️',
            subtitle: 'Surface Pigment Stamping',
            isCorrect: false,
            hint: 'Screen printing only coats the surface. Double-ikkat Patola is woven from individual pre-dyed silk threads.'
          },
          {
            id: 'embroidery',
            name: 'Heavy Needle Embroidery',
            category: 'Surface Thread Stitching',
            icon: '🪡',
            subtitle: 'Stitched onto Existing Cloth',
            isCorrect: false,
            hint: 'Embroidery adds threads on top of finished cloth; Patola patterns are created inside the weave itself.'
          }
        ]
      },
      {
        roundNumber: 3,
        slotId: 'slot-modhera-sun',
        slotName: 'Solar Alignment Shrine',
        structureTag: 'Archaeoastronomy & Solar Engineering',
        miraClue: 'At the nearby Sun Temple of Modhera, how is the sanctum astronomically aligned with the sun during the spring and autumn equinoxes?',
        options: [
          {
            id: 'equinox-alignment',
            name: 'First Equinox Rays Illuminate Sanctum',
            category: 'Astronomical Precision',
            icon: '☀️',
            subtitle: 'Direct Sunlight on Solar Jewel',
            isCorrect: true,
            feedback: 'Fascinating! The Solanki architects engineered the temple so that at dawn on the vernal and autumnal equinoxes, the first sunbeams cast directly onto the deity\'s diamond crown.',
            culturalInsight: 'Modhera\'s Surya Kund reservoir features 108 miniature shrines arranged in perfect geometric symmetry.'
          },
          {
            id: 'total-darkness',
            name: 'Engineered for Total Darkness',
            category: 'Cave Alignment',
            icon: '🌑',
            subtitle: 'Blocks All Sunlight Year-Round',
            isCorrect: false,
            hint: 'The Sun Temple was celebrated specifically for capturing equinox dawn sunlight into its inner sanctum.'
          },
          {
            id: 'moon-mirror',
            name: 'Silver Moonlit Mirror Chamber',
            category: 'Lunar Observatory',
            icon: '🌙',
            subtitle: 'Night Sky Reflector',
            isCorrect: false,
            hint: 'Modhera is dedicated to Surya (the Sun God), engineered for equinox solar alignment.'
          }
        ]
      }
    ]
  }
};

export function getMiniGameByLocationId(locationId) {
  return GUJARAT_MINIGAMES[locationId] || GUJARAT_MINIGAMES['ahmedabad-central'];
}
