# VR-Based Recommendation System Explorer

This project is a Virtual Reality application built with Unity and Firebase. It allows users to explore different categories and receive personalized recommendations based on simple content-based filtering.

## 📁 Unity Folder Structure
```text
Assets/
├── 📁 Materials/          # Skybox, UI backgrounds, panel colors
├── 📁 Prefabs/            # ItemPanel, CategoryButton
├── 📁 Resources/          # Static data if needed
├── 📁 Scenes/             # MainVirtualRoom.unity
├── 📁 Scripts/            # C# Logic
│   ├── FirebaseManager.cs
│   ├── DataManager.cs
│   ├── RecommendationUI.cs
│   ├── ItemController.cs
│   └── VRInteractionHandler.cs
└── 📁 Textures/           # Icons for Movies, Travel, etc.
```

## 🛠 Required Unity Packages
1. **Firebase Unity SDK** (Firestore & Auth)
   - [Download Firebase Unity SDK](https://firebase.google.com/docs/unity/setup)
2. **XR Interaction Toolkit** (for VR)
   - Install via Package Manager -> Unity Registry.
3. **TextMeshPro** (for clean UI)
   - Essential for VR readable text.

---

## 🏛 System Architecture
The system follows a **Client-Server Architecture**:
- **Client (Unity VR)**: Handles 3D rendering, User Interface (UI), and VR Interactions. It manages the user's state and category selections.
- **Backend (Firebase Firestore)**: Stores item metadata (title, tags, category, description).
- **Communication Layer**: Uses the Firebase Unity SDK to perform asynchronous queries to Firestore.
- **Filtering Logic**: Content-based filtering is performed on the client-side/query-side by matching active category and tags.

## 🧩 Module Explanation
1. **Connectivity Module (`FirebaseManager`)**: Initializes the Firebase app and ensures the database connection is stable.
2. **Data Module (`DataManager`)**: Fetches items from Firestore based on the selected category.
3. **Logic Module (`FilteringEngine`)**: Filters the fetched items by matching user preferences (tags) with item tags.
4. **UI/UX Module (`RecommendationUI`)**: Dynamically spawns 3D panels in the VR world and populates them with data.

---

## 🚀 Step-by-Step Setup Guide

### 1. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project called `VR-Recommendation-Explorer`.
3. Add a **Unity App** to the project.
   - Register it (e.g., `com.yourname.vr-recommender`).
   - Download the `google-services.json` (for Android) or `GoogleService-Info.plist` (for iOS). **Important:** Place this in your Unity `Assets` folder.
4. Enable **Firestore Database** in Test Mode.
5. Create a collection named `items` and add sample data (see `Database/sample_items.json`).

### 2. Unity Setup
1. Open Unity Hub and create a new project using the **3D (Core)** template.
2. Go to `Edit > Project Settings > XR Plug-in Management` and install the package.
3. Enable **OpenXR** or **Oculus** (depending on your headset) or use **Mock HMD** for simulation.
4. Import the Firebase SDKs:
   - `FirebaseApp.unitypackage`
   - `FirebaseFirestore.unitypackage`
   - `FirebaseAuth.unitypackage`
5. Create the folder structure as defined above.
6. Copy the provided C# scripts into `Assets/Scripts/`.

---

## ✨ Advantages & Limitations
### Advantages
- **Immersive UX**: Users feel "inside" the discovery process.
- **Real-time Updates**: Changes in Firestore reflect instantly in the VR room.
- **Scalable**: Easy to add new categories or thousands of items.

### Limitations
- **Simple Filtering**: Basic tag matching isn't as accurate as collaborative filtering or AI.
- **Hardware Dependent**: Requires a VR-capable PC or Standalone Headset (Quest).

### Future Enhancements
- **Multi-user Support**: Simultaneous users in the same room.
- **AI Integration**: Use Vertex AI or OpenAI for semantic recommendations.
- **User History**: Tracking what the user clicked to improve future filtering.
