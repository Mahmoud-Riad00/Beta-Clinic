// Firebase configuration is loaded from environment variables for security and flexibility.
// For local development, create a .env file in the root of your project.
// For production (e.g., Netlify), set these variables in your site's build settings.

// The execution environment provides environment variables via `process.env`.
export const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Note: To get started:
// 1. In your project root, create a file named `.env`
// 2. Add your Firebase config values to it, prefixed with `VITE_`. For example:
//    VITE_FIREBASE_API_KEY="YOUR_API_KEY"
//    VITE_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
//    ...
// 3. Make sure to add `.env` to your `.gitignore` file to keep your keys secret.
// 4. For deployment, add these same environment variables to your hosting provider's settings (e.g., Netlify).