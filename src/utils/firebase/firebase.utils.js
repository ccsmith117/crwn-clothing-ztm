import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8zo0-nXcFRrb_qFqyIYPz_ncwY_ZAl3s",
    authDomain: "crwn-clothing-db-d68de.firebaseapp.com",
    projectId: "crwn-clothing-db-d68de",
    storageBucket: "crwn-clothing-db-d68de.appspot.com",
    messagingSenderId: "426379165535",
    appId: "1:426379165535:web:bdeb851fb53eb7a57180ea"
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account" // every time someone interacts with our provider, they have to select an account
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)