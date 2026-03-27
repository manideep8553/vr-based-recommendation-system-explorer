import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import fs from 'fs';

// --- YOUR FIREBASE CONFIG (FETCHED FROM ENGINE.JS) ---
const firebaseConfig = {
  apiKey: "AIzaSyB4n9vqZa--xGRnzbqXByPiEqNQzEsTStE",
  authDomain: "vr-recommendation-system.firebaseapp.com",
  databaseURL: "https://vr-recommendation-system-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vr-recommendation-system",
  storageBucket: "vr-recommendation-system.firebasestorage.app",
  messagingSenderId: "185204701885",
  appId: "1:185204701885:web:6973de453203a8da4295d4",
  measurementId: "G-Y7RXZKRX9C"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function importData() {
    console.log("🚀 Starting Elite Unique Data Import...");
    
    try {
        const data = JSON.parse(fs.readFileSync('./Database/sample_items.json', 'utf8'));
        const items = data.items;

        // --- 1. CLEAN PREVIOUS DATA ---
        console.log("🧹 Wiping previous entries to prevent duplicates...");
        const snapshot = await getDocs(collection(db, "items"));
        for (const docSnap of snapshot.docs) {
            await deleteDoc(docSnap.ref);
        }
        console.log("✨ Firestore Items Cleaned.");

        // --- 2. UPLOAD FRESH DATA ---
        const itemsRef = collection(db, "items");
        for (const item of items) {
            await addDoc(itemsRef, item);
            console.log(`✅ Uploaded: ${item.title} (${item.category} > ${item.subCategory})`);
        }

        console.log("🏁 MISSION COMPLETED: 230+ Unique Items Uploaded.");
    } catch (error) {
        console.error("❌ CRITICAL ERROR:", error);
    }
}

importData();
