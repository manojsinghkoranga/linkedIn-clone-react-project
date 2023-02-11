import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDknRzZtTW2Y5HZeYTnGApmJG7bTJnlRaw",
    authDomain: "clone-linkedin-72288.firebaseapp.com",
    projectId: "clone-linkedin-72288",
    storageBucket: "clone-linkedin-72288.appspot.com",
    messagingSenderId: "371970377588",
    appId: "1:371970377588:web:f006b3bca8957f94114e21",
    measurementId: "G-8EVFCRVPK7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);