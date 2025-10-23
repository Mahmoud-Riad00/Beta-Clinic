import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";
import { firebaseConfig } from "./config";

let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let auth: Auth | undefined;

// A simple check to see if the config is still the placeholder
const isConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY" && firebaseConfig.projectId !== "YOUR_PROJECT_ID";

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
    console.warn("Firebase is not configured. Please check your firebase/config.ts file.");
}

export { db, auth, isConfigured };