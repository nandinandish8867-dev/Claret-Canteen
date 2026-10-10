/**
 * ==========================================================================
 * CLARET CANTEEN — CAMPUS FOOD ORDERING SYSTEM
 * Master JavaScript File (BCA Final Year Project)
 * ==========================================================================
 * Features:
 *  1. Complete Food Menu Data Model
 *  2. LocalStorage Cart & Order Management
 *  3. Dynamic Cart Drawer & Dedicated Cart Page
 *  4. Real-time Search & Multi-category Filtering
 *  5. Form Validation & Unique Order ID Generation
 *  6. Visual Order Tracking with Live Demo Progression
 *  7. Responsive Mobile Navigation & Toast Feedback
 * ==========================================================================
 */

// Strict mode for cleaner and safer code
'use strict';

/* ==========================================================================
   1. MENU DATA MODEL
   ========================================================================== */
const MENU_DATA = [
  // --- BREAKFAST ---
  {
    id: 1,
    name: "Masala Dosa",
    category: "Breakfast",
    description: "Crispy golden crepe filled with spiced potato masala, served with sambar and fresh coconut chutney.",
    price: 60,
    image: "assets/images/masala-dosa.svg",
    popular: true,
    special: true,
    veg: true
  },
  {
    id: 2,
    name: "Steamed Idli (2 Pcs)",
    category: "Breakfast",
    description: "Fluffy, cloud-soft steamed rice and lentil cakes served with hot vegetable sambar and chutney.",
    price: 40,
    image: "assets/images/idli.svg",
    popular: true,
    special: false,
    veg: true
  },
  {
    id: 3,
    name: "Medu Vada (2 Pcs)",
    category: "Breakfast",
    description: "Golden-brown, crispy lentil donuts seasoned with peppercorns and curry leaves, served with sambar.",
    price: 35,
    image: "assets/images/vada.svg",
    popular: false,
    special: false,
    veg: true
  },
  {
    id: 4,
    name: "Poori Masala (3 Pcs)",
    category: "Breakfast",
    description: "Puffed deep-fried golden pooris served with warm, mild spiced potato and onion sagu.",
    price: 50,
    image: "assets/images/poori.svg",
    popular: false,
    special: false,
    veg: true
  },

  // --- LUNCH ---
  {
    id: 5,
    name: "Veg Mini Meals",
    category: "Lunch",
    description: "Complete campus thali with steamed rice, sambar, rasam, dry vegetable palya, curd, and crisp papad.",
    price: 80,
    image: "assets/images/veg-meals.svg",
    popular: true,
    special: false,
    veg: true
  },
  {
    id: 6,
    name: "Veg Fried Rice",
    category: "Lunch",
    description: "Wok-tossed basmati rice with crunchy diced carrots, beans, cabbage, and spring onions.",
    price: 75,
    image: "assets/images/fried-rice.svg",
    popular: true,
    special: false,
    veg: true
  },
  {
    id: 7,
    name: "Chicken Fried Rice",
    category: "Lunch",
    description: "Aromatic wok-fried rice tossed with spiced tender chicken chunks, egg, and fresh green scallions.",
    price: 110,
    image: "assets/images/chicken-rice.svg",
    popular: true,
    special: false,
    veg: false
  },
  {
    id: 8,
    name: "Paneer Dum Biryani",
    category: "Lunch",
    description: "Slow-cooked layered aromatic biryani rice with golden marinated paneer cubes, mint, and fried onions.",
    price: 100,
    image: "assets/images/paneer-biryani.svg",
    popular: false,
    special: false,
    veg: true
  },

  // --- SNACKS ---
  {
    id: 9,
    name: "Samosa (2 Pcs)",
    category: "Snacks",
    description: "Crispy flaky pastry pockets stuffed with spiced potato and green peas, served with mint & sweet chutney.",
    price: 25,
    image: "assets/images/samosa.svg",
    popular: true,
    special: false,
    veg: true
  },
  {
    id: 10,
    name: "Grilled Veg Sandwich",
    category: "Snacks",
    description: "Toasted white bread layered with fresh sliced cucumber, tomatoes, spiced green chutney, and cheese.",
    price: 45,
    image: "assets/images/sandwich.svg",
    popular: false,
    special: false,
    veg: true
  },
  {
    id: 11,
    name: "Bakery Veg Puff",
    category: "Snacks",
    description: "Warm, multi-layered golden puff pastry packed with savory curried vegetable filling.",
    price: 25,
    image: "assets/images/veg-puff.svg",
    popular: false,
    special: false,
    veg: true
  },

  // --- FAST FOOD ---
  {
    id: 12,
    name: "Crispy Veg Burger",
    category: "Fast Food",
    description: "Golden vegetable patty with fresh tomato slices, crunchy lettuce, and herb mayo in a toasted sesame bun.",
    price: 70,
    image: "assets/images/burger.svg",
    popular: true,
    special: false,
    veg: true
  },
  {
    id: 13,
    name: "Golden French Fries",
    category: "Fast Food",
    description: "Hot, crispy salted potato finger chips fried to perfection, served with tomato dip.",
    price: 60,
    image: "assets/images/french-fries.svg",
    popular: false,
    special: false,
    veg: true
  },

  // --- BEVERAGES ---
  {
    id: 14,
    name: "Special Masala Chai",
    category: "Beverages",
    description: "Aromatic brewed campus cutting chai infused with crushed cardamom and fresh ginger.",
    price: 15,
    image: "assets/images/tea.svg",
    popular: true,
    special: false,
    veg: true
  },
  {
    id: 15,
    name: "Filter Coffee",
    category: "Beverages",
    description: "Traditional hot South Indian filter coffee with frothy chicory milk.",
    price: 20,
    image: "assets/images/coffee.svg",
    popular: true,
    special: false,
    veg: true
  },
  {
    id: 16,
    name: "Fresh Orange Juice",
    category: "Beverages",
    description: "Freshly squeezed chilled sweet orange juice prepared to order with light mint garnish.",
    price: 40,
    image: "assets/images/fresh-juice.svg",
    popular: true,
    special: false,
    veg: true
  },
  {
    id: 17,
    name: "Chilled Cold Coffee",
    category: "Beverages",
    description: "Thick creamy blended cold coffee topped with cocoa powder and chocolate drizzle.",
    price: 50,
    image: "assets/images/cold-coffee.svg",
    popular: false,
    special: false,
    veg: true
  }
];

