import {initializeApp} from "firebase/app"
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut
} from "firebase/auth"
import {collection, doc, getDoc, getDocs, getFirestore, query, setDoc, writeBatch} from 'firebase/firestore'

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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(database, collectionKey)
    const batch = writeBatch(database)

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })

    await batch.commit()
    console.log('done')
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(database, 'categories')
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.reduce((accumulator, docSnapshot) => {
        const {title, items} = docSnapshot.data()
        accumulator[title.toLowerCase()] = items
        return accumulator
    }, {})
}

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

export const signOutUser = async () => {
    await signOut(auth)
}

export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback)