// js/services/aiGuideService.js - Decoupled AI Guide Service with Context-Aware Mock & LLM Extensibility

import { playerState } from '../state/playerState.js';

export class AIGuideService {
  constructor() {
    this.useLiveBackend = false; // Set to true when integrating Gemini / LLM endpoint
    this.apiEndpoint = '/api/ai-guide'; // Future LLM backend endpoint
    this.chatHistory = [];
  }

  /**
   * Main dispatch method: generates an AI response based on query and game context
   * @param {string} userQuery - The player's text query
   * @param {object} context - Current active screen, location, and player stats
   * @returns {Promise<{ text: string, culturalInsight?: string, suggestedNextStep?: string }>}
   */
  async sendMessage(userQuery, context = {}) {
    const enrichedContext = this.buildContextPayload(context);

    // If configured for live LLM, dispatch to API
    if (this.useLiveBackend) {
      try {
        return await this.callLiveLLM(userQuery, enrichedContext);
      } catch (error) {
        console.warn('LLM backend unavailable, falling back to local intelligence', error);
      }
    }

    // Local Safe Mock Intelligence Engine (Realistic latency simulation)
    return new Promise((resolve) => {
      const latency = Math.floor(600 + Math.random() * 500); // 600ms - 1100ms
      setTimeout(() => {
        const response = this.evaluateMockResponse(userQuery.trim(), enrichedContext);
        this.chatHistory.push({ role: 'user', content: userQuery });
        this.chatHistory.push({ role: 'assistant', content: response.text });
        resolve(response);
      }, latency);
    });
  }

  buildContextPayload(context) {
    const state = playerState.getState();
    const stats = playerState.getGujaratCompletionStats();

    return {
      currentScreen: context.currentScreen || 'gujarat-map',
      locationId: context.locationId || state.selectedGujaratLocationId || 'kutch',
      playerName: state.name || 'Yatri',
      playerLevel: state.level || 1,
      totalXP: state.totalXP || 0,
      score: state.score || 0,
      completionPercentage: stats.overallPercentage || 0,
      completedStories: state.completedStories || [],
      completedLocations: state.completedLocations || [],
      unlockedItemsCount: state.unlockedItems ? state.unlockedItems.length : 0
    };
  }

