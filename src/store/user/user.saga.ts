import {all, call, put, takeLatest} from 'typed-redux-saga/macro'
import {USER_ACTION_TYPES} from './user.types'
import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser,
    signInUserWithEmailAndPassword,
    signInWithGooglePopup,
    signOutUser
} from '../../utils/firebase/firebase.utils'
import {
    EmailSignInStart,
    signInFailed,
    signInSuccess,
    signOutFailed,
    signOutSuccess,
    SignUp,
    signUpFailed,
    SignUpSuccess,
    signUpSuccess
} from './user.action'
import {User} from "firebase/auth";

export function* getSnapshotFromUserAuth(userAuth: User) {
    try {
        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth)
        if (userSnapshot) {
            yield* put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
        }
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser)
        if (userAuth) {
            yield* call(getSnapshotFromUserAuth, userAuth)
        }
    } catch(error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup)
        yield* call(getSnapshotFromUserAuth, user)
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* onGoogleSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle)
}


export function* emailSignInUser({payload: {email, password}}: EmailSignInStart) {
    try {
        const userSnapshot = yield* call(signInUserWithEmailAndPassword, email, password)
        if (userSnapshot) {
            yield* put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
        }
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

export function* onEmailSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, emailSignInUser)
}

export function* signOut() {
    try {
        yield* call(signOutUser)
        yield* put(signOutSuccess())
    } catch (error) {
        yield* put(signOutFailed(error as Error))
    }
}

export function* onSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut)
}

export function* signUp({ payload: {email, password, displayName}}: SignUp) {
    try {
        const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password)
        if (userCredential) {
            const {user} = userCredential
            yield* put(signUpSuccess({...user, displayName}))
        }
    } catch (error) {
        yield* put(signUpFailed(error as Error))
    }
}

export function* onSignUpStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* signInAfterSignUp({payload}: SignUpSuccess) {
    yield* call(getSnapshotFromUserAuth, payload)
}

export function* onSignUpSuccess() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSaga() {
    yield*(all([
        call(onCheckUserSession),
        call(onEmailSignInStart),
        call(onGoogleSignInStart),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
    ]))
}