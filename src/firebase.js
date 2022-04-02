import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, collection, doc, getDocs, getDoc, addDoc, setDoc, deleteDoc, orderBy, query, onSnapshot, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDln7sdan55TiqItmI1x4K6PMySAr0ygjY",
    authDomain: "invoicegenerator-c0363.firebaseapp.com",
    projectId: "invoicegenerator-c0363",
    storageBucket: "invoicegenerator-c0363.appspot.com",
    messagingSenderId: "291511303541",
    appId: "1:291511303541:web:afb3e649b9d1c71c12e73c"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {
    app,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    db,
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    setDoc,
    deleteDoc,
    orderBy,
    query,
    onSnapshot,
    where
}