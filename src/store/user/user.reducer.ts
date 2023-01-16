import {AnyAction} from "redux";
import {signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed} from "./user.action";
import {UserData} from "../../utils/firebase/firebase.utils";

export type UserState = {
    readonly currentUser: UserData,
    readonly isLoading: boolean,
    readonly error: Error | null
}

const INITIAL_STATE: UserState = {
    currentUser: {} as UserData,
    isLoading: false,
    error: null
}

export const userReducer = (
    state = INITIAL_STATE,
    action: AnyAction
) => {
    if (signInSuccess.match(action)) {
        return {
            ...state,
            currentUser: action.payload,
            isLoading: false
        }
    }

    if (signInFailed.match(action) || signOutFailed.match(action) || signUpFailed.match(action)) {
        return {
            ...state,
            error: action.payload,
            isLoading: false
        }
    }

    if (signOutSuccess.match(action)) {
        return {
            ...state,
            currentUser: {},
            isLoading: false
        }
    }

    return state
}
