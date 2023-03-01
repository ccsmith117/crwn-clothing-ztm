import {
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    getCurrentUser,
    signInUserWithEmailAndPassword,
    signInWithGooglePopup,
    signOutUser,
    UserData,
} from '../../utils/firebase/firebase.utils'
import {
    AnyAction,
    createSlice,
    ListenerEffectAPI,
    PayloadAction,
    ThunkDispatch,
} from '@reduxjs/toolkit'
import { startListening } from '../listener-middleware'
import { User } from 'firebase/auth'
import { RootState } from '../store'
import { createSelector } from 'reselect'

export type UserState = {
    readonly currentUser: UserData
    readonly isLoading: boolean
    readonly error: Error | null
}

const INITIAL_STATE: UserState = {
    currentUser: {} as UserData,
    isLoading: false,
    error: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        signInSucceeded(
            state,
            action: PayloadAction<UserData & { id: string }>
        ) {
            state.currentUser = action.payload
            state.isLoading = false
        },
        signInFailed(state, action: PayloadAction<Error>) {
            state.error = action.payload
            state.isLoading = false
        },
        signOutFailed(state, action: PayloadAction<Error>) {
            state.error = action.payload
            state.isLoading = false
        },
        signUpFailed(state, action: PayloadAction<Error>) {
            state.error = action.payload
            state.isLoading = false
        },
        signOutSucceeded(state) {
            state.currentUser = {} as UserData
            state.isLoading = false
        },
        userSessionChecked() {},
        emailSignInStarted(
            state,
            action: PayloadAction<{ email: string; password: string }>
        ) {},
        signOutStarted() {},
        signUpStarted(
            state,
            action: PayloadAction<{
                email: string
                password: string
                displayName: string
            }>
        ) {},
        signUpSucceeded(state, action: PayloadAction<User>) {},
        googleSignInStarted() {},
    },
})

export const userReducer = userSlice.reducer

export const {
    userSessionChecked,
    emailSignInStarted,
    signOutStarted,
    signUpStarted,
    googleSignInStarted,
} = userSlice.actions

const {
    signInSucceeded,
    signOutSucceeded,
    signUpSucceeded,
    signOutFailed,
    signUpFailed,
    signInFailed,
} = userSlice.actions

const getSnapshotFromUserAuth = async (
    userAuth: User,
    listenerApi: ListenerEffectAPI<
        unknown,
        ThunkDispatch<unknown, unknown, AnyAction>
    >
) => {
    try {
        const userSnapshot = await createUserDocumentFromAuth(userAuth)
        if (userSnapshot) {
            listenerApi.dispatch(
                signInSucceeded({ id: userSnapshot.id, ...userSnapshot.data() })
            )
        }
    } catch (error) {
        listenerApi.dispatch(signInFailed(error as Error))
    }
}

startListening({
    actionCreator: userSessionChecked,
    effect: async (action, listenerApi) => {
        try {
            const userAuth = await getCurrentUser()
            if (userAuth) {
                await getSnapshotFromUserAuth(userAuth, listenerApi)
            }
        } catch (error) {
            listenerApi.dispatch(signInFailed(error as Error))
        }
    },
})

startListening({
    actionCreator: emailSignInStarted,
    effect: async (action, listenerApi) => {
        try {
            const { email, password } = action.payload
            const userSnapshot = await signInUserWithEmailAndPassword(
                email,
                password
            )
            if (userSnapshot) {
                listenerApi.dispatch(
                    signInSucceeded({
                        id: userSnapshot.id,
                        ...userSnapshot.data(),
                    })
                )
            }
        } catch (error) {
            listenerApi.dispatch(signInFailed(error as Error))
        }
    },
})

startListening({
    actionCreator: signOutStarted,
    effect: async (action, listenerApi) => {
        try {
            await signOutUser()
            listenerApi.dispatch(signOutSucceeded())
        } catch (error) {
            listenerApi.dispatch(signOutFailed(error as Error))
        }
    },
})

startListening({
    actionCreator: signUpStarted,
    effect: async (action, listenerApi) => {
        const {
            payload: { email, password, displayName },
        } = action
        try {
            const userCredential = await createAuthUserWithEmailAndPassword(
                email,
                password
            )
            if (userCredential) {
                const { user } = userCredential
                listenerApi.dispatch(signUpSucceeded({ ...user, displayName }))
            }
        } catch (error) {
            listenerApi.dispatch(signUpFailed(error as Error))
        }
    },
})

startListening({
    actionCreator: signUpSucceeded,
    effect: async (action, listenerApi) => {
        try {
            await getSnapshotFromUserAuth(action.payload, listenerApi)
        } catch (error) {
            listenerApi.dispatch(signUpFailed(error as Error))
        }
    },
})

startListening({
    actionCreator: googleSignInStarted,
    effect: async (action, listenerApi) => {
        try {
            const { user } = await signInWithGooglePopup()
            await getSnapshotFromUserAuth(user, listenerApi)
        } catch (error) {
            listenerApi.dispatch(signInFailed(error as Error))
        }
    },
})

export const selectUserReducer = (state: RootState): UserState => state.user

export const selectCurrentUser = createSelector(
    selectUserReducer,
    (user) => user.currentUser
)
