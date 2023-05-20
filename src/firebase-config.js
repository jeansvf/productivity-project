import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

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
  // sign in with google
  signInWithPopup(auth, provider)

  .then((result) => {
    // TODO: save user info in database
    console.log(result.user.email);
    console.log(result.user.displayName);
    console.log(result.user.photoURL);
    console.log(result.user.uid);
  })
}

export const auth = getAuth(app)