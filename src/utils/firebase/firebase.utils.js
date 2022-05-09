import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

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

export const db = getFirestore() // this points to our db in the Firebase console

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot)
    console.log(userSnapshot.exists()) // can check if doc exists in database


}