import { initializeApp } from 'firebase/app'
import {
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
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

const googleAuthProvider = new GoogleAuthProvider();  // we can create multiple providers depending on what auth providers we want available
googleAuthProvider.setCustomParameters({
    prompt: "select_account" // every time someone interacts with our googleAuthProvider, they have to select an account
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleAuthProvider)

export const db = getFirestore() // this points to our db in the Firebase console

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
          await setDoc(userDocRef, {
              displayName,
              email,
              createdAt
          })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }
    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return
    }
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) {
        return
    }
    return await signInWithEmailAndPassword(auth, email, password)
}

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)

export const signOutUser = async () => await signOut(auth)