/* ==========================================================================
   2. LOCALSTORAGE STORAGE KEYS & HELPERS
   ========================================================================== */
const STORAGE_KEYS = {
  CART: 'claretCanteenCart',
  ORDERS: 'claretCanteenOrders',
  CURRENT_ORDER: 'claretCanteenCurrentOrder'
};

// Safe Retrieval of Cart Array
function getCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CART);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to read cart from localStorage. Resetting empty cart.", err);
    return [];
  }
}

// Save Cart to LocalStorage and update UI
function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  } catch (err) {
    console.error("Failed to persist cart to localStorage.", err);
  }
  updateNavCartBadge();
  renderCartDrawer();
  // Also re-render dedicated cart page if currently open
  if (document.body.dataset.page === 'cart') {
    renderCartPage();
  }
  // Re-render checkout summary if on checkout page
  if (document.body.dataset.page === 'checkout') {
    renderCheckoutSummary();
  }
}

// Add Item to Cart
function addToCart(foodId, quantity = 1) {
  const item = MENU_DATA.find(f => f.id === Number(foodId));
  if (!item) return;

  const cart = getCart();
  const existing = cart.find(ci => ci.id === item.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      image: item.image,
      quantity: quantity
    });
  }

  saveCart(cart);
  showToast(`Added ${item.name} to Cart! 🛒`, 'success');
}

// Adjust Item Quantity (+1 or -1)
function updateCartQuantity(foodId, delta) {
  let cart = getCart();
  const existing = cart.find(ci => ci.id === Number(foodId));
  if (!existing) return;

  existing.quantity += delta;
  if (existing.quantity <= 0) {
    cart = cart.filter(ci => ci.id !== Number(foodId));
    showToast(`Removed item from cart.`, 'warning');
  }

  saveCart(cart);
}

// Remove Item from Cart
function removeFromCart(foodId) {
  const cart = getCart().filter(ci => ci.id !== Number(foodId));
  saveCart(cart);
  showToast(`Item removed from cart.`, 'warning');
}

// Clear Entire Cart with Confirmation
function clearCart() {
  const cart = getCart();
  if (cart.length === 0) return;

  showConfirmModal(
    '🗑️',
    'Clear Entire Cart?',
    'All items will be removed from your cart. This cannot be undone.',
    () => {
      saveCart([]);
      showToast('Cart has been cleared.', 'warning');
    }
  );
}

