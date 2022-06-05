
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD1T1B7ecLN1pNEDwCqsFcnR75wWe_sNKc",
    authDomain: "foody-de5ee.firebaseapp.com",
    projectId: "foody-de5ee",
    storageBucket: "foody-de5ee.appspot.com",
    messagingSenderId: "133719767323",
    appId: "1:133719767323:web:4e1ddbe6a7bb404db67bbe",
    measurementId: "G-68RE4PV0YK"
};

initializeApp(firebaseConfig);

const db = getFirestore()
const postsRef = collection(db, 'posts');
const flairsRef = collection(db, 'flairs');

export { db, postsRef, flairsRef }