import { initializeApp } from 'firebase/app'
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    User,
} from 'firebase/auth'
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    writeBatch,
    QueryDocumentSnapshot,
} from 'firebase/firestore'
import { Category } from '../../store/categories/categories.types'

const firebaseConfig = {
    apiKey: 'AIzaSyC8zo0-nXcFRrb_qFqyIYPz_ncwY_ZAl3s',
    authDomain: 'crwn-clothing-db-d68de.firebaseapp.com',
    projectId: 'crwn-clothing-db-d68de',
    storageBucket: 'crwn-clothing-db-d68de.appspot.com',
    messagingSenderId: '426379165535',
    appId: '1:426379165535:web:bdeb851fb53eb7a57180ea',
}

const firebaseApp = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
    prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

export const database = getFirestore()

export type ObjectToAdd = {
    title: string
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
    collectionKey: string,
    objectsToAdd: T[]
): Promise<void> => {
    const collectionRef = collection(database, collectionKey)
    const batch = writeBatch(database)

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })

    await batch.commit()
    console.log('done')
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(database, 'categories')
    const q = query(collectionRef)
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(
        (docSnapshot) => docSnapshot.data() as Category
    )
}

export type UserData = {
    createdAt: Date
    displayName: string
    email: string
}

export const createUserDocumentFromAuth = async (
    userAuth: User
): Promise<void | QueryDocumentSnapshot<UserData>> => {
    if (userAuth) {
        const userCollectionPath = 'users'
        const userDocumentReference = doc(
            database,
            userCollectionPath,
            userAuth.uid
        )
        const userSnapshot = await getDoc(userDocumentReference)

        if (!userSnapshot.exists()) {
            const { displayName, email } = userAuth
            const createdAt = new Date()

            try {
                await setDoc(userDocumentReference, {
                    displayName,
                    email,
                    createdAt,
                })
            } catch (error) {
                console.log('error creating the user', error)
            }
        }

        return userSnapshot as QueryDocumentSnapshot<UserData>
    }
}

export const createAuthUserWithEmailAndPassword = async (
    email: string,
    password: string
) => {
    if (email && password) {
        return await createUserWithEmailAndPassword(auth, email, password)
    }
}

export const signInUserWithEmailAndPassword = async (
    email: string,
    password: string
) => {
    if (email && password) {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        return createUserDocumentFromAuth(user)
    }
}

export const signOutUser = async () => {
    await signOut(auth)
}

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe()
                resolve(userAuth)
            },
            reject
        )
    })
}
