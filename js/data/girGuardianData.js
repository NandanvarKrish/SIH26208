// js/data/girGuardianData.js - Game data for "GIR GUARDIAN" adventure module

export const GIR_GUARDIAN_DATA = {
  metadata: {
    id: 'gir-guardian',
    locationId: 'gir-saurashtra',
    locationName: 'Gir National Park & Sanctuary',
    stateName: 'Gujarat',
    title: 'GIR GUARDIAN',
    subtitle: 'Protect the ecosystem. Understand the wild. Become a Guardian.',
    habitat: 'Dry Deciduous Teak Forest & Savanna Scrublands',
    totalMissions: 3,
    totalDiscoveries: 6,
    maxXP: 250
  },

  intro: {
    heading: 'GIR GUARDIAN',
    tagline: 'Sanctuary of the Last Wild Asiatic Lions',
    description: 'Enter the heart of Gir Forest—1,412 km² of rugged teak canopy, rocky ravines, and perennial streams. Step into the boots of a Guardian trainee to track wildlife, resolve environmental crises, and safeguard the king of Asia.',
    miraDialogue: 'Welcome to Gir! Today you are not just a visitor—you are becoming a Guardian of the forest. Stay alert, observe the clues, and remember: every decision shapes the ecosystem.',
    stats: [
      { label: 'Wild Lions', value: '674+' },
      { label: 'Protected Area', value: '1,412 km²' },
      { label: 'Avian Species', value: '300+' },
      { label: 'Coexistence', value: 'Centuries' }
    ]
  },

  // 6 UNLOCKABLE FIELD DISCOVERIES
  discoveries: {
    'disc-lion': {
      id: 'disc-lion',
      title: 'ASIATIC LION',
      scientific: 'Panthera leo persica',
      category: 'WILDLIFE OF GIR',
      icon: '🦁',
      rarity: 'Legendary Apex',
      insight: 'The Asiatic lion has a distinctive longitudinal belly skin fold and a shorter mane than African lions. Gir is the only natural wild habitat for this subspecies in the world.',
      xp: 50
    },
    'disc-chital': {
      id: 'disc-chital',
      title: 'CHITAL (SPOTTED DEER)',
      scientific: 'Axis axis',
      category: 'KEYSTONE HERBIVORE',
      icon: '🦌',
      rarity: 'Essential Prey',
      insight: 'Chital deer retain permanent white spots throughout adulthood and form the primary natural prey (over 70%) sustaining Gir\'s predator populations.',
      xp: 40
    },
    'disc-teak': {
      id: 'disc-teak',
      title: 'DRY DECIDUOUS TEAK FOREST',
      scientific: 'Tectona grandis',
      category: 'HABITAT & FLORA',
      icon: '🌿',
      rarity: 'Canopy Foundation',
      insight: 'Teak trees shed their broad leaves in winter to conserve water, creating open sightlines and rich nutrient mulch on the rocky forest floor.',
      xp: 30
    },
    'disc-waterhole': {
      id: 'disc-waterhole',
      title: 'KAMLESHWAR WATER BASIN',
      scientific: 'Hiran River Drainage',
      category: 'HYDROLOGY & SANCTUARY',
      icon: '💧',
      rarity: 'Life Support Nexus',
      insight: 'Kamleshwar Dam is celebrated as the water lifeline of Gir, hosting one of India\'s largest wild populations of marsh Mugger crocodiles.',
      xp: 50
    },
    'disc-maldhari': {
      id: 'disc-maldhari',
      title: 'MALDHARI COEXISTENCE TRADITION',
      scientific: 'Pastoral Stewardship',
      category: 'COMMUNITY CONSERVATION',
      icon: '🤝',
      rarity: 'Living Heritage',
      insight: 'The indigenous Maldhari pastoralists have lived inside Gir\'s forest settlements (nesses) for centuries, sharing watering paths and territory with lions without conflict.',
      xp: 40
    },
    'disc-pride': {
      id: 'disc-pride',
      title: 'MATERNAL PRIDE TERRITORY',
      scientific: 'Social Carnivore Ecology',
      category: 'BEHAVIORAL ECOLOGY',
      icon: '👑',
      rarity: 'Sanctuary Core',
      insight: 'Asiatic lionesses form close-knit sisterhoods that cooperatively nurse cubs and hunt, maintaining home ranges near shaded ravines with reliable water.',
      xp: 50
    }
  },

  // MISSION 1: “THE SILENT TRAIL”
  mission1: {
    id: 'mission-1',
    number: 1,
    title: 'The Silent Trail',
    theme: 'Wildlife Tracking & Environmental Observation',
    xpReward: 50,
    miraBrief: 'Something moved through this sector just before dawn. Let\'s inspect the environmental clues left on the trail before drawing a conclusion.',
    steps: [
      {
        stepNum: 1,
        title: 'Approach the Trail',
        narration: 'You arrive at a shaded bend in the Hiran dry riverbed. Fresh indentations and disturbed dust lead toward a rocky teak outcrop.',
        miraDialogue: 'Look closely at the substrate. The forest floor always tells a story if you know how to read it.',
        prompt: 'Examine the ground for primary tracking signs.'
      },
      {
        stepNum: 2,
        title: 'Investigate Environmental Clues',
        narration: 'Multiple subtle clues are visible across the clearing:',
        clues: [
          {
            id: 'clue-paw',
            icon: '🐾',
            label: 'Fresh Pugmark in Silt',
            detail: 'Large, rounded four-toed footprint measuring 14 cm across with NO visible claw marks (claws are fully retracted during walking).'
          },
          {
            id: 'clue-bark',
            icon: '🌲',
            label: 'Teak Bark Scratchings',
            detail: 'Deep vertical territorial claw grooves etched 1.8 meters high on the trunk of a mature teak tree, mixed with stray golden-tawny hair follicles.'
          },
          {
            id: 'clue-audio',
            icon: '🔊',
            label: 'Low-Frequency Resonance',
            detail: 'A deep, guttural territorial grumble echoing across the ravine at 18 Hz, audible up to 5 kilometers away.'
          },
          {
            id: 'clue-prey',
            icon: '🦌',
            label: 'Chital Alarm Call (Bark)',
            detail: 'Northern Plains Gray Langurs in the canopy give repetitive high-pitched staccato alarms looking downward toward the rocky ledge.'
          }
        ]
      },
      {
        stepNum: 3,
        title: 'Identify the Wildlife Specimen',
        question: 'Based on the retracted claw pugmarks, tree scent-marking height, and langur alarm calls, which keystone species passed here?',
        options: [
          {
            id: 'opt-lion',
            name: 'Asiatic Lion (Panthera leo persica)',
            icon: '🦁',
            isCorrect: true,
            feedback: 'Spot on! The rounded retracted-claw pugmark, 1.8m scratch height, and guttural territorial roar definitively identify the Asiatic Lion.'
          },
          {
            id: 'opt-hyena',
            name: 'Striped Hyena (Hyaena hyaena)',
            icon: '🐺',
            isCorrect: false,
            feedback: 'Hyena pugmarks always show prominent non-retractile blunt claws and sloping rear paws, unlike big cats.'
          },
          {
            id: 'opt-boar',
            name: 'Indian Wild Boar (Sus scrofa)',
            icon: '🐗',
            isCorrect: false,
            feedback: 'Wild boars leave distinct two-toed cloven hoof prints with small dewclaws behind.'
          }
        ]
      }
    ],
    discoveryId: 'disc-lion'
  },

  // MISSION 2: “WATER OF LIFE”
  mission2: {
    id: 'mission-2',
    number: 2,
    title: 'Water of Life',
    theme: 'Conservation Decision & Hydrological Balance',
    xpReward: 60,
    miraBrief: 'A severe pre-monsoon heatwave has depleted the Kamleshwar feeder waterholes. Herbivores and predators are crowding into shrinking muddy pools. You are the Guardian—how will we resolve this?',
    steps: [
      {
        stepNum: 1,
        title: 'Inspect the Water Crisis',
        narration: 'At the southern sector waterhole, water levels have dropped below 15%. Over 40 deer, two leopards, and a lion coalition rely on this single source.',
        clues: [
          {
            icon: '📉',
            label: 'Water Gauge: 12% Capacity',
            detail: 'Waterhole is drying fast under 42°C May sun, creating stagnation and high bacteria risk.'
          },
          {
            icon: '🐾',
            label: 'Crowded Predator-Prey Convergence',
            detail: 'Prey animals are hesitant to drink due to zero vegetative cover around the receding waterline.'
          },
          {
            icon: '☀️',
            label: 'Weather Station: 6 Weeks to Monsoon',
            detail: 'No rainfall forecast for at least 45 days. Immediate hydrological stabilization required.'
          }
        ]
      },
      {
        stepNum: 2,
        title: 'Guardian Conservation Decision',
        prompt: 'You are the Guardian. What strategic intervention will you implement to secure wildlife water without disrupting natural behavior?',
        decisions: [
          {
            id: 'dec-solar-cistern',
            title: 'Deploy Solar-Powered Deep Borewell Pumps into Natural Stone Cisterns (Recommended)',
            icon: '☀️',
            score: 100,
            xp: 60,
            consequence: {
              title: 'Ecosystem Stabilized & Zero Disturbance ⭐',
              text: 'Brilliant Guardian strategy! Solar pumps quietly replenish shaded stone cisterns during dawn hours without engine noise. Deer and lions drink at safe staggered intervals, preventing disease and heatstroke.',
              ecologicalLesson: 'Quiet, automated water replenishment preserves natural territorial spacing and avoids diesel tanker noise pollution in core wildlife zones.'
            },
            isBest: true
          },
          {
            id: 'dec-diesel-tanker',
            title: 'Drive Heavy Diesel Water Tankers Daily into the Core Riverbed',
            icon: '🚛',
            score: 50,
            xp: 30,
            consequence: {
              title: 'Temporary Water but High Disturbance ⚠️',
              text: 'Water is delivered, but loud diesel engine vibrations and exhaust fumes scare away sensitive breeding herds, forcing them toward unprotected farm boundaries.',
              ecologicalLesson: 'Heavy vehicular traffic inside core wildlife reserves disrupts nocturnal hunting and maternal cub care.'
            },
            isBest: false
          },
          {
            id: 'dec-do-nothing',
            title: 'Take No Action (Let Extreme Drought Take Its Natural Course)',
            icon: '⏳',
            score: 20,
            xp: 10,
            consequence: {
              title: 'Severe Dehydration & Corridor Migration ❌',
              text: 'The waterhole dries completely within a week. Desperate deer and lions abandon the sanctuary and enter nearby farming villages in search of irrigation canals.',
              ecologicalLesson: 'In fragmented modern landscapes, active water management within protected areas is critical to prevent human-wildlife conflict outside boundaries.'
            },
            isBest: false
          }
        ]
      }
    ],
    discoveryId: 'disc-waterhole'
  },

  // MISSION 3: “GUARDIAN OF THE PRIDE”
  mission3: {
    id: 'mission-3',
    number: 3,
    title: 'Guardian of the Pride',
    theme: 'Apex Predator Stewardship & Human-Wildlife Boundary Coexistence',
    xpReward: 80,
    miraBrief: 'A lioness with two 4-month-old cubs is moving toward the southern boundary corridor near an active rail line and a Maldhari village. We must guide and safeguard the pride!',
    steps: [
      {
        stepNum: 1,
        title: 'Distant Roar & Trail Tracking',
        narration: 'A maternal contact call resonates from the southern ridge. Footprints show the lioness and two cubs navigating along an old cattle path heading south.',
        miraDialogue: 'The cubs are curious and playful, but the southern perimeter has major human infrastructure. Let\'s follow their path on the sector map.'
      },
      {
        stepNum: 2,
        title: 'Assess the Perimeter Hazard',
        narration: 'You locate the pride resting under an acacia thicket 300 meters from the Pipavav railway corridor and an open village boundary.',
        hazards: [
          {
            icon: '🚂',
            title: 'Goods Train Rail Corridor (250m Ahead)',
            desc: 'Night freight trains travel at high speeds across the coastal shipping corridor.'
          },
          {
            icon: '🏡',
            title: 'Maldhari Pastoral Cattle Sheds (400m South)',
            desc: 'Pastoral cows are penned in open-top thorn enclosures (jhomplas).'
          },
          {
            icon: '🌉',
            title: 'Engineered Green Wildlife Underpass (150m West)',
            desc: 'A vegetated eco-bridge under the railway tracks designed for safe lion crossings.'
          }
        ]
      },
      {
        stepNum: 3,
        title: 'Coordinate the Guardian Protection Protocol',
        prompt: 'How will you protect the pride and maintain peaceful village coexistence tonight?',
        actions: [
          {
            id: 'act-smart-corridor',
            title: 'Trigger Railway Optical/Thermal AI Speed Limits, Activate Blue LED Shed Repellers, & Guide Pride via Underpass',
            icon: '🛡️',
            score: 100,
            xp: 80,
            consequence: {
              title: 'Master Guardian Coordination! 🏆',
              text: 'Flawless execution! Automated thermal alerts reduced train speeds to 20 km/h. Flashing blue LED deterrents kept the lioness away from village sheds, and your team safely guided the pride through the vegetated underpass back into the sanctuary core.',
              ecologicalLesson: 'Modern coexistence combines AI early-warning systems, non-lethal predator deterrents, and community trust to protect both farmers and endangered apex predators.'
            },
            isBest: true
          },
          {
            id: 'act-tranquilize',
            title: 'Immediately Dart & Tranquilize the Entire Pride for Captive Transport',
            icon: '💉',
            score: 40,
            xp: 25,
            consequence: {
              title: 'High Stress & Unnecessary Removal ⚠️',
              text: 'Darting a mother with young cubs poses high anesthetic risk. Relocating them removes an apex territory holder, allowing unhabituated wandering lions to move in.',
              ecologicalLesson: 'Chemical immobilization is a measure of last resort; non-intrusive corridor guidance is far safer for wild carnivore families.'
            },
            isBest: false
          },
          {
            id: 'act-firecrackers',
            title: 'Light Loud Firecrackers & Flashlights to Scatter the Pride',
            icon: '🎆',
            score: 30,
            xp: 15,
            consequence: {
              title: 'Panic & Cub Separation Risk ❌',
              text: 'The explosions panic the lioness. The two cubs bolt in separate directions toward the train tracks in terror before rangers can intervene.',
              ecologicalLesson: 'Explosives cause unpredictable panic in big cats and frequently cause mother-cub separations.'
            },
            isBest: false
          }
        ]
      }
    ],
    discoveryId: 'disc-pride'
  }
};
