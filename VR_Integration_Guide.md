# VR Integration & Interaction Guide

Follow these steps to set up the VR environment and interaction system in Unity.

## 👓 Hardware Calibration
1. **Headset Connection**: Connect your Quest, Index, or Vive to your PC.
2. **Unity Selection**: Ensure `Edit > Project Settings > XR Plug-in Management` has the correct provider selected (OpenXR is recommended).

## 🏗 Building the VR Scene
1. **XR Origin**:
   - Delete the default "Main Camera".
   - Right-click in Hierarchy -> `XR > XR Origin (Action-based)`. This sets up the VR camera and hands.
2. **Input Actions**:
   - Ensure the "XRI Default Input Actions" are assigned in the `XR Interaction Manager`.

## 🖱 Category Interaction (Floating UI)
1. **Create Canvas**:
   - Right-click -> `UI > Canvas`.
   - Set "Render Mode" to **World Space**.
   - Scale it down (try `0.001` or `0.002`) and place it in front of the `XR Origin`.
2. **Add Graphic Raycaster**:
   - Add the `Tracked Device Graphic Raycaster` component to the Canvas so VR controllers can click it.
3. **Category Buttons**:
   - Create Buttons (Movies, Travel, etc.).
   - On the `OnClick()` event, drag the `RecommendationSystem` object and call `RecommendationUI.SelectCategory("Movies")`.

## 📦 Recommendation Panels (Interactive 3D Objects)
1. **Panel Prefab**:
   - Create a 3D Cube or Quad.
   - Add a `Box Collider`.
   - Add the `ItemController.cs` script.
   - Add `XR Simple Interactable` component.
2. **Gaze/Select Feedback**:
   - In the `XR Simple Interactable`, add events for `Hover Entered` to highlight the panel or show a tooltip.

## ⌨️ VR Simulation (No-Headset Mode)
If you don't have a headset, you can still test interactions:
1. Install **XR Device Simulator** from the Package Manager (under XR Interaction Toolkit samples).
2. Drag the `XR Device Simulator` prefab into your scene.
3. Use `WASD` + `Right Click` mouse movement to simulate hand controllers and head looking.

---

## 🔧 Final Integration Checklist
- [ ] `FirebaseManager` is in the scene.
- [ ] `DataManager` and `RecommendationUI` are assigned to a central `AppManager` GameObject.
- [ ] `ItemPrefab` is assigned in the `RecommendationUI` inspector.
- [ ] `Google-services.json` is correctly placed in `Assets/`.
- [ ] Firestore Security Rules are set to `allow read: if true;` for development.
