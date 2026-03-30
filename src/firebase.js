import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDSbXkLaWjplu0nJbZznJr6DynYehGlzZo",
  authDomain: "pnvc-it.firebaseapp.com",
  databaseURL: "https://pnvc-it-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pnvc-it",
  storageBucket: "pnvc-it.firebasestorage.app",
  messagingSenderId: "853561889465",
  appId: "1:853561889465:web:04361b851dde0c7b6c4168",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);

export default app;