  // Extensible Hook: Real LLM / Gemini API Integration
  async callLiveLLM(query, context) {
    const response = await fetch(this.apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: this.chatHistory.concat([{ role: 'user', content: query }]),
        context: context,
        systemInstruction: `You are Mira, the royal cultural exploration guide for BharatVerse. Guide the player warmly through Gujarat's verified history, artisans, wildlife, and architecture. Keep responses concise, inspiring, and culturally authentic.`
      })
    });
    if (!response.ok) throw new Error(`AI API error: ${response.statusText}`);
    return await response.json();
  }

  // Safe Mock Knowledge Base & Intent Classifier
  evaluateMockResponse(query, ctx) {
    const q = query.toLowerCase();
    const loc = ctx.locationId;

    // 1. "What can I learn here?"
    if (q.includes('what can i learn') || q.includes('what to learn') || q.includes('learn here')) {
      return this.getLearnHereResponse(loc, ctx);
    }

    // 2. "Tell me about this place"
    if (q.includes('tell me about') || q.includes('about this place') || q.includes('where are we')) {
      return this.getAboutPlaceResponse(loc, ctx);
    }

    // 3. "Why is this important?"
    if (q.includes('why is this important') || q.includes('importance') || q.includes('significance')) {
      return this.getImportanceResponse(loc, ctx);
    }

    // 4. "What should I explore next?"
    if (q.includes('explore next') || q.includes('what next') || q.includes('recommendation') || q.includes('where next')) {
      return this.getExploreNextResponse(ctx);
    }

    // 5. Specific Topic Matches: Kutch & Rogan Art
    if (q.includes('rogan') || q.includes('castor') || q.includes('kutch') || q.includes('white desert') || q.includes('rann')) {
      return {
        text: `In Kutch, the 300-year-old **Rogan art** is crafted using castor seed oil slow-boiled for 12+ hours into a thick, elastic paste! Artisans spin glowing threads of paint in mid-air using a blunt metal stylus, then fold the fabric to create a perfect mirror image. Only the Khatri family of Nirona village preserves this sacred tradition.`,
        culturalInsight: `Kutch produces 75%+ of India's castor crop, fueling this sustainable craft.`,
        suggestedNextStep: `Read the Kutch Story Chapter or try the Rogan Artisan Motif puzzle!`
      };
    }

    // 6. Specific Topic Matches: Gir & Asiatic Lions
    if (q.includes('lion') || q.includes('gir') || q.includes('maldhari') || q.includes('wildlife') || q.includes('forest')) {
      return {
        text: `Gir National Park is the **only home of the wild Asiatic lion** in the world (~670 remaining)! You can identify an Asiatic lion by the unique **longitudinal skin fold** along its belly and shorter mane. What's even more inspiring is how the indigenous **Maldhari tribes** live alongside these lions in open forest *Nesses* in peaceful mutual respect.`,
        culturalInsight: `The Baan Stambh on the Somnath shore near Gir marks an uninterrupted line of sea to Antarctica!`,
        suggestedNextStep: `Play the Gir Eco-Tracker puzzle to test your wildlife knowledge.`
      };
    }

    // 7. Specific Topic Matches: Ahmedabad, Gandhi, Dandi March, Food
    if (q.includes('ahmedabad') || q.includes('gandhi') || q.includes('sabarmati') || q.includes('dandi') || q.includes('thali') || q.includes('dhokla')) {
      return {
        text: `Ahmedabad is a UNESCO World Heritage city and the spiritual epicenter of India's freedom struggle! From **Sabarmati Ashram**, Mahatma Gandhi launched the 1930 **Dandi Salt March** (384 km with 78 satyagrahis). Ahmedabad is also famed for its Ayurvedic **Gujarati Thali**, balancing all 6 tastes (*Shad Rasa*) including Khaman Dhokla and Surti Undhiyu.`,
        culturalInsight: `Gandhi vowed never to return to Sabarmati Ashram until India was completely free.`,
        suggestedNextStep: `Test your culinary speed in 'The Grand Gujarati Thali Master' mini-game!`
      };
    }

    // 8. Specific Topic Matches: Patan, Stepwell, Rani ki Vav, Patola Silk
    if (q.includes('patan') || q.includes('stepwell') || q.includes('rani ki vav') || q.includes('patola') || q.includes('silk') || q.includes('100 note')) {
      return {
        text: `Patan was the royal capital of the Solanki kings! It houses **Rani ki Vav**, an 11th-century 7-level subterranean water temple featured on India's ₹100 note with 500+ Vishnu carvings. Patan is equally famous for **Double-Ikkat Patola silk**, where both warp and weft yarns are tie-dyed before weaving so the saree is 100% reversible and lasts over 300 years!`,
        culturalInsight: `"Padi Patole Bhaat, Faate Pan Fitey Nahi" — The fabric may tear, but the colors never fade.`,
        suggestedNextStep: `Check the Patola Silk Heirloom inside your Cultural Museum Vault!`
      };
    }

    // 9. Specific Topic Matches: Museum, XP, Leveling, Quizzes
    if (q.includes('museum') || q.includes('artifact') || q.includes('xp') || q.includes('quiz') || q.includes('reward')) {
      return {
        text: `Every quest you complete earns **XP and score**! Completing stories (+100 XP), solving mini-games (+100 XP), and taking quizzes (+150 XP) unlocks authentic cultural relics in the **Museum Vault** (like the *Rogan Tree of Life* and the *Crown of Gujarat Cultural Mastery*).`,
        culturalInsight: `Your current progress is ${ctx.completionPercentage}% of Gujarat Mastered.`,
        suggestedNextStep: `Open the Museum Vault from the top bar to inspect your relics.`
      };
    }

    // 10. Greeting / General Conversational
    if (q.includes('hello') || q.includes('hi') || q.includes('namaste') || q.includes('kem cho')) {
      return {
        text: `**Kem Cho, ${ctx.playerName}! 🙏** Welcome to BharatVerse! I am **Mira**, your cultural guide. I am here to unveil the stories, artisanal crafts, and architectural marvels of Gujarat. What would you like to explore together?`,
        suggestedNextStep: `Ask: "What can I learn here?" or "What should I explore next?"`
      };
    }

    // 11. Contextual Helpful Fallback
    return {
      text: `That is an insightful inquiry, ${ctx.playerName}! Currently, we are exploring **${this.getLocationName(loc)}**. You can discover authentic cultural stories, solve heritage puzzles, take quizzes, or collect museum relics across Kutch, Gir, Ahmedabad, and Patan.`,
      culturalInsight: `Gujarat's history spans thousands of years from ancient Harappan port Lothal to modern self-reliance.`,
      suggestedNextStep: `Try asking: "Tell me about this place" or "Why is this important?"`
    };
  }

  getLearnHereResponse(loc, ctx) {
    const map = {
      'kutch': {
        text: `Here in **Kutch**, you can discover the science of the **White Salt Desert** and the secret of **Rogan Art** (12-hour boiled castor oil paint). You will also learn about the Khatri family of Nirona and the majestic Great Rann moonlit salt flats.`,
        suggestedNextStep: `Click "Discover Cultural Story" in the Location Deck.`
      },
      'gir-saurashtra': {
        text: `In **Gir Forest & Saurashtra**, you will study **Asiatic Lion conservation** (*Panthera leo persica*), the sacred coastal **Somnath Temple Baan Stambh**, and how the **Maldhari pastoral tribe** coexists with wild lions.`,
        suggestedNextStep: `Play the Gir Forest Eco-Tracker puzzle.`
      },
      'ahmedabad-central': {
        text: `In **Ahmedabad**, you will explore **Mahatma Gandhi's Sabarmati Ashram**, the 1930 **Dandi Salt March**, UNESCO World Heritage wooden *Pols*, and the Ayurvedic harmony of the **Gujarati Thali**.`,
        suggestedNextStep: `Challenge yourself in the Thali Master mini-game.`
      },
      'patan-north': {
        text: `In **Patan**, you will learn about the subterranean engineering of **Rani ki Vav** (featured on the ₹100 note), the astronomical design of **Modhera Sun Temple**, and the 6-month alchemy of **Double-Ikkat Patola Silk**.`,
        suggestedNextStep: `Take the Grand Gujarat Cultural Mastery Quiz!`
      }
    };
    return map[loc] || map['kutch'];
  }

  getAboutPlaceResponse(loc, ctx) {
    const map = {
      'kutch': {
        text: `**The Great Rann of Kutch** is one of the world's largest salt deserts (7,500 sq km). Every winter, seasonal monsoon waters evaporate under the sun, leaving a blinding white crust of pure salt that shimmers like silver under the full moon!`,
        culturalInsight: `Nirona village in Kutch is home to the last surviving masters of castor-oil Rogan painting.`
      },
      'gir-saurashtra': {
        text: `**Gir National Park & Wildlife Sanctuary** covers over 1,410 sq km of dry deciduous scrub forest. It is the last refuge of the Asiatic lion on planet Earth, rescued from the brink of extinction through dedicated conservation.`,
        culturalInsight: `Maldhari tribesmen walk through the forest carrying only wooden sticks (*dang*).`
      },
      'ahmedabad-central': {
        text: `**Ahmedabad** was founded in 1411 CE on the banks of the Sabarmati. It is India's first UNESCO World Heritage City, world-renowned for its intricate wooden bird feeders (*Chabutras*) and non-violent freedom struggle history.`,
        culturalInsight: `Sabarmati Ashram was originally known as the Satyagraha Ashram.`
      },
      'patan-north': {
        text: `**Patan** was the ancient capital of the Solanki kings (*Anhilwad Patan*). It is renowned for Rani ki Vav, a 27-meter deep subterranean stepwell designed as an inverted temple to preserve sacred ground water.`,
        culturalInsight: `Rani ki Vav was built in 1063 CE by Queen Udayamati in memory of King Bhima I.`
      }
    };
    return map[loc] || map['kutch'];
  }

  getImportanceResponse(loc, ctx) {
    const map = {
      'kutch': {
        text: `Kutch represents human ingenuity in surviving extreme arid landscapes. The Rogan art technique proves how local botanical resources (castor oil) were engineered into a resilient artistic medium without modern synthetic chemicals.`
      },
      'gir-saurashtra': {
        text: `Gir is the global benchmark for human-carnivore coexistence. While large predators across the world are confined behind high fences, Gir's lions and Maldhari pastoralists demonstrate harmonious living.`
      },
      'ahmedabad-central': {
        text: `Ahmedabad gave the world the philosophy of non-violent resistance (*Ahimsa* and *Satyagraha*). The Salt March demonstrated that peaceful unity can dismantle colonial oppression.`
      },
      'patan-north': {
        text: `Patan exemplifies the pinnacle of medieval hydraulic engineering and mathematical textile geometry. The Double-Ikkat weave requires complex mental calculations before a single thread is woven.`
      }
    };
    return map[loc] || map['kutch'];
  }

  getExploreNextResponse(ctx) {
    const storiesCount = ctx.completedStories ? ctx.completedStories.length : 0;
    const stats = playerState.getGujaratCompletionStats();

    if (storiesCount < 2) {
      return {
        text: `I recommend diving into the **Story Chapters** for **Kutch** and **Ahmedabad**! Each chapter awards **+100 XP** and reveals fascinating heritage lore.`,
        suggestedNextStep: `Select Kutch or Ahmedabad on the map to start.`
      };
    } else if (!stats.isQuizPassed) {
      return {
        text: `You have built strong cultural knowledge! I recommend taking the **Grand Gujarat Cultural Mastery Quiz** to unlock the Mythic **Crown of Gujarat 👑**!`,
        suggestedNextStep: `Click "🏆 Take Quiz" in the location deck.`
      };
    } else {
      return {
        text: `You have mastered all core Gujarat quests! Visit the **Museum Pavilion** to inspect your unlocked relics and review your collector achievements.`,
        suggestedNextStep: `Click "🏛️ Museum" in the top bar.`
      };
    }
  }

  getLocationName(id) {
    const names = {
      'kutch': 'Great Rann of Kutch',
      'gir-saurashtra': 'Gir Forest & Saurashtra',
      'ahmedabad-central': 'Ahmedabad Heritage Central',
      'patan-north': 'Patan & Northern Heritage'
    };
    return names[id] || 'Gujarat Exploration Hub';
  }
}

export const aiGuideService = new AIGuideService();
