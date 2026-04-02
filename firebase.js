import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// 🔥 config ใหม่ของนัท
const firebaseConfig = {
  apiKey: "AIzaSyBYk7J_KquiYg2LT75FzB8YA0EWoqqVOv8",
  authDomain: "pnvc1-493b8.firebaseapp.com",
  projectId: "pnvc1-493b8",
  storageBucket: "pnvc1-493b8.firebasestorage.app",
  messagingSenderId: "297138647667",
  appId: "1:297138647667:web:1468cfa1b806ff6966f006",

  // ❗ ต้องเพิ่มอันนี้เอง
  databaseURL: "https://pnvc1-493b8-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);

// ✅ ใช้ใน Login / Register
const auth = getAuth(app);

// ✅ ใช้ใน Vote / Score / StudyPlan
const db = getDatabase(app);

export { app, auth, db };