# 🚀 VR Recommendation System Deployment Guide (Vercel)

Your project is now fully configured for **Vercel Deployment**.

## 1. Quick Vercel Setup (From GitHub)
1.  **Push your current code**:
    ```bash
    git add .
    git commit -m "Configure Vercel deployment settings"
    git push origin main
    ```
2.  **Go to Vercel**: Visit [vercel.com](https://vercel.com) and log in with your GitHub account.
3.  **Import Project**: Select your repository: `manideep8553/vr-based-recommendation-system-explorer`.
4.  **Confirm Build Settings**: Vercel will automatically detect **Vite** and use these settings:
    - **Build Command**: `npm run build`
    - **Output Directory**: `dist`
    - **Install Command**: `npm install`
5.  **Click Deploy**: Your live VR app will be active at a URL like `vr-recommender.vercel.app`.

## 2. Key Deployment Files Added
- **`vercel.json`**: Configures routing to ensure your VR experience loads correctly on every URL.
- **`package.json`**: Optimized for production building with `vite build`.

## 3. Important Notes
- **Firebase Keys**: Ensure your Firebase API keys are correctly set in `js/engine.js` before the final push.
- **WebXR over HTTPS**: Vercel always provides an **HTTPS** connection, which is **mandatory** for VR and AR modes to work in mobile browsers.

Your One Piece VR Island is ready for the world to see! 🏴‍☠️