// Reusable Confirmation Modal Helper
function showConfirmModal(icon, title, text, onConfirm) {
  const existing = document.getElementById('confirmModalBackdrop');
  if (existing) existing.remove();

  const backdrop = document.createElement('div');
  backdrop.className = 'confirm-modal-backdrop';
  backdrop.id = 'confirmModalBackdrop';
  backdrop.innerHTML = `
    <div class="confirm-modal">
      <div class="confirm-modal-icon">${icon}</div>
      <div class="confirm-modal-title">${title}</div>
      <div class="confirm-modal-text">${text}</div>
      <div class="confirm-modal-actions">
        <button class="btn btn-secondary" id="confirmModalCancel">Cancel</button>
        <button class="btn btn-primary" id="confirmModalOk" style="background:var(--danger); border-color:var(--danger);">Yes, Clear</button>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  requestAnimationFrame(() => backdrop.classList.add('open'));

  document.getElementById('confirmModalCancel').onclick = () => backdrop.remove();
  document.getElementById('confirmModalOk').onclick = () => {
    backdrop.remove();
    onConfirm();
  };
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) backdrop.remove();
  });
}

// Retrieve Orders Array
function getOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to read orders from localStorage.", err);
    return [];
  }
}

// Save Order Object
function saveOrder(order) {
  const orders = getOrders();
  orders.unshift(order); // Newest first
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    localStorage.setItem(STORAGE_KEYS.CURRENT_ORDER, JSON.stringify(order));
  } catch (err) {
    console.error("Failed to persist order to localStorage.", err);
  }

  // Cloud Persistence via Firebase Cloud Firestore
  if (window.ClaretFirebase && typeof window.ClaretFirebase.saveOrder === 'function') {
    window.ClaretFirebase.saveOrder(order).then(cloudOrder => {
      if (cloudOrder) {
        showToast("☁️ Order saved to Firebase Cloud!", "success");
      }
    }).catch(err => {
      console.log("Firebase cloud fallback:", err);
    });
  }

  return order;
}

// Get Most Recent Active Order
function getCurrentOrder() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_ORDER);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    console.error("Failed to read current order.", err);
    return null;
  }
}

// Update Order Status in LocalStorage and Firebase
function updateOrderStatus(orderId, newStatus) {
  const orders = getOrders();
  const target = orders.find(o => o.orderId === orderId);
  if (target) {
    target.status = newStatus;
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }

  const current = getCurrentOrder();
  if (current && current.orderId === orderId) {
    current.status = newStatus;
    localStorage.setItem(STORAGE_KEYS.CURRENT_ORDER, JSON.stringify(current));
  }

  // Cloud update via Firebase Firestore
  if (window.ClaretFirebase && typeof window.ClaretFirebase.updateOrderStatus === 'function') {
    window.ClaretFirebase.updateOrderStatus(orderId, newStatus).then(success => {
      if (success) {
        console.log(`[Firebase] Status synced: ${newStatus}`);
      }
    }).catch(err => {
      console.log("Firebase status update fallback:", err);
    });
  }
}

/* ==========================================================================
   3. TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : 'ℹ'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    setTimeout(() => toast.remove(), 250);
  }, 2600);
}

/* ==========================================================================
   4. NAVIGATION & CART DRAWER CONTROLLERS
   ========================================================================== */
function initNav() {
  // Mobile menu toggle
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('open');
      navLinks.classList.toggle('open');
      toggleBtn.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', !isOpen);
    });

    // Close menu when clicking outside or clicking any nav link
    document.addEventListener('click', (e) => {
      if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        toggleBtn.classList.remove('open');
      }
    });
  }

  // Bind Cart Drawer Open Buttons (Navbar & floating shortcuts)
  const cartNavBtns = document.querySelectorAll('.cart-nav-btn, [data-action="open-cart"]');
  cartNavBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If we are on cart.html, avoid reopening the drawer over the page
      if (document.body.dataset.page !== 'cart') {
        e.preventDefault();
        openCartDrawer();
      }
    });
  });

  // Drawer Backdrop and Close Buttons
  const backdrop = document.querySelector('.cart-drawer-backdrop');
  const closeBtn = document.querySelector('.cart-close-btn');

  if (backdrop) {
    backdrop.addEventListener('click', closeCartDrawer);
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', closeCartDrawer);
  }

  // Update badge count initially
  updateNavCartBadge();
}

function updateNavCartBadge() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach(badge => {
    badge.textContent = totalCount;
    // Pulse animation
    badge.classList.add('pulse');
    setTimeout(() => badge.classList.remove('pulse'), 250);
  });
}

function openCartDrawer() {
  const drawer = document.querySelector('.cart-drawer');
  const backdrop = document.querySelector('.cart-drawer-backdrop');
  if (drawer && backdrop) {
    renderCartDrawer();
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const drawer = document.querySelector('.cart-drawer');
  const backdrop = document.querySelector('.cart-drawer-backdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Render Items Inside Slide-out Cart Drawer
function renderCartDrawer() {
  const bodyEl = document.querySelector('.cart-drawer-body');
  const footerEl = document.querySelector('.cart-drawer-footer');
  if (!bodyEl) return;

  const cart = getCart();

  if (cart.length === 0) {
    bodyEl.innerHTML = `
      <div class="empty-state" style="border:none; padding: 2.5rem 1rem;">
        <div class="empty-state-icon">🛒</div>
        <h3 class="empty-state-title">Your cart is empty</h3>
        <p class="empty-state-text">Explore our delicious campus menu and add your favorite dishes.</p>
        <a href="menu.html" class="btn btn-primary btn-sm" onclick="closeCartDrawer()">Browse Menu</a>
      </div>
    `;
    if (footerEl) footerEl.style.display = 'none';
    return;
  }

  if (footerEl) footerEl.style.display = 'flex';

  let totalQty = 0;
  let totalPrice = 0;

  const itemsHTML = cart.map(item => {
    const subtotal = item.price * item.quantity;
    totalQty += item.quantity;
    totalPrice += subtotal;

    return `
      <div class="cart-item-card" data-id="${item.id}">
        <div class="cart-item-thumb">
          <img src="${item.image}" alt="${item.name}" onerror="this.src='assets/images/masala-dosa.svg'">
        </div>
        <div class="cart-item-info">
          <h4 class="cart-item-name">${item.name}</h4>
          <div class="cart-item-unit-price">₹${item.price} each</div>
          <div class="cart-item-subtotal">₹${subtotal}</div>
        </div>
        <div class="qty-control">
          <button class="qty-btn" onclick="updateCartQuantity(${item.id}, -1)" title="Decrease quantity" aria-label="Decrease quantity">−</button>
          <span class="qty-display">${item.quantity}</span>
          <button class="qty-btn" onclick="updateCartQuantity(${item.id}, 1)" title="Increase quantity" aria-label="Increase quantity">+</button>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove item" aria-label="Remove item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
    `;
  }).join('');

  bodyEl.innerHTML = itemsHTML;

  // Update Footer totals
  if (footerEl) {
    footerEl.innerHTML = `
      <div class="cart-calc-row">
        <span>Total Items</span>
        <span>${totalQty}</span>
      </div>
      <div class="cart-calc-row">
        <span>Estimated Prep Time</span>
        <span style="color:var(--success); font-weight:600;">⚡ 10–15 Mins</span>
      </div>
      <div class="cart-calc-row total-row">
        <span>Grand Total</span>
        <span class="cart-total-value">₹${totalPrice}</span>
      </div>
      <a href="checkout.html" class="btn btn-primary btn-block" style="margin-top:0.5rem;" onclick="closeCartDrawer()">
        Proceed to Checkout →
      </a>
      <button class="btn btn-secondary btn-sm btn-block" onclick="clearCart()">
        Clear Cart
      </button>
    `;
  }
}

/* ==========================================================================
   5. HOME PAGE CONTROLLER
   ========================================================================== */
function initHomePage() {
  // Render Today's Special Card
  const specialContainer = document.querySelector('.today-special-container');
  const specialItem = MENU_DATA.find(item => item.special) || MENU_DATA[0];

  if (specialContainer && specialItem) {
    specialContainer.innerHTML = `
      <div class="special-card">
        <div class="special-image-wrap">
          <span class="special-pill">⭐ Today's Special</span>
          <img src="${specialItem.image}" alt="${specialItem.name}" onerror="this.src='assets/images/masala-dosa.svg'">
        </div>
        <div class="special-content">
          <span class="special-category">${specialItem.category} • Freshly Made</span>
          <h3 class="special-name">${specialItem.name}</h3>
          <p class="special-desc">${specialItem.description}</p>
          <div class="special-footer">
            <span class="special-price">₹${specialItem.price}</span>
            <button class="btn btn-primary btn-lg" onclick="handleSpecialOrder(${specialItem.id})">
              Order Now →
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Render Popular Items (Subset of popular foods)
  const popularContainer = document.querySelector('.popular-food-grid');
  if (popularContainer) {
    const popularItems = MENU_DATA.filter(item => item.popular).slice(0, 6);
    popularContainer.innerHTML = popularItems.map(item => createFoodCardHTML(item)).join('');
  }
}

// Handler for Today's Special CTA
function handleSpecialOrder(foodId) {
  addToCart(foodId, 1);
  openCartDrawer();
}

/* ==========================================================================
   6. MENU PAGE CONTROLLER
   ========================================================================== */
