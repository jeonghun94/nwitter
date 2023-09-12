import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbjks097eWICg_9FhTaKN6v0cfti_FVcg",
  authDomain: "nwitter-reloaded-69f82.firebaseapp.com",
  projectId: "nwitter-reloaded-69f82",
  storageBucket: "nwitter-reloaded-69f82.appspot.com",
  messagingSenderId: "677705836738",
  appId: "1:677705836738:web:54700485838268d5eaf35b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
