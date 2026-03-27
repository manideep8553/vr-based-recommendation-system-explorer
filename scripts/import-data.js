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
    console.log("🚀 Starting Elite Data Import...");
    
    try {
        const data = JSON.parse(fs.readFileSync('./Database/sample_items.json', 'utf8'));
        const items = data.items;

        for (const item of items) {
            // WE PUSH TO THE MAIN 'items' COLLECTION SO ENGINE.JS CAN QUERY IT
            const colPath = "items";
            await addDoc(collection(db, colPath), item);
            console.log(`✅ Uploaded: ${item.title} (${item.category} > ${item.subCategory})`);
        }

        console.log("🏁 MISSION COMPLETED: 230+ Items Uploaded.");
    } catch (error) {
        console.error("❌ CRITICAL ERROR:", error);
    }
}

importData();
