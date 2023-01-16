import {ActionWithPayload, createAction, withMatcher} from '../../utils/reducer/reducer.utils'
import {USER_ACTION_TYPES} from './user.types'
import {UserData} from "../../utils/firebase/firebase.utils";
import {Action} from "redux";
import {User} from "firebase/auth";

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>
export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>
export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email: string, password: string}>
export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>
export type SignInFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILURE, Error>
export type SignOut = Action<USER_ACTION_TYPES.SIGN_OUT_START>
export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>
export type SignOutFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILURE, Error>
export type SignUp = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START, { email: string, password: string, displayName: string }>
export type SignUpSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCESS, User>
export type SignUpFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILURE, Error>

export const checkUserSession = withMatcher((): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION))

export const googleSignInStart = withMatcher((): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START))

export const emailSignInStart = withMatcher((email: string, password: string): EmailSignInStart => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email, password}))

export const signInSuccess = withMatcher((user: UserData & {id: string}): SignInSuccess => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user))

export const signInFailed = withMatcher((error: Error): SignInFailed => createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error))

export const signOut = withMatcher((): SignOut => createAction(USER_ACTION_TYPES.SIGN_OUT_START))

export const signOutSuccess = withMatcher((): SignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS))

export const signOutFailed = withMatcher((error: Error): SignOutFailed => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILURE, error))

export const signUp = withMatcher((email: string, password: string, displayName: string): SignUp => createAction(USER_ACTION_TYPES.SIGN_UP_START, {email, password, displayName}))

export const signUpSuccess = withMatcher((user: User): SignUpSuccess => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, user))

export const signUpFailed = withMatcher((error: Error): SignUpFailed => createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, error))