// js/data/quizData.js - Reusable question data structure and verified Gujarat cultural quizzes

export const GUJARAT_QUIZZES = {
  'gujarat-master': {
    id: 'gujarat-master',
    locationId: 'gujarat',
    title: 'Grand Gujarat Cultural Quiz',
    subtitle: 'Comprehensive Heritage & State Mastery Assessment',
    passingScore: 4, // 4 out of 5 to earn Master rank
    xpReward: 150,
    unlocksArtifact: {
      id: 'gujarat-master-crown',
      name: 'Crown of Gujarat Cultural Mastery',
      rarity: 'Mythic',
      icon: '👑',
      desc: 'Awarded to explorers who demonstrate complete mastery of Gujarat\'s wildlife, history, artisanal crafts, and architecture.'
    },
    questions: [
      {
        id: 'q-rogan',
        location: 'Kutch',
        question: 'Which natural ingredient is boiled for over twelve hours to produce the pliable, elastic paint paste used in traditional Nirona Rogan art?',
        options: [
          'Mustard seed oil with crushed limestone',
          'Castor seed oil mixed with natural earth pigments',
          'Tree resin dissolved in coconut water',
          'Turmeric paste mixed with beeswax'
        ],
        correctIndex: 1,
        explanation: 'Castor seed oil is boiled for 12+ hours until it thickens into a golden, elastic residue, which is then blended with natural earth and stone pigments to paint without touching the cloth.',
        culturalFact: 'Gujarat produces over 75% of India\'s castor crop, leading to this ingenious local craft invention preserved by the Khatri family of Nirona village.',
        aiHint: 'Think of an oil crop widely cultivated in arid Gujarat regions for industrial and medicinal use.'
      },
      {
        id: 'q-gir-lion',
        location: 'Gir Forest',
        question: 'Which unique physical characteristic is present on 100% of wild Asiatic lions in Gir and distinguishes them from African lions?',
        options: [
          'A longitudinal fold of loose skin running along the belly',
          'Dark horizontal tiger stripes along the lower flanks',
          'Webbed paws adapted for swimming in tidal estuaries',
          'A bright electric blue mane on mature dominant males'
        ],
        correctIndex: 0,
        explanation: 'All pure Asiatic lions possess a distinctive longitudinal belly skin fold and shorter manes that leave their ears clearly exposed.',
        culturalFact: 'Gir Forest is the sole global habitat of the ~670 remaining wild Asiatic lions, protected in close harmony with the indigenous Maldhari pastoralists.',
        aiHint: 'Look at the anatomical fold running along the underside of the lion\'s torso.'
      },
      {
        id: 'q-sabarmati',
        location: 'Ahmedabad',
        question: 'Which historic 1930 peaceful march against British salt taxation began directly on the grounds of Sabarmati Ashram?',
        options: [
          'The 384 km Dandi Salt March (Salt Satyagraha)',
          'The 1928 Bardoli Farmers Tax Satyagraha',
          'The Champaran Indigo Satyagraha Movement',
          'The 1942 Quit India Resolution March'
        ],
        correctIndex: 0,
        explanation: 'On March 12, 1930, Mahatma Gandhi walked 384 km from Sabarmati Ashram with 78 satyagrahis to coastal Dandi to produce salt from the sea in defiance of colonial law.',
        culturalFact: 'Gandhi vowed never to return to live at Sabarmati Ashram until India achieved complete independence (Swaraj).',
        aiHint: 'Named after the coastal town in Navsari district where salt was gathered from the sea.'
      },
      {
        id: 'q-stepwell',
        location: 'Patan',
        question: 'On which denomination of the official Indian Rupee currency banknote is the 7-level Rani ki Vav subterranean stepwell illustrated?',
        options: [
          '₹50 Turquoise Note',
          '₹100 Lavender Note',
          '₹200 Bright Orange Note',
          '₹500 Stone Grey Note'
        ],
        correctIndex: 1,
        explanation: 'The Reserve Bank of India features the UNESCO World Heritage stepwell Rani ki Vav on the reverse side of the lavender ₹100 banknote.',
        culturalFact: 'Built in 1063 CE by Queen Udayamati as an inverted temple, it features over 500 principal sculptures depicting the Dashavatara of Lord Vishnu.',
        aiHint: 'Check the lavender banknote widely used in daily transactions across India.'
      },
      {
        id: 'q-patola',
        location: 'Patan',
        question: 'What makes authentic Patan "Double-Ikkat Patola" silk sarees celebrated worldwide by textile scholars?',
        options: [
          'They are made by machine-printing photographic designs onto polyester',
          'Both warp and weft threads are mathematically tie-dyed before weaving, creating identical front and back designs',
          'They are painted with molten beeswax and submerged in river mud',
          'They are embroidered with real diamonds and dissolve after one single wash'
        ],
        correctIndex: 1,
        explanation: 'In double-ikkat Patola weaving, both warp and weft pure silk yarns are tie-dyed before weaving, resulting in a reversible weave where both sides are 100% identical and colors last over 300 years.',
        culturalFact: 'A famous Gujarati proverb states: "Padi Patole Bhaat, Faate Pan Fitey Nahi" (The cloth may wear out with time, but the design and colors never fade).',
        aiHint: 'Focus on how the yarns are individually dyed in both directions before being placed on the handloom.'
      }
    ]
  },

  'kutch': {
    id: 'kutch-quiz',
    locationId: 'kutch',
    title: 'Master of the White Desert Quiz',
    subtitle: 'Kutch Geography & Rogan Craft Assessment',
    passingScore: 3,
    xpReward: 100,
    questions: [
      {
        id: 'kq-1',
        question: 'What natural ingredient forms the primary elastic base of Rogan paint?',
        options: ['Mustard oil', 'Boiled castor oil', 'Coconut oil', 'Sesame oil'],
        correctIndex: 1,
        explanation: 'Castor oil is boiled for 12+ hours to form the pliable paste used in Rogan art.',
        culturalFact: 'Only the Khatri family of Nirona village preserves this ancestral art form.',
        aiHint: 'Castor crop is abundant in Gujarat.'
      },
      {
        id: 'kq-2',
        question: 'What annual festival celebrates the full moon over the Great Rann of Kutch?',
        options: ['Tarnetar Fair', 'Rann Utsav', 'Modhera Dance Festival', 'Shamlaji Fair'],
        correctIndex: 1,
        explanation: 'Rann Utsav is a four-month winter celebration with music, crafts, and moonlit desert tents.',
        culturalFact: 'The salt desert glows like silver diamonds under the full moon.',
        aiHint: 'Shares the name of the desert.'
      },
      {
        id: 'kq-3',
        question: 'Which migratory bird gathers in millions in the salt marshes of Kutch?',
        options: ['Greater Flamingo', 'Siberian Crane', 'Peacock', 'Great Indian Bustard'],
        correctIndex: 0,
        explanation: 'Kutch is known as Flamingo City, the largest breeding colony in Asia.',
        culturalFact: 'Algae in the salt brine gives flamingos their pink color.',
        aiHint: 'Tall pink bird with long legs.'
      }
    ]
  }
};

export function getQuizByLocationId(locationId) {
  return GUJARAT_QUIZZES[locationId] || GUJARAT_QUIZZES['gujarat-master'];
}

export function getGujaratMasterQuiz() {
  return GUJARAT_QUIZZES['gujarat-master'];
}

export function registerQuiz(quizData) {
  if (!quizData.id) return false;
  GUJARAT_QUIZZES[quizData.id] = quizData;
  return true;
}
