import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCOias-46IUOBpuvLvQrRI72cmzHgAPK7I",
  authDomain: "lolhubmexico-9fa9f.firebaseapp.com",
  projectId: "lolhubmexico-9fa9f",
  storageBucket: "lolhubmexico-9fa9f.firebasestorage.app",
  messagingSenderId: "516864188108",
  appId: "1:516864188108:web:4c18604b3a6bf402b62c69",
  measurementId: "G-PYQDKV8NTP"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);