let activeCategory = 'All';
let searchQuery = '';
let sortOrder = 'default';

function initMenuPage() {
  const searchInput = document.getElementById('foodSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const categoryPills = document.querySelectorAll('.filter-pill');
  const sortSelect = document.getElementById('sortSelect');

  // Check if student arrived from a category shortcut on Home page
  const savedCat = localStorage.getItem('menuCategory');
  if (savedCat) {
    activeCategory = savedCat;
    localStorage.removeItem('menuCategory');
    categoryPills.forEach(pill => {
      pill.classList.toggle('active', (pill.dataset.category || '').toLowerCase() === activeCategory.toLowerCase());
    });
  }

  // Search input typing listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle('visible', searchQuery.length > 0);
      }
      renderFilteredMenu();
    });
  }

  // Clear search button
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchQuery = '';
        clearSearchBtn.classList.remove('visible');
        searchInput.focus();
        renderFilteredMenu();
      }
    });
  }

  // Category filter button listeners
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.dataset.category || 'All';
      renderFilteredMenu();
    });
  });

  // Sort dropdown change listener
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortOrder = e.target.value;
      renderFilteredMenu();
    });
  }

  // Initial render of all menu items
  renderFilteredMenu();
}

function renderFilteredMenu() {
  const container = document.getElementById('menuGridContainer');
  const countIndicator = document.getElementById('menuCountIndicator');
  if (!container) return;

  // Filter by category and search term
  const filtered = MENU_DATA.filter(item => {
    const matchesCategory = (activeCategory === 'All') || (item.category.toLowerCase() === activeCategory.toLowerCase());
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery) ||
      item.description.toLowerCase().includes(searchQuery) ||
      item.category.toLowerCase().includes(searchQuery);

    return matchesCategory && matchesSearch;
  });

  // Apply sorting
  let sorted = [...filtered];
  if (sortOrder === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  }

  // Update match count indicator
  if (countIndicator) {
    countIndicator.textContent = `Showing ${sorted.length} dish${sorted.length === 1 ? '' : 'es'}`;
  }

  // Render Empty State if no matches found
  if (sorted.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">🔍</div>
        <h3 class="empty-state-title">No food items found</h3>
        <p class="empty-state-text">We couldn't find any dishes matching "${searchQuery}". Try searching with a different keyword or resetting filters.</p>
        <button class="btn btn-primary btn-sm" onclick="resetMenuFilters()">Clear Search & Filters</button>
      </div>
    `;
    return;
  }

  // Render matching cards
  container.innerHTML = sorted.map(item => createFoodCardHTML(item)).join('');
}

// Reset Search & Category Filters
function resetMenuFilters() {
  searchQuery = '';
  activeCategory = 'All';
  sortOrder = 'default';
  const searchInput = document.getElementById('foodSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const sortSelect = document.getElementById('sortSelect');
  if (searchInput) searchInput.value = '';
  if (clearSearchBtn) clearSearchBtn.classList.remove('visible');
  if (sortSelect) sortSelect.value = 'default';

  const categoryPills = document.querySelectorAll('.filter-pill');
  categoryPills.forEach(p => {
    p.classList.toggle('active', p.dataset.category === 'All');
  });

  renderFilteredMenu();
}

// Helper to construct a single Food Card HTML
function createFoodCardHTML(item) {
  const vegBadgeHTML = item.veg === false
    ? '<span class="nonveg-badge"><span class="nonveg-dot"></span> Non-Veg</span>'
    : '<span class="veg-badge"><span class="veg-dot"></span> Veg</span>';

  return `
    <div class="food-card" data-id="${item.id}">
      <div class="food-card-img-wrap">
        <span class="food-card-badge">${item.category}</span>
        <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='assets/images/masala-dosa.svg'">
      </div>
      <div class="food-card-body">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:0.5rem; margin-bottom:0.35rem;">
          <h4 class="food-card-title" style="margin-bottom:0;">${item.name}</h4>
          ${vegBadgeHTML}
        </div>
        <p class="food-card-desc">${item.description}</p>
        <div class="food-card-footer">
          <span class="food-card-price">₹${item.price}</span>
          <button class="btn-add-cart" onclick="addToCart(${item.id}, 1)" title="Add to Cart" aria-label="Add ${item.name} to Cart">
            <span>+ Add</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   7. DEDICATED CART PAGE CONTROLLER (cart.html)
   ========================================================================== */
function initCartPage() {
  renderCartPage();
}

function renderCartPage() {
  const container = document.getElementById('cartPageContainer');
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="max-width: 600px; margin: 3rem auto;">
        <div class="empty-state-icon">🛒</div>
        <h2 class="empty-state-title">Your cart is empty</h2>
        <p class="empty-state-text">Looks like you haven't selected any items yet. Check out today's delicious campus menu!</p>
        <a href="menu.html" class="btn btn-primary btn-lg">Browse Menu →</a>
      </div>
    `;
    return;
  }

  let totalQty = 0;
  let totalPrice = 0;

  const itemsListHTML = cart.map(item => {
    const subtotal = item.price * item.quantity;
    totalQty += item.quantity;
    totalPrice += subtotal;

    return `
      <div class="cart-item-card" style="padding: 1rem;">
        <div class="cart-item-thumb" style="width: 72px; height: 72px;">
          <img src="${item.image}" alt="${item.name}" onerror="this.src='assets/images/masala-dosa.svg'">
        </div>
        <div class="cart-item-info">
          <h4 class="cart-item-name" style="font-size: 1.05rem;">${item.name}</h4>
          <span class="badge badge-claret" style="font-size: 0.65rem; margin-bottom: 0.35rem;">${item.category}</span>
          <div class="cart-item-unit-price">₹${item.price} each</div>
          <div class="cart-item-subtotal" style="font-size: 1.1rem;">₹${subtotal}</div>
        </div>
        <div class="qty-control" style="border-radius: var(--radius-md);">
          <button class="qty-btn" style="width: 34px; height: 34px;" onclick="updateCartQuantity(${item.id}, -1)" title="Decrease quantity" aria-label="Decrease quantity">−</button>
          <span class="qty-display" style="width: 40px; font-size: 1rem;">${item.quantity}</span>
          <button class="qty-btn" style="width: 34px; height: 34px;" onclick="updateCartQuantity(${item.id}, 1)" title="Increase quantity" aria-label="Increase quantity">+</button>
        </div>
        <button class="cart-item-remove" style="padding: 8px;" onclick="removeFromCart(${item.id})" title="Remove item" aria-label="Remove item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="cart-page-grid">
      <!-- Left Column: Items Table / List -->
      <div class="cart-table-card">
        <div class="cart-table-header">
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--primary-dark);">Items in Cart (${totalQty})</h3>
          <button class="btn btn-secondary btn-sm" onclick="clearCart()">Clear All</button>
        </div>
        <div class="cart-page-items-list">
          ${itemsListHTML}
        </div>
      </div>

      <!-- Right Column: Order Summary Card -->
      <div class="summary-card">
        <h3 class="summary-title">Cart Summary</h3>
        <div class="cart-calc-row">
          <span>Items Total</span>
          <span>₹${totalPrice}</span>
        </div>
        <div class="cart-calc-row">
          <span>Campus Tax / Canteen Service</span>
          <span style="color:var(--success); font-weight:700;">₹0 (Included)</span>
        </div>
        <div class="cart-calc-row">
          <span>Estimated Pickup Time</span>
          <span style="color:var(--text-main); font-weight:600;">10–15 Mins</span>
        </div>
        <div class="cart-calc-row total-row">
          <span>Total Payable</span>
          <span class="cart-total-value">₹${totalPrice}</span>
        </div>
        <div class="summary-notes">
          💳 Payment integration can be added when a backend/payment gateway is introduced. For this version, you pay at counter during pickup.
        </div>
        <a href="checkout.html" class="btn btn-primary btn-block btn-lg">
          Proceed to Checkout →
        </a>
        <a href="menu.html" class="btn btn-secondary btn-block">
          ← Add More Items
        </a>
      </div>
    </div>
  `;
}

/* ==========================================================================
   8. CHECKOUT CONTROLLER (checkout.html)
   ========================================================================== */
function initCheckoutPage() {
  const cart = getCart();

  // Guard: Redirect or display empty notice if cart has 0 items
  if (cart.length === 0) {
    const mainContainer = document.querySelector('.checkout-container');
    if (mainContainer) {
      mainContainer.innerHTML = `
        <div class="empty-state" style="max-width: 600px; margin: 3rem auto;">
          <div class="empty-state-icon">🛒</div>
          <h2 class="empty-state-title">Your cart is empty</h2>
          <p class="empty-state-text">You must add at least one dish from the canteen menu before proceeding to checkout.</p>
          <a href="menu.html" class="btn btn-primary btn-lg">Browse Menu →</a>
        </div>
      `;
    }
    return;
  }

  // Render Sidebar Summary
  renderCheckoutSummary();

  // Bind Form Submission
  const form = document.getElementById('checkoutForm');
  if (form) {
    form.addEventListener('submit', handleCheckoutSubmit);
  }
}

function renderCheckoutSummary() {
  const container = document.getElementById('checkoutSummaryContainer');
  if (!container) return;

  const cart = getCart();
  let totalQty = 0;
  let totalPrice = 0;

  const itemsPreviewHTML = cart.map(item => {
    const sub = item.price * item.quantity;
    totalQty += item.quantity;
    totalPrice += sub;

    return `
      <div class="checkout-item-row">
        <div class="checkout-item-title">
          <span>${item.name}</span>
          <span class="checkout-item-qty">× ${item.quantity}</span>
        </div>
        <div class="checkout-item-price">₹${sub}</div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <h3 class="summary-title">Order Summary</h3>
    <div class="checkout-items-preview">
      ${itemsPreviewHTML}
    </div>
    <div class="cart-calc-row" style="padding-top:0.75rem; border-top:1px solid var(--border-color);">
      <span>Total Quantity</span>
      <span>${totalQty} items</span>
    </div>
    <div class="cart-calc-row">
      <span>Subtotal</span>
      <span>₹${totalPrice}</span>
    </div>
    <div class="cart-calc-row">
      <span>Campus Canteen Fee</span>
      <span style="color:var(--success); font-weight:700;">₹0 (Free)</span>
    </div>
    <div class="cart-calc-row total-row">
      <span>Grand Total</span>
      <span class="cart-total-value">₹${totalPrice}</span>
    </div>
    <div class="summary-notes">
      ℹ️ Note: This is a frontend project demonstration. Payment integration can be added when a backend/payment gateway is introduced. Pay at the counter during pickup.
    </div>
  `;
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const cart = getCart();
  if (cart.length === 0) {
    showToast("Your cart is empty! Please add items.", "warning");
    return;
  }

  // Get Form Inputs
  const studentNameInput = document.getElementById('studentName');
  const rollNumberInput = document.getElementById('rollNumber');
  const classInput = document.getElementById('className');
  const phoneInput = document.getElementById('phone');
  const pickupTimeInput = document.getElementById('pickupTime');

  let isValid = true;

  // Validation 1: Student Name
  const studentName = studentNameInput.value.trim();
  if (studentName.length < 2) {
    setFieldError(studentNameInput, 'nameError', 'Please enter your full student name (min 2 letters).');
    isValid = false;
  } else {
    clearFieldError(studentNameInput, 'nameError');
  }

  // Validation 2: Roll Number
  const rollNumber = rollNumberInput.value.trim();
  if (!rollNumber || rollNumber.length < 3) {
    setFieldError(rollNumberInput, 'rollError', 'Please enter a valid college Roll Number.');
    isValid = false;
  } else {
    clearFieldError(rollNumberInput, 'rollError');
  }

  // Validation 3: Class / Semester
  const className = classInput.value.trim();
  if (!className) {
    setFieldError(classInput, 'classError', 'Please select or enter your class/course.');
    isValid = false;
  } else {
    clearFieldError(classInput, 'classError');
  }

  // Validation 4: Phone Number (Indian 10-digit mobile)
  const phone = phoneInput.value.trim();
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    setFieldError(phoneInput, 'phoneError', 'Please enter a valid 10-digit Indian mobile number (starts with 6, 7, 8, or 9).');
    isValid = false;
  } else {
    clearFieldError(phoneInput, 'phoneError');
  }

  // Validation 5: Pickup Time
  const pickupTime = pickupTimeInput.value.trim();
  if (!pickupTime) {
    setFieldError(pickupTimeInput, 'pickupError', 'Please select a preferred pickup time slot.');
    isValid = false;
  } else {
    clearFieldError(pickupTimeInput, 'pickupError');
  }

  if (!isValid) return;

  // Guard: disable button to prevent duplicate submissions
  const submitBtn = document.getElementById('placeOrderBtn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Placing Order...';
  }

  // Calculate Total
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Generate Unique Order ID: CC-2026-XXXXXX
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const orderId = `CC-2026-${randomSuffix}`;

  // Construct Order Object
  const newOrder = {
    orderId: orderId,
    studentName: studentName,
    rollNumber: rollNumber,
    className: className,
    phone: phone,
    pickupTime: pickupTime,
    items: cart,
    totalAmount: totalAmount,
    status: "Order Received",
    createdAt: new Date().toISOString()
  };

  // Persist Order and Clear Cart silently (avoid triggering confirm modal)
  saveOrder(newOrder);
  saveCart([]);

  showToast("Order placed successfully! Redirecting...", "success");

  // Navigate to order confirmation and tracking page
  setTimeout(() => {
    window.location.href = `order.html?orderId=${orderId}`;
  }, 600);
}

function setFieldError(inputEl, errorId, message) {
  inputEl.classList.add('is-invalid');
  const errorEl = document.getElementById(errorId);
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('visible');
  }
}

function clearFieldError(inputEl, errorId) {
  inputEl.classList.remove('is-invalid');
  const errorEl = document.getElementById(errorId);
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.remove('visible');
  }
}

/* ==========================================================================
   9. ORDER CONFIRMATION & TRACKING CONTROLLER (order.html)
   ========================================================================== */
const ORDER_STAGES = [
  "Order Received",
  "Preparing",
  "Ready for Pickup",
  "Completed"
];

const STAGE_MESSAGES = {
  "Order Received": {
    icon: "📋",
    title: "Order Received & Queued",
    desc: "Your token has been generated and Claret Canteen kitchen staff has received your order."
  },
  "Preparing": {
    icon: "🍳",
    title: "Chef is Preparing Your Food",
    desc: "Your meal is hot and fresh on the grill! Packing will commence shortly."
  },
  "Ready for Pickup": {
    icon: "🔔",
    title: "Ready for Pickup at Counter 2",
    desc: "Your food is freshly packed. Please head to Canteen Counter 2 with your Order ID."
  },
  "Completed": {
    icon: "🎉",
    title: "Order Completed & Picked Up",
    desc: "Thank you for dining at Claret Canteen! Have a great campus day."
  }
};

function initOrderPage() {
  const container = document.getElementById('orderPageContainer');
  if (!container) return;

  // Read orderId from URL query param if present
  const params = new URLSearchParams(window.location.search);
  const targetOrderId = params.get('orderId');

  let order = null;
  if (targetOrderId) {
    const allOrders = getOrders();
    order = allOrders.find(o => o.orderId === targetOrderId);
  }

  // Fallback to most recent order if not specified in URL
  if (!order) {
    order = getCurrentOrder();
  }

  // If no order exists at all: Empty State
  if (!order) {
    container.innerHTML = `
      <div class="empty-state" style="max-width: 600px; margin: 3rem auto;">
        <div class="empty-state-icon">📋</div>
        <h2 class="empty-state-title">No Active Order Found</h2>
        <p class="empty-state-text">You don't have any placed orders yet. Order something delicious from the canteen to start tracking!</p>
        <a href="menu.html" class="btn btn-primary btn-lg">Browse Menu →</a>
      </div>
    `;
    return;
  }

  renderOrderDetails(order);

  // Real-time Cloud Firestore subscription
  if (window.ClaretFirebase && typeof window.ClaretFirebase.subscribeToOrder === 'function') {
    window.ClaretFirebase.subscribeToOrder(order.orderId, (liveOrder) => {
      if (liveOrder && liveOrder.status && liveOrder.status !== order.status) {
        order.status = liveOrder.status;
        renderOrderDetails(order);
        showToast(`☁️ Cloud sync: Order is now '${liveOrder.status}'`, 'info');
      }
    });
  }
}

function renderOrderDetails(order) {
  const container = document.getElementById('orderPageContainer');
  if (!container) return;

  // Format creation timestamp
  const orderDate = new Date(order.createdAt || Date.now());
  const formattedDate = orderDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Calculate current tracking stage index
  let stageIdx = ORDER_STAGES.indexOf(order.status);
  if (stageIdx === -1) stageIdx = 0;

  // Items table HTML
  const itemsRows = order.items.map(item => `
    <tr>
      <td><strong>${item.name}</strong> <span style="font-size:0.8rem; color:var(--text-muted);">(${item.category})</span></td>
      <td>₹${item.price}</td>
      <td>${item.quantity}</td>
      <td style="font-weight:700; color:var(--primary);">₹${item.price * item.quantity}</td>
    </tr>
  `).join('');

  // Status message lookup
  const currentNarrative = STAGE_MESSAGES[order.status] || STAGE_MESSAGES["Order Received"];

  container.innerHTML = `
    <!-- 1. Success Banner -->
    <div class="order-success-card">
      <div class="order-success-banner">
        <div class="order-check-icon">✓</div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you, <strong>${order.studentName}</strong>! Your order token has been sent to the canteen kitchen.</p>
      </div>

      <!-- Receipt Meta Information -->
      <div class="order-receipt-content">
        <div class="order-info-meta-grid">
          <div class="meta-group">
            <span class="meta-label">Order Token / ID</span>
            <span class="meta-value order-id-highlight">${order.orderId}</span>
          </div>
          <div class="meta-group">
            <span class="meta-label">Student Details</span>
            <span class="meta-value">${order.studentName} (${order.rollNumber})</span>
            <span style="font-size:0.85rem; color:var(--text-muted);">${order.className}</span>
          </div>
          <div class="meta-group">
            <span class="meta-label">Pickup Time Slot</span>
            <span class="meta-value" style="color:var(--accent-gold);">${order.pickupTime}</span>
          </div>
          <div class="meta-group">
            <span class="meta-label">Order Date & Time</span>
            <span class="meta-value" style="font-size:0.95rem;">${formattedDate}</span>
          </div>
          <div class="meta-group">
            <span class="meta-label">Cloud Database</span>
            <span class="meta-value" style="font-size:0.92rem; color:var(--success);">☁️ Firebase (claretcanteen)</span>
          </div>
        </div>

        <!-- Ordered Items Table -->
        <h3 style="font-size:1.15rem; font-weight:700; color:var(--primary-dark); margin-top:0.5rem;">Ordered Items</h3>
        <table class="order-items-table">
          <thead>
            <tr>
              <th>Dish</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRows}
          </tbody>
        </table>

        <div class="order-total-highlight">
          <span style="font-size: 1.1rem; color: var(--text-muted);">Total Amount:</span>
          <span>₹${order.totalAmount}</span>
        </div>
      </div>
    </div>

    <!-- 2. Visual Order Tracking Timeline -->
    <div class="tracking-card" id="trackingSection">
      <div class="tracking-header">
        <div>
          <h2>Order Tracking</h2>
          <p style="font-size:0.9rem; color:var(--text-muted);">Real-time status updates for order <strong>${order.orderId}</strong></p>
        </div>
        <span class="tracking-status-badge ${stageIdx === 3 ? 'badge-green' : 'badge-gold'}">
          ● Status: ${order.status}
        </span>
      </div>

      <!-- Timeline Nodes -->
      <div class="timeline-track">
        <div class="timeline-progress-bar" id="timelineProgressBar"></div>
        
        <div class="timeline-step ${stageIdx > 0 ? 'completed' : (stageIdx === 0 ? 'active' : '')}">
          <div class="step-node">${stageIdx > 0 ? '✓' : '1'}</div>
          <div class="step-label">Order Received</div>
        </div>

        <div class="timeline-step ${stageIdx > 1 ? 'completed' : (stageIdx === 1 ? 'active' : '')}">
          <div class="step-node">${stageIdx > 1 ? '✓' : '2'}</div>
          <div class="step-label">Preparing</div>
        </div>

        <div class="timeline-step ${stageIdx > 2 ? 'completed' : (stageIdx === 2 ? 'active' : '')}">
          <div class="step-node">${stageIdx > 2 ? '✓' : '3'}</div>
          <div class="step-label">Ready for Pickup</div>
        </div>

        <div class="timeline-step ${stageIdx === 3 ? 'completed' : ''}">
          <div class="step-node">${stageIdx === 3 ? '✓' : '4'}</div>
          <div class="step-label">Completed</div>
        </div>
      </div>

      <!-- Live Narrative Description -->
      <div class="status-narrative-box">
        <div class="status-narrative-icon">${currentNarrative.icon}</div>
        <div class="status-narrative-text">
          <strong>${currentNarrative.title}</strong>
          <p>${currentNarrative.desc}</p>
        </div>
      </div>

      <!-- Demo Simulator Control Panel for Project Viva -->
      <div class="demo-control-panel">
        <div class="demo-banner-title">
          <span>⚡ Demo Tracking Simulation (College Viva / Presentation Mode)</span>
        </div>
        <p style="font-size:0.85rem; color:#92400E; margin:0;">
          Since this is a client-side project without a live canteen kitchen socket server, use these controls to demonstrate real-time status transitions for your examiner.
        </p>
        <div class="demo-buttons-group">
          <button class="btn btn-primary btn-sm" onclick="advanceDemoStatus('${order.orderId}')" ${stageIdx === 3 ? 'disabled' : ''}>
            ${stageIdx === 3 ? '✓ Order Completed' : 'Simulate Next Status →'}
          </button>
          <button class="btn btn-secondary btn-sm" onclick="resetDemoStatus('${order.orderId}')">
            Reset Status to "Order Received"
          </button>
          <a href="menu.html" class="btn btn-outline btn-sm" style="margin-left:auto;">Order More Items</a>
        </div>
      </div>
    </div>
  `;

  // Set Progress bar width / height for CSS
  updateProgressBar(stageIdx);
}

// Update Timeline Progress Bar Length
function updateProgressBar(stageIdx) {
  const bar = document.getElementById('timelineProgressBar');
  if (!bar) return;

  const percentages = [0, 33.33, 66.66, 100];
  const pct = percentages[stageIdx] || 0;

  // Desktop width
  bar.style.width = `calc(${pct}% * 0.88)`;
  // Mobile height
  document.documentElement.style.setProperty('--mobile-prog', `${pct}%`);
}

// Advance Demo Status to next stage
function advanceDemoStatus(orderId) {
  const current = getCurrentOrder();
  if (!current || current.orderId !== orderId) return;

  let currentIdx = ORDER_STAGES.indexOf(current.status);
  if (currentIdx < ORDER_STAGES.length - 1) {
    const nextStatus = ORDER_STAGES[currentIdx + 1];
    updateOrderStatus(orderId, nextStatus);
    showToast(`Status updated: ${nextStatus}!`, "success");
    // Re-render view
    renderOrderDetails(getCurrentOrder());
  }
}

// Reset Demo Status back to Order Received
function resetDemoStatus(orderId) {
  updateOrderStatus(orderId, ORDER_STAGES[0]);
  showToast("Status reset to 'Order Received'.", "warning");
  renderOrderDetails(getCurrentOrder());
}

// Safe HTML Escaping Helper for student user inputs
function escapeHTML(str) {
  if (typeof str !== 'string') return String(str ?? '');
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

/* ==========================================================================
   10. ADMIN DASHBOARD CONTROLLER (admin.html)
   ========================================================================== */
function initAdminPage() {
  renderAdminStats();
  renderAdminOrders();

  const searchInput = document.getElementById('adminSearchInput');
  const filterSelect = document.getElementById('adminFilterStatus');

  if (searchInput) {
    searchInput.addEventListener('input', renderAdminOrders);
  }
  if (filterSelect) {
    filterSelect.addEventListener('change', renderAdminOrders);
  }
}

function renderAdminStats() {
  const orders = getOrders();
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
  const completed = orders.filter(o => o.status === 'Completed').length;
  const pending = orders.filter(o => o.status !== 'Completed').length;

  const el = (id) => document.getElementById(id);
  if (el('adminTotalOrders'))  el('adminTotalOrders').textContent  = orders.length;
  if (el('adminTotalRevenue')) el('adminTotalRevenue').textContent = '₹' + totalRevenue;
  if (el('adminCompleted'))    el('adminCompleted').textContent    = completed;
  if (el('adminPending'))      el('adminPending').textContent      = pending;
}

function renderAdminOrders() {
  const container = document.getElementById('adminOrdersList');
  if (!container) return;

  let orders = getOrders();
  const searchInput = document.getElementById('adminSearchInput');
  const filterSelect = document.getElementById('adminFilterStatus');

  const searchQuery = (searchInput ? searchInput.value : '').toLowerCase().trim();
  const filterStatus = filterSelect ? filterSelect.value : 'All';

  if (searchQuery) {
    orders = orders.filter(o =>
      (o.orderId && o.orderId.toLowerCase().includes(searchQuery)) ||
      (o.studentName && o.studentName.toLowerCase().includes(searchQuery)) ||
      (o.rollNumber && o.rollNumber.toLowerCase().includes(searchQuery))
    );
  }

  if (filterStatus !== 'All') {
    orders = orders.filter(o => o.status === filterStatus);
  }

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="admin-empty-state">
        <div class="admin-empty-icon">📋</div>
        <h3 style="color:var(--text-main); margin-bottom:0.5rem;">No Orders Found</h3>
        <p>No orders currently match your search or filter criteria in this browser.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map(order => {
    const statusClass = {
      'Order Received': 'status-received',
      'Preparing': 'status-preparing',
      'Ready for Pickup': 'status-ready',
      'Completed': 'status-completed'
    }[order.status] || 'status-received';

    const orderDate = new Date(order.createdAt || Date.now()).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const safeId = escapeHTML(order.orderId);
    const safeName = escapeHTML(order.studentName);
    const safeRoll = escapeHTML(order.rollNumber);
    const safeClass = escapeHTML(order.className);
    const safePhone = escapeHTML(order.phone);
    const safePickup = escapeHTML(order.pickupTime);

    const itemsHTML = (order.items || []).map(item => `
      <div class="admin-order-item-row">
        <span>${escapeHTML(item.name)} × ${item.quantity}</span>
        <span style="font-weight:600;">₹${item.price * item.quantity}</span>
      </div>
    `).join('');

    return `
      <div class="admin-order-card" data-order-id="${safeId}">
        <div class="admin-order-header" onclick="toggleAdminOrderBody('body-${safeId}')">
          <div>
            <div class="admin-order-id">${safeId}</div>
            <div class="admin-order-student">${safeName} &bull; ${safeRoll} &bull; ${safeClass}</div>
          </div>
          <div style="display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap;">
            <span class="status-pill ${statusClass}">${escapeHTML(order.status)}</span>
            <span style="font-size:0.8rem; color:var(--text-muted);">${orderDate}</span>
            <span style="font-weight:700; color:var(--primary); font-size:1.05rem;">₹${order.totalAmount}</span>
            <span style="color:var(--text-muted); font-size:0.8rem;">▼</span>
          </div>
        </div>
        <div class="admin-order-body" id="body-${safeId}">
          <div class="admin-order-items-list">
            ${itemsHTML}
            <div class="admin-order-item-row" style="font-weight:700; border-top:1px solid var(--border-color); padding-top:0.5rem; margin-top:0.35rem;">
              <span>Total Payable</span>
              <span style="color:var(--primary);">₹${order.totalAmount}</span>
            </div>
          </div>
          <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.75rem;">
            📞 <strong>Phone:</strong> ${safePhone} &nbsp;|&nbsp; ⏰ <strong>Pickup Slot:</strong> ${safePickup}
          </div>
          <div class="admin-status-control">
            <label for="status-${safeId}">Update Status:</label>
            <select id="status-${safeId}" onchange="adminChangeStatus('${safeId}', this.value)">
              <option value="Order Received" ${order.status === 'Order Received' ? 'selected' : ''}>Order Received</option>
              <option value="Preparing" ${order.status === 'Preparing' ? 'selected' : ''}>Preparing</option>
              <option value="Ready for Pickup" ${order.status === 'Ready for Pickup' ? 'selected' : ''}>Ready for Pickup</option>
              <option value="Completed" ${order.status === 'Completed' ? 'selected' : ''}>Completed</option>
            </select>
            <a href="order.html?orderId=${safeId}" target="_blank" class="btn btn-secondary btn-sm" style="font-size:0.78rem;">
              View Student Receipt ↗
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function toggleAdminOrderBody(bodyId) {
  const body = document.getElementById(bodyId);
  if (body) {
    body.classList.toggle('expanded');
  }
}

function adminChangeStatus(orderId, newStatus) {
  updateOrderStatus(orderId, newStatus);
  showToast(`Order ${orderId} updated to "${newStatus}"`, 'success');
  renderAdminStats();
  renderAdminOrders();
}

/* ==========================================================================
   11. PAGE INITIALIZATION & ROUTER
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Global Navbar and Drawer on all pages
  initNav();

  // Route page-specific logic based on data-page attribute
  const activePage = document.body.dataset.page;

  switch (activePage) {
    case 'home':
      initHomePage();
      break;
    case 'menu':
      initMenuPage();
      break;
    case 'cart':
      initCartPage();
      break;
    case 'checkout':
      initCheckoutPage();
      break;
    case 'order':
      initOrderPage();
      break;
    case 'admin':
      initAdminPage();
      break;
    default:
      // Default fallback
      break;
  }
});
