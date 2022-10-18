import {initializeApp} from "firebase/app"
import {getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"
import {doc, getDoc, getFirestore, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC8zo0-nXcFRrb_qFqyIYPz_ncwY_ZAl3s",
    authDomain: "crwn-clothing-db-d68de.firebaseapp.com",
    projectId: "crwn-clothing-db-d68de",
    storageBucket: "crwn-clothing-db-d68de.appspot.com",
    messagingSenderId: "426379165535",
    appId: "1:426379165535:web:bdeb851fb53eb7a57180ea"
}

const firebaseApp = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

export const database = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    if (userAuth) {
        const userCollectionPath = 'users'
        const userDocumentReference = doc(database, userCollectionPath, userAuth.uid)
        const userSnapshot = await getDoc(userDocumentReference)

        if (!userSnapshot.exists()) {
            const {displayName, email} = userAuth
            const createdAt = new Date()

            try {
                await setDoc(userDocumentReference, {
                    displayName,
                    email,
                    createdAt
                })
            } catch (error) {
                console.log('error creating the user', error.message)
            }
        }

        return userDocumentReference
    }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (email && password) {
        return await createUserWithEmailAndPassword(auth, email, password)
    }
}

export const signInUserWithEmailAndPassword = async (email, password) => {
    if (email && password) {
        const {user} = await signInWithEmailAndPassword(auth, email, password)
        return createUserDocumentFromAuth(user)
    }
}