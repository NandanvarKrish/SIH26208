// js/data/girGuardianData.js - Complete data model for "The Gir Guardian" location mission module

export const GIR_GUARDIAN_DATA = {
  metadata: {
    id: 'gir-guardian',
    locationId: 'gir-saurashtra',
    locationName: 'Gir National Park & Wildlife Sanctuary',
    stateName: 'Gujarat',
    region: 'Saurashtra Peninsula, Western India',
    title: 'THE GIR GUARDIAN',
    subtitle: 'Protect the ecosystem. Understand the wild. Become a Guardian.',
    coverTheme: 'deep-forest',
    coordinates: '21.1241° N, 70.7944° E',
    habitat: 'Dry Deciduous Teak Forest & Savanna Scrublands',
    keySpecies: 'Asiatic Lion (Panthera leo persica)',
    totalMissions: 4,
    maxXP: 1000
  },

  intro: {
    badge: '🦁 BHARATVERSE LOCATION EXPEDITION',
    heading: 'The Gir Guardian',
    subheading: 'Sanctuary of the Last Wild Asiatic Lions',
    description: 'Welcome to Gir Forest—a 1,412 km² living sanctuary where dry deciduous teak forests, rocky ravines, and perennial river valleys harbor the world\'s only remaining wild population of Asiatic lions.',
    miraGreeting: 'Welcome to Gir! Today, you are not just a visitor. You are going to become a Guardian of the forest. The wild is counting on our decisions!',
    stats: [
      { value: '674+', label: 'Wild Asiatic Lions' },
      { value: '1,412 km²', label: 'Protected Area' },
      { value: '300+', label: 'Avian Species' },
      { value: 'Centuries', label: 'Maldhari Coexistence' }
    ],
    cta: 'BEGIN GUARDIAN EXPEDITION'
  },

  mission1: {
    id: 'mission-1',
    number: 1,
    title: 'Wildlife Detective',
    subtitle: 'Identify Keystone Fauna Through Progressive Forensic Clues',
    miraIntro: 'The forest leaves subtle clues everywhere. Let\'s test your wildlife tracking skills! The fewer clues you reveal before answering, the higher your detective XP.',
    xpPerClue: [100, 80, 60, 40],
    cases: [
      {
        id: 'case-lion',
        title: 'Mystery Specimen Alpha',
        clues: [
          'I am an apex carnivore that hunts during cool twilight and nocturnal hours.',
          'I possess a distinct longitudinal skin fold running along the center of my belly.',
          'My adult males have a shorter, darker mane compared to African relatives, leaving my ears clearly visible.',
          'Gir National Park in Gujarat is the ONLY place on planet Earth where my wild population roams free.'
        ],
        options: [
          { id: 'lion', name: 'Asiatic Lion', scientific: 'Panthera leo persica', icon: '🦁', isCorrect: true },
          { id: 'leopard', name: 'Indian Leopard', scientific: 'Panthera pardus fusca', icon: '🐆', isCorrect: false },
          { id: 'hyena', name: 'Striped Hyena', scientific: 'Hyaena hyaena', icon: '🐺', isCorrect: false },
          { id: 'jungle-cat', name: 'Jungle Cat', scientific: 'Felis chaus', icon: '🐱', isCorrect: false }
        ],
        miraFact: 'That\'s the majestic Asiatic Lion! Gir is globally celebrated for bringing this subspecies back from fewer than 20 individuals in 1900 to over 674 today through strict protection and local community support.'
      },
      {
        id: 'case-chital',
        title: 'Mystery Specimen Beta',
        clues: [
          'I am a social herbivore feeding on tender forest grasses, herbs, and fallen acacia flowers.',
          'My golden-rufous coat is covered in permanent white spots that remain throughout my entire life.',
          'I share a mutualistic alarm-call partnership with Gray Langurs—they drop fruit from treetops and screech when predators approach.',
          'I am the most abundant ungulate in Gir and form over 70% of the natural prey diet for lions and leopards.'
        ],
        options: [
          { id: 'chital', name: 'Chital (Spotted Deer)', scientific: 'Axis axis', icon: '🦌', isCorrect: true },
          { id: 'sambar', name: 'Sambar Deer', scientific: 'Rusa unicolor', icon: '🦌', isCorrect: false },
          { id: 'blackbuck', name: 'Blackbuck', scientific: 'Antilope cervicapra', icon: '🦌', isCorrect: false },
          { id: 'nilgai', name: 'Nilgai (Blue Bull)', scientific: 'Boselaphus tragocamelus', icon: '🐂', isCorrect: false }
        ],
        miraFact: 'Spot on! The Chital deer is Gir\'s keystone herbivore. A thriving deer population is the biological foundation that prevents predators from wandering into farming villages.'
      },
      {
        id: 'case-crocodile',
        title: 'Mystery Specimen Gamma',
        clues: [
          'I am a cold-blooded aquatic apex reptile basking on rocky riverbanks during morning sun.',
          'I have a broad, tough snout and powerful scutes built for freshwater riverine habitats.',
          'I thrive in large numbers at Kamleshwar Reservoir right in the heart of Gir Forest.',
          'I clean aquatic ecosystems by scavenging fallen carcasses and regulating river fish populations.'
        ],
        options: [
          { id: 'croc', name: 'Mugger Crocodile', scientific: 'Crocodylus palustris', icon: '🐊', isCorrect: true },
          { id: 'gharial', name: 'Gharial', scientific: 'Gavialis gangeticus', icon: '🦎', isCorrect: false },
          { id: 'monitor', name: 'Bengal Monitor Lizard', scientific: 'Varanus bengalensis', icon: '🦎', isCorrect: false },
          { id: 'python', name: 'Indian Rock Python', scientific: 'Python molurus', icon: '🐍', isCorrect: false }
        ],
        miraFact: 'Terrific deduction! Kamleshwar Dam is celebrated as the "Crocodile Nursery of Gir", sustaining one of the densest populations of marsh muggers in western India.'
      }
    ]
  },

  mission2: {
    id: 'mission-2',
    number: 2,
    title: 'Become a Gir Ranger',
    subtitle: 'Strategic Forest Patrol & Low-Disturbance Navigation',
    miraIntro: 'A lioness with two 3-month-old cubs has been spotted moving toward the central drainage basin as dusk sets in. As duty ranger, choose the safest surveillance patrol route that minimizes wildlife disturbance while securing the territory.',
    scenario: {
      location: 'Kamleshwar Core Buffer Nexus',
      time: '17:45 HRS • Pre-Dusk Shift',
      temperature: '34°C • Dry Season'
    },
    routes: [
      {
        id: 'route-ridge',
        name: 'The Teak Ridge Overlook (High Ground)',
        distance: '4.2 km',
        terrain: 'Rocky ridge line with elevated sightlines',
        disturbanceLevel: 'Minimal (5%)',
        riskLevel: 'Low',
        xp: 100,
        scorePoints: 100,
        recommended: true,
        consequence: {
          status: 'Optimal Ranger Strategy ⭐',
          type: 'success',
          text: 'Masterful choice! By taking the elevated rocky ridge, your patrol observed the lioness and cubs through long-range optics without creating engine noise or disturbing prey herds at the watering hole.',
          ecologicalTakeaway: 'High-ground observation gives rangers complete visibility across multiple canopy layers without intruding into sensitive maternal cub-rearing zones.'
        }
      },
      {
        id: 'route-water',
        name: 'The Hiran Riverbank Trail (Direct Water Route)',
        distance: '2.1 km',
        terrain: 'Moist riverine silt along active watering holes',
        disturbanceLevel: 'Moderate-High (55%)',
        riskLevel: 'Medium',
        xp: 75,
        scorePoints: 75,
        recommended: false,
        consequence: {
          status: 'Moderate Disruption ⚠️',
          type: 'warning',
          text: 'You reached the water quickly, but your vehicle sound startled a herd of drinking Sambar deer. The alarm bark alerted the lioness, who retreated into dense thorn scrub with her cubs.',
          ecologicalTakeaway: 'Water holes are critical life-support zones during dry seasons. Direct motorized access creates severe stress for animals gathering at dusk.'
        }
      },
      {
        id: 'route-grassland',
        name: 'The Central Savanna Track (Open Plains)',
        distance: '3.6 km',
        terrain: 'Open grassland & scrub savanna',
        disturbanceLevel: 'Moderate (40%)',
        riskLevel: 'Low-Medium',
        xp: 80,
        scorePoints: 80,
        recommended: false,
        consequence: {
          status: 'Fair Navigation 🧭',
          type: 'neutral',
          text: 'You traversed the open scrub swiftly and logged valuable Nilgai herd census data, but the vast open plains offered zero cover, preventing close verification of the cubs\' health.',
          ecologicalTakeaway: 'Savanna tracks are excellent for broad ungulate surveys, but ineffective for monitoring carnivore mothers who seek dense ravines.'
        }
      },
      {
        id: 'route-boundary',
        name: 'The Village Forest-Fringe Boundary (Buffer Patrol)',
        distance: '5.8 km',
        terrain: 'Perimeter fence line bordering farmland & nesses',
        disturbanceLevel: 'Low in Core (10%)',
        riskLevel: 'High Edge Priority',
        xp: 90,
        scorePoints: 90,
        recommended: false,
        consequence: {
          status: 'Vital Buffer Defense 🛡️',
          type: 'good',
          text: 'While you missed the core cubs sighting, your patrol discovered an unfastened solar fence gate near an agricultural field and alerted the local Maldhari cattle herders before dusk.',
          ecologicalTakeaway: 'Boundary patrols are equally vital in Gir to prevent nighttime livestock predation and maintain peaceful community-wildlife coexistence.'
        }
      }
    ]
  },

  mission3: {
    id: 'mission-3',
    number: 3,
    title: 'Build the Gir Ecosystem',
    subtitle: 'Construct the Trophic Food Web & Analyze Trophic Cascades',
    miraIntro: 'A forest isn\'t just animals—it\'s a living, interconnected web of energy. Drag or place each organism into its correct trophic tier to activate the food web simulation!',
    tiers: [
      {
        level: 1,
        title: 'Tier 1 • Primary Energy Source',
        category: 'Solar Energy',
        targetId: 'solar',
        correctItem: 'sun',
        hint: 'Radiates energy driving photosynthesis across all green flora.'
      },
      {
        level: 2,
        title: 'Tier 2 • Primary Producers',
        category: 'Flora & Plants',
        targetId: 'producers',
        correctItem: 'teak-grass',
        hint: 'Teak (Tectona grandis), Acacia thorn, and perennial savanna grasses.'
      },
      {
        level: 3,
        title: 'Tier 3 • Primary Herbivores (Ungulates)',
        category: 'Herbivores',
        targetId: 'herbivores',
        correctItem: 'chital-sambar',
        hint: 'Spotted Chital, heavy Sambar deer, and Nilgai antelope.'
      },
      {
        level: 4,
        title: 'Tier 4 • Apex Carnivores',
        category: 'Top Predators',
        targetId: 'carnivores',
        correctItem: 'lion-leopard',
        hint: 'Asiatic Lion and Indian Leopard regulating prey density.'
      },
      {
        level: 5,
        title: 'Tier 5 • Decomposers & Scavengers',
        category: 'Recyclers',
        targetId: 'decomposers',
        correctItem: 'vultures-fungi',
        hint: 'White-backed Vultures, dung beetles, and soil mycorrhizal fungi.'
      }
    ],
    items: [
      { id: 'sun', name: '☀️ Solar Radiation', type: 'solar', icon: '☀️', desc: 'Photosynthetic energy' },
      { id: 'teak-grass', name: '🌿 Teak & Savanna Grass', type: 'producers', icon: '🌿', desc: 'Primary vegetative biomass' },
      { id: 'chital-sambar', name: '🦌 Chital & Sambar Herds', type: 'herbivores', icon: '🦌', desc: 'Primary grazers & browsers' },
      { id: 'lion-leopard', name: '🦁 Asiatic Lion Pride', type: 'carnivores', icon: '🦁', desc: 'Keystone apex predators' },
      { id: 'vultures-fungi', name: '🪲 Vultures & Soil Decomposers', type: 'decomposers', icon: '🪲', desc: 'Nutrient recyclers & scavengers' }
    ],
    dilemma: {
      question: 'What happens if invasive weeds (such as Lantana camara) choke 40% of the native savanna grasses?',
      options: [
        {
          id: 'opt-a',
          text: 'Herbivore numbers decline $\\to$ Lions face prey shortage $\\to$ Increased livestock predation near villages.',
          isCorrect: true,
          feedback: 'Precisely! This is a classic "Trophic Cascade". When plant biomass drops, ungulate populations crash, forcing apex predators to venture outside the sanctuary to hunt livestock.'
        },
        {
          id: 'opt-b',
          text: 'Lions easily adapt by switching to eating weeds and dry teak bark.',
          isCorrect: false,
          feedback: 'Lions are obligate carnivores with digestive tracts specialized strictly for meat. They cannot digest cellulose or plant matter.'
        },
        {
          id: 'opt-c',
          text: 'Decomposers multiply exponentially and permanently replace the lost deer.',
          isCorrect: false,
          feedback: 'Decomposers require organic waste and carcasses; if herbivores vanish, decomposers also suffer severe population contractions.'
        }
      ]
    }
  },

  mission4: {
    id: 'mission-4',
    number: 4,
    title: 'The Conservation Crisis',
    subtitle: 'Human-Wildlife Coexistence & Community Stewardship Policy',
    miraIntro: 'This is the most critical test for any Guardian. Conservation isn\'t just about wildlife inside fences—it\'s about balancing human lives, pastoral traditions, and predator safety.',
    scenario: {
      title: 'CRISIS AT THE BUFFER ZONE: RAJULA PERIMETER',
      context: 'A prolonged dry summer has caused wild boars and nilgai to raid groundnut and cotton fields in fringe villages. Two nights ago, an elderly lion killed a village cow in an open shed. Tension is running high among local farmers, who demand immediate intervention.'
    },
    choices: [
      {
        id: 'policy-c',
        title: 'Community Coexistence Package (Recommended)',
        icon: '🤝',
        description: 'Deploy fast-track Direct Benefit Transfer (DBT) for livestock loss, install predator-proof chain-link cattle sheds, distribute solar crop-repellent lights, and employ youth as "Vanya Saathi" village trackers.',
        consequences: {
          ecologicalHealth: 95,
          communityTrust: 98,
          financialSustainability: 90,
          outcomeBadge: 'Exemplary Coexistence Model ⭐',
          verdict: 'Master Guardian Decision! Rapid compensation removes retaliatory anger. Predator-proof sheds protect cattle, and local youth gain pride as paid protectors. This mirrors Gir\'s real-world success with the Maldhari community!'
        },
        score: 100,
        isBest: true
      },
      {
        id: 'policy-a',
        title: 'Complete Relocation & Heavy Perimeter Fencing',
        icon: '🚧',
        description: 'Enforce mandatory relocation of 12 fringe villages and erect a 10-foot electrified razor-wire perimeter around the entire national park boundary.',
        consequences: {
          ecologicalHealth: 60,
          communityTrust: 25,
          financialSustainability: 35,
          outcomeBadge: 'Severe Social & Ecological Harm ❌',
          verdict: 'Disastrous approach. Forced relocation shatters centuries of indigenous pastoral culture. Hard fencing prevents natural genetic dispersal of lions into Greater Gir corridors, leading to severe inbreeding.'
        },
        score: 45,
        isBest: false
      },
      {
        id: 'policy-b',
        title: 'Total Capture & Caging of Dispersing Predators',
        icon: '⛓️',
        description: 'Capture and permanently zoo-house any lion or leopard that crosses outside the core sanctuary boundary.',
        consequences: {
          ecologicalHealth: 35,
          communityTrust: 65,
          financialSustainability: 40,
          outcomeBadge: 'Ecological Imbalance ⚠️',
          verdict: 'Flawed policy. More than 45% of Gir\'s lions naturally live in multi-use agro-pastoral landscapes outside the core. Caging them overcrowds zoos, while wild boar populations explode without predators, ruining crops even faster.'
        },
        score: 40,
        isBest: false
      },
      {
        id: 'policy-d',
        title: 'Laissez-Faire (Do Nothing & Let Nature Decide)',
        icon: '🤷',
        description: 'Refuse state intervention, claiming wild animals have natural rights to roam anywhere without government mediation.',
        consequences: {
          ecologicalHealth: 20,
          communityTrust: 10,
          financialSustainability: 80,
          outcomeBadge: 'Catastrophic Conflict Escalation ☠️',
          verdict: 'Dangerous neglect. Without support, desperate farmers resort to illegal live electric wire traps and poisoned carcasses, causing catastrophic losses to both lions and humans.'
        },
        score: 20,
        isBest: false
      }
    ]
  },

  finalChallenge: {
    id: 'final-challenge',
    title: 'THE FINAL GUARDIAN TEST',
    subtitle: 'High-Stakes Emergency Crisis Simulation',
    miraIntro: 'EMERGENCY ALERT: Multiple crises have erupted simultaneously across Gir during a scorching heatwave! Put everything you\'ve learned into action to save the sanctuary!',
    stages: [
      {
        id: 'stage-1',
        alert: '🚨 ALERT 1: Illegal Snare Detected in Eastern Buffer',
        prompt: 'Rangers discover a metallic wire snare hidden near a water pipeline. What is your immediate protocol?',
        options: [
          { text: 'Deactivate snare, deploy sniffer dog squads, sweep 5 km radius, and notify village surveillance teams.', isCorrect: true, xp: 50 },
          { text: 'Leave the trap in place to see if a poacher comes back next week.', isCorrect: false, xp: 0 },
          { text: 'Burn down the surrounding scrubland to destroy other traps.', isCorrect: false, xp: 0 }
        ]
      },
      {
        id: 'stage-2',
        alert: '💧 ALERT 2: Severe Drought at Kamleshwar Feeder Ponds',
        prompt: 'Three critical waterholes have dried up completely. How do you replenish them with minimal habitat disturbance?',
        options: [
          { text: 'Operate solar-powered deep borewell pumps feeding natural stone cisterns during pre-dawn hours.', isCorrect: true, xp: 50 },
          { text: 'Drive noisy diesel fuel tankers into the ponds every 2 hours during peak afternoon heat.', isCorrect: false, xp: 0 },
          { text: 'Divert sewage water from nearby highways into the forest.', isCorrect: false, xp: 0 }
        ]
      },
      {
        id: 'stage-3',
        alert: '🚂 ALERT 3: Lion Pride Dispersing Across Rail Track Corridor',
        prompt: 'A young bachelor coalition of 3 lions is approaching the Pipavav railway goods corridor at night. What is your intervention?',
        options: [
          { text: 'Trigger the automated Optical/Thermal AI camera alerts, enforce 20 km/h train speed limit, and guide lions via underpass.', isCorrect: true, xp: 50 },
          { text: 'Fire loud firecrackers directly at the lions to panic them.', isCorrect: false, xp: 0 },
          { text: 'Speed up trains so they pass before the lions cross.', isCorrect: false, xp: 0 }
        ]
      },
      {
        id: 'stage-4',
        alert: '🌾 ALERT 4: Village Cattle Shed Coexistence Check',
        prompt: 'A Maldhari herder alerts you via the mobile wildlife app that lion pawprints (pugmarks) were seen 200m from his livestock enclosure.',
        options: [
          { text: 'Verify chain-link gate lock, activate flashing blue LED predator repellers, and deploy night patrol.', isCorrect: true, xp: 50 },
          { text: 'Tell the farmer to abandon his cows and run away immediately.', isCorrect: false, xp: 0 },
          { text: 'Trap the lion and deport it to another state without health checks.', isCorrect: false, xp: 0 }
        ]
      }
    ]
  },

  badges: [
    {
      id: 'badge-guardian-gir',
      name: 'GUARDIAN OF GIR',
      tier: 'Legendary',
      icon: '🦁',
      description: 'Mastered biodiversity, forest navigation, food web balance, and community coexistence in Gir National Park.',
      requirement: 'Complete all 4 missions and the Final Guardian Test.'
    },
    {
      id: 'badge-wildlife-detective',
      name: 'WILDLIFE DETECTIVE',
      tier: 'Gold',
      icon: '🔍',
      description: 'Identified Gir\'s keystone species with maximum clue efficiency.',
      requirement: 'Score 80%+ in Mission 1'
    },
    {
      id: 'badge-master-ranger',
      name: 'MASTER RANGER',
      tier: 'Gold',
      icon: '🧭',
      description: 'Executed low-disturbance navigation across core sanctuary zones.',
      requirement: 'Score 90%+ in Mission 2'
    },
    {
      id: 'badge-ecosystem-builder',
      name: 'ECOSYSTEM ARCHITECT',
      tier: 'Gold',
      icon: '🌿',
      description: 'Perfectly assembled the trophic food web and solved the cascade dilemma.',
      requirement: 'Score 100% in Mission 3'
    },
    {
      id: 'badge-coexistence-leader',
      name: 'COEXISTENCE LEADER',
      tier: 'Gold',
      icon: '🤝',
      description: 'Championed community-based sustainable wildlife coexistence.',
      requirement: 'Select the optimal policy in Mission 4'
    }
  ]
};
