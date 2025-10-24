import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { firebaseConfig } from "./config";

let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;

// A check to see if the necessary Firebase config environment variables are set.
const isConfigured = firebaseConfig.apiKey && firebaseConfig.projectId;

if (isConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
  } catch (error) {
    console.error("Firebase initialization failed:", error);
    // You could set isConfigured to false here if initialization fails
  }
} else {
    console.warn("Firebase is not configured. Please add your Firebase environment variables to a .env file (for local development) or to your hosting provider's settings (for deployment).");
}

export { db, auth, isConfigured };