# Claret Canteen — Campus Food Ordering System

A complete, professional, and fully responsive campus food-ordering web application built as an academic **BCA Final Year / Semester Project**. 

The system solves the common problem of long break-time queues at the college canteen by enabling students and faculty to browse real-time menus, filter by diet and category, sort by price, add items to a digital tray, place pickup orders with custom break-time slots, and track the progress of their food live through an interactive status timeline. In addition, an **Admin Dashboard** provides canteen staff with an order management interface.

---

## 📸 Key Features

1. **Brand Identity & Responsive UI**:
   - Modern, appetizing **Deep Forest Green** (`#1A5C38`), warm campus cream (`#FDFBF7`), and warm amber (`#E65C00`) accents.
   - Fully responsive across desktop, tablet, and mobile with an accessible hamburger navigation.
   - Clean typography, rounded cards, subtle shadows, and zero-dependency SVG illustrations.

2. **Home Page (`index.html`)**:
   - Hero section with clear call-to-actions ("Order Food" & "View Menu").
   - Highlighted **Today's Special** ("Masala Dosa — ₹60") with direct order action.
   - Popular campus dishes grid.
   - **Category Shortcuts**: One-tap navigation for Breakfast, Lunch, Snacks, Fast Food, and Beverages.
   - **How It Works**: 3-step explanation of digital ordering.
   - **Student Promotional Banner**: Highlighting pocket-friendly campus pricing.
   - "Why Choose Claret Canteen?" value cards and canteen timings.

3. **Menu Page (`menu.html`)**:
   - Complete 17-item dynamic food menu spanning **Breakfast**, **Lunch**, **Snacks**, **Fast Food**, and **Beverages**.
   - **Veg / Non-Veg Labels**: Clear dietary indicators on every dish (green for vegetarian, red for non-vegetarian).
   - **Sorting by Price**: Sort dishes by "Price: Low to High" and "Price: High to Low".
   - **Real-Time Search Bar**: Instant filtering by dish name, ingredients, or category.
   - **Category Filter Pills**: Quick tab switching between meals.
   - **Combined Filtering**: Search, category filters, and price sorting work seamlessly together.
   - **Friendly Empty State**: Helpful suggestions when no search results match.

4. **Cart System (Slide-out Drawer & `cart.html`)**:
   - Accessible from any page via the navigation bar cart button with a dynamic count badge.
   - Quantity controls: increment `[+]`, decrement `[-]`, and remove `[🗑]`.
   - **Clear Cart with Confirmation**: Friendly confirmation modal prevents accidental cart wiping.
   - Real-time subtotal and total calculation using Indian Rupee (`₹`) formatting.
   - Empty cart state with quick link to browse the menu.
   - Full persistence across page refreshes via `localStorage` (`claretCanteenCart`).

5. **Student Checkout (`checkout.html`)**:
   - Comprehensive form validation:
     - **Student Name** (min 2 characters, required)
     - **College Roll Number** (required)
     - **Class / Semester** (required dropdown)
     - **Phone Number** (strictly validated 10-digit Indian mobile format `^[6-9]\d{9}$`)
     - **Pickup Break Slot** (10:30 AM, 12:45 PM, 1:15 PM, 3:30 PM, or immediate)
   - Live Order Summary sidebar displaying items, quantities, and grand total.
   - Guard preventing empty cart checkout.
   - **Duplicate Submission Guard**: Button locks and disables upon submission to prevent double-ordering.

6. **Order Confirmation & Tracking (`order.html`)**:
   - Generated genuine unique token ID: `CC-2026-XXXXXX`.
   - Complete digital receipt with itemized breakdown and student credentials.
   - **Visual 4-Stage Tracking Timeline**:
     1. `Order Received` &rarr; 2. `Preparing` &rarr; 3. `Ready for Pickup` &rarr; 4. `Completed`
   - Horizontal timeline on desktop, adapting smoothly to vertical on mobile.
   - **Demo Tracking Simulation**: Includes a *"Simulate Next Status"* button so students can demonstrate stage transitions live during project evaluations and viva voce.

7. **Admin Dashboard (`admin.html`)**:
   - **Order Management Panel**: Designed for canteen managers to view all active and historical student orders.
   - **Live Metric Cards**: Displays Total Orders, Total Revenue, Completed orders, and Pending orders.
   - **Search & Filter**: Search orders by Order ID, Student Name, or Roll Number; filter by status.
   - **Status Updater**: Directly advance orders through the 4 stages.
   - **Receipt Shortcut**: Quick link to view the student digital receipt for any order.
   - Clearly labelled as an academic frontend demonstration.

---

## 🛠️ Technologies Used

