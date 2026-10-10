/**
 * ==========================================================================
 * CLARET CANTEEN — FIREBASE DATABASE CONFIGURATION
 * Cloud Firestore & Analytics Integration (BCA Final Year Project)
 * ==========================================================================
 * Project ID: claretcanteen
 * Services:
 *  - Firebase App Initialization
 *  - Firebase Analytics
 *  - Cloud Firestore Database for real-time Order Persistence & Tracking
 * ==========================================================================
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// User's Web App Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjoLPTnGTx3uucroWWmYst6mED4NMcOyo",
  authDomain: "claretcanteen.firebaseapp.com",
  projectId: "claretcanteen",
  storageBucket: "claretcanteen.firebasestorage.app",
  messagingSenderId: "938749526594",
  appId: "1:938749526594:web:b15d55b15f35de0ecba3db",
  measurementId: "G-JDD2Q91TEX"
};

// Initialize Firebase
let app = null;
let analytics = null;
let db = null;
let isReady = false;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  isReady = true;
  console.log("✅ [Firebase] Claret Canteen connected to project: claretcanteen");

  // Initialize Analytics if browser supports it
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log("📊 [Firebase] Analytics initialized.");
    }
  }).catch(() => {
    // Silent catch for local environments
  });
} catch (err) {
  console.warn("⚠️ [Firebase] Could not initialize Firebase directly. Using local fallback.", err);
  isReady = false;
}

/**
 * Cloud Firestore Operations for Claret Canteen Orders
 */
const ClaretFirebase = {
  app,
  analytics,
  db,
  isReady,

  /**
   * Save a new student order to Firestore collection 'orders'
   * Document ID: order.orderId (e.g. CC-2026-482913)
   */
  async saveOrder(order) {
    if (!db || !isReady) return null;
    try {
      const orderRef = doc(db, "orders", order.orderId);
      const payload = {
        ...order,
        cloudSynced: true,
        cloudSyncedAt: new Date().toISOString()
      };
      await setDoc(orderRef, payload);
      console.log(`☁️ [Firebase] Order ${order.orderId} stored in Cloud Firestore!`);
      return payload;
    } catch (err) {
      console.warn("⚠️ [Firebase] Failed to write order to Firestore (offline or rule restricted). LocalStorage preserved.", err);
      return null;
    }
  },

  /**
   * Fetch an existing order from Firestore by orderId
   */
  async getOrder(orderId) {
    if (!db || !isReady) return null;
    try {
      const orderRef = doc(db, "orders", orderId);
      const snapshot = await getDoc(orderRef);
      if (snapshot.exists()) {
        return snapshot.data();
      }
      return null;
    } catch (err) {
      console.warn(`⚠️ [Firebase] Failed to fetch order ${orderId} from Firestore:`, err);
      return null;
    }
  },

  /**
   * Update the status of an existing order in Firestore
   */
  async updateOrderStatus(orderId, newStatus) {
    if (!db || !isReady) return false;
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
      console.log(`☁️ [Firebase] Order ${orderId} status updated to '${newStatus}' in Firestore.`);
      return true;
    } catch (err) {
      console.warn(`⚠️ [Firebase] Could not update order ${orderId} in Firestore:`, err);
      return false;
    }
  },

  /**
   * Real-time listener for order status changes (WebSockets/Firestore snapshot)
   */
  subscribeToOrder(orderId, callback) {
    if (!db || !isReady) return null;
    try {
      const orderRef = doc(db, "orders", orderId);
      return onSnapshot(orderRef, (docSnap) => {
        if (docSnap.exists() && typeof callback === 'function') {
          callback(docSnap.data());
        }
      }, (err) => {
        console.warn("⚠️ [Firebase] Snapshot listener error:", err);
      });
    } catch (err) {
      console.warn("⚠️ [Firebase] Could not subscribe to order changes:", err);
      return null;
    }
  }
};

// Expose on global window object for script.js
window.ClaretFirebase = ClaretFirebase;
export default ClaretFirebase;
