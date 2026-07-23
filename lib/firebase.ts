import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDs20305kkWmg7BDMsq9oOMQ6kvuz0DY8M",
  authDomain: "reauth-4e852.firebaseapp.com",
  projectId: "reauth-4e852",
  storageBucket: "reauth-4e852.firebasestorage.app",
  messagingSenderId: "568719986324",
  appId: "1:568719986324:web:aa9cd7cafeeceffa9c2e81",
  measurementId: "G-E9SZJTSZKH",
  databaseURL: "https://reauth-4e852-default-rtdb.firebaseio.com",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
