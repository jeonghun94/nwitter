import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQYwkA1ELTB3f71GhUIi-1Ttu8_As7g7o",
  authDomain: "nwitter-55bfe.firebaseapp.com",
  projectId: "nwitter-55bfe",
  storageBucket: "nwitter-55bfe.appspot.com",
  messagingSenderId: "399711531680",
  appId: "1:399711531680:web:3572d98c64b8ac4bd64fc5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
