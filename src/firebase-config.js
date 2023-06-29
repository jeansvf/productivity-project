import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithPopup } from "firebase/auth"
import { Timestamp, addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()

export const continueWithGoogle = () => {
  signInWithPopup(auth, provider).then((userCred) => {
    setDoc(doc(db, "users", userCred.user.uid), {
      uid: userCred.user.uid,
      userName: userCred.user.displayName,
      email: userCred.user.email,
      provider: userCred.providerId,
      photoUrl: userCred.user.photoURL,
      pomodoroMinutes: 0,
      createdAt: Timestamp.now(),
      // emailVerified: ?
    })
  })
}

export const auth = getAuth(app)
export const db = getFirestore(app)