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
export async function getRecommendations(category, userTags, subCategory = null) {
  try {
    const itemsRef = collection(db, "items");
    let q;
    
    if (subCategory) {
      q = query(itemsRef, where("category", "==", category), where("subCategory", "==", subCategory));
    } else {
      q = query(itemsRef, where("category", "==", category));
    }

    const querySnapshot = await getDocs(q);

    let recommended = [];

    querySnapshot.forEach((doc) => {
      const item = doc.data();
      // Simple tag intersection
      const matches = item.tags.filter(tag => userTags.includes(tag));
      if (matches.length > 0) {
        recommended.push({ id: doc.id, ...item, matchCount: matches.length });
      }
    });

    // Sort by match count & rating - Return Top 10 for 360 Circle
    return recommended.sort((a, b) => b.matchCount - a.matchCount || b.rating - a.rating).slice(0, 10);
  } catch (error) {
    console.error("Firebase Error: ", error);
    return [];
  }
}
