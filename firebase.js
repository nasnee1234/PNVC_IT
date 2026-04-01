import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDtzr2mr-r0xqUkXnMAQUaZdfnm20nY-Y4",
  authDomain: "pnvc14-35a4c.firebaseapp.com",
  projectId: "pnvc14-35a4c",
  storageBucket: "pnvc14-35a4c.firebasestorage.app",
  messagingSenderId: "66378691585",
  appId: "1:66378691585:web:c7107b5f3eec95f1963c00",
  measurementId: "G-DJQGF78BJK",

  // สำคัญมาก: ต้องใส่ databaseURL ของ Realtime Database
  // ไปคัดลอกจาก Firebase Console > Realtime Database
  databaseURL: "https://pnvc14-35a4c-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };