# Low-Spec Development Guide (Intel i3 / Integrated Graphics)

If you are developing on a laptop with an i3 processor and no dedicated GPU, follow these steps to ensure Unity remains stable.

## 1. Unity Editor Settings
*   **Use Forward Rendering**: Go to `Project Settings > Quality` and set the rendering to "Low" or "Performant".
*   **Disable Real-time Lighting**:
    *   Go to `Window > Rendering > Lighting`.
    *   Uncheck **Real-time Global Illumination**.
    *   Use **Baked Lighting** instead, or just use a simple Directional Light with shadows turned off.
*   **Lower Game View Resolution**: In the "Game" tab, set the resolution to `Fixed Resolution` (e.g., 1280x720) instead of `Free Aspect`.

## 2. Using the XR Device Simulator (Crucial)
Since you cannot run a headset, you MUST use the simulator:
1.  Open **Window > Package Manager**.
2.  Search for **XR Interaction Toolkit**.
3.  Click the **Samples** tab and import **XR Device Simulator**.
4.  Drag the `XR Device Simulator` prefab into your scene.
5.  **Controls**:
    *   **Right-Click (Hold)**: Look around.
    *   **W/A/S/D**: Move.
    *   **Spacebar**: Toggle right hand.
    *   **Left Shift**: Toggle left hand.
    *   **G**: Grab/Select.

## 3. Keep the 3D Scene Simple
*   **Avoid high-poly models**: Do not download complex 3D furniture. Use Unity's basic Cubes and Planes to build the room.
*   **Texture Size**: Keep textures at 512x512 or 1024x1024.

## 4. Coding Considerations
*   Since your CPU (i3) has fewer cores, ensure your Firebase calls remain **Asynchronous** (which the provided scripts already are) so the UI doesn't freeze while waiting for data.
