# Project Report: VR-Based Recommendation System using WebXR and Firebase

## 1. Introduction
This project is an immersive WebXR application that explores recommendation system concepts inside a virtual environment. It allows users to filter content (Movies, Travel, Courses, Products) through 3D interaction, with real-time data fetched from Google Firebase.

## 2. Technology Stack
- **Framework**: [A-Frame](https://aframe.io/) (WebXR framework built on Three.js).
- **Backend**: Google Firebase Firestore (NoSQL cloud database).
- **Frontend Logic**: JavaScript (ES6 Modules).
- **Tooling**: Vite (Efficient frontend building & development).
- **Deployment**: Vercel (Cloud platform for seamless web hosting).

## 3. System Architecture
The application follows a standard **Serverless Architecture**:
1. **Presentation Layer (WebXR)**: A-Frame renders the 3D VR environment, accessible via browsers on PCs or VR headsets.
2. **Application Logic Layer**:
   - `js/engine.js`: Handles asynchronous Firestore queries and content filtering.
   - `app.js`: Manages the A-Frame 3D scene lifecycle, such as spawning panels and handling VR controller/mouse events.
3. **Data Layer (Cloud)**: Firebase stores item metadata in a structured format (JSON-like documents).

## 4. Module Description
- **Immersive Scene Module**: Creates a virtual office environment where the user "stands."
- **Data Connector Module**: Securely connects to the cloud database using the Firebase SDK.
- **Content-Based Filtering Module**: Logic uses tag matching: `Recommended = Match(Category) AND Intersection(User_Tags, Item_Tags)`. It sorts items by match relevance and rating before displaying.
- **Dynamic 3D Spawning Module**: Converts raw data into interactive "a-entity" panels that appear magically in the VR world.

## 5. Implementation (Key Snippet)
The filtering logic:
```javascript
// Matches items in a category where item tags overlap with user interests
const matches = item.tags.filter(tag => userTags.includes(tag));
if (matches.length > 0) {
  recommended.push({ ...item, matchCount: matches.length });
}
```

## 6. Advantages
- **No Installation Requirement**: Accessible via URL, making it highly portable.
- **Hardware Agnostic**: Runs on low-end laptops (i3 CPU) and high-end VR headsets (Quest/Vive).
- **Cost Effective**: Uses free-tier serverless services (Firebase/Vercel).

## 7. Future Scope
- **AI Integration**: Automatically tagging new products using Natural Language Processing.
- **Social VR**: Multiple users exploring recommendations together in the same room.
- **Voice Search**: "Show me sci-fi movies" for faster interaction in VR.
