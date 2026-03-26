# VR Recommendation System Explorer (WebXR Version)

A professional Virtual Reality project built with **A-Frame**, **Firebase**, and **Vite**. This version is highly optimized for development on **low-spec hardware (i3 laptops)** and direct deployment to **Vercel**.

## 📁 Project Structure (WebXR)
```text
/
├── index.html            # The VR Scene Home
├── app.js               # Main VR logic & component registration
├── style.css            # UI Overlays & Loading styles
├── js/
│   └── recommender.js    # Firebase config & filtering logic
├── Project_Report_WebXR.md # Academic-ready documentation
└── package.json         # Vercel-ready build config
```

## 🛠 Prerequisites
- **Node.js**: Already installed on your laptop (v10.9.2+).
- **Firebase Account**: To host your item data.

## 🚀 Step-by-Step Setup (for your i3 Laptop)

### 1. File Preparation
1. Open this folder in your terminal or VS Code.
2. Run `npm install` to download Vite and Firebase.

### 2. Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a "Web App" project.
3. Copy your "Firebase SDK snippet" keys into `js/recommender.js` inside the `firebaseConfig` object.

### 3. Local Development
Run the following command to start the simulator:
```bash
npm run dev
```
Open the provided URL (usually `http://localhost:5173`) in your browser.
- **Mouse & WASD**: Use these to explore the VR room.
- **Click**: Use your mouse cursor (reticle) to click the red/blue/yellow/green boxes.

### 4. Deploying to Vercel
1. Push this folder to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com/dashboard).
3. Click **"Add New" > "Project"**.
4. Import your GitHub repo.
5. Vercel will automatically detect **Vite** and deploy the project.

---

## 🔥 Key Filtering Logic for Report
This project uses **Content-Based Filtering**:
1.  **Input**: User's initial "Selected_Category" + "User_Interests" (Tags).
2.  **Filter**: The system queries Firestore for all items in that category.
3.  **Process**: JavaScript logic compares the item's tags with the user's tags.
4.  **Display**: If there is any overlap, the item is spawned in the 3D VR environment.

## 👓 Interaction Tips (Low-Spec Simulation)
- **i3 GPU**: If the scene lags, close other browser tabs.
- **VR Mode**: Click the **"Enter VR"** button in the bottom right corner of the screen to see how it looks on a headset (it will simulate VR on your laptop screen).
- **Interaction**: If you don't have a headset, the **"a-cursor"** in the center of your view acts as your mouse click.
