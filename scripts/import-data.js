import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import fs from 'fs';

// --- YOUR FIREBASE CONFIG (FETCHED FROM ENGINE.JS) ---
const firebaseConfig = {
    apiKey: "AIzaSyCX-XXXXXXXXXXXX", // This should be your real key
    authDomain: "virtual-study-room-XXXX.firebaseapp.com",
    projectId: "virtual-study-room-XXXX",
    storageBucket: "virtual-study-room-XXXX.appspot.com",
    messagingSenderId: "XXXXXXXX",
    appId: "1:XXXXXXX:web:XXXXXXX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function importData() {
    console.log("🚀 Starting Elite Data Import...");
    
    try {
        const data = JSON.parse(fs.readFileSync('./Database/sample_items.json', 'utf8'));
        const items = data.items;

        for (const item of items) {
            // WE CREATE NESTED PATHS IN FIRESTORE: Recommendations > Categories > [Category] > [SubCategory]
            const colPath = `Recommendations/${item.category}/${item.subCategory}`;
            await addDoc(collection(db, colPath), item);
            console.log(`✅ Uploaded: ${item.title} to ${colPath}`);
        }

        console.log("🏁 MISSION COMPLETED: 60+ Items Uploaded.");
    } catch (error) {
        console.error("❌ CRITICAL ERROR:", error);
    }
}

importData();
