import {initializeApp} from "firebase/app"
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
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

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const database = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
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