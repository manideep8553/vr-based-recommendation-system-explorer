import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

// --- Configuration Replace this with your own for Firebase! ---
export const firebaseConfig = {

  apiKey: "AIzaSyB4n9vqZa--xGRnzbqXByPiEqNQzEsTStE",
  authDomain: "vr-recommendation-system.firebaseapp.com",
  databaseURL: "https://vr-recommendation-system-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vr-recommendation-system",
  storageBucket: "vr-recommendation-system.firebasestorage.app",
  messagingSenderId: "185204701885",
  appId: "1:185204701885:web:6973de453203a8da4295d4",
  measurementId: "G-Y7RXZKRX9C"

};

// Initialize App & DB
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Simple Content-Based Recommender Logic
// Local JSON Data Store (Zero-Fail Strategy)
let cachedData = null;

async function loadLocalData() {
  if (cachedData) return cachedData;
  try {
    const response = await fetch('./Database/sample_items.json');
    const data = await response.json();
    cachedData = data.items;
    return cachedData;
  } catch (err) {
    console.error("Local Data Failure:", err);
    return [];
  }
}

export async function getRecommendations(category, userTags, subCategory = null) {
  try {
    const items = await loadLocalData();
    
    // Filter by Category and Sub-Category exactly
    let filtered = items.filter(item => 
      item.category === category && (subCategory ? item.subCategory === subCategory : true)
    );

    // Shuffle and pick 10 for diversity
    return filtered.sort(() => 0.5 - Math.random()).slice(0, 10);
  } catch (error) {
    console.error("Engine Error:", error);
    return [];
  }
}
