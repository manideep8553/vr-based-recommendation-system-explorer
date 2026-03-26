import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Configuration Replace this with your own for Firebase! ---
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

// Initialize App & DB
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function importData() {
  const jsonPath = path.join(__dirname, '../Database/sample_items.json');
  const jsonContent = fs.readFileSync(jsonPath, 'utf8');
  const items = JSON.parse(jsonContent).items;

  console.log(`🚀 Importing ${items.length} items to Firestore...`);

  for (const item of items) {
    try {
      const docRef = await addDoc(collection(db, "items"), item);
      console.log(`✅ Added ${item.title} (ID: ${docRef.id})`);
    } catch (e) {
      console.error("❌ Error adding document: ", e);
    }
  }

  console.log("🎉 All items imported successfully!");
}

importData();