* **HTML5**: Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`) with ARIA accessibility labels.
* **CSS3**: Modern CSS Grid, Flexbox, custom CSS variables, keyframe animations, media queries for all viewports.
* **Vanilla JavaScript (ES6+)**: Clean, modular, beginner-friendly functions without third-party frameworks.
* **Firebase (Google Cloud Backend)**:
  - **Firebase App & Analytics**: Project ID `claretcanteen`
  - **Cloud Firestore**: Real-time cloud document database storing orders under the `orders` collection.
  - **Real-Time Snapshot Listener**: Automatic live UI updates when an order status changes in the cloud.
* **Google Gemini AI**:
  - **Model**: `gemini-1.5-flash`
  - **Campus Assistant**: Recommends dishes by budget, break times, and diet.
  - **Interactive Tray Integration**: Directly add recommended dishes to the cart from chat.
  - **Zero-Failure Fallback Engine**: Intelligent local rule-based system ensuring 100% viva presentation reliability.
* **Web Storage API (`localStorage`)**: Client-side storage and fast local cache ensuring 100% offline uptime.
* **Local SVG Vector Graphics**: Lightweight, offline-ready vector illustrations for all 17 dishes.

---

## 📁 Project Structure

```text
Claret-Canteen/
│
├── index.html            # Home page (Hero, Today's Special, Shortcuts, How It Works)
├── menu.html             # Full food menu with search, category filters & price sort
├── cart.html             # Dedicated cart tray page with quantity steppers
├── checkout.html         # Student verification & break slot checkout
├── order.html            # Order receipt and visual 4-stage tracking timeline
├── admin.html            # Canteen staff admin order management dashboard
├── firebase-config.js    # Firebase App, Analytics & Cloud Firestore database setup
├── gemini-assistant.js   # Google Gemini AI assistant & dining recommendation engine
├── style.css             # Unified responsive stylesheet and design system
├── script.js             # Modular application controller and data layer
├── README.md             # Project documentation and viva guide
│
└── assets/
    └── images/           # Offline-safe SVG food illustrations & logos
        ├── logo.svg
        ├── canteen-hero.svg
        ├── masala-dosa.svg
        ├── idli.svg
        ├── vada.svg
        ├── poori.svg
        ├── veg-meals.svg
        ├── fried-rice.svg
        ├── chicken-rice.svg
        ├── paneer-biryani.svg
        ├── samosa.svg
        ├── sandwich.svg
        ├── veg-puff.svg
        ├── burger.svg
        ├── french-fries.svg
        ├── tea.svg
        ├── coffee.svg
        ├── fresh-juice.svg
        └── cold-coffee.svg
```

---

## 🚀 How to Run Locally

### Option 1: Using Python HTTP Server (Recommended)

1. Open PowerShell or Command Prompt in the project folder:
   ```powershell
   cd C:\Users\Lenovo\.gemini\antigravity\scratch\Claret-Canteen
   ```
2. Start the local server:
   ```powershell
   py -m http.server 8080
   ```
   *(If `py` is not recognized, use `python -m http.server 8080`)*
3. Open your browser and navigate to:
   ```
   http://localhost:8080/index.html
   ```

### Option 2: Using VS Code / Cursor "Live Server"

1. Open the `Claret-Canteen` folder in VS Code or Cursor.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` &rarr; click **"Open with Live Server"**.
4. The application will launch at `http://127.0.0.1:5500/index.html`.

> [!IMPORTANT]
> **Why use an HTTP server instead of double-clicking `index.html`?**  
> Modern web features like ES Modules (`firebase-config.js`) and REST API fetch calls (`gemini-assistant.js`) require an HTTP origin. Opening directly via `file://` will cause browser CORS security restrictions.

---

## 🎓 BCA Viva Voce Demonstration Guide

When presenting this project to your examiner, follow this 6-step flow:

1. **Architecture Overview**:
   - Explain the MVC-inspired structure: `MENU_DATA` (Model), HTML/CSS (View), and `script.js` (Controller).
   - Point out that there is zero heavy framework overhead (no React/Node needed for pure client speed).

2. **Dietary Awareness & Sorting**:
   - Open `/menu.html`. Show the **Veg** and **Non-Veg** badges.
   - Use the **Sort by** dropdown to show items sorted from lowest price (`₹15` Masala Chai) to highest (`₹110` Chicken Fried Rice).

3. **Cart Safety**:
   - Add items to the cart. Show how the navbar badge updates live.
   - Click "Clear All" in the cart to showcase the **Confirmation Modal** preventing accidental data loss.

4. **Validation & Duplicate Protection**:
   - Go to checkout and attempt to submit an empty form. Show the custom inline errors.
   - Show how the phone field validates against Indian 10-digit mobile standards (`/^[6-9]\d{9}$/`).
   - On valid submit, show how the submit button locks to prevent double order submissions.

5. **Order Tracking & Admin Sync**:
   - Submit an order. Show the digital receipt and 4-stage tracking timeline on `order.html`.
   - Open `admin.html` in a second tab. Show the order appearing in the admin dashboard!
   - Change the status in the Admin panel &rarr; show how `updateOrderStatus()` synchronizes across localStorage and Firebase!

6. **Gemini AI Integration**:
   - Click the floating `✨ Claret AI` button. Ask *"Recommend a lunch meal under ₹100"* or *"What snacks are quick?"*.
   - Click the `[+ Add]` chip directly in the AI response to show tray integration.

---

## 📌 Project Limitations & Production Roadmap

* **Browser-Specific LocalStorage**: In this demonstration version, orders are stored in the current browser's `localStorage`. Orders placed in Chrome will not automatically show in Edge on the same computer unless synced via Firebase.
* **Authentication**: The student checkout collects details for counter verification without requiring password accounts. The Admin panel is a demonstration interface. A commercial production deployment would include JWT-based staff authentication and role-based access control (RBAC).
* **Payment Gateway**: Current workflow assumes payment at pickup counter. Future iterations could integrate UPI / Razorpay payment webhooks.
