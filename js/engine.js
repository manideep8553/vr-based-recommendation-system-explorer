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
    
    // Exact category + subCategory lookup
    if (subCategory) {
      q = query(itemsRef, where("category", "==", category), where("subCategory", "==", subCategory));
    } else {
      q = query(itemsRef, where("category", "==", category));
    }

    const querySnapshot = await getDocs(q);
    let results = [];

    querySnapshot.forEach((doc) => {
      const item = doc.data();
      // SHOW ALL ITEMS in that Category (No restrictive tag filtering)
      results.push({ id: doc.id, ...item });
    });

    // Shuffle & Sort by Rating for 360 Immersive Diversity
    return results.sort(() => 0.5 - Math.random()) // Randomize for fresh discovery
                 .sort((a,b) => b.rating - a.rating)
                 .slice(0, 10);
  } catch (error) {
    console.error("Firebase Error: ", error);
    return [];
  }
}
