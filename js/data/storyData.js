// js/data/storyData.js - Structured, verified Gujarat cultural storytelling datasets

export const GUJARAT_STORIES = {
  'kutch': {
    id: 'kutch-story',
    locationId: 'kutch',
    title: 'The Moonlit Salt Desert & The Castor Oil Tapestry',
    subtitle: 'Great Rann of Kutch • Nirona Village Crafts',
    estimatedTime: '3 min experience',
    themeColor: '#F59E0B',
    xpReward: 100,
    slides: [
      {
        slideIndex: 1,
        title: 'The Silver Desert of the Full Moon',
        sceneTag: 'GEOGRAPHY & NATURE',
        narration: 'Every winter, the Arabian Sea waters recede from the shallow lowlands of Kutch under the blazing sun. As the water evaporates, it deposits a thick, crystalline mineral crust, transforming over 7,500 square kilometers into an endless sea of pure white salt that glows silver under the full moon during the festive Rann Utsav.',
        miraDialogue: 'Kem Cho! When you walk on the White Rann at night, the salt crunches beneath your boots like freshly fallen snow, and the moon reflects so brightly you do not even need a lantern!',
        audioPronunciation: 'Rann Utsav (Run Oot-sav)',
        inspectable: {
          icon: '🧂',
          label: 'Crystalline Salt Crust',
          detail: 'Mineral-rich evaporite crust up to 3 feet thick that forms annually after the monsoon floods subside.'
        },
        didYouKnow: {
          question: 'Why was Kutch historically an island thousands of years ago?',
          answer: 'Geologists have proven that the Rann of Kutch was once a navigable arm of the Arabian Sea until tectonic shifts and river sedimentation landlocked it into a seasonal salt marsh!'
        }
      },
      {
        slideIndex: 2,
        title: 'The 300-Year-Old Mystery of Rogan Art',
        sceneTag: 'LIVING HERITAGE & CRAFT',
        narration: 'In the quiet village of Nirona, master artisans practice Rogan art—a craft derived from the Persian word for oil. Castor seed oil is boiled for over twelve hours until it thickens into a golden, pliable jelly. Artisans blend this paste with natural stone and earth pigments to create vibrant, elastic paint.',
        miraDialogue: 'Here is the most astonishing part: the artist holds a lump of colored paste in one palm and uses a 6-inch blunt metal rod to spin fine paint threads in the air without the metal stylus EVER touching the fabric directly!',
        audioPronunciation: 'Rogan (Ro-gun) Art of Nirona',
        inspectable: {
          icon: '🖌️',
          label: 'Castor Oil & Metal Stylus',
          detail: 'Boiled castor oil paste spun into micro-threads in the air, creating the famous "Tree of Life" motif.'
        },
        didYouKnow: {
          question: 'How many families in India preserve the original Rogan painting technique today?',
          answer: 'Only one single family—the Khatri family of Nirona village—carries forward this ancestral craft, passing the secrets down through eight continuous generations!'
        }
      },
      {
        slideIndex: 3,
        title: 'The Symmetrical Fabric Fold',
        sceneTag: 'MASTER ARTISAN TECHNIQUE',
        narration: 'Once a master paints half of an intricate floral motif like the "Tree of Life" on dark silk or cotton, the fabric is carefully folded down the center and pressed firmly. The wet castor oil paint transfers onto the opposite side with millimeter precision, creating a flawless mirror-image masterpiece.',
        miraDialogue: 'Because of this mirror fold technique, Rogan tapestries are completely symmetrical. Prime Minister Narendra Modi famously gifted a handcrafted Nirona Rogan "Tree of Life" tapestry to US President Barack Obama during his state visit!',
        audioPronunciation: 'Tree of Life (Jeevan Vruksh)',
        inspectable: {
          icon: '🌳',
          label: 'Tree of Life Tapestry',
          detail: 'Symbolizes eternal nature, resilience, and Kutchi folklore, recognized globally as an Indian cultural treasure.'
        },
        didYouKnow: {
          question: 'How long does it take to paint a single master Rogan tapestry?',
          answer: 'A complex bridal or royal Rogan piece can take up to six months of painstaking handwork, thread by delicate thread!'
        }
      }
    ],
    interactiveChallenge: {
      title: 'Artisan Apprentice Dilemma',
      context: 'You are visiting master artisan Abdul Gafur Khatri\'s workshop in Nirona village. A traveler wants to learn how to prepare authentic Rogan paint.',
      miraPrompt: 'Think back to what we discovered about the ancestral oil-boiling technique! What is the primary natural base used in authentic Rogan art?',
      question: 'Which natural ingredient is boiled for over twelve hours to produce the elastic paint paste for traditional Rogan art?',
      options: [
        {
          id: 'opt-a',
          text: 'Mustard seed oil mixed with crushed limestone',
          isCorrect: false,
          feedback: 'Incorrect. Mustard oil is widely used in cooking, but it lacks the sticky viscosity needed to spin airborne paint threads.',
          culturalInsight: 'Mustard oil does not thicken into an elastic paste when boiled.'
        },
        {
          id: 'opt-b',
          text: 'Castor seed oil boiled and mixed with natural earth pigments',
          isCorrect: true,
          feedback: 'Correct! Castor oil is boiled for 12+ hours until it transforms into a pliable, gummy residue, then colored with earth pigments.',
          culturalInsight: 'Gujarat is India\'s largest producer of castor crops, making this an authentic local craft innovation.'
        },
        {
          id: 'opt-c',
          text: 'Tree resin mixed with powdered sea salt',
          isCorrect: false,
          feedback: 'Incorrect. While salt is abundant in Kutch, salt crystals would make the paint grainy and brittle.',
          culturalInsight: 'Rogan paint must remain ultra-smooth and pliable.'
        },
        {
          id: 'opt-d',
          text: 'Crushed coconut water and beeswax',
          isCorrect: false,
          feedback: 'Incorrect. Beeswax melts easily under Gujarat\'s desert heat and cannot produce elastic paint threads.',
          culturalInsight: 'Castor oil withstands high desert temperatures without melting.'
        }
      ],
      bonusTrivia: 'Rogan art was historically used to embellish bridal ghagras and bedspreads for semi-nomadic Kutchi pastoral tribes.'
    }
  },

  'gir-saurashtra': {
    id: 'gir-story',
    locationId: 'gir-saurashtra',
    title: 'The Lion\'s Sanctuary & The Maldhari Guardians',
    subtitle: 'Gir National Park • Saurashtra Coast',
    estimatedTime: '3 min experience',
    themeColor: '#10B981',
    xpReward: 100,
    slides: [
      {
        slideIndex: 1,
        title: 'The Last Roar of the Asiatic Lion',
        sceneTag: 'WILDLIFE CONSERVATION',
        narration: 'Gir National Park and Wildlife Sanctuary is the only place on Earth where the Asiatic Lion (Panthera leo persica) exists in the wild. Once roaming from Greece across the Middle East to Eastern India, uncontrolled hunting reduced their global population to barely twenty individuals by the early 1900s before strict royal protection reversed their extinction.',
        miraDialogue: 'Aavo Padharo to the realm of the lion! Unlike their African cousins, Asiatic lions have shorter, darker manes that leave their ears exposed, and a distinctive longitudinal fold of loose skin running along their bellies!',
        audioPronunciation: 'Gir (Geer) Forest Sanctuary',
        inspectable: {
          icon: '🦁',
          label: 'Asiatic Lion Belly Fold',
          detail: 'Unique anatomical skin fold found on 100% of pure Asiatic lions, distinguishing them from African lions.'
        },
        didYouKnow: {
          question: 'Who first declared Gir Forest a protected sanctuary for the last remaining lions?',
          answer: 'The Nawab of Junagadh, Lord Curzon\'s urging, and local conservationists banned lion hunting in the early 1900s, saving the entire species from total extinction!'
        }
      },
      {
        slideIndex: 2,
        title: 'The Maldharis: Coexistence with Predators',
        sceneTag: 'INDIGENOUS HARMONY',
        narration: 'Inside the dense teak and acacia forests of Gir live the Maldharis—a traditional pastoral community whose name translates to "keepers of cattle wealth" (Mal = livestock, Dhari = keeper). For centuries, the Maldharis have grazed their prized Jafrabadi buffaloes inside the core forest, living without fences in circular mud settlements called Nesses.',
        miraDialogue: 'The Maldhari relationship with lions is legendary. When a lion hunts a cow or buffalo, the Maldharis view it as a sacred tax paid to the King of the Forest for sharing his land, peacefully coexisting without retaliation!',
        audioPronunciation: 'Maldhari (Maal-dhah-ree) Pastoralists',
        inspectable: {
          icon: '🛖',
          label: 'Maldhari Ness Settlement',
          detail: 'Traditional circular thatched dwellings built from local timber and mud, coexisting peacefully inside lion territory.'
        },
        didYouKnow: {
          question: 'What prized breed of livestock is native to the Saurashtra and Gir region?',
          answer: 'The massive Jafrabadi Buffalo, famous for its high-fat milk used to produce rich Saurashtra ghee and sweet mawa!'
        }
      },
      {
        slideIndex: 3,
        title: 'The Eternal Shrines of Saurashtra',
        sceneTag: 'ANCIENT HERITAGE',
        narration: 'Just south of the Gir Forest along the Arabian Sea stands the sacred Somnath Temple—revered as the first of the twelve holy Jyotirlinga shrines of Lord Shiva. Plundered and rebuilt numerous times across centuries, the temple represents the indestructible resilience of Indian cultural heritage.',
        miraDialogue: 'Look at the ancient arrow pillar (Baan Stambh) standing on the Somnath shore: an inscription states that there is not a single piece of land between Somnath and Antarctica in a straight sea line!',
        audioPronunciation: 'Somnath (Some-naath) Jyotirlinga',
        inspectable: {
          icon: '🛕',
          label: 'Baan Stambh (Arrow Pillar)',
          detail: 'Ancient coastal pillar marking an uninterrupted maritime straight line from the coast of Somnath to the South Pole (Antarctica).'
        },
        didYouKnow: {
          question: 'What does the name "Somnath" literally translate to?',
          answer: '"The Protector of the Moon God" — according to ancient lore, Lord Shiva cured the Moon God Chandra of an ancient curse at this sacred coast!'
        }
      }
    ],
    interactiveChallenge: {
      title: 'Wildlife Ranger Field Assessment',
      context: 'You are accompanying a forest ranger and a Maldhari elder on an early morning foot patrol through the dry deciduous scrub of Sasan Gir.',
      miraPrompt: 'A junior ranger asks you how to visually identify an Asiatic lion from an African lion in the field. What is the key anatomical feature?',
      question: 'Which anatomical feature is unique to the Asiatic Lion and never found on African lions?',
      options: [
        {
          id: 'opt-a',
          text: 'Distinct black stripes along the flank and tail',
          isCorrect: false,
          feedback: 'Incorrect. Lions do not possess stripes—stripes are characteristic of tigers.',
          culturalInsight: 'Lions have solid coats without stripes.'
        },
        {
          id: 'opt-b',
          text: 'A longitudinal fold of loose skin running along the belly',
          isCorrect: true,
          feedback: 'Correct! The longitudinal belly skin fold is the most prominent visual identifier present on all Asiatic lions.',
          culturalInsight: 'They also feature shorter manes that leave their ears clearly visible.'
        },
        {
          id: 'opt-c',
          text: 'Webbed paws adapted for swimming in rivers',
          isCorrect: false,
          feedback: 'Incorrect. Asiatic lions live in dry scrub forests and do not have webbed paws.',
          culturalInsight: 'Gir is an arid and rocky dry-deciduous ecosystem.'
        },
        {
          id: 'opt-d',
          text: 'A brightly colored blue mane in adult males',
          isCorrect: false,
          feedback: 'Incorrect. Lion manes range from tawny gold to dark brown and black.',
          culturalInsight: 'No mammals have blue pigment in their fur.'
        }
      ],
      bonusTrivia: 'Thanks to intense community conservation by the Gujarat Forest Department and Maldhari locals, the Asiatic lion population in Gir has grown to over 670 individuals!'
    }
  },

  'ahmedabad-central': {
    id: 'ahmedabad-story',
    locationId: 'ahmedabad-central',
    title: 'The Spinning Wheel of Freedom & The Ancient Pols',
    subtitle: 'Ahmedabad UNESCO World Heritage City • Sabarmati River',
    estimatedTime: '3 min experience',
    themeColor: '#3B82F6',
    xpReward: 100,
    slides: [
      {
        slideIndex: 1,
        title: 'Cradle of the Satyagraha Movement',
        sceneTag: 'FREEDOM STRUGGLE & HERITAGE',
        narration: 'Established in 1917 by Mahatma Gandhi on the quiet eastern banks of the Sabarmati River, Sabarmati Ashram (also known as Harijan Ashram) served as the epicenter of India’s non-violent freedom struggle. It was from his humble cottage, Hriday Kunj, that Gandhi directed national campaigns of civil disobedience, self-reliance, and communal harmony.',
        miraDialogue: 'On March 12, 1930, Mahatma Gandhi marched out of this ashram with 78 devoted satyagrahis on the historic 384-kilometer Dandi March to produce salt from the sea, sparking a nationwide peaceful revolution!',
        audioPronunciation: 'Hriday Kunj (Hree-dye Koonj)',
        inspectable: {
          icon: '🕊️',
          label: 'The Sabarmati Charkha',
          detail: 'Wooden spinning wheel used by Gandhi to spin Khadi yarn, representing economic self-reliance and peace.'
        },
        didYouKnow: {
          question: 'What solemn vow did Mahatma Gandhi make when leaving Sabarmati Ashram for the Dandi Salt March?',
          answer: 'He swore he would not return to live at the ashram until India had won complete independence (Swaraj) from colonial rule!'
        }
      },
      {
        slideIndex: 2,
        title: 'The Historic Wooden Pols of Ahmedabad',
        sceneTag: 'UNESCO ARCHITECTURE',
        narration: 'In 2017, Ahmedabad became India\'s first city to be inscribed as a UNESCO World Heritage City. The Old City is famed for its "Pols"—dense, self-contained residential clusters characterized by intricately carved wooden facades, hidden underground water-harvesting cisterns (tankas), and secret escape passages.',
        miraDialogue: 'Every Pol center features a tall, intricately carved wooden bird feeder called a "Chabutra", showing the community\'s deep reverence for wildlife and urban biodiversity!',
        audioPronunciation: 'Pols (Pohls) of Ahmedabad',
        inspectable: {
          icon: '🏘️',
          label: 'Carved Chabutra (Bird Feeder)',
          detail: 'Multi-tiered wooden micro-towers designed to feed pigeons and parrots in the heart of community squares.'
        },
        didYouKnow: {
          question: 'How were traditional Pol houses cooled before modern electricity?',
          answer: 'Houses were designed with central open-to-sky courtyards (chowks) and underground rainwater cisterns that created natural evaporative cooling drafts!'
        }
      },
      {
        slideIndex: 3,
        title: 'The Art of the Gujarati Thali',
        sceneTag: 'CULINARY PHILOSOPHY',
        narration: 'Ahmedabad\'s culinary culture represents one of the most sophisticated vegetarian traditions in the world. A traditional Gujarati Thali is engineered around the Ayurvedic principle of the "Shad Rasa"—balancing all six tastes: sweet (madhura), salty (lavana), sour (amla), pungent (katu), bitter (tikta), and astringent (kashaya) on a single brass platter.',
        miraDialogue: 'From spongy steamed Dhokla and delicate rolled Khandvi to sweet and spicy Undhiyu cooked with winter vegetables, Gujarati cuisine is designed to nourish both body and spirit!',
        audioPronunciation: 'Shad Rasa (Shud Ruh-suh)',
        inspectable: {
          icon: '🍲',
          label: 'Traditional Brass Thali',
          detail: 'Concentric culinary arrangement featuring 5-course balanced Ayurvedic flavor profiles.'
        },
        didYouKnow: {
          question: 'Why do many authentic Gujarati savory dishes include a subtle pinch of jaggery or sugar?',
          answer: 'Traditional Gujarati gastronomy uses natural jaggery to aid digestion in hot, arid climates and create the signature sweet-and-savory flavor harmony!'
        }
      }
    ],
    interactiveChallenge: {
      title: 'Heritage Historian Quiz',
      context: 'You are guiding a group of international heritage architecture students through the Old City of Ahmedabad.',
      miraPrompt: 'A student asks what legendary historic event began directly on the grounds of Sabarmati Ashram in March 1930.',
      question: 'Which historic non-violent march against colonial taxation began at Sabarmati Ashram on March 12, 1930?',
      options: [
        {
          id: 'opt-a',
          text: 'The Dandi Salt March (Salt Satyagraha)',
          isCorrect: true,
          feedback: 'Correct! Mahatma Gandhi led 78 followers on a 384 km march from Sabarmati Ashram to coastal Dandi to produce salt from seawater.',
          culturalInsight: 'This marked a turning point in India\'s freedom struggle, capturing worldwide attention.'
        },
        {
          id: 'opt-b',
          text: 'The Bardoli Farmers Revolt',
          isCorrect: false,
          feedback: 'Incorrect. The 1928 Bardoli Satyagraha was led by Sardar Vallabhbhai Patel in Surat district.',
          culturalInsight: 'Bardoli earned Sardar Patel his title of "Sardar" (Chief).'
        },
        {
          id: 'opt-c',
          text: 'The Champaran Indigo Movement',
          isCorrect: false,
          feedback: 'Incorrect. Champaran occurred in Bihar in 1917, supporting oppressed indigo farmers.',
          culturalInsight: 'Champaran was Gandhi\'s first major Satyagraha in India.'
        },
        {
          id: 'opt-d',
          text: 'The Quit India Movement March',
          isCorrect: false,
          feedback: 'Incorrect. The Quit India movement was launched in August 1942 in Bombay (Gowalia Tank Maidan).',
          culturalInsight: 'Quit India took place twelve years after the Dandi March.'
        }
      ],
      bonusTrivia: 'Sabarmati Ashram remains preserved exactly as it was, with Gandhi\'s charkha, writing desk, and round spectacles on display.'
    }
  },

  'patan-north': {
    id: 'patan-story',
    locationId: 'patan-north',
    title: 'The Queen\'s Inverted Stepwell & Royal Silk Alchemy',
    subtitle: 'Patan Medieval Capital • Saraswati River Basin',
    estimatedTime: '3 min experience',
    themeColor: '#EC4899',
    xpReward: 100,
    slides: [
      {
        slideIndex: 1,
        title: 'The Inverted Subterranean Temple',
        sceneTag: 'UNESCO ARCHITECTURAL MARVEL',
        narration: 'Commissioned in 1063 CE by Queen Udayamati in memory of King Bhima I of the Chaulukya (Solanki) Dynasty, Rani ki Vav (The Queen\'s Stepwell) is a monumental engineering masterpiece. Designed as an "inverted temple" descending seven levels underground into the mother aquifer, it honors the sacred sanctity of water in an arid land.',
        miraDialogue: 'Step down its grand carved corridors: the walls are adorned with over 500 major sculptures and 1,000 minor religious bas-reliefs depicting the Dashavatara (ten incarnations) of Lord Vishnu!',
        audioPronunciation: 'Rani ki Vav (Rah-nee kee Vaav)',
        inspectable: {
          icon: '🪜',
          label: '7-Level Subterranean Silt Vault',
          detail: 'Descending stepwell preserved underground in river silt for over 700 years until scientific excavation in the 1980s.'
        },
        didYouKnow: {
          question: 'Where can you find a miniature illustration of Rani ki Vav in everyday Indian life today?',
          answer: 'On the reverse side of the official lavender ₹100 Indian Rupee currency banknote issued by the Reserve Bank of India!'
        }
      },
      {
        slideIndex: 2,
        title: 'The Double-Ikkat Patola Silk Alchemy',
        sceneTag: 'ROYAL GUILD TEXTILE',
        narration: 'Patan is the legendary birthplace of "Double-Ikkat Patola"—widely considered the pinnacle of handloom silk weaving worldwide. In double-ikkat weaving, both the vertical warp threads and the horizontal weft threads are individually dyed according to mathematical design grids BEFORE being loaded onto the loom.',
        miraDialogue: 'This means that when the master weaver throws the shuttle, the dyed warp and weft meet with sub-millimeter precision. Both sides of an authentic Patola saree are 100% identical in color and pattern—there is no wrong side!',
        audioPronunciation: 'Patola (Puh-toh-lah) Silk of Patan',
        inspectable: {
          icon: '🧵',
          label: 'Double-Ikkat Silk Warp & Weft',
          detail: 'Pure mulberry silk threads tie-dyed with natural madder, turmeric, and indigo taking up to 6 months per saree.'
        },
        didYouKnow: {
          question: 'What famous Gujarati proverb celebrates the immortal durability of Patan Patola sarees?',
          answer: '"Padi Patole Bhaat, Faate Pan Fitey Nahi" — The cloth may wear out after 300 years, but the design and colors will never fade!'
        }
      },
      {
        slideIndex: 3,
        title: 'The Modhera Sun Temple Geometry',
        sceneTag: 'SOLAR ALIGNMENT & ARCHITECTURE',
        narration: 'Just south of Patan lies the breathtaking Sun Temple of Modhera, built in 1026 CE by King Bhimdev I. The temple is calibrated with astonishing astronomical precision: on the days of the vernal and autumnal equinoxes, the very first rays of the rising sun pass directly through the carved pillars to illuminate the golden idol in the inner sanctum.',
        miraDialogue: 'In front of the temple sits the grand Surya Kund stepwell, studded with 108 miniature shrines dedicated to planetary deities, creating a mesmerizing geometric stepped amphitheater!',
        audioPronunciation: 'Surya Kund (Soor-yah Koond)',
        inspectable: {
          icon: '☀️',
          label: 'Modhera Equinox Alignment',
          detail: 'Astronomical solar architecture designed so equinox sunrise rays illuminate the inner sanctum.'
        },
        didYouKnow: {
          question: 'What modern milestone makes Modhera village famous across India today?',
          answer: 'Modhera was declared India\'s first 24x7 solar-powered village in 2022, continuing its millennium-old heritage of honoring the Sun!'
        }
      }
    ],
    interactiveChallenge: {
      title: 'Master Weaver & Numismatic Challenge',
      context: 'You are examining an authentic piece of double-ikkat Patola silk alongside an Indian banknote.',
      miraPrompt: 'A collector asks you what makes double-ikkat Patola unique compared to standard printed textiles.',
      question: 'What makes authentic Patan Double-Ikkat Patola silk universally celebrated by textile scholars?',
      options: [
        {
          id: 'opt-a',
          text: 'It is made by painting hot wax directly onto finished cloth',
          isCorrect: false,
          feedback: 'Incorrect. Wax resist painting is batik, not double-ikkat.',
          culturalInsight: 'Batik is an Indonesian and Coromandel wax technique.'
        },
        {
          id: 'opt-b',
          text: 'Both warp and weft threads are tie-dyed before weaving, creating identical front and back designs',
          isCorrect: true,
          feedback: 'Correct! Both warp and weft silk yarns are mathematically tie-dyed before weaving, resulting in a flawless double-faced weave that never fades.',
          culturalInsight: 'It can take two master weavers up to six months to complete a single Patola saree.'
        },
        {
          id: 'opt-c',
          text: 'It is machine-embroidered using synthetic polyester threads',
          isCorrect: false,
          feedback: 'Incorrect. Authentic Patan Patola is 100% handwoven using pure natural mulberry silk and botanical dyes.',
          culturalInsight: 'The Salvi master weaver family guards this handloom heritage.'
        },
        {
          id: 'opt-d',
          text: 'It dissolves completely in water after one single wash',
          isCorrect: false,
          feedback: 'Incorrect. Patola sarees are legendary for lasting centuries as family heirlooms passed down generations.',
          culturalInsight: 'The colors remain vibrant for over 300 years.'
        }
      ],
      bonusTrivia: 'Rani ki Vav was submerged in silt for nearly seven centuries, which perfectly protected its 500+ intricate sculptures from weathering!'
    }
  }
};

// Helper methods for clean querying and dynamic story expansion
export function getStoryByLocationId(locationId) {
  return GUJARAT_STORIES[locationId] || null;
}

export function getAllStories() {
  return Object.values(GUJARAT_STORIES);
}

export function registerStory(storyData) {
  if (!storyData.locationId) {
    console.error('Story must have a locationId');
    return false;
  }
  GUJARAT_STORIES[storyData.locationId] = storyData;
  return true;
}
