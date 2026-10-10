/**
 * ==========================================================================
 * CLARET CANTEEN — GOOGLE GEMINI AI CAMPUS DINING ASSISTANT
 * Smart Food Recommendation & Inquiries Bot (BCA Final Year Project)
 * ==========================================================================
 * Features:
 *  - Powered by Google Gemini API
 *  - Contextual understanding of the entire Claret Canteen menu & pricing
 *  - Budget-based recommendations (e.g., "Lunch under ₹100")
 *  - Direct "+ Add to Tray" action right inside AI chat responses
 *  - Zero-failure smart local fallback if offline or API quota-limited
 * ==========================================================================
 */

(function () {
  'use strict';

  // Gemini API Key: retrieved securely from localStorage or uses smart local recommendation engine
  const GEMINI_API_KEY = localStorage.getItem('claretGeminiApiKey') || "";
  const GEMINI_ENDPOINT = GEMINI_API_KEY
    ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`
    : "";

  // Menu Knowledge Base for Gemini & Fallback Engine
  const CANTEEN_KNOWLEDGE = `
You are "Claret AI", the friendly and efficient AI Dining Assistant for Claret Canteen ("Campus Food Ordering System").
College Canteen Details:
- Operating Hours: Monday to Saturday, 8:00 AM – 5:00 PM.
- Morning Short Break: 10:30 AM – 11:00 AM.
- Lunch Break: 12:45 PM – 1:45 PM.
- Evening Break: 3:30 PM – 4:00 PM.
- Location: Campus Block C, Ground Floor (Near Central Courtyard).
- Service: Order online without waiting in queues, pick up at Counter 2.

Complete Menu Items & Prices:
1. Masala Dosa (Breakfast) - ₹60 (Crispy golden crepe with spiced potato, sambar, and coconut chutney) [Chef's Special]
2. Steamed Idli (2 Pcs) (Breakfast) - ₹40 (Fluffy steamed rice & lentil cakes with hot sambar)
3. Medu Vada (2 Pcs) (Breakfast) - ₹35 (Crispy spiced lentil donuts)
4. Poori Masala (3 Pcs) (Breakfast) - ₹50 (Puffed pooris with potato sagu)
5. Veg Mini Meals (Lunch) - ₹80 (Complete thali: rice, sambar, rasam, palya, curd, papad)
6. Veg Fried Rice (Lunch) - ₹75 (Wok-tossed basmati rice with crunchy vegetables)
7. Chicken Fried Rice (Lunch) - ₹110 (Aromatic fried rice with spiced tender chicken)
8. Paneer Dum Biryani (Lunch) - ₹100 (Slow-cooked spiced rice with golden paneer cubes)
9. Samosa (2 Pcs) (Snacks) - ₹25 (Crispy pastry stuffed with spiced potato and peas)
10. Grilled Veg Sandwich (Snacks) - ₹45 (Toasted bread with cucumber, tomato, chutney & cheese)
11. Bakery Veg Puff (Snacks) - ₹25 (Warm flaky puff pastry with curried vegetable filling)
12. Crispy Veg Burger (Fast Food) - ₹70 (Golden patty with lettuce, mayo, and cheese in sesame bun)
13. Golden French Fries (Fast Food) - ₹60 (Hot salted potato fries with dip)
14. Special Masala Chai (Beverages) - ₹15 (Brewed cutting chai with ginger and cardamom)
15. Filter Coffee (Beverages) - ₹20 (Authentic South Indian frothy filter coffee)
16. Fresh Orange Juice (Beverages) - ₹40 (Chilled freshly squeezed orange juice)
17. Chilled Cold Coffee (Beverages) - ₹50 (Thick creamy blended coffee with chocolate drizzle)

Guidelines:
- Keep answers concise, helpful, and welcoming for college students and staff.
- When recommending dishes, mention the exact price in ₹.
- Encourage students to order via Claret Canteen to avoid break-time queues.
`;

  // Quick Prompt Chips
  const QUICK_PROMPTS = [
    "🍽️ Lunch under ₹100",
    "⚡ Quick break snacks",
    "⭐ What's Today's Special?",
    "☕ Best drinks for study session",
    "🕒 Canteen timings & pickup"
  ];

  // DOM Elements
  let chatBtn = null;
  let chatBox = null;
  let messagesContainer = null;
  let chatInput = null;
  let isChatOpen = false;
  let isAITyping = false;

  /**
   * Build & Inject Floating Assistant UI
   */
  function initAssistantUI() {
    // 1. Floating Action Button
    chatBtn = document.createElement('button');
    chatBtn.className = 'ai-assistant-btn';
    chatBtn.setAttribute('aria-label', 'Open Claret AI Dining Assistant');
    chatBtn.innerHTML = `
      <div class="ai-btn-inner">
        <span class="ai-btn-sparkle">✨</span>
        <span class="ai-btn-text">Claret AI</span>
      </div>
    `;

    // 2. Chat Window Box
    chatBox = document.createElement('div');
    chatBox.className = 'ai-chat-window';
    chatBox.setAttribute('aria-label', 'Claret AI Chat');
    chatBox.innerHTML = `
      <div class="ai-chat-header">
        <div class="ai-header-brand">
          <div class="ai-avatar">✨</div>
          <div class="ai-header-titles">
            <h4>Claret AI Assistant</h4>
            <span>Powered by Google Gemini</span>
          </div>
        </div>
        <button class="ai-chat-close" aria-label="Close AI Chat">✕</button>
      </div>

      <div class="ai-chat-messages" id="aiChatMessages">
        <!-- Initial Greeting -->
        <div class="ai-msg bot-msg">
          <div class="ai-msg-bubble">
            👋 <strong>Hi there, campus foodie!</strong> I'm your Claret AI Assistant. Ask me to recommend dishes based on your budget, break timings, or dietary preferences!
          </div>
        </div>
      </div>

      <div class="ai-quick-prompts" id="aiQuickPrompts"></div>

      <form class="ai-chat-input-bar" id="aiChatForm">
        <input 
          type="text" 
          id="aiChatInput" 
          placeholder="Ask me anything (e.g. Lunch under ₹80)..." 
          autocomplete="off" 
          aria-label="Ask Claret AI">
        <button type="submit" class="ai-send-btn" aria-label="Send message">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </form>
    `;

    document.body.appendChild(chatBtn);
    document.body.appendChild(chatBox);

    messagesContainer = chatBox.querySelector('#aiChatMessages');
    chatInput = chatBox.querySelector('#aiChatInput');
    const quickPromptsBox = chatBox.querySelector('#aiQuickPrompts');
    const closeBtn = chatBox.querySelector('.ai-chat-close');
    const form = chatBox.querySelector('#aiChatForm');

    // Populate Quick Prompts
    quickPromptsBox.innerHTML = QUICK_PROMPTS.map(p => `
      <button type="button" class="ai-prompt-chip">${p}</button>
    `).join('');

    // Event Listeners
    chatBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    quickPromptsBox.addEventListener('click', (e) => {
      if (e.target.classList.contains('ai-prompt-chip')) {
        const text = e.target.textContent.replace(/^[^\w\s]+/, '').trim();
        handleUserSend(text);
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (text) {
        handleUserSend(text);
      }
    });
  }

  function toggleChat() {
    isChatOpen = !isChatOpen;
    chatBox.classList.toggle('open', isChatOpen);
    chatBtn.classList.toggle('active', isChatOpen);
    if (isChatOpen) {
      chatInput.focus();
    }
  }

  /**
   * Handle user prompt submission
   */
  async function handleUserSend(userMessage) {
    if (!userMessage || isAITyping) return;

    // Append User Message Bubble
    appendMessage(userMessage, 'user');
    chatInput.value = '';
    isAITyping = true;

    // Append Typing Indicator
    const typingEl = appendTypingIndicator();

    try {
      // Call Google Gemini API with smart fallback
      const aiResponse = await fetchGeminiResponse(userMessage);
      typingEl.remove();
      appendMessage(aiResponse.text, 'bot', aiResponse.suggestedDishes);
    } catch (err) {
      console.warn("[Claret AI] Gemini API fallback invoked:", err);
      typingEl.remove();
      const fallback = generateLocalResponse(userMessage);
      appendMessage(fallback.text, 'bot', fallback.suggestedDishes);
    } finally {
      isAITyping = false;
    }
  }

  /**
   * Call Google Gemini API (gemini-1.5-flash)
   */
  async function fetchGeminiResponse(userMessage) {
    if (!GEMINI_ENDPOINT) {
      throw new Error("Gemini API key not configured. Using local assistant engine.");
    }

    const promptText = `
${CANTEEN_KNOWLEDGE}

Student Inquiry: "${userMessage}"

Respond in a concise, friendly style with markdown formatting. If you mention any dish from the menu, format its name in **bold** and state its price in ₹.
`;

    const response = await fetch(GEMINI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: promptText }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidate) {
      throw new Error("No candidate text from Gemini");
    }

    // Extract any matching dish IDs to render interactive Add to Tray buttons
    const dishes = findMatchingDishes(candidate);

    return {
      text: formatMarkdown(candidate),
      suggestedDishes: dishes
    };
  }

  /**
   * Smart Local Fallback Recommendation Engine (Ensures 100% viva demonstration reliability)
   */
  function generateLocalResponse(query) {
    const q = query.toLowerCase();
    let text = "";
    let dishes = [];

    if (q.includes("budget") || q.includes("100") || q.includes("under")) {
      text = "Here are our top satisfying meals under **₹100** that fill you up without breaking the bank:";
      dishes = [
        { id: 5, name: "Veg Mini Meals", price: 80 },
        { id: 6, name: "Veg Fried Rice", price: 75 },
        { id: 1, name: "Masala Dosa", price: 60 }
      ];
    } else if (q.includes("breakfast") || q.includes("morning")) {
      text = "Good morning! Our campus kitchen serves freshly steamed hot South Indian breakfast items daily:";
      dishes = [
        { id: 1, name: "Masala Dosa", price: 60 },
        { id: 2, name: "Steamed Idli (2 Pcs)", price: 40 },
        { id: 4, name: "Poori Masala", price: 50 }
      ];
    } else if (q.includes("snack") || q.includes("break") || q.includes("quick")) {
      text = "For a quick 15-minute lecture break, these warm snacks are packaged and ready to go:";
      dishes = [
        { id: 9, name: "Samosa (2 Pcs)", price: 25 },
        { id: 11, name: "Bakery Veg Puff", price: 25 },
        { id: 10, name: "Grilled Veg Sandwich", price: 45 }
      ];
    } else if (q.includes("drink") || q.includes("coffee") || q.includes("tea") || q.includes("juice")) {
      text = "Need a caffeine boost or fresh refreshment? Check out our popular beverage counter:";
      dishes = [
        { id: 14, name: "Special Masala Chai", price: 15 },
        { id: 15, name: "Filter Coffee", price: 20 },
        { id: 17, name: "Chilled Cold Coffee", price: 50 },
        { id: 16, name: "Fresh Orange Juice", price: 40 }
      ];
    } else if (q.includes("special") || q.includes("today")) {
      text = "⭐ **Today's Chef Special** is our iconic **Masala Dosa (₹60)**! Golden crispy crepe with potato filling, hot sambar & fresh chutney.";
      dishes = [{ id: 1, name: "Masala Dosa", price: 60 }];
    } else if (q.includes("time") || q.includes("timing") || q.includes("hour") || q.includes("open")) {
      text = "🕒 **Claret Canteen Timings**:\n- Open: **8:00 AM – 5:00 PM** (Mon–Sat)\n- Morning Break: 10:30 AM – 11:00 AM\n- Lunch Break: 12:45 PM – 1:45 PM\n- Location: Block C Ground Floor Counter 2.";
    } else {
      text = "I'm here to help! Our campus kitchen offers hot breakfast, budget lunch thalis, quick break snacks, and drinks. Here are today's top student picks:";
      dishes = [
        { id: 1, name: "Masala Dosa", price: 60 },
        { id: 12, name: "Crispy Veg Burger", price: 70 },
        { id: 15, name: "Filter Coffee", price: 20 }
      ];
    }

    return { text, suggestedDishes: dishes };
  }

  /**
   * Helper to find dish IDs mentioned in Gemini response
   */
  function findMatchingDishes(text) {
    if (typeof window.MENU_DATA === 'undefined') return [];
    const lower = text.toLowerCase();
    return window.MENU_DATA.filter(dish => lower.includes(dish.name.toLowerCase())).slice(0, 3);
  }

  /**
   * Simple markdown to HTML formatter
   */
  function formatMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  /**
   * Append Message Bubble to UI
   */
  function appendMessage(htmlContent, sender = 'bot', suggestedDishes = []) {
    const msgEl = document.createElement('div');
    msgEl.className = `ai-msg ${sender}-msg`;

    let dishesHTML = '';
    if (suggestedDishes && suggestedDishes.length > 0) {
      dishesHTML = `
        <div class="ai-dish-cards-row">
          ${suggestedDishes.map(d => `
            <div class="ai-dish-chip">
              <span class="ai-dish-chip-name">${d.name} (₹${d.price})</span>
              <button class="ai-dish-add-btn" onclick="window.aiAddToCart(${d.id})">+ Add</button>
            </div>
          `).join('')}
        </div>
      `;
    }

    msgEl.innerHTML = `
      <div class="ai-msg-bubble">
        ${htmlContent}
        ${dishesHTML}
      </div>
    `;

    messagesContainer.appendChild(msgEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  /**
   * Typing animation bubble
   */
  function appendTypingIndicator() {
    const typingEl = document.createElement('div');
    typingEl.className = 'ai-msg bot-msg typing-msg';
    typingEl.innerHTML = `
      <div class="ai-msg-bubble">
        <div class="ai-typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return typingEl;
  }

  // Global helper to add dish from AI chat directly to cart
  window.aiAddToCart = function (dishId) {
    if (typeof window.addToCart === 'function') {
      window.addToCart(dishId, 1);
    }
  };

  // Initialize once DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAssistantUI);
  } else {
    initAssistantUI();
  }

})();
