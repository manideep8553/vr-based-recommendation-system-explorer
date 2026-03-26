# VR-Based Recommendation System Explorer - Project Report

## 1. Project Overview
This project explores the integration of Virtual Reality (VR) and cloud-based recommendation systems. The goal is to provide an immersive environment where users can discover content (movies, travel destinations, etc.) using simple content-based filtering logic powered by Google Firebase.

## 2. System Architecture
The application consists of three main layers:
1.  **Immersive VR Layer**: Developed in Unity, providing a 3D interface for user interaction and data visualization.
2.  **Logic & Filtering Layer**: C# scripts that handle local filtering logic based on user preferences and category matching.
3.  **Persistence Layer (Cloud)**: Firebase Firestore stores item metadata, user profiles, and logs interaction history.

## 3. Module Breakdown
-   **Initialization Module (`FirebaseManager`)**: Handles the handshake between the Unity client and Firebase services, ensuring dependencies are resolved.
-   **Data Management Module (`DataManager`)**: The bridge to Firestore. It fetches items asynchronously and performs filtering calculations.
-   **User Profile Module (`UserProfile`)**: Stores persistent user interests (tags) which drive the "personalized" aspect of the recommendations.
-   **VR UI Module (`RecommendationUI` & `ItemController`)**: Handles the dynamic spawning of 3D panels in the virtual world, injecting cloud data into visual components.

## 4. Implementation Details
-   **Filtering Type**: Content-based filtering.
-   **Logic**: `Recommendation = Match(Selected_Category) AND Intersection(User_Tags, Item_Tags)`.
-   **VR Interaction**: Built using the XR Interaction Toolkit, supporting gaze and controller-based selection.

## 5. Technical Stack
-   **Unity 2022 LTS+**: Game Engine.
-   **Google Firebase**: Firestore (NoSQL) & Authentication.
-   **XR Interaction Toolkit**: VR mechanics.
-   **TextMesh Pro**: UI rendering.

## 6. Advantages & Limitations
### Advantages
-   **Engagement**: Discovery is transformed from a flat 2D list into a navigable 3D experience.
-   **Scalability**: The NoSQL nature of Firestore allows for seamless addition of new attributes and items.
-   **Cross-Platform**: Can be deployed to PC VR, Android (Quest), or iOS with minimal changes.

### Limitations
-   **Cold Start Problem**: New items with no tags or users with no profile receive generic recommendations.
-   **Computational Overhead**: Client-side filtering can become slow if thousands of items are fetched (mitigated by using Firestore queries).

## 7. Future Scope
-   **Collaborative Filtering**: Implementing "Users who liked X also liked Y" by analyzing global user history.
-   **NLP Integration**: Using AI to automatically generate tags for new items from descriptions.
-   **Spatial Audio**: Adding directional sound to panels to guide user attention within the VR room.
